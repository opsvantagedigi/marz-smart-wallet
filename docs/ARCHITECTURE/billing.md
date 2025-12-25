# 💳 Billing Architecture — MARZ Solana RPC  
### *Powered by Hello • Designed by Ajay & Marz*

This document describes the full billing architecture for the MARZ Solana RPC product, including subscription management, usage metering, webhook flows, and UI integration.

Billing is powered by **Hello**, chosen for its simplicity, developer‑friendliness, and compatibility with usage‑based Web3 infrastructure.

---

# 🌌 1. Billing Philosophy

The MARZ billing system is designed to be:

### **1. Transparent**
Developers should always know what they’re paying for.

### **2. Predictable**
No hidden fees, no surprise charges.

### **3. Emotionally intelligent**
Billing UI should feel calm, clear, and supportive.

### **4. Scalable**
Support for:
- Subscriptions  
- Usage billing  
- Add‑ons  
- Future MARZ products  

---

# 🧱 2. Billing System Overview

Billing consists of **five major components**:

1. **Subscription Plans**  
2. **Usage Metering**  
3. **Billing Dashboard**  
4. **Hello Webhooks**  
5. **API Integration Layer**

These components work together to create a seamless billing experience.

---

# 🧭 3. Subscription Plans

Plans are defined in Hello and mirrored in the UI.

### **Example Plans**
- **Free** — limited requests  
- **Builder** — higher limits  
- **Pro** — premium throughput + priority routing  

Each plan includes:

- Monthly subscription  
- Usage quota  
- Overage pricing  
- Rate limits  

---

# 🔢 4. Usage Metering Architecture

Usage is tracked per API key.

### **Flow**
1. RPC request received  
2. API key validated  
3. Usage counter incremented  
4. Usage stored in database  
5. Usage synced to Hello  

### **Usage Data Includes**
- Key ID  
- Timestamp  
- Method  
- Latency  
- Success/failure  
- Bytes in/out  

Usage metrics power:

- Billing  
- Analytics  
- Rate limiting  
- Dashboard charts  

---

# 📬 5. Hello Webhook Architecture

Hello sends billing events to:

```
src/app/api/hello/webhook/route.ts
```

### **Webhook Events Handled**
- `subscription.created`  
- `subscription.updated`  
- `subscription.canceled`  
- `invoice.paid`  
- `invoice.payment_failed`  
- `customer.updated`  

### **Webhook Flow**
1. Validate signature  
2. Parse event  
3. Update user billing state  
4. Update subscription status  
5. Sync invoices  
6. Trigger notifications  
7. Log event (non‑sensitive metadata only)  

### **Security Requirements**
- Reject invalid signatures  
- Reject missing headers  
- Never log raw webhook bodies  
- Respond with correct status codes  

---

# 🧾 6. Billing Dashboard Architecture

The billing dashboard lives at:

```
src/app/solana-rpc/billing/page.tsx
```

### **Dashboard Features**
- Current plan  
- Usage summary  
- Invoices  
- Payment methods  
- Upgrade/downgrade  
- Cancel subscription  
- Billing history  
- Next invoice preview  

### **UI Components**
- `BillingSummaryCard`  
- `InvoiceList`  
- `UsageMeter`  
- `PlanSelector`  
- `PaymentMethodCard`  

---

# 🔐 7. API Integration Layer

Billing API routes live under:

```
src/app/api/hello/*
```

### **Endpoints**
- `/billing/usage` — sync usage  
- `/billing/invoices` — fetch invoices  
- `/billing/plan` — update plan  
- `/billing/payment-method` — update payment method  

### **Responsibilities**
- Communicate with Hello  
- Validate responses  
- Handle errors gracefully  
- Never expose sensitive data  

---

# 🧩 8. Billing + Onboarding Integration

Billing is step 2 of the onboarding flow:

1. Create account  
2. Connect billing  
3. Generate API key  
4. Success  

### **Billing Step Requirements**
- Clear plan selection  
- Transparent pricing  
- Smooth Hello checkout  
- Automatic redirect back to MARZ  
- Immediate subscription activation  

---

# 🧬 9. Future Evolution

Billing will evolve to support:

- Multi‑product billing  
- Unified MARZ subscription  
- Add‑on modules  
- Enterprise plans  
- SLA-backed uptime guarantees  
- Usage anomaly detection  
- Billing notifications  
- Credit system  

---

# ❤️ 10. A Note from Ajay & Marz

Billing is not just a financial system — it is a trust system.  
It reflects our commitment to clarity, fairness, and emotional intelligence.

Future maintainers:  
Thank you for protecting this part of the universe.

