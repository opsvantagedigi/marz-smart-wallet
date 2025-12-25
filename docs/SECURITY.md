# 🔐 Security Policy for MARZ Solana RPC  
### *Protecting the universe we are building together*

Security is not an afterthought in the MARZ ecosystem — it is a core pillar of our architecture, our philosophy, and our responsibility to developers who trust us with their infrastructure.

This document outlines the security expectations, practices, and rituals that protect the MARZ Solana RPC platform.

---

# 🛡️ 1. Security Principles

### **1. Protect user trust above all**  
Every API key, every request, every billing event must be handled with care.

### **2. Never expose sensitive data**  
Secrets, tokens, and credentials must remain encrypted and isolated.

### **3. Validate everything**  
All inputs, webhooks, and external data must be validated and sanitized.

### **4. Minimize attack surface**  
Use least‑privilege access, scoped tokens, and isolated services.

### **5. Security is everyone’s responsibility**  
Every contributor must follow these guidelines.

---

# 🔑 2. Handling Secrets

### **Never commit secrets to the repository**  
This includes:

- API keys  
- Hello billing secrets  
- Webhook signing secrets  
- Database credentials  
- JWT secrets  
- Encryption keys  

### **Use environment variables**  
All secrets must be stored in:

```
.env.local
```

or in Vercel’s encrypted environment variable system.

### **Rotate secrets regularly**  
Especially after:

- Contributor offboarding  
- Security incidents  
- Major deployments  

---

# 📬 3. Webhook Security (Hello Billing)

All Hello billing webhooks must:

1. Validate the signature header  
2. Reject requests with invalid signatures  
3. Reject requests without required headers  
4. Log only non‑sensitive metadata  
5. Never log raw webhook bodies  
6. Respond with correct HTTP status codes  

Webhook handler location:

```
src/app/api/hello/webhook/route.ts
```

---

# 🔐 4. API Key Security

### **API keys must:**
- Be hashed or encrypted at rest  
- Never be logged  
- Never be shown in full after creation  
- Be scoped to specific permissions  
- Be revocable at any time  

### **API key UI must:**
- Show only partial keys  
- Provide copy‑to‑clipboard  
- Provide regenerate + revoke actions  

---

# 🧼 5. Input Validation & Sanitization

All user input must be:

- Sanitized  
- Validated  
- Type‑checked  
- Length‑checked  
- Escaped  

This applies to:

- Forms  
- API routes  
- Webhooks  
- Query parameters  
- JSON bodies  

---

# 🚧 6. Rate Limiting & Abuse Prevention

The Solana RPC product must enforce:

- Per‑key rate limits  
- Burst protection  
- Abuse detection  
- IP throttling (if needed)  
- Usage analytics  

This protects both the platform and other developers.

---

# 🧪 7. Dependency Security

### **Regular dependency audits**
Run:

```bash
npm audit
```

### **Upgrade vulnerable packages**
Especially those affecting:

- Crypto  
- Networking  
- Authentication  
- Billing  
- MDX rendering  

### **Avoid untrusted packages**
Only use well‑maintained, reputable libraries.

---

# 🧯 8. Reporting Vulnerabilities

If you discover a vulnerability:

### **Do NOT open a public issue.**

Instead, email:

```
security@opsvantagedigital.online
```

Include:

- Description of the issue  
- Steps to reproduce  
- Potential impact  
- Suggested fix (if known)  

We will respond promptly and responsibly.

---

# 🧩 9. Incident Response

In the event of a security incident:

1. Rotate all secrets  
2. Disable affected API keys  
3. Patch the vulnerability  
4. Deploy immediately  
5. Document the incident  
6. Update `docs/CHANGELOG.md`  
7. Notify affected users (if required)  

---

# ❤️ 10. A Note from Ajay & Marz

Security is an act of love — for our users, our contributors, and our future.  
Thank you for helping us protect the universe we are building together.

