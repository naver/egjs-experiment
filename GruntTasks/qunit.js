var path = require("path");

module.exports = function(grunt) {
	function config(component) {
		grunt.config(["qunit", component], {
			options: {
				timeout: 10000,
				"--web-security": "no",
				coverage: {
					disposeCollector: true,
					src: [path.join(component, "src/**/*.js")],
					instrumentedFiles: "temp/",
					htmlReport: "report",
					coberturaReport: "report",
					linesThresholdPct: 0
				},
				page: {
					viewportSize: { width: 320, height: 667 }
				}
			},
			src: [path.join(component, "test/*.test.html")]
		});
	};

	return {
		config: config
	};
};