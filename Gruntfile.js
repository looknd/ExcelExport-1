module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    shell: {
      multiple: {
        command: 'node app.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask("start", ["shell"]);
};