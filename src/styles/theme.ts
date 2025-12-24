// src/styles/theme.ts

const theme = {
  colors: {
    brand: {
      blue: "#0a1a2f",
      green: "#27ffbf",
      yellow: "#ffe600",
      neon: "#39ff14",
      accent: "#00ffa3",
      dark: "#0e2e3a",
      light: "#f7e85a",
    },
    gradient: {
      marz: "linear-gradient(90deg, #0a1a2f 0%, #27ffbf 50%, #ffe600 100%)",
      blueGreen: "linear-gradient(90deg, #0a1a2f 0%, #27ffbf 100%)",
      greenYellow: "linear-gradient(90deg, #27ffbf 0%, #ffe600 100%)",
      neon: "linear-gradient(90deg, #00ffa3 0%, #39ff14 100%)",
    },
  },
  radii: {
    sm: "6px",
    md: "12px",
    lg: "16px",
    xl: "24px",
    full: "9999px",
  },
  shadows: {
    glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
    card: "0 4px 16px 0 rgba(39,255,191,0.12)",
    neon: "0 0 8px #39ff14, 0 0 16px #27ffbf",
  },
  typography: {
    fontFamily: {
      heading: "'Orbitron', sans-serif",
      body: "'Inter', sans-serif",
    },
    scale: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.25rem",
      xl: "1.5rem",
      '2xl': "2rem",
      '3xl': "2.5rem",
      '4xl': "3rem",
    },
    weight: {
      normal: 400,
      bold: 700,
      extrabold: 800,
    },
  },
  spacing: {
    xs: "0.5rem",
    sm: "1rem",
    md: "1.5rem",
    lg: "2rem",
    xl: "3rem",
  },
  zIndex: {
    base: 1,
    dropdown: 10,
    modal: 100,
    toast: 200,
    overlay: 1000,
  },
};

export default theme;
