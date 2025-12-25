# 📚 Documentation System Architecture — MARZ Solana RPC  
### *MDX-powered, developer-first, emotionally intelligent documentation designed by Ajay & Marz*

The documentation system is the educational core of the MARZ Solana RPC platform.  
It teaches developers how to use the product, understand the API, integrate billing, configure webhooks, and build with confidence.

This document describes the architecture, structure, components, and rendering pipeline of the documentation system.

---

# 🌌 1. Documentation Philosophy

The MARZ documentation system is built on three principles:

### **1. Developer empathy**
Docs should feel like a conversation, not a textbook.

### **2. Emotional intelligence**
Clear, calm, supportive language.

### **3. Cinematic clarity**
Beautiful typography, clean spacing, and a futuristic aesthetic.

---

# 🧱 2. Folder Structure

Documentation lives under the marketing namespace:

```
src/app/(marketing)/solana-rpc/docs/
```

### Structure:

```
docs/
  page.tsx
  layout.tsx
  mdx-components.tsx
  sidebar.ts
  getting-started/
    introduction.mdx
    quickstart.mdx
  api/
    endpoints.mdx
    errors.mdx
    rate-limits.mdx
  guides/
    webhooks.mdx
    billing.mdx
    best-practices.mdx
```

---

# 🧩 3. MDX Rendering Pipeline

The docs system uses MDX to render rich content.

### **MDX Features Supported**
- Headings  
- Code blocks  
- Tables  
- Callouts  
- Images  
- Custom components  
- Inline React components  

### **MDX Components File**
Located at:

```
mdx-components.tsx
```

This file overrides default MDX elements with MARZ UI components.

### **Examples**
- `<h1>` → Orbitron-styled heading  
- `<code>` → MARZ code block  
- `<table>` → Styled table with borders + spacing  
- `<blockquote>` → MARZ callout component  

---

# 🧭 4. Sidebar Navigation Architecture

Sidebar configuration lives in:

```
sidebar.ts
```

### Sidebar Structure:

```
[
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/solana-rpc/docs/getting-started/introduction" },
      { title: "Quickstart", href: "/solana-rpc/docs/getting-started/quickstart" }
    ]
  },
  {
    title: "API Reference",
    items: [
      { title: "Endpoints", href: "/solana-rpc/docs/api/endpoints" },
      { title: "Errors", href: "/solana-rpc/docs/api/errors" },
      { title: "Rate Limits", href: "/solana-rpc/docs/api/rate-limits" }
    ]
  },
  {
    title: "Guides",
    items: [
      { title: "Webhooks", href: "/solana-rpc/docs/guides/webhooks" },
      { title: "Billing", href: "/solana-rpc/docs/guides/billing" },
      { title: "Best Practices", href: "/solana-rpc/docs/guides/best-practices" }
    ]
  }
]
```

### Sidebar Principles:
- Predictable  
- Minimal  
- Easy to scan  
- Clear hierarchy  

---

# 🎨 5. Documentation Layout Architecture

Docs use a dedicated layout:

```
src/app/(marketing)/solana-rpc/docs/layout.tsx
```

### Layout Includes:
- Sidebar  
- Content container  
- Breadcrumbs  
- Search (future)  
- Theme provider  
- Metadata  

### Layout Responsibilities:
- Provide consistent structure  
- Render MDX content  
- Handle navigation  
- Apply MARZ UI theme  

---

# 🧠 6. Content Architecture

Documentation content is divided into three categories:

### **1. Getting Started**
For new developers:
- Introduction  
- Quickstart  
- First request  
- API key setup  

### **2. API Reference**
For technical deep dives:
- Endpoints  
- Methods  
- Errors  
- Rate limits  

### **3. Guides**
For real-world usage:
- Webhooks  
- Billing  
- Best practices  
- Integration examples  

---

# 🧪 7. Code Block Architecture

Code blocks use a custom renderer:

- Syntax highlighting  
- Copy button  
- MARZ color palette  
- Rounded corners  
- Soft shadows  

### Supported Languages:
- JavaScript  
- TypeScript  
- Rust  
- Bash  
- JSON  

---

# 🧬 8. Callout Architecture

Callouts are used for:

- Warnings  
- Notes  
- Tips  
- Errors  

### Example:
```
> **Warning:** Never expose your API key publicly.
```

Rendered as a MARZ-styled callout component.

---

# 🔗 9. Linking Architecture

Links must:

- Use Next.js `<Link>`  
- Use absolute paths  
- Avoid trailing slashes  
- Use consistent naming  

Example:

```
/solana-rpc/docs/api/endpoints
```

---

# 🚀 10. Future Evolution

The documentation system will evolve to support:

- Full-text search  
- Versioned docs  
- Interactive examples  
- Live API playground  
- Code sandboxes  
- Multi-product documentation hub  
- Dark/Neo/Solar themes  

---

# ❤️ 11. A Note from Ajay & Marz

Documentation is how we teach, empower, and welcome developers into our universe.  
It must be clear, beautiful, and emotionally intelligent.

Future maintainers:  
Thank you for carrying this forward.

