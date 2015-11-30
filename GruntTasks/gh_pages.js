var _ = require('lodash');
var path = require("path");

module.exports = function(grunt) {
	function config(components) {
		var targets =_.reduce(components, function(result, component) {
			result.push(path.join(component, "src/**"));
			result.push(path.join(component, "demo/**"));
			return result;
		}, []);

		grunt.config("gh-pages", {
			src: targets
		});
	}

	return {
		config: config
	};
};