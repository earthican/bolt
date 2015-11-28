module.exports = function(grunt) {
  require("matchdep").filterAll("grunt-*").forEach(grunt.loadNpmTasks);
  var webpack = require("webpack");
  grunt.initConfig({
    webpack: {
      build: {
        entry: "./javascripts/bolt.js",
        output: {
          path: "./src/",
          filename: "bolt.js"
        }
      }
    }
  });

  // The development server (the recommended option for development)
  grunt.registerTask("default", ["webpack"]);
};