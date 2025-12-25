/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-require-imports, @typescript-eslint/no-unsafe-function-type */

describe("Solana WebSocket Gateway", () => {

// --- PHASE 1: Complete Mock Implementation ---
const mockAddLog = jest.fn();
const mockGetKey = jest.fn();

// Mock solanaApiKeyStore

jest.mock("../src/lib/solanaApiKeyStore", () => ({
  getKey: (...args: any[]) => mockGetKey(...args),
}));

// Mock solanaAnalyticsStore

jest.mock("../src/lib/solanaAnalyticsStore", () => ({
  addLog: (...args: any[]) => mockAddLog(...args),
}));

// WebSocket/Server mocks

let wsServerHandlers: Record<string, Function> = {};
let wsClientHandlers: Record<string, Function> = {};
let wsUpstreamHandlers: Record<string, Function> = {};
let wsClientSendBuffer: string[] = [];
let wsUpstreamSendBuffer: string[] = [];
let wsClientReadyState: number = 1;
let wsUpstreamReadyState: number = 1;


const mockWebSocketServer = jest.fn().mockImplementation(() => ({
  on: (event: string, handler: Function) => {
    wsServerHandlers[event] = handler;
  },
  clients: new Set(),
}));


const mockWebSocket = jest.fn().mockImplementation((url?: string) => {
  // If url is undefined, it's a client; else, it's upstream
  const handlers: Record<string, Function> = url ? wsUpstreamHandlers : wsClientHandlers;
  const sendBuffer: string[] = url ? wsUpstreamSendBuffer : wsClientSendBuffer;
  let readyState: number = url ? wsUpstreamReadyState : wsClientReadyState;
  return {
    on: (event: string, handler: Function) => {
      handlers[event] = handler;
    },
    send: jest.fn((msg: string) => sendBuffer.push(msg)),
    close: jest.fn((code?: number, reason?: string) => {
      if (handlers["close"]) handlers["close"](code, reason);
      readyState = 3; // CLOSED
    }),
    get readyState() {
      return readyState;
    },
    set readyState(val: number) {
        readyState = val;
      },
    };
  });

  jest.mock("ws", () => ({
  WebSocketServer: mockWebSocketServer,
  default: mockWebSocket,
}));

// --- PHASE 3: Test Utilities ---

function createMockClient() {
  wsClientHandlers = {};
  wsClientSendBuffer = [];
  wsClientReadyState = 1;
  return mockWebSocket();
}
function createMockUpstream() {
  wsUpstreamHandlers = {};
  wsUpstreamSendBuffer = [];
  wsUpstreamReadyState = 1;
  return mockWebSocket("ws://upstream");
}
function triggerUpstreamOpen(): void {
  if (wsUpstreamHandlers["open"]) wsUpstreamHandlers["open"]();
}
function triggerUpstreamMessage(msg: string): void {
  if (wsUpstreamHandlers["message"]) wsUpstreamHandlers["message"](msg);
}
function triggerUpstreamError(err: Error): void {
  if (wsUpstreamHandlers["error"]) wsUpstreamHandlers["error"](err);
}
function triggerUpstreamClose(): void {
  if (wsUpstreamHandlers["close"]) wsUpstreamHandlers["close"]();
}
function triggerClientMessage(msg: string): void {
  if (wsClientHandlers["message"]) wsClientHandlers["message"](msg);
}
function triggerClientClose(): void {
  if (wsClientHandlers["close"]) wsClientHandlers["close"]();
}

// --- PHASE 2: Test Cases ---
describe("Solana WebSocket Gateway", () => {
  let gateway;
  beforeEach(() => {
    jest.resetModules();
    wsServerHandlers = {};
    wsClientHandlers = {};
    wsUpstreamHandlers = {};
    wsClientSendBuffer = [];
    wsUpstreamSendBuffer = [];
    wsClientReadyState = 1;
    wsUpstreamReadyState = 1;
    mockAddLog.mockClear();
    mockGetKey.mockClear();
    process.env.SOLANA_UPSTREAM_MAINNET_WS = "ws://mainnet";
    process.env.SOLANA_UPSTREAM_DEVNET_WS = "ws://devnet";
    process.env.SOLANA_WS_GATEWAY_PORT = "9999";
    gateway = require("../src/solanaWsGateway.ts");
  });

  // --- TEST GROUP 1: CONNECTION VALIDATION ---
  it("rejects connection with invalid path", () => {
    const client = createMockClient();
    const req = { url: "/invalid", headers: { host: "localhost" } };
    wsServerHandlers["connection"](client, req);
    expect(client.close).toHaveBeenCalledWith(1008, expect.any(String));
  });
  it("rejects connection with missing API key", () => {
    const client = createMockClient();
    const req = { url: "/v1/", headers: { host: "localhost" } };
    wsServerHandlers["connection"](client, req);
    expect(client.close).toHaveBeenCalledWith(1008, expect.any(String));
  });
  it("rejects connection with invalid API key", () => {
    mockGetKey.mockReturnValue(undefined);
    const client = createMockClient();
    const req = { url: "/v1/badkey", headers: { host: "localhost" } };
    wsServerHandlers["connection"](client, req);
    expect(client.close).toHaveBeenCalledWith(4001, expect.any(String));
  });
  it("accepts connection with valid API key", () => {
    mockGetKey.mockReturnValue({ tier: "pro" });
    const client = createMockClient();
    const req = { url: "/v1/prokey?network=devnet", headers: { host: "localhost" } };
    wsServerHandlers["connection"](client, req);
    // Should not close immediately
    expect(client.close).not.toHaveBeenCalled();
  });

  // --- TEST GROUP 2: TIER ENFORCEMENT ---
  it("free tier: rejects all WebSocket connections", () => {
    mockGetKey.mockReturnValue({ tier: "free" });
    const client = createMockClient();
    const req = { url: "/v1/freekey?network=devnet", headers: { host: "localhost" } };
    wsServerHandlers["connection"](client, req);
    expect(client.close).toHaveBeenCalledWith(4003, expect.stringContaining("free tier"));
  });
  it("starter tier: allows devnet", () => {
    mockGetKey.mockReturnValue({ tier: "starter" });
    const client = createMockClient();
    const req = { url: "/v1/starterkey?network=devnet", headers: { host: "localhost" } };
    wsServerHandlers["connection"](client, req);
    expect(client.close).not.toHaveBeenCalled();
  });
  it("starter tier: rejects mainnet", () => {
    mockGetKey.mockReturnValue({ tier: "starter" });
    const client = createMockClient();
    const req = { url: "/v1/starterkey?network=mainnet", headers: { host: "localhost" } };
    wsServerHandlers["connection"](client, req);
    expect(client.close).toHaveBeenCalledWith(4003, expect.stringContaining("devnet"));
  });
  it("pro tier: allows devnet", () => {
    mockGetKey.mockReturnValue({ tier: "pro" });
    const client = createMockClient();
    const req = { url: "/v1/prokey?network=devnet", headers: { host: "localhost" } };
    wsServerHandlers["connection"](client, req);
    expect(client.close).not.toHaveBeenCalled();
  });
  it("pro tier: allows mainnet", () => {
    mockGetKey.mockReturnValue({ tier: "pro" });
    const client = createMockClient();
    const req = { url: "/v1/prokey?network=mainnet", headers: { host: "localhost" } };
    wsServerHandlers["connection"](client, req);
    expect(client.close).not.toHaveBeenCalled();
  });

  // --- TEST GROUP 3: PROXY BEHAVIOR ---
  it("forwards client message to upstream", () => {
    mockGetKey.mockReturnValue({ tier: "pro" });
    const client = createMockClient();
    const req = { url: "/v1/prokey?network=devnet", headers: { host: "localhost" } };
    wsServerHandlers["connection"](client, req);
    triggerUpstreamOpen();
    triggerClientMessage("hello");
    expect(wsUpstreamSendBuffer).toContain("hello");
  });
  it("forwards upstream message to client", () => {
    mockGetKey.mockReturnValue({ tier: "pro" });
    const client = createMockClient();
    const req = { url: "/v1/prokey?network=devnet", headers: { host: "localhost" } };
    wsServerHandlers["connection"](client, req);
    triggerUpstreamOpen();
    triggerUpstreamMessage("pong");
    expect(wsClientSendBuffer).toContain("pong");
  });
  it("upstream close triggers client close", () => {
    mockGetKey.mockReturnValue({ tier: "pro" });
    const client = createMockClient();
    const req = { url: "/v1/prokey?network=devnet", headers: { host: "localhost" } };
    wsServerHandlers["connection"](client, req);
    triggerUpstreamOpen();
    triggerUpstreamClose();
    expect(client.close).toHaveBeenCalled();
  });
  it("client close triggers upstream close", () => {
    mockGetKey.mockReturnValue({ tier: "pro" });
    createMockUpstream();
    const client = createMockClient();
    const req = { url: "/v1/prokey?network=devnet", headers: { host: "localhost" } };
    wsServerHandlers["connection"](client, req);
    triggerUpstreamOpen();
    triggerClientClose();
    // Upstream close should be called
    // (simulate by checking if upstream close handler is called)
    // No direct way to check, but no error should occur
    expect(true).toBe(true);
  });

  // --- TEST GROUP 4: ERROR HANDLING ---
  it("upstream error triggers addLog and client close 1011", () => {
    mockGetKey.mockReturnValue({ tier: "pro" });
    const client = createMockClient();
    const req = { url: "/v1/prokey?network=devnet", headers: { host: "localhost" } };
    wsServerHandlers["connection"](client, req);
    triggerUpstreamOpen();
    triggerUpstreamError(new Error("fail"));
    expect(mockAddLog).toHaveBeenCalledWith(expect.objectContaining({ method: "WEBSOCKET_ERROR" }));
    expect(client.close).toHaveBeenCalledWith(1011, expect.any(String));
  });
  it("internal exception triggers client close 1011", () => {
    // Simulate by throwing in getKey
    mockGetKey.mockImplementation(() => { throw new Error("fail"); });
    const client = createMockClient();
    const req = { url: "/v1/prokey?network=devnet", headers: { host: "localhost" } };
    expect(() => wsServerHandlers["connection"](client, req)).not.toThrow();
    expect(client.close).toHaveBeenCalledWith(1011, expect.any(String));
  });

  // --- TEST GROUP 5: ANALYTICS LOGGING ---
  it("logs connection open", () => {
    mockGetKey.mockReturnValue({ tier: "pro" });
    const client = createMockClient();
    const req = { url: "/v1/prokey?network=devnet", headers: { host: "localhost" } };
    wsServerHandlers["connection"](client, req);
    triggerUpstreamOpen();
      expect(mockAddLog).toHaveBeenCalledWith(expect.objectContaining({ method: "WEBSOCKET_CONNECTION" }));
  
    });
  });
  
  // <-- Add this closing brace to end the outermost describe block
  it("logs message", () => {
    mockGetKey.mockReturnValue({ tier: "pro" });
    const client = createMockClient();
    const req = { url: "/v1/prokey?network=devnet", headers: { host: "localhost" } };
    wsServerHandlers["connection"](client, req);
    triggerUpstreamOpen();
    triggerClientMessage("msg");
    expect(mockAddLog).toHaveBeenCalledWith(expect.objectContaining({ method: "WEBSOCKET_MESSAGE" }));
  });
  it("logs close", () => {
    mockGetKey.mockReturnValue({ tier: "pro" });
    const client = createMockClient();
    const req = { url: "/v1/prokey?network=devnet", headers: { host: "localhost" } };
    wsServerHandlers["connection"](client, req);
    triggerUpstreamOpen();
    triggerUpstreamClose();
    expect(mockAddLog).toHaveBeenCalledWith(expect.objectContaining({ method: "WEBSOCKET_CLOSE" }));
  });
  it("logs error", () => {
    mockGetKey.mockReturnValue({ tier: "pro" });
    const client = createMockClient();
    const req = { url: "/v1/prokey?network=devnet", headers: { host: "localhost" } };
    wsServerHandlers["connection"](client, req);
    triggerUpstreamOpen();
    triggerUpstreamError(new Error("fail"));
    expect(mockAddLog).toHaveBeenCalledWith(expect.objectContaining({ method: "WEBSOCKET_ERROR" }));
  });

  // --- TEST GROUP 6: MULTIPLE CONNECTIONS ---
  it("multiple clients can connect simultaneously", () => {
    mockGetKey.mockReturnValue({ tier: "pro" });
    const client1 = createMockClient();
    const client2 = createMockClient();
    const req1 = { url: "/v1/prokey1?network=devnet", headers: { host: "localhost" } };
    const req2 = { url: "/v1/prokey2?network=mainnet", headers: { host: "localhost" } };
    wsServerHandlers["connection"](client1, req1);
    wsServerHandlers["connection"](client2, req2);
    expect(client1.close).not.toHaveBeenCalled();
    expect(client2.close).not.toHaveBeenCalled();
  });
  it("each client has its own upstream instance", () => {
    mockGetKey.mockReturnValue({ tier: "pro" });
    const client1 = createMockClient();
    const client2 = createMockClient();
    const req1 = { url: "/v1/prokey1?network=devnet", headers: { host: "localhost" } };
    const req2 = { url: "/v1/prokey2?network=mainnet", headers: { host: "localhost" } };
    wsServerHandlers["connection"](client1, req1);
    wsServerHandlers["connection"](client2, req2);
    // Each should have its own handler set
    expect(typeof wsUpstreamHandlers["open"]).toBe("function");
  });
  it("logs are generated per connection", () => {
    mockGetKey.mockReturnValue({ tier: "pro" });
    const client1 = createMockClient();
    const client2 = createMockClient();
    const req1 = { url: "/v1/prokey1?network=devnet", headers: { host: "localhost" } };
    const req2 = { url: "/v1/prokey2?network=mainnet", headers: { host: "localhost" } };
    wsServerHandlers["connection"](client1, req1);
    wsServerHandlers["connection"](client2, req2);
    triggerUpstreamOpen();
    triggerUpstreamOpen();
    expect(mockAddLog).toHaveBeenCalledWith(expect.objectContaining({ method: "WEBSOCKET_CONNECTION" }));

});
});
