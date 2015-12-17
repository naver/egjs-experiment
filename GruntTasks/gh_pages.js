var _ = require('lodash');
var path = require("path");

module.exports = function(grunt) {
	function config(components) {
		var targets = ["bower_components/**/*", "egjs/**/*"];
		targets =_.reduce(components, function(result, component) {
			result.push(path.join(component, "src/**/*"));
			result.push(path.join(component, "demo/**/*"));
			return result;
		}, targets);

		grunt.config("gh-pages", {
			src: targets
		});
	}

	return {
		config: config
	};
};