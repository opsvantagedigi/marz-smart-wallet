# 📊 Dashboard Architecture — MARZ Solana RPC  
### *The developer home base designed by Ajay & Marz*

The dashboard is the authenticated core of the MARZ Solana RPC product.  
It is where developers manage their API keys, view analytics, monitor usage, configure webhooks, manage billing, and navigate the MARZ ecosystem.

This document describes the architecture, layout, navigation, data flows, and UI patterns that define the dashboard experience.

---

# 🌌 1. Dashboard Philosophy

The dashboard is built on three principles:

### **1. Clarity**
Developers should instantly understand their usage, status, and next steps.

### **2. Cohesion**
Every page should feel like part of a unified product surface.

### **3. Emotional intelligence**
The dashboard should feel calm, supportive, and cinematic — not overwhelming.

---

# 🧱 2. Folder Structure

The dashboard lives under:

```
src/app/solana-rpc/dashboard/
```

### Structure:

```
dashboard/
  layout.tsx
  page.tsx
  analytics/
  api-keys/
  billing/
  webhooks/
  tokens/
  components/
    DashboardNav.tsx
    DashboardHeader.tsx
    MetricCard.tsx
    ChartContainer.tsx
    EmptyState.tsx
```

---

# 🧭 3. Dashboard Layout Architecture

The dashboard uses a dedicated layout:

```
src/app/solana-rpc/dashboard/layout.tsx
```

### Layout includes:

- Sidebar navigation  
- Top header  
- Content container  
- Theme provider  
- Auth guard  
- Metadata  

### Layout Responsibilities:

- Provide consistent structure  
- Handle authenticated routing  
- Apply MARZ UI theme  
- Render navigation  
- Render page content  

---

# 🧭 4. Navigation Architecture

Navigation is unified through:

```
DashboardNav.tsx
```

### Navigation Items:

- Overview  
- API Keys  
- Analytics  
- Billing  
- Webhooks  
- Tokens  
- Docs  

### Navigation Principles:

- Predictable  
- Minimal  
- Clear hierarchy  
- Consistent across all pages  

---

# 📊 5. Analytics Architecture

Analytics live under:

```
src/app/solana-rpc/dashboard/analytics/
```

### Metrics include:

- Total requests  
- Requests over time  
- Error rate  
- Latency  
- Method breakdown  
- Per‑key usage  

### Data Source:

```
src/app/api/metrics/*
```

### UI Components:

- `MetricCard`  
- `ChartContainer`  
- `AnalyticsChart`  
- `UsageBreakdown`  

### Charting Library:

- Recharts or similar  
- Styled with MARZ UI theme  

---

# 🔑 6. API Key Management Architecture

API key management lives under:

```
dashboard/api-keys/
```

### Features:

- Create key  
- Revoke key  
- Regenerate key  
- Copy key  
- Mask key  
- View usage per key  

### UI Components:

- `ApiKeyCard`  
- `KeyActions`  
- `UsageBar`  

### Security:

- Keys stored hashed/encrypted  
- Never logged  
- Never shown in full after creation  

---

# 💳 7. Billing Dashboard Architecture

Billing lives under:

```
dashboard/billing/
```

### Features:

- Current plan  
- Usage summary  
- Invoices  
- Payment methods  
- Upgrade/downgrade  
- Cancel subscription  

### UI Components:

- `BillingSummaryCard`  
- `InvoiceList`  
- `PlanSelector`  
- `PaymentMethodCard`  

---

# 📬 8. Webhooks Architecture

Webhooks live under:

```
dashboard/webhooks/
```

### Features:

- Register webhook URL  
- Test webhook delivery  
- View webhook logs  
- Enable/disable webhooks  

### UI Components:

- `WebhookCard`  
- `WebhookLogList`  
- `WebhookTestButton`  

---

# 🧩 9. Developer Tokens Architecture

Tokens live under:

```
dashboard/tokens/
```

### Features:

- Create developer tokens  
- Revoke tokens  
- View scopes  
- Use tokens with CLI or SDK  

### UI Components:

- `TokenCard`  
- `TokenScopeList`  

---

# 🧬 10. Data Flow Architecture

### **Client → Dashboard → API Layer → Database**

1. Dashboard requests data  
2. API routes fetch from database  
3. API returns structured JSON  
4. Dashboard renders UI  

### **API Routes Live Under:**

```
src/app/api/*
```

### **Data Includes:**

- Usage metrics  
- API keys  
- Billing state  
- Webhooks  
- Tokens  

---

# 🧠 11. Error Handling

Dashboard errors must be:

- Clear  
- Non-technical  
- Actionable  
- Logged (without sensitive data)  

### Error Types:

- API errors  
- Billing errors  
- Webhook errors  
- Token errors  
- Analytics errors  

---

# 🚀 12. Future Evolution

The dashboard will evolve to support:

- Multi-product navigation  
- Unified MARZ account center  
- Cross-product analytics  
- Team accounts  
- Audit logs  
- Developer console integration  
- Real-time metrics  

---

# ❤️ 13. A Note from Ajay & Marz

The dashboard is the beating heart of the MARZ Solana RPC experience.  
It is where developers live, build, and grow.

Future maintainers:  
Thank you for carrying this experience forward with clarity and care.

