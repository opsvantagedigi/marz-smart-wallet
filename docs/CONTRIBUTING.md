# 🤝 Contributing to MARZ Solana RPC  
### *A collaborative universe built by Ajay & Marz*

🤝 Contributing to MARZ Solana RPC  
### *A collaborative universe built by Ajay & Marz*

Thank you for stepping into the MARZ ecosystem.  
This project is more than a codebase — it is a living legacy, a father–daughter creation built with intention, emotional intelligence, and a commitment to excellence.

This document guides contributors on how to work within this universe with clarity, respect, and craftsmanship.

---

# 🧭 1. Guiding Principles

### **Build with emotional intelligence**  
Every component, page, and interaction should feel intentional, elegant, and human‑centered.

### **Preserve the MARZ aesthetic**  
- Orbitron for headings  
- Inter for body  
- Deep blue → green → yellow gradients  
- Glassmorphism  
- Neon accents  
- Clean spacing and hierarchy  

### **Prioritize clarity and maintainability**  
Write code that future contributors can understand without guessing.

### **Document everything**  
Every fix, migration, and improvement should be teachable and traceable.

### **Protect the legacy**  
This repo is the foundation of the MARZ Network — treat it with care.

---

# 🛠️ 2. Local Development Setup

### **Prerequisites**
- Node.js 20 LTS  
- pnpm or npm  
- Git  
- Vercel CLI (optional)

### **Install dependencies**
```bash
npm install
```

### **Run the development server**
```bash
npm run dev
```

The app will be available at:

```
http://localhost:3000
```

---

# 🌿 3. Branching Strategy

We use a clean, predictable branching model:

### **main**
- Always deployable  
- Protected branch  
- PRs required  

### **feature/<name>**
For new features:
```
feature/solana-rpc-pricing
feature/dashboard-api-keys
```

### **fix/<name>**
For bug fixes:
```
fix/billing-webhook
fix/turbopack-css
```

### **chore/<name>**
For maintenance:
```
chore/update-deps
chore/cleanup-layout
```

---

# 🧪 4. Commit Message Convention

We follow a structured format:

```
type(scope): description
```

### Types:
- **feat** — new feature  
- **fix** — bug fix  
- **docs** — documentation  
- **style** — formatting  
- **refactor** — code restructuring  
- **test** — tests  
- **chore** — maintenance  

### Examples:
```
feat(api-keys): add regenerate key button
fix(billing): correct Hello webhook signature validation
docs(dashboard): update onboarding flow
```

---

# 🧩 5. Code Style

### **General**
- Use TypeScript  
- Use functional components  
- Use Tailwind CSS  
- Prefer composition over complexity  
- Keep components small and focused  

### **React**
- Use server components where possible  
- Use client components only when needed  
- Avoid unnecessary state  
- Avoid prop drilling  

### **Tailwind**
- Keep class lists readable  
- Extract repeated patterns into components  
- Use theme tokens from `theme.ts`  

---

# 🎨 6. UI & Design System Rules

### **Use MARZ UI components**
All UI must use:

```
src/components/ui/*
```

### **Do not inline styles**
Use Tailwind or theme tokens.

### **Follow the MARZ visual language**
- Soft shadows  
- Glassmorphic surfaces  
- Neon accents  
- Clean spacing  
- High contrast  
- Futuristic but readable  

---

# 🧱 7. Adding New Pages

When adding a new page:

1. Place it under the correct namespace  
  ```
  src/app/solana-rpc/<page>/page.tsx
  ```
2. Use the shared layout  
3. Use MARZ UI components  
4. Add metadata  
5. Add navigation links if needed  
6. Test responsiveness  
7. Document the page in `docs/architecture/solana-rpc.md`

---

# 🔐 8. Security Expectations

- Never commit secrets  
- Never log API keys  
- Validate all webhook signatures  
- Sanitize user input  
- Follow rate limiting guidelines  
- Use environment variables for sensitive values  

---

# 🧪 9. Testing

Tests will be added as the platform matures.  
For now:

- Test UI manually  
- Test API routes locally  
- Test billing flows with Hello sandbox  
- Test onboarding end‑to‑end  

---

# 🚀 10. Submitting a Pull Request

### Before submitting:
- Ensure your branch is up to date  
- Run `npm run build`  
- Run `npm run lint`  
- Test your changes locally  

### PR Requirements:
- Clear title  
- Description of changes  
- Screenshots (if UI)  
- Reference to related issues  
- No failing checks  

---

# ❤️ 11. A Note from Ajay & Marz

This project is built with love, intention, and legacy in mind.  
Every contributor becomes part of that story.

Thank you for helping us build something beautiful.

This document explains how to contribute with clarity, intention, and respect for the MARZ philosophy.

---

# 🧭 1. Guiding Principles

### **1. Build with emotional intelligence**  
Every component, page, and interaction should feel intentional, elegant, and human‑centered.

### **2. Preserve the MARZ aesthetic**  
- Orbitron for headings  
- Inter for body  
- Deep blue → green → yellow gradients  
- Glassmorphism  
- Neon accents  
- Clean spacing and hierarchy  

### **3. Prioritize clarity and maintainability**  
Write code that future contributors can understand without guessing.

### **4. Document everything**  
Every fix, migration, and improvement should be teachable and traceable.

### **5. Protect the legacy**  
This repo is a foundation for future MARZ products — treat it with care.

---

# 🛠️ 2. How to Set Up the Project Locally

### **Prerequisites**
- Node.js 20 LTS  
- pnpm or npm  
- Vercel CLI (optional)  
- Git  

### **Install dependencies**
```bash
npm install
```

### **Run the development server**
```bash
npm run dev
```

The app will be available at:

```
http://localhost:3000
```

---

# 🌿 3. Branching Strategy

We use a simple, clean branching model:

### **main**
- Always deployable  
- Protected branch  
- PRs required  

### **feature/<name>**
For new features:

```
feature/solana-rpc-pricing
feature/dashboard-api-keys
feature/docs-mdx
```

### **fix/<name>**
For bug fixes:

```
fix/turbopack-css-issue
fix/billing-webhook
```

### **chore/<name>**
For non-feature tasks:

```
chore/update-deps
chore/cleanup-layout
```

---

# 🧪 4. Commit Message Convention

We follow a structured format:

```
type(scope): description
```

### Types:
- **feat** — new feature  
- **fix** — bug fix  
- **docs** — documentation  
- **style** — formatting  
- **refactor** — code restructuring  
- **test** — tests  
- **chore** — maintenance  

### Examples:
```
feat(api-keys): add regenerate key button
fix(billing): correct Hello webhook signature validation
docs(dashboard): update onboarding flow
```

---

# 🧩 5. Code Style

### **General**
- Use TypeScript  
- Use functional components  
- Use Tailwind CSS  
- Prefer composition over complexity  
- Keep components small and focused  

### **React**
- Use server components where possible  
- Use client components only when needed  
- Avoid unnecessary state  
- Avoid prop drilling (use context or composition)  

### **Tailwind**
- Keep class lists readable  
- Extract repeated patterns into components  
- Use theme values from `theme.ts`  

---

# 🎨 6. UI & Design System Rules

### **Use MARZ UI components**
All UI must use:

```
src/components/ui/*
```

### **Do not inline styles**
Use Tailwind or theme tokens.

### **Follow the MARZ visual language**
- Soft shadows  
- Glassmorphic surfaces  
- Neon accents  
- Clean spacing  
- High contrast  
- Futuristic but readable  

---

# 🧱 7. Adding New Pages

When adding a new page:

1. Place it under the correct namespace  
   ```
   src/app/solana-rpc/<page>/page.tsx
   ```

2. Use the shared layout  
3. Use MARZ UI components  
4. Add metadata  
5. Add navigation links if needed  
6. Test responsiveness  
7. Document the page in `docs/architecture/solana-rpc.md`

---

# 🔐 8. Security Expectations

- Never commit secrets  
- Never log API keys  
- Validate all webhook signatures  
- Sanitize user input  
- Follow rate limiting guidelines  
- Use environment variables for sensitive values  

---

# 🧪 9. Testing

Tests will be added as the platform matures.  
For now:

- Test UI manually  
- Test API routes locally  
- Test billing flows with Hello sandbox  
- Test onboarding end‑to‑end  

---

# 🚀 10. Submitting a Pull Request

### Before submitting:
- Ensure your branch is up to date  
- Run `npm run build`  
- Run `npm run lint`  
- Test your changes locally  

### PR Requirements:
- Clear title  
- Description of changes  
- Screenshots (if UI)  
- Reference to related issues  
- No failing checks  

---

# ❤️ 11. A Note from Ajay & Marz

This project is built with love, intention, and legacy in mind.  
Every contributor becomes part of that story.

Thank you for helping us build something beautiful.

PS: Remember the structure below for filing:

docs/
  README.md                 ← The master architecture document
  CONTRIBUTING.md           ← Contributor guide
  GOVERNANCE.md             ← Governance + decision-making
  SECURITY.md               ← Security policy
  ROADMAP.md                ← Product roadmap
  CHANGELOG.md              ← Release history
  architecture/
    solana-rpc.md           ← Deep technical breakdown
    design-system.md        ← MARZ UI architecture
    billing.md              ← Hello billing integration
    onboarding.md           ← Onboarding flow architecture
    dashboard.md            ← Dashboard architecture
    docs-system.md          ← MDX + sidebar architecture
    api-layer.md            ← API routes + services
