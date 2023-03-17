/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './app/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			backgroundImage: {
				gradient1: 'linear-gradient(to bottom,rgba(20,20,20,0), rgba(20,20,20,1) )',
			},
			keyframes: {
				rotation: {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' },
				},
			},
			animation: {
				'ani-rotation': 'rotation 1s linear infinite',
			},
		},
	},
	plugins: [require('tailwind-scrollbar')({ nocompatible: true }), require('tailwind-scrollbar-hide')],
	variants: {
		scrollbar: ['rounded'],
	},
};
