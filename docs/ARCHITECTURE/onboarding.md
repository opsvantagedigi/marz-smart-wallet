# 🚀 Onboarding Architecture — MARZ Solana RPC  
### *A guided journey crafted by Ajay & Marz*

The onboarding flow is the emotional and functional gateway into the MARZ Solana RPC platform.  
It is designed to be cinematic, frictionless, and deeply intentional — a sequence that transforms a visitor into a fully activated developer.

This document describes the architecture, flow, UI, and integration points of the onboarding system.

---

# 🌌 1. Onboarding Philosophy

The onboarding experience is built on three principles:

### **1. Reduce cognitive load**
Developers should never feel overwhelmed or confused.

### **2. Celebrate progress**
Each step should feel like a milestone, not a chore.

### **3. Guide with emotional intelligence**
Clear language, supportive UI, and predictable flows.

---

# 🧭 2. High-Level Flow

The onboarding flow consists of **four steps**:

### **Step 1 — Create Account**
User signs up or logs in.

### **Step 2 — Connect Billing**
User selects a plan and completes Hello checkout.

### **Step 3 — Generate API Key**
User receives their first Solana RPC key.

### **Step 4 — Success**
User is guided into the dashboard and docs.

---

# 🧱 3. Folder Structure

The onboarding system lives under:

```
src/app/solana-rpc/onboarding/
```

### Files include:

```
page.tsx
layout.tsx
step-1-account.tsx
step-2-billing.tsx
step-3-api-key.tsx
step-4-success.tsx
components/
  ProgressIndicator.tsx
  StepCard.tsx
  CTAButton.tsx
```

---

# 🎨 4. UI Architecture

The onboarding UI uses:

- MARZ UI components  
- Glassmorphic surfaces  
- Orbitron headings  
- Inter body text  
- MARZ gradient accents  
- Soft transitions  
- Clear CTAs  

### **Shared Components**
- `ProgressIndicator`  
- `StepCard`  
- `CTAButton`  
- `OnboardingLayout`  

These ensure consistency across all steps.

---

# 🔐 5. Step 1 — Account Creation

### **Flow**
1. User enters email + password  
2. Auth service creates account  
3. User session is established  
4. User is redirected to Step 2  

### **Requirements**
- Validate email  
- Validate password  
- Show errors clearly  
- Persist session securely  

### **UI Goals**
- Calm, welcoming, minimal  
- Clear CTA: “Continue to Billing”  

---

# 💳 6. Step 2 — Billing Integration (Hello)

Billing is integrated through Hello’s hosted checkout.

### **Flow**
1. User selects a plan  
2. User is redirected to Hello checkout  
3. User completes payment  
4. Hello redirects back to MARZ  
5. Subscription is activated  
6. User is redirected to Step 3  

### **Security**
- Validate Hello redirect  
- Sync subscription state  
- Never expose billing secrets  

### **UI Goals**
- Transparent pricing  
- Clear plan comparison  
- Smooth transition to checkout  

---

# 🔑 7. Step 3 — API Key Generation

This is the moment the developer becomes “activated”.

### **Flow**
1. User clicks “Generate API Key”  
2. Backend creates a new key  
3. Key is hashed/encrypted at rest  
4. UI shows the key **once**  
5. User copies the key  
6. User proceeds to Step 4  

### **Security**
- Never log full keys  
- Never show full key again  
- Mask key in UI after creation  

### **UI Goals**
- Cinematic reveal  
- Clear copy button  
- Warning: “Store this key securely”  

---

# 🎉 8. Step 4 — Success Screen

This screen celebrates activation and guides the user forward.

### **Features**
- Success animation  
- API key summary  
- Quickstart links  
- CTA: “Go to Dashboard”  
- CTA: “View Docs”  

### **UI Goals**
- Emotional resonance  
- Clear next steps  
- Sense of accomplishment  

---

# 🧩 9. State Management

Onboarding state is persisted through:

- URL parameters  
- Session cookies  
- Server-side validation  

### **State includes