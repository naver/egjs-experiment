/*global module:false*/
var _ = require('lodash');
var fs = require("fs");
var path = require("path");

module.exports = function(grunt) {
	"use strict";
	require("time-grunt")(grunt);
	require("load-grunt-tasks")(grunt);
	var jshint = require("./GruntTasks/jshint.js")(grunt);
	var jscs = require("./GruntTasks/jscs.js")(grunt);
	var qunit = require("./GruntTasks/qunit.js")(grunt);
	var jsdoc = require("./GruntTasks/jsdoc.js")(grunt);
	var gh_pages = require("./GruntTasks/gh_pages.js")(grunt);

	grunt.initConfig({});

	var components;
	//var tasks = ["jshint", "jscs", "qunit", "jsdoc"];
	var tasks = ["jshint", "jscs", "qunit"];
	var ignores = [".git", ".idea", "bower_components", "doc", "GruntTasks", "node_modules"];

	components = _.filter(fs.readdirSync(__dirname), function(file) {
		return _.indexOf(ignores, file) === -1 &&
				fs.statSync(path.join(__dirname, file)).isDirectory();
	});

	_.forEach(components, function(component) {
		jshint.config(component);
		jscs.config(component);
		qunit.config(component);
		//jsdoc.config(component);
	});

	gh_pages.config(components);

	grunt.registerTask("default", "default tasks", function(oo) {
		var runTasks;
		var target = grunt.option("target");

		if (target && target !== "") {
			if (_.indexOf(components, target) !== -1) {
				runTasks = _.map(tasks, function(task) {
					return task + ":" + target;
				})
			}
		} else {
			runTasks = tasks;
		}

		if (runTasks) {
			grunt.log.oklns("tasks: " + runTasks);
			grunt.task.run(runTasks);
		} else {
			grunt.log.errorlns("There is no matched target.");
		}
	});
};