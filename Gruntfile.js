module.exports = function(grunt) {
  require("matchdep").filterAll("grunt-*").forEach(grunt.loadNpmTasks);
  var webpack = require("webpack");
  grunt.initConfig({
    webpack: {
      build: {
        entry: "./src/webapp.js",
        output: {
          path: "./www/js",
          filename: "bolt.js"
        }
      }
    }
  });

  // The development server (the recommended option for development)
  grunt.registerTask("webapp", ["webpack"]);
  grunt.registerTask("default", ["webpack"]);
};