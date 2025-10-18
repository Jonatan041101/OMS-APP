/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#137fec',
				'background-light': '#f6f7f8',
				'background-dark': '#101922',
				'foreground-light': '#111418',
				'foreground-dark': '#f0f2f4',
				'secondary-light': '#617589',
				'secondary-dark': '#a1b1c2',
				'border-light': '#dbe0e6',
				'border-dark': '#2d3e4f',
			},
		},
	},
	plugins: [],
};
