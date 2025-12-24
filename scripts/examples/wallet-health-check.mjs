#!/usr/bin/env node
/**
 * Example: Wallet Health Check
 * 
 * This script demonstrates how to use the Alchemy CLI programmatically
 * to perform a comprehensive wallet health check.
 */

import { Alchemy, Network, Utils } from "alchemy-sdk";
import * as fs from "fs";
import * as path from "path";

// Load environment variables
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

const WALLET_ADDRESS = process.argv[2];
const NETWORK = process.argv[3] || "base-mainnet";

if (!WALLET_ADDRESS) {
  console.error("Usage: node scripts/examples/wallet-health-check.mjs <wallet-address> [network]");
  process.exit(1);
}

const apiKey = process.env.ALCHEMY_DATA_API_KEY || process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
if (!apiKey) {
  console.error("❌ Error: Alchemy API key not found");
  process.exit(1);
}

const networkMap = {
  "base-mainnet": Network.BASE_MAINNET,
  "eth-mainnet": Network.ETH_MAINNET,
  "polygon-mainnet": Network.MATIC_MAINNET,
};

const alchemy = new Alchemy({
  apiKey,
  network: networkMap[NETWORK] || Network.BASE_MAINNET,
});

console.log("\n╔═══════════════════════════════════════════════════════════╗");
console.log("║           Wallet Health Check - MARZ Smart Wallet        ║");
console.log("╚═══════════════════════════════════════════════════════════╝\n");

console.log(`🔍 Analyzing wallet: ${WALLET_ADDRESS}`);
console.log(`🌐 Network: ${NETWORK}\n`);

async function healthCheck() {
  try {
    // 1. Check ETH Balance
    console.log("📊 BALANCE CHECK");
    console.log("─".repeat(60));
    const balance = await alchemy.core.getBalance(WALLET_ADDRESS);
    const balanceInEth = parseFloat(Utils.formatEther(balance));
    console.log(`   ETH Balance: ${balanceInEth.toFixed(6)} ETH`);
    
    if (balanceInEth === 0) {
      console.log("   ⚠️  Warning: Wallet has no ETH balance");
    } else if (balanceInEth < 0.001) {
      console.log("   ⚠️  Warning: Low ETH balance, may not be sufficient for gas");
    } else {
      console.log("   ✅ Sufficient ETH balance");
    }
    console.log();

    // 2. Check Token Holdings
    console.log("🪙 TOKEN HOLDINGS");
    console.log("─".repeat(60));
    const tokenBalances = await alchemy.core.getTokenBalances(WALLET_ADDRESS);
    const nonZeroTokens = tokenBalances.tokenBalances.filter(
      (token) => token.tokenBalance && token.tokenBalance !== "0"
    );
    
    console.log(`   Total Tokens: ${nonZeroTokens.length}`);
    
    if (nonZeroTokens.length > 0) {
      console.log("   ✅ Token holdings detected");
      for (let i = 0; i < Math.min(3, nonZeroTokens.length); i++) {
        const token = nonZeroTokens[i];
        const metadata = await alchemy.core.getTokenMetadata(token.contractAddress);
        console.log(`   • ${metadata.symbol || "Unknown"}: ${metadata.name || "Unknown Token"}`);
      }
      if (nonZeroTokens.length > 3) {
        console.log(`   ... and ${nonZeroTokens.length - 3} more tokens`);
      }
    } else {
      console.log("   ℹ️  No tokens found");
    }
    console.log();

    // 3. Check NFTs
    console.log("🖼️  NFT COLLECTION");
    console.log("─".repeat(60));
    const nfts = await alchemy.nft.getNftsForOwner(WALLET_ADDRESS);
    console.log(`   Total NFTs: ${nfts.ownedNfts.length}`);
    
    if (nfts.ownedNfts.length > 0) {
      console.log("   ✅ NFT holdings detected");
      const collections = new Set(nfts.ownedNfts.map(nft => nft.contract.address));
      console.log(`   Collections: ${collections.size}`);
    } else {
      console.log("   ℹ️  No NFTs found");
    }
    console.log();

    // 4. Transaction Activity
    console.log("📜 TRANSACTION ACTIVITY");
    console.log("─".repeat(60));
    const txHistory = await alchemy.core.getAssetTransfers({
      fromAddress: WALLET_ADDRESS,
      category: ["external", "internal", "erc20", "erc721", "erc1155"],
      maxCount: 10,
    });
    
    console.log(`   Recent Transactions: ${txHistory.transfers.length}`);
    
    if (txHistory.transfers.length > 0) {
      console.log("   ✅ Wallet has transaction history");
      const latestTx = txHistory.transfers[0];
      console.log(`   Latest Activity: Block ${latestTx.blockNum}`);
    } else {
      console.log("   ⚠️  No transaction history found");
    }
    console.log();

    // 5. Current Gas Price
    console.log("⛽ GAS MARKET");
    console.log("─".repeat(60));
    const gasPrice = await alchemy.core.getGasPrice();
    const gasPriceInGwei = parseFloat(Utils.formatUnits(gasPrice, "gwei"));
    console.log(`   Current Gas Price: ${gasPriceInGwei.toFixed(2)} Gwei`);
    
    if (gasPriceInGwei > 50) {
      console.log("   ⚠️  High gas prices - consider waiting");
    } else if (gasPriceInGwei > 20) {
      console.log("   ℹ️  Moderate gas prices");
    } else {
      console.log("   ✅ Low gas prices - good time to transact");
    }
    console.log();

    // Summary
    console.log("═".repeat(60));
    console.log("📋 SUMMARY");
    console.log("═".repeat(60));
    
    let score = 0;
    const checks = [];
    
    if (balanceInEth > 0.001) {
      score += 25;
      checks.push("✅ Sufficient ETH balance");
    } else {
      checks.push("❌ Low or no ETH balance");
    }
    
    if (nonZeroTokens.length > 0) {
      score += 25;
      checks.push("✅ Token holdings present");
    } else {
      checks.push("ℹ️  No token holdings");
    }
    
    if (nfts.ownedNfts.length > 0) {
      score += 25;
      checks.push("✅ NFT holdings present");
    } else {
      checks.push("ℹ️  No NFT holdings");
    }
    
    if (txHistory.transfers.length > 0) {
      score += 25;
      checks.push("✅ Transaction history exists");
    } else {
      checks.push("⚠️  No transaction history");
    }
    
    checks.forEach(check => console.log(`   ${check}`));
    
    console.log();
    console.log(`   🎯 Wallet Health Score: ${score}/100`);
    
    if (score >= 75) {
      console.log("   ✨ Excellent - Wallet is healthy and active!");
    } else if (score >= 50) {
      console.log("   👍 Good - Wallet is functional with some activity");
    } else if (score >= 25) {
      console.log("   ⚠️  Fair - Wallet needs attention");
    } else {
      console.log("   ❌ Poor - Wallet may be inactive or needs funding");
    }
    
    console.log("\n" + "═".repeat(60) + "\n");
    
  } catch (error) {
    console.error("\n❌ Error during health check:", error.message);
    process.exit(1);
  }
}

healthCheck();
