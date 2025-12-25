#!/usr/bin/env node
/**
 * Alchemy Extension CLI Tool
 * 
 * A command-line interface for interacting with Alchemy services
 * and managing smart wallet operations.
 */

/* eslint-disable @typescript-eslint/no-unused-vars */

import { Alchemy, Network, Utils } from "alchemy-sdk";
import { createPublicClient, http, formatEther, parseEther } from "viem";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { exec } from "child_process";
import { promisify } from "util";
import { WebSocket } from "ws";

const execAsync = promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env.local
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const env = fs.readFileSync(envPath, "utf8");
  env.split("\n").forEach((line) => {
    const [key, ...valueParts] = line.split("=");
    if (key && valueParts.length > 0) {
      const value = valueParts.join("=").trim();
      process.env[key.trim()] = value;
    }
  });
}

// Session storage path
const sessionPath = path.resolve(process.cwd(), ".alchemy-session.json");

// Network configuration
const NETWORKS = {
  "eth-mainnet": Network.ETH_MAINNET,
  "eth-sepolia": Network.ETH_SEPOLIA,
  "base-mainnet": Network.BASE_MAINNET,
  "base-sepolia": Network.BASE_SEPOLIA,
  "polygon-mainnet": Network.MATIC_MAINNET,
  "polygon-amoy": Network.MATIC_AMOY,
  "arbitrum-mainnet": Network.ARB_MAINNET,
  "arbitrum-sepolia": Network.ARB_SEPOLIA,
  "optimism-mainnet": Network.OPT_MAINNET,
  "optimism-sepolia": Network.OPT_SEPOLIA,
};

class AlchemyCLI {
  constructor() {
    this.apiKey = process.env.ALCHEMY_DATA_API_KEY || process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
    if (!this.apiKey) {
      console.error("❌ Error: ALCHEMY_DATA_API_KEY or NEXT_PUBLIC_ALCHEMY_API_KEY not found in environment");
      process.exit(1);
    }
    this.loadSession();
  }

  // Load session data
  loadSession() {
    try {
      if (fs.existsSync(sessionPath)) {
        const data = fs.readFileSync(sessionPath, "utf8");
        this.session = JSON.parse(data);
      } else {
        this.session = { loggedIn: false };
      }
    } catch (error) {
      this.session = { loggedIn: false };
    }
  }

  // Save session data
  saveSession() {
    try {
      fs.writeFileSync(sessionPath, JSON.stringify(this.session, null, 2));
    } catch (error) {
      console.error("❌ Error saving session:", error.message);
    }
  }

  // Open URL in browser
  async openBrowser(url) {
    const platform = process.platform;
    let command;

    // Check for $BROWSER environment variable (common in dev containers)
    if (process.env.BROWSER) {
      command = `"${process.env.BROWSER}" "${url}"`;
    } else if (platform === "darwin") {
      command = `open "${url}"`;
    } else if (platform === "win32") {
      command = `start "${url}"`;
    } else {
      // Linux/Unix
      command = `xdg-open "${url}" || sensible-browser "${url}" || x-www-browser "${url}"`;
    }

    try {
      await execAsync(command);
      return true;
    } catch (error) {
      console.error(`Could not open browser automatically: ${error.message}`);
      console.log(`\nPlease open this URL manually: ${url}`);
      return false;
    }
  }

  // Login to Alchemy Dashboard
  async login() {
    console.log("\n🔐 Alchemy Dashboard Login\n");
    console.log("Opening Alchemy Dashboard in your browser...\n");

    const dashboardUrl = "https://dashboard.alchemy.com/";
    
    // Store login timestamp
    this.session = {
      loggedIn: true,
      timestamp: new Date().toISOString(),
      apiKey: this.apiKey.substring(0, 8) + "...", // Store partial key for reference
    };
    this.saveSession();

    await this.openBrowser(dashboardUrl);

    console.log("✅ Dashboard opened successfully!");
    console.log("\nAfter logging in, you can:");
    console.log("   • View your apps and API keys");
    console.log("   • Monitor API usage and analytics");
    console.log("   • Manage webhooks and notifications");
    console.log("   • Access documentation and support\n");
    console.log("💡 Tip: Use 'npm run alchemy status' to check your session\n");
  }

  // Logout from Alchemy
  async logout() {
    console.log("\n👋 Logging out from Alchemy Dashboard...\n");
    
    if (fs.existsSync(sessionPath)) {
      fs.unlinkSync(sessionPath);
      this.session = { loggedIn: false };
      console.log("✅ Successfully logged out\n");
    } else {
      console.log("ℹ️  No active session found\n");
    }
  }

  // Show session status
  async status() {
    console.log("\n📊 Alchemy CLI Status\n");
    console.log("─".repeat(60));
    
    // API Key status
    if (this.apiKey) {
      const maskedKey = this.apiKey.substring(0, 8) + "..." + this.apiKey.slice(-4);
      console.log(`   API Key: ${maskedKey}`);
      console.log("   ✅ API Key configured\n");
    } else {
      console.log("   ❌ API Key not found\n");
    }

    // Session status
    if (this.session.loggedIn) {
      console.log("   Dashboard: Logged in");
      console.log(`   Session started: ${new Date(this.session.timestamp).toLocaleString()}\n`);
    } else {
      console.log("   Dashboard: Not logged in");
      console.log("   Use 'npm run alchemy login' to login\n");
    }

    // Test API connectivity
    console.log("   Testing API connectivity...");
    try {
      const alchemy = this.getAlchemy("base-mainnet");
      await alchemy.core.getBlockNumber();
      console.log("   ✅ API connection successful\n");
    } catch (error) {
      console.log("   ❌ API connection failed:", error.message, "\n");
    }

    console.log("─".repeat(60) + "\n");
  }

  // Open specific dashboard pages
  async openDashboard(page = "") {
    const pages = {
      apps: "https://dashboard.alchemy.com/apps",
      analytics: "https://dashboard.alchemy.com/analytics",
      webhooks: "https://dashboard.alchemy.com/webhooks",
      notify: "https://dashboard.alchemy.com/notify",
      billing: "https://dashboard.alchemy.com/settings/billing",
      settings: "https://dashboard.alchemy.com/settings",
      docs: "https://docs.alchemy.com/",
      support: "https://dashboard.alchemy.com/support",
    };

    const url = pages[page] || "https://dashboard.alchemy.com/";
    
    console.log(`\n🌐 Opening Alchemy ${page ? page.charAt(0).toUpperCase() + page.slice(1) : "Dashboard"}...\n`);
    await this.openBrowser(url);
    console.log("✅ Browser opened successfully\n");
  }

  // Get API usage stats (using SDK capabilities)
  async getApiUsage(network = "base-mainnet") {
    console.log("\n📈 API Usage Information\n");
    console.log("─".repeat(60));
    console.log(`   Network: ${network}`);
    console.log(`   API Key: ${this.apiKey.substring(0, 8)}...${this.apiKey.slice(-4)}\n`);
    
    console.log("   Testing API with sample requests...\n");
    
    const alchemy = this.getAlchemy(network);
    
    try {
      const startTime = Date.now();
      
      // Test 1: Get block number
      const blockNumber = await alchemy.core.getBlockNumber();
      const time1 = Date.now() - startTime;
      console.log(`   ✅ getBlockNumber(): ${blockNumber} (${time1}ms)`);
      
      // Test 2: Get gas price
      const gasPrice = await alchemy.core.getGasPrice();
      const time2 = Date.now() - startTime - time1;
      console.log(`   ✅ getGasPrice(): ${Utils.formatUnits(gasPrice, "gwei")} Gwei (${time2}ms)`);
      
      console.log("\n   ✅ API is functioning correctly");
      console.log("\n   📊 For detailed usage statistics, visit:");
      console.log("      https://dashboard.alchemy.com/analytics\n");
      
    } catch (error) {
      console.error("   ❌ API test failed:", error.message, "\n");
    }
    
    console.log("─".repeat(60) + "\n");
  }

  // Check rollup status
  async checkRollupStatus(uuid) {
    if (!uuid) {
      console.error("❌ Error: Rollup UUID required");
      console.log("Usage: node scripts/alchemy-cli.mjs rollup:status --uuid <ROLLUP_UUID>");
      process.exit(1);
    }

    console.log("\n🔍 Checking Rollup Status\n");
    console.log("═".repeat(60));
    console.log(`   Rollup UUID: ${uuid}\n`);

    const results = {
      sequencer: "checking",
      rpc: "checking",
      ws: "checking",
      explorer: "checking",
    };

    // Try both rollup and devnet URLs
    const rpcUrlStandard = `https://rollup.alchemy.com/${uuid}`;
    const rpcUrlDevnet = `https://rpc.devnet.alchemy.com/${uuid}`;
    const wsUrlStandard = `wss://rollup.alchemy.com/${uuid}`;
    const wsUrlDevnet = `wss://ws.devnet.alchemy.com/${uuid}`;
    const explorerUrlStandard = `https://explorer.rollup.alchemy.com/${uuid}`;
    const explorerUrlDevnet = `https://explorer-${uuid.split('-').pop()}.devnet.alchemy.com/`;

    let rpcUrl = rpcUrlStandard;
    let wsUrl = wsUrlStandard;
    let explorerUrl = explorerUrlStandard;
    let isDevnet = false;

    // First, try to detect if it's a devnet rollup by testing RPC
    console.log("   🔍 Detecting rollup type...");
    try {
      const testDevnet = await fetch(rpcUrlDevnet, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "eth_chainId",
          params: [],
          id: 1,
        }),
      });

      if (testDevnet.ok) {
        isDevnet = true;
        rpcUrl = rpcUrlDevnet;
        wsUrl = wsUrlDevnet;
        explorerUrl = explorerUrlDevnet;
        console.log("   ✅ Detected: Devnet Rollup\n");
      } else {
        console.log("   ✅ Detected: Standard Rollup\n");
      }
    } catch {
      console.log("   ✅ Detected: Standard Rollup\n");
    }

    console.log("   RPC URL:", rpcUrl);
    console.log("   WS URL:", wsUrl);
    console.log("   Explorer URL:", explorerUrl);
    console.log("\n" + "─".repeat(60) + "\n");

    // 1. Check RPC health with eth_chainId
    console.log("   📡 Testing RPC endpoint...");
    try {
      const rpcResponse = await fetch(rpcUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "eth_chainId",
          params: [],
          id: 1,
        }),
      });

      if (rpcResponse.ok) {
        const data = await rpcResponse.json();
        if (data.result) {
          results.rpc = "OK";
          const chainId = parseInt(data.result, 16);
          console.log(`   ✅ RPC: OK (Chain ID: ${chainId})`);
          results.sequencer = "online";
        } else {
          results.rpc = "error";
          console.log(`   ⚠️  RPC: Responded but no result`);
        }
      } else {
        results.rpc = rpcResponse.status.toString();
        console.log(`   ❌ RPC: ${rpcResponse.status} ${rpcResponse.statusText}`);
        results.sequencer = "offline";
      }
    } catch (error) {
      results.rpc = "error";
      results.sequencer = "offline";
      console.log(`   ❌ RPC: ${error.message}`);
    }

    // 2. Check WebSocket health
    console.log("   🔌 Testing WebSocket endpoint...");
    try {
      await new Promise((resolve, reject) => {
        const ws = new WebSocket(wsUrl);
        const timeout = setTimeout(() => {
          ws.close();
          reject(new Error("Connection timeout"));
        }, 5000);

        ws.on("open", () => {
          clearTimeout(timeout);
          results.ws = "OK";
          console.log("   ✅ WebSocket: OK");
          ws.close();
          resolve();
        });

        ws.on("error", (error) => {
          clearTimeout(timeout);
          reject(error);
        });
      });
    } catch (error) {
      results.ws = "failed";
      console.log(`   ❌ WebSocket: ${error.message}`);
    }

    // 3. Check Explorer health
    console.log("   🔎 Testing Explorer endpoint...");
    try {
      const explorerResponse = await fetch(explorerUrl, {
        method: "HEAD",
      });

      if (explorerResponse.ok || explorerResponse.status === 200 || explorerResponse.status === 301 || explorerResponse.status === 302) {
        results.explorer = "OK";
        console.log(`   ✅ Explorer: OK (${explorerResponse.status})`);
      } else {
        results.explorer = `${explorerResponse.status}`;
        console.log(`   ⚠️  Explorer: ${explorerResponse.status} ${explorerResponse.statusText}`);
      }
    } catch (error) {
      results.explorer = "failed";
      console.log(`   ❌ Explorer: ${error.message}`);
    }

    // Display summary table
    console.log("\n" + "═".repeat(60));
    console.log("   ROLLUP STATUS SUMMARY");
    console.log("═".repeat(60) + "\n");

    const getStatusIcon = (status) => {
      if (status === "OK" || status === "online") return "✅";
      if (status === "checking") return "⏳";
      return "❌";
    };

    console.log(`   ${getStatusIcon(results.sequencer)} Sequencer: ${results.sequencer.toUpperCase()}`);
    console.log(`   ${getStatusIcon(results.rpc)} RPC: ${results.rpc}`);
    console.log(`   ${getStatusIcon(results.ws)} WebSocket: ${results.ws}`);
    console.log(`   ${getStatusIcon(results.explorer)} Explorer: ${results.explorer}`);

    console.log("\n" + "═".repeat(60) + "\n");

    // Overall health
    const allOk = results.sequencer === "online" && results.rpc === "OK" && results.ws === "OK" && results.explorer === "OK";
    if (allOk) {
      console.log("   ✨ All systems operational!\n");
    } else {
      console.log("   ⚠️  Some systems are experiencing issues.\n");
    }

    return results;
  }

  // Restart rollup
  async restartRollup(uuid) {
    if (!uuid) {
      console.error("❌ Error: Rollup UUID required");
      console.log("Usage: node scripts/alchemy-cli.mjs rollup:restart --uuid <ROLLUP_UUID>");
      process.exit(1);
    }

    console.log("\n🔄 Attempting to Restart Rollup\n");
    console.log("═".repeat(60));
    console.log(`   Rollup UUID: ${uuid}\n`);

    // Check if restart API endpoint exists
    // Note: As of now, Alchemy doesn't expose a public restart API endpoint
    // This would need to be updated if they add one in the future
    const restartEndpoint = `https://api.alchemy.com/v1/rollup/${uuid}/restart`;
    
    console.log("   🔍 Checking restart API availability...");
    
    try {
      // Attempt to call restart API (this may not exist)
      const response = await fetch(restartEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.apiKey}`,
        },
      });

      if (response.ok) {
        console.log("   ✅ Restart request sent successfully!");
        console.log("   ⏳ Rollup is restarting...\n");
      } else if (response.status === 404 || response.status === 405) {
        // API endpoint doesn't exist
        console.log("   ℹ️  Restart API endpoint not available\n");
        console.log("   📋 Restart is not available for this rollup type.");
        console.log("   🌐 Please use the Alchemy Dashboard support panel:\n");
        console.log("      https://dashboard.alchemy.com/support\n");
      } else {
        console.log(`   ⚠️  Restart request failed: ${response.status} ${response.statusText}\n`);
      }
    } catch (error) {
      // Network error or endpoint doesn't exist
      console.log("   ℹ️  Unable to access restart API\n");
      console.log("   📋 Restart is not available for this rollup type.");
      console.log("   🌐 Please use the Alchemy Dashboard support panel:\n");
      console.log("      https://dashboard.alchemy.com/support\n");
    }

    console.log("═".repeat(60) + "\n");
    console.log("   🔍 Checking rollup status after restart attempt...\n");

    // Automatically check rollup status after restart attempt
    await this.checkRollupStatus(uuid);
  }

  getAlchemy(network = "base-mainnet") {
    return new Alchemy({
      apiKey: this.apiKey,
      network: NETWORKS[network] || Network.BASE_MAINNET,
    });
  }

  // Get account balance
  async getBalance(address, network = "base-mainnet") {
    const alchemy = this.getAlchemy(network);
    try {
      const balance = await alchemy.core.getBalance(address);
      const balanceInEth = Utils.formatEther(balance);
      console.log(`\n💰 Balance for ${address} on ${network}:`);
      console.log(`   ${balanceInEth} ETH`);
      console.log(`   ${balance.toString()} wei\n`);
      return balance;
    } catch (error) {
      console.error(`❌ Error fetching balance:`, error.message);
    }
  }

  // Get token balances
  async getTokenBalances(address, network = "base-mainnet") {
    const alchemy = this.getAlchemy(network);
    try {
      console.log(`\n🪙 Fetching token balances for ${address} on ${network}...`);
      const balances = await alchemy.core.getTokenBalances(address);
      
      if (balances.tokenBalances.length === 0) {
        console.log("   No tokens found.\n");
        return;
      }

      console.log(`\n   Found ${balances.tokenBalances.length} tokens:\n`);
      
      for (const token of balances.tokenBalances) {
        if (token.tokenBalance && token.tokenBalance !== "0") {
          const metadata = await alchemy.core.getTokenMetadata(token.contractAddress);
          const balance = parseInt(token.tokenBalance, 16);
          const decimals = metadata.decimals || 18;
          const formattedBalance = (balance / Math.pow(10, decimals)).toFixed(4);
          
          console.log(`   📌 ${metadata.name || "Unknown"} (${metadata.symbol || "?"})`);
          console.log(`      Balance: ${formattedBalance}`);
          console.log(`      Contract: ${token.contractAddress}\n`);
        }
      }
    } catch (error) {
      console.error(`❌ Error fetching token balances:`, error.message);
    }
  }

  // Get NFTs owned by address
  async getNFTs(address, network = "base-mainnet") {
    const alchemy = this.getAlchemy(network);
    try {
      console.log(`\n🖼️  Fetching NFTs for ${address} on ${network}...`);
      const nfts = await alchemy.nft.getNftsForOwner(address);
      
      if (nfts.ownedNfts.length === 0) {
        console.log("   No NFTs found.\n");
        return;
      }

      console.log(`\n   Found ${nfts.ownedNfts.length} NFTs:\n`);
      
      nfts.ownedNfts.slice(0, 10).forEach((nft, index) => {
        console.log(`   ${index + 1}. ${nft.contract.name || "Unknown Collection"}`);
        console.log(`      Token ID: ${nft.tokenId}`);
        console.log(`      Type: ${nft.tokenType}`);
        if (nft.description) {
          console.log(`      Description: ${nft.description.slice(0, 100)}...`);
        }
        console.log(`      Contract: ${nft.contract.address}\n`);
      });

      if (nfts.ownedNfts.length > 10) {
        console.log(`   ... and ${nfts.ownedNfts.length - 10} more NFTs\n`);
      }
    } catch (error) {
      console.error(`❌ Error fetching NFTs:`, error.message);
    }
  }

  // Get transaction history
  async getTransactionHistory(address, network = "base-mainnet") {
    const alchemy = this.getAlchemy(network);
    try {
      console.log(`\n📜 Fetching transaction history for ${address} on ${network}...`);
      const history = await alchemy.core.getAssetTransfers({
        fromAddress: address,
        category: ["external", "internal", "erc20", "erc721", "erc1155"],
        maxCount: 10,
        order: "desc",
      });

      if (history.transfers.length === 0) {
        console.log("   No transactions found.\n");
        return;
      }

      console.log(`\n   Recent transactions:\n`);
      
      history.transfers.forEach((tx, index) => {
        console.log(`   ${index + 1}. ${tx.category.toUpperCase()} Transaction`);
        console.log(`      From: ${tx.from}`);
        console.log(`      To: ${tx.to || "Contract Creation"}`);
        if (tx.value) {
          console.log(`      Value: ${tx.value} ${tx.asset || "ETH"}`);
        }
        console.log(`      Hash: ${tx.hash}`);
        console.log(`      Block: ${tx.blockNum}\n`);
      });
    } catch (error) {
      console.error(`❌ Error fetching transaction history:`, error.message);
    }
  }

  // Get block information
  async getBlock(blockNumber = "latest", network = "base-mainnet") {
    const alchemy = this.getAlchemy(network);
    try {
      console.log(`\n🔷 Fetching block information for block ${blockNumber} on ${network}...`);
      const block = await alchemy.core.getBlock(blockNumber);
      
      console.log(`\n   Block Number: ${block.number}`);
      console.log(`   Hash: ${block.hash}`);
      console.log(`   Timestamp: ${new Date(block.timestamp * 1000).toISOString()}`);
      console.log(`   Transactions: ${block.transactions.length}`);
      console.log(`   Gas Used: ${block.gasUsed.toString()}`);
      console.log(`   Gas Limit: ${block.gasLimit.toString()}`);
      console.log(`   Miner: ${block.miner}\n`);
    } catch (error) {
      console.error(`❌ Error fetching block:`, error.message);
    }
  }

  // Get gas price
  async getGasPrice(network = "base-mainnet") {
    const alchemy = this.getAlchemy(network);
    try {
      console.log(`\n⛽ Fetching gas price for ${network}...`);
      const gasPrice = await alchemy.core.getGasPrice();
      const gasPriceInGwei = parseFloat(Utils.formatUnits(gasPrice, "gwei")).toFixed(2);
      
      console.log(`\n   Current Gas Price: ${gasPriceInGwei} Gwei`);
      console.log(`   In Wei: ${gasPrice.toString()}\n`);
    } catch (error) {
      console.error(`❌ Error fetching gas price:`, error.message);
    }
  }

  // Listen to pending transactions (WebSocket)
  async watchPendingTransactions(network = "base-mainnet") {
    const alchemy = this.getAlchemy(network);
    console.log(`\n👁️  Watching pending transactions on ${network}...`);
    console.log("   Press Ctrl+C to stop\n");

    alchemy.ws.on(
      {
        method: "alchemy_pendingTransactions",
        toAddress: [],
        hashesOnly: false,
      },
      (tx) => {
        console.log(`   📨 New pending transaction: ${tx.hash}`);
        console.log(`      From: ${tx.from}`);
        console.log(`      To: ${tx.to || "Contract Creation"}`);
        if (tx.value) {
          console.log(`      Value: ${Utils.formatEther(tx.value)} ETH`);
        }
        console.log();
      }
    );
  }

  // Get contract metadata
  async getContractMetadata(contractAddress, network = "base-mainnet") {
    const alchemy = this.getAlchemy(network);
    try {
      console.log(`\n📋 Fetching contract metadata for ${contractAddress} on ${network}...`);
      
      // Try to get token metadata first
      try {
        const metadata = await alchemy.core.getTokenMetadata(contractAddress);
        console.log(`\n   Token Information:`);
        console.log(`   Name: ${metadata.name || "Unknown"}`);
        console.log(`   Symbol: ${metadata.symbol || "Unknown"}`);
        console.log(`   Decimals: ${metadata.decimals || "N/A"}`);
        console.log(`   Total Supply: ${metadata.totalSupply || "N/A"}\n`);
      } catch (e) {
        // Not a token contract, get basic info
        const code = await alchemy.core.getCode(contractAddress);
        console.log(`\n   Contract Code Length: ${code.length} characters`);
        console.log(`   Is Contract: ${code !== "0x"}\n`);
      }
    } catch (error) {
      console.error(`❌ Error fetching contract metadata:`, error.message);
    }
  }

  // Show available networks
  showNetworks() {
    console.log("\n🌐 Available Networks:\n");
    Object.keys(NETWORKS).forEach((network) => {
      console.log(`   • ${network}`);
    });
    console.log();
  }

  // Show help
  showHelp() {
    console.log(`
╔═══════════════════════════════════════════════════════════════╗
║           Alchemy Extension CLI for MARZ Smart Wallet         ║
╚═══════════════════════════════════════════════════════════════╝

USAGE:
  node scripts/alchemy-cli.mjs <command> [options]

DASHBOARD COMMANDS:
  login                               Login to Alchemy Dashboard
  logout                              Logout from Alchemy Dashboard
  status                              Show API and session status
  dashboard [page]                    Open dashboard page (apps, analytics, webhooks, etc.)
  usage [network]                     Test API and show usage info

ROLLUP COMMANDS:
  rollup:status --uuid <UUID>         Check rollup health status (RPC, WS, Explorer)
  rollup:restart --uuid <UUID>        Restart rollup and check status

BLOCKCHAIN COMMANDS:
  balance <address> [network]         Get ETH balance for an address
  tokens <address> [network]          Get token balances for an address
  nfts <address> [network]            Get NFTs owned by an address
  history <address> [network]         Get transaction history
  block [blockNumber] [network]       Get block information (default: latest)
  gas [network]                       Get current gas price
  watch [network]                     Watch pending transactions (WebSocket)
  contract <address> [network]        Get contract metadata

UTILITY COMMANDS:
  networks                            List available networks
  help                                Show this help message

DASHBOARD PAGES:
  apps        - Manage your Alchemy apps
  analytics   - View usage analytics
  webhooks    - Configure webhooks
  notify      - Set up notifications
  billing     - Manage billing settings
  settings    - Account settings
  docs        - Documentation
  support     - Get support

NETWORKS:
  Default network is 'base-mainnet'. Use 'networks' command to see all.
  Examples: eth-mainnet, base-sepolia, polygon-mainnet, arbitrum-mainnet

EXAMPLES:
  node scripts/alchemy-cli.mjs login
  node scripts/alchemy-cli.mjs status
  node scripts/alchemy-cli.mjs dashboard analytics
  node scripts/alchemy-cli.mjs usage base-mainnet
  node scripts/alchemy-cli.mjs rollup:status --uuid your-rollup-uuid
  node scripts/alchemy-cli.mjs rollup:restart --uuid your-rollup-uuid
  node scripts/alchemy-cli.mjs balance 0x123... base-mainnet
  node scripts/alchemy-cli.mjs tokens 0x123...
  node scripts/alchemy-cli.mjs nfts 0x123... eth-mainnet
  node scripts/alchemy-cli.mjs gas base-mainnet

ENVIRONMENT:
  Requires ALCHEMY_DATA_API_KEY or NEXT_PUBLIC_ALCHEMY_API_KEY in .env.local

`);
  }
}

// Main CLI handler
async function main() {
  const cli = new AlchemyCLI();
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command || command === "help") {
    cli.showHelp();
    return;
  }

  switch (command) {
    case "login":
      await cli.login();
      break;

    case "logout":
      await cli.logout();
      break;

    case "status":
      await cli.status();
      break;

    case "dashboard":
      await cli.openDashboard(args[1]);
      break;

    case "usage":
      await cli.getApiUsage(args[1]);
      break;

    case "rollup:status":
      // Parse --uuid flag
      const uuidIndex = args.indexOf("--uuid");
      if (uuidIndex === -1 || !args[uuidIndex + 1]) {
        console.error("❌ Error: --uuid flag required");
        console.log("Usage: node scripts/alchemy-cli.mjs rollup:status --uuid <ROLLUP_UUID>");
        process.exit(1);
      }
      await cli.checkRollupStatus(args[uuidIndex + 1]);
      break;

    case "rollup:restart":
      // Parse --uuid flag
      const restartUuidIndex = args.indexOf("--uuid");
      if (restartUuidIndex === -1 || !args[restartUuidIndex + 1]) {
        console.error("❌ Error: --uuid flag required");
        console.log("Usage: node scripts/alchemy-cli.mjs rollup:restart --uuid <ROLLUP_UUID>");
        process.exit(1);
      }
      await cli.restartRollup(args[restartUuidIndex + 1]);
      break;

    case "balance":
      if (!args[1]) {
        console.error("❌ Error: Address required");
        console.log("Usage: node scripts/alchemy-cli.mjs balance <address> [network]");
        process.exit(1);
      }
      await cli.getBalance(args[1], args[2]);
      break;

    case "tokens":
      if (!args[1]) {
        console.error("❌ Error: Address required");
        console.log("Usage: node scripts/alchemy-cli.mjs tokens <address> [network]");
        process.exit(1);
      }
      await cli.getTokenBalances(args[1], args[2]);
      break;

    case "nfts":
      if (!args[1]) {
        console.error("❌ Error: Address required");
        console.log("Usage: node scripts/alchemy-cli.mjs nfts <address> [network]");
        process.exit(1);
      }
      await cli.getNFTs(args[1], args[2]);
      break;

    case "history":
      if (!args[1]) {
        console.error("❌ Error: Address required");
        console.log("Usage: node scripts/alchemy-cli.mjs history <address> [network]");
        process.exit(1);
      }
      await cli.getTransactionHistory(args[1], args[2]);
      break;

    case "block":
      await cli.getBlock(args[1] || "latest", args[2]);
      break;

    case "gas":
      await cli.getGasPrice(args[1]);
      break;

    case "watch":
      await cli.watchPendingTransactions(args[1]);
      break;

    case "contract":
      if (!args[1]) {
        console.error("❌ Error: Contract address required");
        console.log("Usage: node scripts/alchemy-cli.mjs contract <address> [network]");
        process.exit(1);
      }
      await cli.getContractMetadata(args[1], args[2]);
      break;

    case "networks":
      cli.showNetworks();
      break;

    default:
      console.error(`❌ Unknown command: ${command}`);
      cli.showHelp();
      process.exit(1);
  }
}

main().catch((error) => {
  console.error("❌ Fatal error:", error);
  process.exit(1);
});
