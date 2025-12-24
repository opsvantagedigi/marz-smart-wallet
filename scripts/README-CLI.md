# Alchemy Extension CLI

A powerful command-line interface for interacting with Alchemy services and managing smart wallet operations.

## Features

- � **Dashboard Login**: Authenticate and access Alchemy Dashboard from terminal
- 📊 **Usage Monitoring**: Track API usage and performance- 🎯 **Rollup Status**: Check rollup health (RPC, WebSocket, Explorer)- �💰 **Balance Checking**: Get ETH balances for any address
- 🪙 **Token Balances**: View all ERC-20 token holdings
- 🖼️ **NFT Management**: List NFTs owned by an address
- 📜 **Transaction History**: View recent transactions
- ⛽ **Gas Tracking**: Monitor current gas prices
- 🔷 **Block Explorer**: Get detailed block information
- 📋 **Contract Info**: Fetch contract metadata
- 👁️ **Live Monitoring**: Watch pending transactions in real-time
- 🌐 **Multi-Chain**: Support for Ethereum, Base, Polygon, Arbitrum, and Optimism

## Installation

The CLI is already installed in your project. Make sure you have the required environment variables set in `.env.local`:

```env
ALCHEMY_DATA_API_KEY=your_api_key_here
# OR
NEXT_PUBLIC_ALCHEMY_API_KEY=your_api_key_here
```

## Usage

### Using npm scripts (recommended):

```bash
# Dashboard & Authentication
npm run alchemy:login              # Login to Alchemy Dashboard
npm run alchemy:logout             # Logout from dashboard
npm run alchemy:status             # Check API and session status
npm run alchemy:dashboard          # Open dashboard
npm run alchemy:usage              # Test API and view usage

# Rollup Management
npm run alchemy:rollup:status --uuid your-rollup-uuid
npm run alchemy:rollup:restart --uuid your-rollup-uuid

# Blockchain Operations
npm run alchemy:balance 0x123... base-mainnet
npm run alchemy:tokens 0x123... eth-mainnet
npm run alchemy:nfts 0x123...
npm run alchemy:gas base-mainnet
npm run alchemy:networks
```

### Direct usage:

```bash
node scripts/alchemy-cli.mjs <command> [options]
```

## Commands

### Dashboard Commands

#### `login`
Login to Alchemy Dashboard via your browser.

```bash
npm run alchemy:login
```

Opens the Alchemy Dashboard and creates a local session for enhanced CLI features.

#### `logout`
Logout from Alchemy Dashboard.

```bash
npm run alchemy:logout
```

Removes local session data.

#### `status`
Show comprehensive API and session status.

```bash
npm run alchemy:status
```

Displays:
- API key configuration
- Session status
- API connectivity test

#### `dashboard [page]`
Open specific Alchemy Dashboard pages.

```bash
npm run alchemy:dashboard              # Main dashboard
npm run alchemy dashboard apps         # Apps management
npm run alchemy dashboard analytics    # Usage analytics
npm run alchemy dashboard webhooks     # Webhook configuration
npm run alchemy dashboard notify       # Notifications
npm run alchemy dashboard billing      # Billing settings
npm run alchemy dashboard settings     # Account settings
npm run alchemy dashboard docs         # Documentation
npm run alchemy dashboard support      # Support
```

#### `usage [network]`
Test API connection and view usage information.

```bash
npm run alchemy:usage
npm Rollup Commands

#### `rollup:status --uuid <UUID>`
Check the health status of your rollup deployment.

```bash
npm run alchemy:rollup:status --uuid your-rollup-uuid
```

This command performs comprehensive health checks:
- **RPC Health**: Tests JSON-RPC endpoint with `eth_chainId`
- **WebSocket Health**: Attempts WebSocket handshake
- **Explorer Health**: HEAD request to block explorer
- **Sequencer Status**: Determines if sequencer is online/offline

Example output:
```
🔍 Checking Rollup Status

════════════════════════════════════════════════════════════
   Rollup UUID: your-rollup-uuid

   RPC URL: https://rollup.alchemy.com/your-rollup-uuid
   WS URL: wss://rollup.alchemy.com/your-rollup-uuid
   Explorer URL: https://explorer.rollup.alchemy.com/your-rollup-uuid

────────────────────────────────────────────────────────────

   📡 Testing RPC endpoint...
   ✅ RPC: OK (Chain ID: 12345)
   🔌 Testing WebSocket endpoint...
   ✅ WebSocket: OK
   🔎 Testing Explorer endpoint...
   ✅ Explorer: OK (200)

════════════════════════════════════════════════════════════
   ROLLUP STATUS SUMMARY
════════════════════════════════════════════════════════════

   ✅ Sequencer: ONLINE
   ✅ RPC: OK
   ✅ WebSocket: OK
   ✅ Explorer: OK

════════════════════════════════════════════════════════════

   ✨ All systems operational!
```

#### `rollup:restart --uuid <UUID>`
Attempt to restart your rollup deployment and check status.

```bash
npm run alchemy:rollup:restart --uuid your-rollup-uuid
```

This command attempts to restart the rollup:
- **Restart Request**: Attempts to call Alchemy restart API
- **Graceful Fallback**: If restart API is unavailable, provides dashboard instructions
- **Auto Status Check**: Automatically runs status check after restart attempt

Example output:
```
🔄 Attempting to Restart Rollup

════════════════════════════════════════════════════════════
   Rollup UUID: your-rollup-uuid

   🔍 Checking restart API availability...
   ℹ️  Restart API endpoint not available

   📋 Restart is not available for this rollup type.
   🌐 Please use the Alchemy Dashboard support panel:

      https://dashboard.alchemy.com/support

════════════════════════════════════════════════════════════

   🔍 Checking rollup status after restart attempt...

[Status check output follows...]
```

**Note:** If restart API is unavailable, you can manually restart your rollup through the Alchemy Dashboard support panel.

### run alchemy:usage base-mainnet
```

### Blockchain Commands

#### `balance <address> [network]`
Get ETH balance for an address.

```bash
npm run alchemy balance 0x742d35Cc6634C0532925a3b844Bc454e4438f44e base-mainnet
```

### `tokens <address> [network]`
Get all ERC-20 token balances for an address.

```bash
npm run alchemy tokens 0x742d35Cc6634C0532925a3b844Bc454e4438f44e
```

### `nfts <address> [network]`
Get all NFTs owned by an address (ERC-721 and ERC-1155).

```bash
npm run alchemy nfts 0x742d35Cc6634C0532925a3b844Bc454e4438f44e eth-mainnet
```

### `history <address> [network]`
Get transaction history for an address.

```bash
npm run alchemy history 0x742d35Cc6634C0532925a3b844Bc454e4438f44e
```

### `block [blockNumber] [network]`
Get information about a specific block (default: latest).

```bash
npm run alchemy block latest base-mainnet
npm run alchemy block 12345678 eth-mainnet
```

### `gas [network]`
Get current gas price for a network.

```bash
npm run alchemy:gas
npm run alchemy:gas eth-mainnet
```

### `watch [network]`
Watch pending transactions in real-time (WebSocket).

```bash
npm run alchemy watch base-mainnet
# Press Ctrl+C to stop
```

### `contract <address> [network]`
Get metadata for a smart contract.

```bash
npm run alchemy contract 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48 eth-mainnet
```

### `networks`
List all available networks.

```bash
npm run alchemy:networks
```

### `help`
Show help message with all commands.

```bash
npm run alchemy help
```

## Supported Networks

- **Ethereum**: `eth-mainnet`, `eth-sepolia`
- **Base**: `base-mainnet`, `base-sepolia`
- **Polygon**: `polygon-mainnet`, `polygon-amoy`
- **Arbitrum**: `arbitrum-mainnet`, `arbitrum-sepolia`
- **Optimism**: `optimism-mainnet`, `optimism-sepolia`

Default network is `base-mainnet` if not specified.

## Examples

### Check your smart wallet balance
```bash
npm run alchemy balance 0xYourSmartWalletAddress base-mainnet
```

### Monitor gas prices before transaction
```bash
npm run alchemy:gas base-mainnet
```

### View all tokens in a wallet
```bash
npm run alchemy:tokens 0xYourAddress
```

### Check NFT collection
```bash
npm run alchemy:nfts 0xYourAddress eth-mainnet
```

### Get latest block info
```bash
npm run alchemy block latest
```

### Watch live transactions
```bash
npm run alchemy watch base-mainnet
```

## Advanced Usage

### Custom scripts
You can create custom scripts that use the CLI:

```bash
#!/bin/bash
# check-wallet.sh

WALLET_ADDRESS="0xYourAddress"
NETWORK="base-mainnet"

echo "=== Wallet Overview ==="
npm run alchemy balance $WALLET_ADDRESS $NETWORK
npm run alchemy:tokens $WALLET_ADDRESS $NETWORK
npm run alchemy:nfts $WALLET_ADDRESS $NETWORK
```

### Programmatic usage
You can also import and use the CLI functions in your Node.js scripts:

```javascript
import { Alchemy, Network } from "alchemy-sdk";

const alchemy = new Alchemy({
  apiKey: process.env.ALCHEMY_DATA_API_KEY,
  network: Network.BASE_MAINNET,
});

const balance = await alchemy.core.getBalance("0x...");
```

## Troubleshooting

### "API key not found" error
Make sure you have set `ALCHEMY_DATA_API_KEY` or `NEXT_PUBLIC_ALCHEMY_API_KEY` in your `.env.local` file.

### Network not supported
Check available networks using `npm run alchemy:networks` and use the exact network name.

### WebSocket errors
WebSocket features (like `watch` command) require a stable internet connection and may not work behind certain firewalls or proxies.

## Contributing

This CLI tool is part of the MARZ Smart Wallet project. For issues or feature requests, please open an issue in the repository.

## License

MIT
