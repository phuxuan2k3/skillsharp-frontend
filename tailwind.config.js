/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				'primary': '#2e808a',
				'secondary': '#c1654d',
				'blue-chill': {
					'50': '#f2f9f9',
					'100': '#ddeff0',
					'200': '#bfe0e2',
					'300': '#92cace',
					'400': '#5faab1',
					'500': '#438e96',
					'600': '#3b757f',
					'700': '#356169',
					'800': '#325158',
					'900': '#2d464c',
					'950': '#1a2c32',
				},
			},
			textColor: {
				'gradient': 'transparent',
			},
			backgroundImage: {
				'gradient-text': 'linear-gradient(to right, var(--primary-color), var(--secondary-color))',
				'gradient-1': 'linear-gradient(to right, var(--primary-color), var(--secondary-color))',
			},
			boxShadow: {
				'gradient': '0px 4px 15px var(--primary-color), 0px 0px 30px var(--secondary-color)',
				'primary': '2px 2px 4px 1px var(--primary-color)',
				'secondary': '2px 2px 4px 1px var(--secondary-color)',
			},
			rotate: {
				'270': '270deg',
			},
			fontFamily: {
				arya: ['Arya'],
				asap: ['Asap'],
			},
		},
	},
	plugins: [
		function ({ addUtilities }) {
			addUtilities({
				'.accent-primary': {
					accentColor: '#2E808A',
				},
			});
		},
	],
	important: true,
	corePlugins: {
		// preflight: false,
	},
}

