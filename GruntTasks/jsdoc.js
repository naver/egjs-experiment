var path = require("path");

module.exports = function(grunt) {
	function config(component) {
		grunt.config(["jsdoc", component], {
			options: {
				destination: "doc",
				template: "node_modules/egjs-jsdoc-template",
				configure: "jsdoc.json"
			},
			src: [path.join(component, "src/**/*.js"), path.join(component, "README.md")],
		});
	}

	return {
		config: config
	};
};