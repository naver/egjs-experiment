var path = require("path");

module.exports = function(grunt) {
	function config(component) {
		grunt.config(["jshint", component], {
			options: {
				jshintrc: true,
				reporter: require("jshint-stylish")
			},
			src: [path.join(component, "src/**/*.js")]
		});
	}

	return {
		config: config
	};
};