# Alchemy Extension CLI - Integration Guide

This guide shows how to integrate and extend the Alchemy CLI in your MARZ Smart Wallet project.

## Quick Start

1. **Installation** - Already installed! Just ensure you have the environment variable set:
   ```env
   ALCHEMY_DATA_API_KEY=your_api_key_here
   ```

2. **Run your first command:**
   ```bash
   npm run alchemy:networks
   ```

## Architecture

### File Structure
```
scripts/
├── alchemy-cli.mjs          # Main CLI tool
├── validate-env.mjs          # Environment validation
├── examples/
│   └── wallet-health-check.mjs  # Example script
└── README-CLI.md             # CLI documentation
```

### Core Components

#### AlchemyCLI Class
The main class that handles all Alchemy interactions:

```javascript
class AlchemyCLI {
  constructor()                              // Initialize with API key
  getAlchemy(network)                        // Get Alchemy instance
  getBalance(address, network)               // Get ETH balance
  getTokenBalances(address, network)         // Get token balances
  getNFTs(address, network)                  // Get NFT holdings
  getTransactionHistory(address, network)    // Get transaction history
  getBlock(blockNumber, network)             // Get block info
  getGasPrice(network)                       // Get current gas price
  watchPendingTransactions(network)          // Watch live transactions
  getContractMetadata(address, network)      // Get contract info
  showNetworks()                             // List networks
  showHelp()                                 // Show help
}
```

## Creating Custom Scripts

### Example 1: Portfolio Tracker

```javascript
#!/usr/bin/env node
import { Alchemy, Network, Utils } from "alchemy-sdk";

const alchemy = new Alchemy({
  apiKey: process.env.ALCHEMY_DATA_API_KEY,
  network: Network.BASE_MAINNET,
});

async function trackPortfolio(addresses) {
  let totalValue = 0;
  
  for (const address of addresses) {
    const balance = await alchemy.core.getBalance(address);
    const eth = parseFloat(Utils.formatEther(balance));
    totalValue += eth;
    console.log(`${address}: ${eth} ETH`);
  }
  
  console.log(`\nTotal Portfolio: ${totalValue} ETH`);
}

trackPortfolio([
  "0xAddress1...",
  "0xAddress2...",
]);
```

### Example 2: Gas Price Monitor

```javascript
#!/usr/bin/env node
import { Alchemy, Network, Utils } from "alchemy-sdk";

const alchemy = new Alchemy({
  apiKey: process.env.ALCHEMY_DATA_API_KEY,
  network: Network.BASE_MAINNET,
});

async function monitorGas() {
  setInterval(async () => {
    const gasPrice = await alchemy.core.getGasPrice();
    const gwei = parseFloat(Utils.formatUnits(gasPrice, "gwei"));
    const timestamp = new Date().toISOString();
    
    console.log(`[${timestamp}] Gas: ${gwei.toFixed(2)} Gwei`);
    
    if (gwei < 5) {
      console.log("🟢 ALERT: Low gas prices! Good time to transact.");
    }
  }, 60000); // Check every minute
}

monitorGas();
```

### Example 3: Token Transfer Notifier

```javascript
#!/usr/bin/env node
import { Alchemy, Network } from "alchemy-sdk";

const alchemy = new Alchemy({
  apiKey: process.env.ALCHEMY_DATA_API_KEY,
  network: Network.BASE_MAINNET,
});

const WATCH_ADDRESS = "0xYourAddress...";

// Watch for incoming transfers
alchemy.ws.on(
  {
    method: "alchemy_pendingTransactions",
    toAddress: [WATCH_ADDRESS],
  },
  (tx) => {
    console.log(`💰 Incoming transaction: ${tx.hash}`);
    console.log(`   From: ${tx.from}`);
    console.log(`   Value: ${Utils.formatEther(tx.value)} ETH`);
  }
);

console.log(`Watching for transactions to ${WATCH_ADDRESS}...`);
```

## Advanced Usage

### Multi-Chain Portfolio Management

```javascript
import { Alchemy, Network, Utils } from "alchemy-sdk";

const networks = [
  { name: "Ethereum", network: Network.ETH_MAINNET },
  { name: "Base", network: Network.BASE_MAINNET },
  { name: "Polygon", network: Network.MATIC_MAINNET },
];

async function multiChainBalance(address) {
  console.log(`\n📊 Multi-Chain Portfolio for ${address}\n`);
  
  for (const { name, network } of networks) {
    const alchemy = new Alchemy({
      apiKey: process.env.ALCHEMY_DATA_API_KEY,
      network,
    });
    
    const balance = await alchemy.core.getBalance(address);
    const eth = parseFloat(Utils.formatEther(balance));
    
    console.log(`${name}: ${eth.toFixed(6)} ETH`);
  }
}
```

### NFT Floor Price Tracker

```javascript
async function getNFTFloorPrice(contractAddress, network = Network.ETH_MAINNET) {
  const alchemy = new Alchemy({
    apiKey: process.env.ALCHEMY_DATA_API_KEY,
    network,
  });
  
  try {
    const floorPrice = await alchemy.nft.getFloorPrice(contractAddress);
    
    console.log(`\n🏷️  NFT Floor Price:`);
    console.log(`   OpenSea: ${floorPrice.openSea.floorPrice} ETH`);
    console.log(`   LooksRare: ${floorPrice.looksRare.floorPrice} ETH`);
  } catch (error) {
    console.error("Error fetching floor price:", error.message);
  }
}
```

### Webhook Integration

```javascript
import { Alchemy, Network } from "alchemy-sdk";
import fetch from "node-fetch";

const alchemy = new Alchemy({
  apiKey: process.env.ALCHEMY_DATA_API_KEY,
  network: Network.BASE_MAINNET,
});

const WEBHOOK_URL = "https://your-webhook-url.com/notify";

// Send notifications to a webhook
alchemy.ws.on(
  {
    method: "alchemy_pendingTransactions",
    toAddress: ["0xYourSmartWallet..."],
  },
  async (tx) => {
    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "incoming_transaction",
        hash: tx.hash,
        from: tx.from,
        value: tx.value,
        timestamp: new Date().toISOString(),
      }),
    });
  }
);
```

## Extending the CLI

### Adding New Commands

1. **Add the command to AlchemyCLI class:**

```javascript
// In alchemy-cli.mjs
async getContractOwner(contractAddress, network = "base-mainnet") {
  const alchemy = this.getAlchemy(network);
  try {
    const contract = await alchemy.nft.getContractMetadata(contractAddress);
    console.log(`\n👤 Contract Owner: ${contract.contractDeployer || "Unknown"}\n`);
  } catch (error) {
    console.error(`❌ Error:`, error.message);
  }
}
```

2. **Add the command handler in main():**

```javascript
case "owner":
  if (!args[1]) {
    console.error("❌ Error: Contract address required");
    process.exit(1);
  }
  await cli.getContractOwner(args[1], args[2]);
  break;
```

3. **Update help documentation:**

```javascript
showHelp() {
  console.log(`
  ...
  owner <address> [network]           Get contract owner
  ...
  `);
}
```

4. **Add npm script:**

```json
{
  "scripts": {
    "alchemy:owner": "node scripts/alchemy-cli.mjs owner"
  }
}
```

### Adding Support for New Networks

1. **Update NETWORKS object:**

```javascript
const NETWORKS = {
  // ... existing networks
  "zksync-mainnet": Network.ZKSYNC_MAINNET,
  "custom-chain": "https://custom-rpc-url.com",
};
```

2. **Handle custom RPC URLs:**

```javascript
getAlchemy(network = "base-mainnet") {
  const networkConfig = NETWORKS[network];
  
  if (typeof networkConfig === "string") {
    // Custom RPC URL
    return new Alchemy({
      apiKey: this.apiKey,
      url: networkConfig,
    });
  }
  
  // Standard network
  return new Alchemy({
    apiKey: this.apiKey,
    network: networkConfig || Network.BASE_MAINNET,
  });
}
```

## Best Practices

### 1. Error Handling

Always wrap async operations in try-catch blocks:

```javascript
async function safeOperation() {
  try {
    const result = await alchemy.core.getBalance(address);
    return result;
  } catch (error) {
    console.error("Operation failed:", error.message);
    return null;
  }
}
```

### 2. Rate Limiting

Alchemy has rate limits. Use delays for bulk operations:

```javascript
async function batchOperation(addresses) {
  for (const address of addresses) {
    await processAddress(address);
    await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
  }
}
```

### 3. Environment Variables

Always validate environment variables:

```javascript
const apiKey = process.env.ALCHEMY_DATA_API_KEY;
if (!apiKey) {
  throw new Error("ALCHEMY_DATA_API_KEY not found");
}
```

### 4. TypeScript Support

For TypeScript projects, add type definitions:

```typescript
import { Alchemy, Network, AlchemyConfig } from "alchemy-sdk";

interface WalletInfo {
  address: string;
  balance: bigint;
  tokenCount: number;
  nftCount: number;
}

async function getWalletInfo(address: string): Promise<WalletInfo> {
  const alchemy = new Alchemy({
    apiKey: process.env.ALCHEMY_DATA_API_KEY!,
    network: Network.BASE_MAINNET,
  });
  
  // Implementation...
}
```

## Testing

### Manual Testing

```bash
# Test balance command
npm run alchemy balance 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045 eth-mainnet

# Test gas price
npm run alchemy:gas base-mainnet

# Test networks listing
npm run alchemy:networks
```

### Automated Testing

Create a test script:

```javascript
// scripts/test-cli.mjs
import { execSync } from "child_process";

const tests = [
  {
    name: "Networks listing",
    command: "npm run alchemy:networks",
    expectOutput: "eth-mainnet",
  },
  {
    name: "Gas price",
    command: "npm run alchemy:gas base-mainnet",
    expectOutput: "Gwei",
  },
];

tests.forEach(test => {
  try {
    const output = execSync(test.command, { encoding: "utf8" });
    if (output.includes(test.expectOutput)) {
      console.log(`✅ ${test.name} - PASSED`);
    } else {
      console.log(`❌ ${test.name} - FAILED`);
    }
  } catch (error) {
    console.log(`❌ ${test.name} - ERROR: ${error.message}`);
  }
});
```

## Troubleshooting

### Common Issues

1. **"API key not found"**
   - Ensure `.env.local` exists with `ALCHEMY_DATA_API_KEY`
   - Check that the key is valid and not expired

2. **"Network not supported"**
   - Use `npm run alchemy:networks` to see available networks
   - Check for typos in network names

3. **Rate limiting errors**
   - Implement delays between requests
   - Consider upgrading your Alchemy plan
   - Use caching for repeated requests

4. **WebSocket connection issues**
   - Check firewall settings
   - Verify network connectivity
   - Try a different network

## Resources

- [Alchemy SDK Documentation](https://docs.alchemy.com/reference/alchemy-sdk-quickstart)
- [Alchemy API Reference](https://docs.alchemy.com/reference/api-overview)
- [WebSocket Subscription](https://docs.alchemy.com/reference/subscription-api)
- [NFT API](https://docs.alchemy.com/reference/nft-api-quickstart)

## Contributing

To contribute new features to the CLI:

1. Create a new branch
2. Add your feature to `alchemy-cli.mjs`
3. Update documentation
4. Add tests
5. Submit a pull request

## License

MIT - Part of the MARZ Smart Wallet project
