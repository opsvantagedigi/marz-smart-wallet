# Alchemy CLI Extension - Quick Reference

## 🚀 What's Been Added

A comprehensive CLI tool for interacting with Alchemy services, providing command-line access to blockchain data and smart wallet operations.

## 📦 Files Added

```
scripts/
├── alchemy-cli.mjs                 # Main CLI tool (582 lines)
├── README-CLI.md                   # User documentation
├── INTEGRATION-GUIDE.md            # Developer integration guide
└── examples/
    └── wallet-health-check.mjs     # Example: Comprehensive wallet analysis
```

## 🎯 Features

### Core Commands
- **Dashboard Login**: Authenticate with Alchemy Dashboard from terminal
- **Session Management**: Track login status and API connectivity
- **Usage Monitoring**: Test API and view performance metrics
- **Rollup Health Checks**: Monitor rollup RPC, WebSocket, and Explorer status
- **Balance Checking**: Get ETH and token balances for any address
- **NFT Management**: List and explore NFT holdings
- **Transaction History**: View recent blockchain transactions
- **Gas Tracking**: Monitor current gas prices across networks
- **Block Explorer**: Get detailed blockchain information
- **Contract Metadata**: Fetch smart contract information
- **Live Monitoring**: Watch pending transactions in real-time (WebSocket)

### Supported Networks
- Ethereum (Mainnet & Sepolia)
- Base (Mainnet & Sepolia)
- Polygon (Mainnet & Amoy)
- Arbitrum (Mainnet & Sepolia)
- Optimism (Mainnet & Sepolia)

## 🛠️ Quick Start

### Installation
Already installed! Just ensure your `.env.local` has:
```env
ALCHEMY_DATA_API_KEY=your_api_key_here
```

### Basic Usage

```bash
# Show all commands
npm run alchemy help

# Check wallet balance
npm run alchemy:balance 0xYourAddress base-mainnet

# View token balances
npm run alchemy:tokens 0xYourAddress

# List NFTs
npm run alchemy:nfts 0xYourAddress eth-mainnet

# Check gas prices
npm run alchemy:gas base-mainnet

# View available networks
npm run alchemy:networks

# Run wallet health check
npm run wallet-health 0xYourAddress base-mainnet
```

## 📝 NPM Scripts Added

```json
{
  "alchemy": "node scripts/alchemy-cli.mjs",
  "alchemy:login": "node scripts/alchemy-cli.mjs login",
  "alchemy:logout": "node scripts/alchemy-cli.mjs logout",
  "alchemy:status": "node scripts/alchemy-cli.mjs status",
  "alchemy:dashboard": "node scripts/alchemy-cli.mjs dashboard",
  "alchemy:usage": "node scripts/alchemy-cli.mjs usage",
  "alchemy:rollup:status": "node scripts/alchemy-cli.mjs rollup:status",
  "alchemy:rollup:restart": "node scripts/alchemy-cli.mjs rollup:restart",
  "alchemy:balance": "node scripts/alchemy-cli.mjs balance",
  "alchemy:tokens": "node scripts/alchemy-cli.mjs tokens",
  "alchemy:nfts": "node scripts/alchemy-cli.mjs nfts",
  "alchemy:gas": "node scripts/alchemy-cli.mjs gas",
  "alchemy:networks": "node scripts/alchemy-cli.mjs networks",
  "wallet-health": "node scripts/examples/wallet-health-check.mjs"
}
```

## 💡 Example Use Cases

### 1. Login to Dashboard
```bash
npm run alchemy:login
```

### 2. Check API Status
```bash
npm run alchemy:status
```

### 3. Monitor API Usage
```bash
npm run alchemy:usage base-mainnet
```

### 4. Open Analytics Dashboard
```bash
npm run alchemy dashboard analytics
```

### 5. Check Rollup Health
```bash
npm run alchemy:rollup:status --uuid your-rollup-uuid
```

### 6. Restart Rollup
```bash
npm run alchemy:rollup:restart --uuid your-rollup-uuid
```

### 7. Check Smart Wallet Balance
```bash
npm run alchemy:balance 0xYourSmartWalletAddress base-mainnet
```

### 6. Monitor Gas Before Transaction
```bash
npm run alchemy:gas base-mainnet
```

### 7. Verify Token Holdings
```bash
npm run alchemy:tokens 0xYourAddress
```

### 8. Comprehensive Wallet Analysis
```bash
npm run wallet-health 0xYourAddress base-mainnet
```

### 9. Watch Live Transactions
```bash
npm run alchemy watch base-mainnet
# Press Ctrl+C to stop
```

## 🔧 Advanced Usage

### Direct CLI Access
```bash
# Get block information
node scripts/alchemy-cli.mjs block latest base-mainnet

# View transaction history
node scripts/alchemy-cli.mjs history 0xAddress eth-mainnet

# Get contract metadata
node scripts/alchemy-cli.mjs contract 0xContractAddress
```

### Programmatic Usage
```javascript
// Dashboard & Session Management
login()                                   // Login to dashboard
logout()                                  // Logout from dashboard
status()                                  // Show API and session status
openDashboard(page)                       // Open dashboard pages
getApiUsage(network)                      // Test API and show usage

// Blockchain Operations
getBalance(address, network)              // ETH balance
getTokenBalances(address, network)        // ERC-20 tokens
getNFTs(address, network)                 // NFT holdings
getTransactionHistory(address, network)   // Transaction history
getBlock(blockNumber, network)            // Block information
getGasPrice(network)                      // Current gas price
watchPendingTransactions(network)         // Live monitoring
getContractMetadata(address, network)     // Contract info

// Utility
```

## 📚 Documentation

- **README-CLI.md**: Complete user guide with all commands and examples
- **INTEGRATION-GUIDE.md**: Developer guide for extending and integrating the CLI
- **Main README.md**: Updated with CLI quick reference section

## 🎨 Features Highlights

### AlchemyCLI Class Methods
```javascript
getBalance(address, network)              // ETH balance
getTokenBalances(address, network)        // ERC-20 tokens
getNFTs(address, network)                 // NFT holdings
getTransactionHistory(address, network)   // Transaction history
getBlock(blockNumber, network)            // Block information
getGasPrice(network)                      // Current gas price
watchPendingTransactions(network)         // Live monitoring
getContractMetadata(address, network)     // Contract info
showNetworks()                            // Available networks
showHelp()                                // Help menu
```

### Wallet Health Check
The included example script provides:
- ✅ ETH balance verification
- ✅ Token holdings analysis
- ✅ NFT collection review
- ✅ Transaction activity check
- ✅ Gas market assessment
- ✅ Overall wallet health score (0-100)

## 🔐 Security Notes

- API keys are loaded from `.env.local` (not committed to git)
- All API calls are read-only (no wallet private keys needed)
- Environment variables are validated before operations
- Error handling prevents sensitive data exposure

## 🚦 Next Steps

1. **Set up your API key** in `.env.local`
2. **Test the CLI** with `npm run alchemy:networks`
3. **Try the health check** on a wallet address
4. **Explore the documentation** in `scripts/README-CLI.md`
5. **Build custom scripts** using examples in `INTEGRATION-GUIDE.md`

## 🎯 Integration with MARZ Smart Wallet

The CLI seamlessly integrates with your existing:
- Account Kit configuration
- Multi-chain support (MARZ NeoSphere, Base, etc.)
- Existing Alchemy SDK setup
- Environment variable management

## 📊 Example Output

### Balance Check
```
💰 Balance for 0x123... on base-mainnet:
   1.234567 ETH
   1234567000000000000 wei
```

### Token Balances
```
🪙 Fetching token balances for 0x123... on base-mainnet...

   Found 3 tokens:

   📌 USD Coin (USDC)
      Balance: 1000.0000
      Contract: 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
```

### Gas Prices
```
⛽ Fetching gas price for base-mainnet...

   Current Gas Price: 0.05 Gwei
   In Wei: 50000000
```

## 🎓 Learning Resources

- All documentation in `scripts/` directory
- Example scripts in `scripts/examples/`
- Integration patterns in `INTEGRATION-GUIDE.md`
- Command reference in `README-CLI.md`

---

**Ready to use!** Start with `npm run alchemy help` to explore all available commands.
