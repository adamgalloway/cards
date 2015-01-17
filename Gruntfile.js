module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  // TODO add livereload see: https://github.com/ChrisWren/grunt-nodemon
  grunt.initConfig({
    // Configure a mochaTest task
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },
    nodemon: {
      dev: {
        script: './app.js'
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= restify.options.port %>'
      }
    }    
  });

  grunt.registerTask('test', 'mochaTest');

  grunt.registerTask('server', function(arg) {
    if(arg && arg == 'prod')
    {
      grunt.task.run([
        'nodemon:prod',
        'open'
      ]);
    }
    else
    {
      grunt.task.run([
        'nodemon:dev',
        'open'
      ]);
    }
  });
  grunt.registerTask('default', [ 'server' ]);
  grunt.registerTask('dist', [ 'server:prod' ]);

};
