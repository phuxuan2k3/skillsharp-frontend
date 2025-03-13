/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
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
				'primary': '#2e808a',
				'primary-toned': {
					'50': '#EAF6F8',
					'100': '#D5EEF1',
					'150': '#C0E5EA',
					'200': '#ABDDE3',
					'300': '#81CCD5',
					'400': '#56BBC7',
					'500': '#39A0AD',
					'600': '#2E808A',
					'700': '#226068',
					'800': '#174045',
					'850': '#113034',
					'900': '#0B2023',
					'950': '#061011',
				},
				'secondary': '#c1654d',
				'secondary-toned': {
					'50': '#F9F0ED',
					'100': '#F3E0DB',
					'150': '#ECD1CA',
					'200': '#E6C1B8',
					'300': '#DAA394',
					'400': '#CD8471',
					'500': '#C1654D',
					'600': '#A04D38',
					'700': '#783A2A',
					'800': '#50271C',
					'850': '#3C1D15',
					'900': '#28130E',
					'950': '#140A07',
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
		require("daisyui"),

		function ({ addUtilities }) {
			addUtilities({
				'.accent-primary': {
					accentColor: '#2E808A',
				},
			});
		},
		function ({ addComponents }) {
			addComponents({
				'.border-gradient': {
					position: 'relative',
					'&::after': {
						content: '""',
						position: 'absolute',
						inset: 0,
						border: '1px solid transparent',
						borderImage: 'linear-gradient(to right, var(--primary-color), var(--secondary-color)) 1',
						maskImage: 'linear-gradient(to right, #000 100%, transparent)',
						WebkitMaskImage: 'linear-gradient(to right, #000 100%, transparent)',
					},
				},
				'.border-t-gradient': {
					position: 'relative',
					'&::after': {
						content: '""',
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						height: '1px',
						backgroundImage: 'linear-gradient(to right, var(--primary-color), var(--secondary-color))',
					},
				},
				'.border-b-gradient': {
					position: 'relative',
					'&::after': {
						content: '""',
						position: 'absolute',
						bottom: 0,
						left: 0,
						right: 0,
						height: '1px',
						backgroundImage: 'linear-gradient(to right, var(--primary-color), var(--secondary-color))',
					},
				},
				'.border-l-gradient': {
					position: 'relative',
					'&::after': {
						content: '""',
						position: 'absolute',
						top: 0,
						bottom: 0,
						left: 0,
						width: '1px',
						backgroundImage: 'linear-gradient(to bottom, var(--primary-color), var(--secondary-color))',
					},
				},
				'.border-r-gradient': {
					position: 'relative',
					'&::after': {
						content: '""',
						position: 'absolute',
						top: 0,
						bottom: 0,
						right: 0,
						width: '1px',
						backgroundImage: 'linear-gradient(to bottom, var(--primary-color), var(--secondary-color))',
					},
				},
			});
		},
	],
	daisyui: {
		themes: ["light", "dark"],
		defaultTheme: "light",
	},
	important: true,
	corePlugins: {
		// preflight: false,
	},
}

