import { WebSocketServer, WebSocket } from "ws";
import { getKey } from "./lib/solanaApiKeyStore";
import { addLog } from "./lib/solanaAnalyticsStore";

const PORT = parseInt(process.env.SOLANA_WS_GATEWAY_PORT || "8081");
const UPSTREAMS = {
  devnet: process.env.SOLANA_UPSTREAM_DEVNET_WS!,
  mainnet: process.env.SOLANA_UPSTREAM_MAINNET_WS!,
};

const wss = new WebSocketServer({ port: PORT });

console.log(`[SolanaWS] Gateway listening on port ${PORT}`);

wss.on("connection", (client, req) => {
  import type { IncomingMessage } from "http";
  try {
    const url = new URL(req.url || "", `ws://${req.headers.host}`);
    const pathParts = url.pathname.split("/").filter(Boolean);
    if (pathParts.length < 2 || pathParts[0] !== "v1") {
      client.close(1008, "Invalid URL format");
      return;
    }
    const apiKey = pathParts[1];
    const network = url.searchParams.get("network") === "mainnet" ? "mainnet" : "devnet";
    const keyObj = getKey(apiKey);
    if (!keyObj) {
      client.close(4001, "Invalid API key");
      return;
    }
    if (keyObj.tier === "free") {
      client.close(4003, "WebSocket not available on free tier");
      return;
    }
    if (keyObj.tier === "starter" && network !== "devnet") {
      client.close(4003, "Starter tier only supports devnet");
      return;
    }
    const upstreamUrl = UPSTREAMS[network];
    if (!upstreamUrl) {
      client.close(4002, "Invalid network");
      return;
    }
    const upstream = new WebSocket(upstreamUrl);
    let open = false;
    upstream.on("open", () => {
      open = true;
      addLog({ key: apiKey, timestamp: Date.now(), method: "WEBSOCKET_CONNECTION", network, success: true, durationMs: 0 });
    });
    upstream.on("message", (data) => {
      if (client.readyState === client.OPEN) {
        client.send(data);
      }
    });
    upstream.on("close", () => {
      if (client.readyState === client.OPEN) client.close();
      addLog({ key: apiKey, timestamp: Date.now(), method: "WEBSOCKET_CLOSE", network, success: true, durationMs: 0 });
    });
    upstream.on("error", (err) => {
      addLog({ key: apiKey, timestamp: Date.now(), method: "WEBSOCKET_ERROR", network, success: false, durationMs: 0 });
      if (client.readyState === client.OPEN) client.close(1011, "Upstream error");
    });
    client.on("message", (data) => {
      if (open && upstream.readyState === upstream.OPEN) {
        upstream.send(data);
        addLog({ key: apiKey, timestamp: Date.now(), method: "WEBSOCKET_MESSAGE", network, success: true, durationMs: 0 });
      }
    });
    client.on("close", () => {
      if (upstream.readyState === upstream.OPEN) upstream.close();
      addLog({ key: apiKey, timestamp: Date.now(), method: "WEBSOCKET_CLOSE", network, success: true, durationMs: 0 });
    });
    client.on("error", (err) => {
      addLog({ key: apiKey, timestamp: Date.now(), method: "WEBSOCKET_ERROR", network, success: false, durationMs: 0 });
    });
  } catch (err) {
    client.close(1011, "Internal error");
  }
});
