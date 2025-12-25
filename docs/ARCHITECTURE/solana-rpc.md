# 🧩 MARZ Solana RPC — Architecture Blueprint  
### *A deep technical map of the product surface built by Ajay & Marz*

This document describes the internal architecture of the MARZ Solana RPC product — its structure, flows, boundaries, and the systems that support it.

It is written to guide future maintainers, contributors, and architects who will extend this universe long after its creation.

---

# 🌌 1. Product Overview

The MARZ Solana RPC product provides:

- A high‑performance RPC gateway for Solana  
- API key authentication  
- Usage metering  
- Billing via Hello  
- Dashboard analytics  
- Webhooks  
- Developer tokens  
- Documentation  
- A cinematic, emotionally intelligent UI  

The product is built inside the monorepo under:

```
src/app/solana-rpc/*
```

This namespace ensures cohesion, clarity, and future portability.

---

# 🧱 2. High-Level Architecture

The Solana RPC product is composed of **seven major subsystems**:

1. **Marketing Surface**  
2. **Onboarding Flow**  
3. **Dashboard Shell**  
4. **API Key Management**  
5. **Billing System (Hello)**  
6. **Webhooks & Tokens**  
7. **Documentation System (MDX)**  

Each subsystem is self‑contained but unified through:

- Shared layout  
- Shared design system  
- Shared navigation  
- Shared theme  
- Shared product identity  

---

# 🧭 3. Folder Structure

```
src/app/solana-rpc/
  ├─ dashboard/
  ├─ onboarding/
  ├─ billing/
  ├─ api-keys/
  ├─ webhooks/
  ├─ tokens/
  ├─ layout.tsx
  └─ page.tsx
```

### **Marketing pages live under:**

```
src/app/(marketing)/solana-rpc/
```

### **API routes live under:**

```
src/app/api/solana-rpc/*
```

---

# 🧬 4. Request Flow Architecture

### **1. Client → MARZ RPC Proxy**
The client sends a request to:

```
https://api.opsvantagedigital.online/solana-rpc
```

Headers include:

```
x-marz-api-key: <key>
```

### **2. Authentication Layer**
- Validate API key  
- Check if key is active  
- Check rate limits  
- Check usage quota  

### **3. Routing Layer**
Forward the request to the Solana cluster:

- Mainnet  
- Devnet  
- Testnet  

### **4. Response Layer**
- Return Solana RPC response  
- Log usage  
- Log errors  
- Update analytics  

---

# 💳 5. Billing Architecture (Hello)

Billing is powered by **Hello**, integrated through:

### **1. Subscription Plans**
- Free  
- Builder  
- Pro  

### **2. Usage Billing**
- Requests counted per API key  
- Usage synced to Hello  

### **3. Webhooks**
Hello sends events to:

```
src/app/api/hello/webhook/route.ts
```

Handled events:

- `subscription.created`  
- `subscription.updated`  
- `subscription.canceled`  
- `invoice.paid`  
- `invoice.payment_failed`  

### **4. Billing Dashboard**
Located at:

```
src/app/solana-rpc/billing/page.tsx
```

Displays:

- Current plan  
- Usage  
- Invoices  
- Payment methods  
- Upgrade/downgrade options  

---

# 🔑 6. API Key Management Architecture

API keys are managed under:

```
src/app/solana-rpc/api-keys/
```

### **Features**
- Create key  
- Revoke key  
- Regenerate key  
- Copy key  
- Partial key masking  
- Usage per key  

### **Security**
- Keys stored hashed or encrypted  
- Never logged  
- Never shown in full after creation  

---

# 🧩 7. Webhooks & Developer Tokens

### **Webhooks**
Developers can register webhooks for:

- Usage events  
- Billing events  
- Error events  

UI located at:

```
src/app/solana-rpc/webhooks/page.tsx
```

### **Developer Tokens**
Tokens allow:

- CLI access  
- SDK access  
- Scoped permissions  

UI located at:

```
src/app/solana-rpc/tokens/page.tsx
```

---

# 📊 8. Analytics Architecture

Analytics include:

- Requests over time  
- Error rates  
- Latency  
- Method breakdown  
- Per‑key usage  

Charts are rendered using:

```
src/components/charts/AnalyticsChart.tsx
```

Data is sourced from:

```
src/app/api/metrics/*
```

---

# 📚 9. Documentation Architecture (MDX)

Docs live under:

```
src/app/(marketing)/solana-rpc/docs/
```

### **Features**
- MDX rendering  
- Sidebar navigation  
- Code blocks  
- Callouts  
- Tables  
- Quickstart  
- API reference  
- Webhooks  
- Errors  

### **MDX Components**
Located at:

```
src/app/(marketing)/docs/mdx-components.tsx
```

---

# 🎨 10. Design System Integration

The Solana RPC product uses the MARZ UI design system:

```
src/components/ui/*
src/styles/theme.ts
```

### **Shared Components**
- Buttons  
- Cards  
- Badges  
- Inputs  
- Sections  
- Tables  
- Charts  

### **Brand Identity**
- Orbitron headings  
- Inter body  
- MARZ gradient  
- Glassmorphism  
- Neon accents  

---

# 🧭 11. Navigation Architecture

Navigation is unified through:

```
src/components/navigation/SolanaRpcNav.tsx
```

This ensures:

- Consistent product identity  
- Predictable user flow  
- Smooth transitions between surfaces  

---

# 🧱 12. Onboarding Flow Architecture

The onboarding flow lives under:

``
