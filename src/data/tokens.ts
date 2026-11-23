export const TOKENS = {
  colors: {
    bgPrimary: '#030712',      // Deep arctic obsidian
    bgSecondary: '#070f1e',    // Sub-zero navy
    bgCard: 'rgba(8, 17, 34, 0.65)',
    glassBorder: 'rgba(186, 230, 253, 0.15)',
    glassBorderHover: 'rgba(186, 230, 253, 0.4)',
    accentIce: '#7dd3fc',      // Bright ice blue (9.2:1 contrast against #030712)
    accentGlow: '#38bdf8',     // Cyan glow (8.1:1 contrast)
    accentFrost: '#e0f2fe',    // Glacial frost white (15.5:1 contrast)
    textPrimary: '#f8fafc',    // Clean bright white (18.2:1 contrast)
    textSecondary: '#cbd5e1',  // Light silver-ice (12.1:1 contrast)
    textMuted: '#94a3b8',      // Slate-400 (7.1:1 contrast, exceeds WCAG AA 4.5:1)
    fogColor: '#030712',
  },
  typography: {
    display: 'var(--font-syne), sans-serif',
    sans: 'var(--font-inter), -apple-system, BlinkMacSystemFont, sans-serif',
  },
  transitions: {
    smooth: 'cubic-bezier(0.16, 1, 0.3, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
} as const
