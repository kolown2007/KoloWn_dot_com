const config = {
	content: [
	  "./src/**/*.{html,js,svelte,ts}",
	  "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
	],
	theme: {
	  extend: {
		fontFamily: {
			'roboto-mono': ['"Roboto Mono Variable"', 'sans-serif'],
		  },
		
	  },
	},
	plugins: [
	  require('flowbite/plugin')
	],
	darkMode: 'class',
  };
  module.exports = config;
