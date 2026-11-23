export const TOKENS = {
  colors: {
    bgPrimary: '#030712',      // Deep arctic obsidian
    bgSecondary: '#070f1e',    // Sub-zero navy
    bgCard: 'rgba(8, 17, 34, 0.65)',
    glassBorder: 'rgba(186, 230, 253, 0.12)',
    glassBorderHover: 'rgba(186, 230, 253, 0.35)',
    accentIce: '#7dd3fc',      // Bright ice blue
    accentGlow: '#38bdf8',     // Cyan glow
    accentFrost: '#e0f2fe',    // Glacial frost white
    textPrimary: '#f8fafc',
    textSecondary: '#cbd5e1',
    textMuted: '#64748b',
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
