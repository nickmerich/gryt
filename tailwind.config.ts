
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
				inter: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
			},
			fontWeight: {
				normal: '400',
				medium: '500',
				semibold: '600',
				bold: '700',
				black: '900',
			},
			fontSize: {
				'xs': ['0.75rem', { lineHeight: '1.4' }],
				'sm': ['0.875rem', { lineHeight: '1.5' }],
				'base': ['1rem', { lineHeight: '1.6' }],
				'lg': ['1.125rem', { lineHeight: '1.6' }],
				'xl': ['1.25rem', { lineHeight: '1.4' }],
				'2xl': ['1.5rem', { lineHeight: '1.3' }],
				'3xl': ['1.875rem', { lineHeight: '1.2' }],
				'4xl': ['2.25rem', { lineHeight: '1.2' }],
				'5xl': ['3rem', { lineHeight: '1.1' }],
				'6xl': ['3.75rem', { lineHeight: '1.1' }],
			},
			letterSpacing: {
				tighter: '-0.05em',
				tight: '-0.025em',
				normal: '0',
				wide: '0.025em',
				wider: '0.05em',
				widest: '0.1em',
			},
			lineHeight: {
				'3': '.75rem',
				'4': '1rem',
				'5': '1.25rem',
				'6': '1.5rem',
				'7': '1.75rem',
				'8': '2rem',
				'9': '2.25rem',
				'10': '2.5rem',
				'none': '1',
				'tight': '1.25',
				'snug': '1.375',
				'normal': '1.5',
				'relaxed': '1.625',
				'loose': '2',
			},
			colors: {
				// Core Gryt brand colors - Deep red and pure white
				border: 'hsl(220 13% 91%)',
				'border-subtle': 'hsl(220 13% 95%)',
				input: 'hsl(220 13% 95%)',
				ring: 'hsl(0 84% 60%)', // Deep red
				background: 'hsl(0 0% 100%)', // Pure white
				'background-subtle': 'hsl(220 13% 98%)',
				'background-muted': 'hsl(220 13% 95%)',
				foreground: 'hsl(0 0% 0%)',
				'foreground-muted': 'hsl(0 0% 40%)',
				
				// Primary brand color - Deep vibrant red
				primary: {
					DEFAULT: 'hsl(0 84% 60%)', // Deep red
					foreground: 'hsl(0 0% 100%)',
					hover: 'hsl(0 84% 55%)',
					active: 'hsl(0 84% 50%)',
					disabled: 'hsl(0 84% 70%)',
				},
				
				secondary: {
					DEFAULT: 'hsl(0 0% 40%)',
					foreground: 'hsl(0 0% 100%)',
					hover: 'hsl(0 0% 50%)',
					active: 'hsl(0 0% 30%)',
					disabled: 'hsl(0 0% 70%)',
				},
				
				// Red-themed status indicators
				destructive: {
					DEFAULT: 'hsl(0 84% 60%)',
					foreground: 'hsl(0 0% 100%)',
					hover: 'hsl(0 84% 55%)',
					background: 'hsl(0 84% 95%)',
				},
				success: {
					DEFAULT: 'hsl(0 84% 60%)',
					foreground: 'hsl(0 0% 100%)',
					hover: 'hsl(0 84% 55%)',
					background: 'hsl(0 84% 95%)',
				},
				warning: {
					DEFAULT: 'hsl(0 84% 60%)',
					foreground: 'hsl(0 0% 100%)',
					hover: 'hsl(0 84% 55%)',
					background: 'hsl(0 84% 95%)',
				},
				
				// Clean gray system for supporting elements
				muted: {
					DEFAULT: 'hsl(0 0% 95%)',
					foreground: 'hsl(0 0% 40%)'
				},
				accent: {
					DEFAULT: 'hsl(0 84% 95%)', // Light red accent
					foreground: 'hsl(0 84% 60%)'
				},
				popover: {
					DEFAULT: 'hsl(0 0% 100%)',
					foreground: 'hsl(0 0% 0%)'
				},
				card: {
					DEFAULT: 'hsl(0 0% 100%)',
					foreground: 'hsl(0 0% 0%)',
					border: 'hsl(220 13% 91%)'
				},
				sidebar: {
					DEFAULT: 'hsl(0 0% 98%)',
					foreground: 'hsl(0 0% 0%)',
					primary: 'hsl(0 84% 60%)',
					'primary-foreground': 'hsl(0 0% 100%)',
					accent: 'hsl(0 84% 95%)',
					'accent-foreground': 'hsl(0 84% 60%)',
					border: 'hsl(220 13% 91%)',
					ring: 'hsl(0 84% 60%)'
				}
			},
			boxShadow: {
				'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
				'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
				'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
				'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
				'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
				'red': '0 4px 14px 0 rgba(220, 38, 38, 0.2)',
			},
			borderRadius: {
				lg: '0.5rem',
				md: '0.375rem',
				sm: '0.25rem'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
