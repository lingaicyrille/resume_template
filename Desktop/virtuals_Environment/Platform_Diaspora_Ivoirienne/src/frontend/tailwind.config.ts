import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Côte d'Ivoire flag palette
        ci: {
          orange: '#F77F00',
          green: '#009A44',
        },
      },
    },
  },
  plugins: [],
}

export default config
