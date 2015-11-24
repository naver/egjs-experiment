var path = require("path");

module.exports = function(grunt) {
	function config(component) {
		grunt.config(["jscs", component], {
			options: {
				config: ".jscsrc"
			},
			src: [path.join(component, "src/**/*.js")]
		});
	}

	return {
		config: config
	};
};