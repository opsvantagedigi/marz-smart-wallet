# Alchemy Dashboard Login - Terminal Guide

Complete guide for using Alchemy Dashboard authentication and management features via the CLI.

## 🚀 Quick Start

### Login to Dashboard

```bash
npm run alchemy:login
```

This command will:
1. Open your default browser to Alchemy Dashboard
2. Create a local session file (`.alchemy-session.json`)
3. Enable enhanced CLI features

### Check Status

```bash
npm run alchemy:status
```

Shows:
- API key configuration status
- Dashboard login status
- API connectivity test
- Session information

### Logout

```bash
npm run alchemy:logout
```

Removes local session data and logs you out.

## 📊 Dashboard Commands

### Open Main Dashboard

```bash
npm run alchemy:dashboard
```

Opens the main Alchemy Dashboard homepage.

### Open Specific Pages

```bash
# Manage your apps
npm run alchemy dashboard apps

# View analytics and usage
npm run alchemy dashboard analytics

# Configure webhooks
npm run alchemy dashboard webhooks

# Set up notifications
npm run alchemy dashboard notify

# Manage billing
npm run alchemy dashboard billing

# Account settings
npm run alchemy dashboard settings

# Documentation
npm run alchemy dashboard docs

# Get support
npm run alchemy dashboard support
```

## 🔍 API Usage Monitoring

### Test API and View Usage

```bash
npm run alchemy:usage
npm run alchemy:usage base-mainnet
```

This command:
- Tests your API connection
- Performs sample requests (getBlockNumber, getGasPrice)
- Shows response times
- Provides link to detailed analytics

### Example Output

```
📈 API Usage Information

────────────────────────────────────────────────────────────
   Network: base-mainnet
   API Key: c4YUdaSK...EOoO

   Testing API with sample requests...

   ✅ getBlockNumber(): 12345678 (45ms)
   ✅ getGasPrice(): 0.05 Gwei (32ms)

   ✅ API is functioning correctly

   📊 For detailed usage statistics, visit:
      https://dashboard.alchemy.com/analytics

────────────────────────────────────────────────────────────
```

## 🔐 Session Management

### How Sessions Work

When you run `npm run alchemy:login`:
1. A browser window opens to Alchemy Dashboard
2. You log in with your credentials
3. CLI creates `.alchemy-session.json` with:
   - Login timestamp
   - Partial API key reference
   - Session metadata

### Session File Location

```
/workspaces/marz-smart-wallet/.alchemy-session.json
```

**Note:** This file is automatically added to `.gitignore` for security.

### Session Persistence

Sessions persist until you:
- Run `npm run alchemy:logout`
- Manually delete `.alchemy-session.json`

### Security Best Practices

✅ **DO:**
- Keep `.alchemy-session.json` private
- Logout when switching accounts
- Use `status` to verify your session

❌ **DON'T:**
- Commit session files to git
- Share session files
- Use same session across multiple projects

## 🌐 Dashboard Features Overview

### Apps Management
**URL:** https://dashboard.alchemy.com/apps

Access via: `npm run alchemy dashboard apps`

Features:
- Create new apps
- Manage API keys
- Configure app settings
- View app-specific analytics

### Analytics
**URL:** https://dashboard.alchemy.com/analytics

Access via: `npm run alchemy dashboard analytics`

Features:
- Real-time usage metrics
- Request volume graphs
- Method breakdown
- Network distribution
- Historical data

### Webhooks
**URL:** https://dashboard.alchemy.com/webhooks

Access via: `npm run alchemy dashboard webhooks`

Features:
- Create webhook endpoints
- Configure event triggers
- Test webhook delivery
- View webhook logs

### Notifications (Notify)
**URL:** https://dashboard.alchemy.com/notify

Access via: `npm run alchemy dashboard notify`

Features:
- Address activity monitoring
- Mined transaction notifications
- Dropped transaction alerts
- Custom notification rules

### Billing
**URL:** https://dashboard.alchemy.com/settings/billing

Access via: `npm run alchemy dashboard billing`

Features:
- View current plan
- Usage limits
- Billing history
- Payment methods

### Settings
**URL:** https://dashboard.alchemy.com/settings

Access via: `npm run alchemy dashboard settings`

Features:
- Account preferences
- Team management
- API configuration
- Security settings

## 🔧 Advanced Usage

### Automated Dashboard Workflows

Create custom scripts that combine CLI operations:

```bash
#!/bin/bash
# check-and-open.sh

# Check status first
npm run alchemy:status

# If API is healthy, open analytics
if [ $? -eq 0 ]; then
  echo "Opening analytics dashboard..."
  npm run alchemy dashboard analytics
fi
```

### Integration with CI/CD

Use status check in your deployment scripts:

```yaml
# .github/workflows/deploy.yml
- name: Check Alchemy API
  run: npm run alchemy:status
```

### Programmatic Dashboard Access

```javascript
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

async function openDashboardWithAuth() {
  // Login
  await execAsync("npm run alchemy:login");
  
  // Wait for user to authenticate
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  // Open analytics
  await execAsync("npm run alchemy dashboard analytics");
}
```

## 📱 Platform-Specific Browser Handling

The CLI automatically detects your platform and uses the appropriate browser command:

### macOS
Uses: `open <url>`

### Windows
Uses: `start <url>`

### Linux
Uses: `xdg-open` → `sensible-browser` → `x-www-browser`

### Dev Containers
Checks `$BROWSER` environment variable first

### Manual Fallback
If automatic opening fails, the CLI will display the URL for manual copying.

## 🐛 Troubleshooting

### "API key not found" Error

**Problem:** No API key in environment

**Solution:**
```bash
# Verify .env.local exists and contains:
ALCHEMY_DATA_API_KEY=your_key_here
# or
NEXT_PUBLIC_ALCHEMY_API_KEY=your_key_here
```

### Browser Doesn't Open

**Problem:** CLI can't open browser automatically

**Solutions:**
1. **Dev Container:** Set `$BROWSER` environment variable
2. **Linux:** Install `xdg-utils` package
   ```bash
   sudo apt-get install xdg-utils
   ```
3. **Manual:** Copy the URL from CLI output

### Session Lost After Restart

**Problem:** Session doesn't persist

**Solution:**
Session files are local only. Re-login after:
- Project directory changes
- File system clears
- `.alchemy-session.json` deletion

### API Connection Failed

**Problem:** `status` shows API connection error

**Solutions:**
1. Check internet connection
2. Verify API key is valid
3. Check Alchemy service status
4. Try different network:
   ```bash
   npm run alchemy:usage eth-mainnet
   ```

## 📊 Status Command Details

The `status` command provides comprehensive information:

```
📊 Alchemy CLI Status

────────────────────────────────────────────────────────────
   API Key: c4YUdaSK...EOoO          # Masked API key
   ✅ API Key configured              # Configuration status

   Dashboard: Logged in               # Session status
   Session started: 12/24/2025, 3:45:23 PM

   Testing API connectivity...
   ✅ API connection successful       # Live API test

────────────────────────────────────────────────────────────
```

### What Status Checks

1. **Environment Variables**
   - Verifies API key exists
   - Shows masked key for reference

2. **Session State**
   - Checks for active session
   - Shows login timestamp

3. **API Health**
   - Performs live API call
   - Tests connectivity
   - Verifies authentication

## 🎯 Best Practices

### Daily Workflow

```bash
# Morning: Check status
npm run alchemy:status

# View analytics
npm run alchemy dashboard analytics

# Monitor usage throughout the day
npm run alchemy:usage base-mainnet

# Evening: Review webhooks
npm run alchemy dashboard webhooks
```

### Development Workflow

```bash
# Before starting work
npm run alchemy:login
npm run alchemy:status

# During development - monitor API
npm run alchemy:usage

# Before commits - check API limits
npm run alchemy dashboard analytics

# End of day
npm run alchemy:logout
```

### Team Collaboration

Each team member should:
1. Use their own API key
2. Maintain separate sessions
3. Login with their credentials
4. Never share session files

## 🔗 Quick Reference

| Command | Purpose | Example |
|---------|---------|---------|
| `alchemy:login` | Login to dashboard | `npm run alchemy:login` |
| `alchemy:logout` | Logout from dashboard | `npm run alchemy:logout` |
| `alchemy:status` | Check API status | `npm run alchemy:status` |
| `alchemy:dashboard` | Open dashboard | `npm run alchemy:dashboard` |
| `alchemy:usage` | View API usage | `npm run alchemy:usage` |
| `alchemy dashboard apps` | Manage apps | `npm run alchemy dashboard apps` |
| `alchemy dashboard analytics` | View analytics | `npm run alchemy dashboard analytics` |

## 📚 Additional Resources

- [Alchemy Dashboard](https://dashboard.alchemy.com/)
- [Alchemy Documentation](https://docs.alchemy.com/)
- [API Reference](https://docs.alchemy.com/reference/api-overview)
- [Webhook Guide](https://docs.alchemy.com/docs/webhooks-overview)
- [Notify Documentation](https://docs.alchemy.com/docs/notify-overview)

## 🆘 Support

If you encounter issues:

1. **Check Status:** `npm run alchemy:status`
2. **View Logs:** Check terminal output
3. **Visit Support:** `npm run alchemy dashboard support`
4. **Documentation:** `npm run alchemy dashboard docs`

---

**Part of MARZ Smart Wallet CLI Extension**
