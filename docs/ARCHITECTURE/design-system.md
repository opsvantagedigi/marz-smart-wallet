# 🎨 MARZ UI — Design System Architecture  
### *The visual and interaction language of the MARZ universe*

The MARZ UI Design System is the shared visual foundation for all MARZ products — Solana RPC, Smart Wallet, Sentinel, NeoSphere, and future surfaces.

It ensures that every page, component, and interaction feels:

- Cinematic  
- Futuristic  
- Emotionally intelligent  
- Cohesive  
- Recognizably MARZ  

This document describes the architecture, philosophy, and implementation of the MARZ UI system.

---

# 🌌 1. Design Philosophy

The MARZ aesthetic is built on four pillars:

### **1. Futuristic minimalism**
Clean lines, geometric shapes, and a sense of forward motion.

### **2. Emotional intelligence**
UI that feels intentional, calm, and human-centered.

### **3. Cinematic identity**
Lighting, gradients, and depth inspired by sci‑fi interfaces.

### **4. Brand consistency**
Every product should feel like part of the same universe.

---

# 🎨 2. Brand Identity

### **Typography**
- **Orbitron** — headings, titles, product names  
- **Inter** — body text, labels, descriptions  

### **Color System**
The MARZ gradient:

```
Deep Blue → Emerald Green → Solar Yellow
```

### **Visual Motifs**
- Glassmorphism  
- Neon accents  
- Soft shadows  
- High contrast  
- Clean spacing  
- Rounded corners with subtle radii  

### **Logo System**
Logos live under:

```
src/components/logos/*
```

Includes:

- MARZ  
- OpsVantage Digital  
- Solana  
- Hello  
- NeoSphere  

---

# 🧱 3. Component Architecture

All UI components live under:

```
src/components/ui/*
```

Components follow these principles:

### **1. Stateless by default**
Logic lives outside the component unless necessary.

### **2. Composable**
Small building blocks that can be combined into complex surfaces.

### **3. Accessible**
Keyboard navigation, ARIA labels, proper semantics.

### **4. Theme-driven**
Colors, spacing, shadows, and radii come from the theme.

### **5. Server-first**
Use server components unless interactivity is required.

---

# 🧩 4. Component Categories

### **Base Components**
- Button  
- Input  
- Select  
- Textarea  
- Badge  
- Avatar  
- Tooltip  

### **Layout Components**
- Card  
- Section  
- Container  
- Grid  
- Flex wrappers  

### **Navigation Components**
- Top navigation  
- Sidebar navigation  
- Breadcrumbs  
- Tabs  

### **Feedback Components**
- Toast  
- Alert  
- Skeleton  
- Loading spinner  

### **Data Components**
- Table  
- Chart  
- Metric card  
- Code block  

### **Product Components**
- API key card  
- Usage chart  
- Billing summary  
- Webhook card  
- Token card  

---

# 🎛️ 5. Theme Architecture

The theme lives in:

```
src/styles/theme.ts
```

### **Theme includes:**
- Colors  
- Gradients  
- Shadows  
- Radii  
- Spacing  
- Typography  
- Z-index layers  
- Transitions  

### **Example theme tokens:**
```ts
colors: {
  primary: "#00E1C6",
  secondary: "#0A84FF",
  accent: "#FFD600",
  background: "#020617",
  surface: "rgba(255,255,255,0.05)",
}
```

---

# 🧬 6. Tailwind Integration

Tailwind is configured to:

- Extend MARZ colors  
- Extend MARZ shadows  
- Extend MARZ radii  
- Add Orbitron + Inter fonts  
- Add gradient utilities  
- Add glassmorphism utilities  

Tailwind config lives in:

```
tailwind.config.ts
```

---

# 🧭 7. Layout System

Layouts unify the product experience.

### **Global layout**
```
src/app/layout.tsx
```

### **Solana RPC layout**
```
src/app/solana-rpc/layout.tsx
```

### **Dashboard layout**
```
src/app/solana-rpc/dashboard/layout.tsx
```

Layouts include:

- Navigation  
- Footer  
- Theme provider  
- Metadata  
- Shared spacing  

---

# 🧠 8. Interaction Design

Interactions follow these principles:

### **1. Smooth transitions**
Subtle motion, not distracting.

### **2. Clear affordances**
Buttons look clickable. Inputs look interactive.

### **3. Predictable behavior**
No surprises. No hidden actions.

### **4. Emotional resonance**
Micro‑interactions that feel alive.

---

# 🧪 9. Testing the Design System

Design system testing includes:

- Visual regression tests  
- Accessibility tests  
- Component snapshot tests  
- Responsive layout tests  

Future versions will include automated visual diffing.

---

# 🚀 10. Future Evolution

The MARZ UI system will evolve into:

- A standalone package (`marz-ui`)  
- Versioned releases  
- Documentation site  
- Component playground  
- Figma library  
- Theme variants (Dark, Neo, Solar)  

This document will grow as the design system grows.

---

# ❤️ 11. A Note from Ajay & Marz

The MARZ UI system is more than a set of components — it is the visual soul of our universe.

Future maintainers:  
Thank you for carrying this forward with care, clarity, and intention.

