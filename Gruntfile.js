module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
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
    watch: {
      options: {
        livereload: true,
      },
      restify: {
        files:  [ '*.js','routes/*.js', 'models/*.js', 'config/*.js' ],
        tasks:  [ 'restify:dev' ],
        options: {
          spawn: false // Without this option specified restify won't be reloaded
        }
      }
    },
    restify: {
      options: {
        port : 3000,
        node_env: 'development'
      },
      dev: {
        options: {
          script: 'app.js',
          node_env: 'development'
        }
      },
      prod: {
        options: {
          script: 'app.js',
          node_env: 'production'
        }
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
        'restify:prod',
        'open',
        'watch'
      ]);
    }
    else
    {
      grunt.task.run([
        'restify:dev',
        'open',
        'watch'
      ]);
    }
  });
  grunt.registerTask('default', [ 'server' ]);
  grunt.registerTask('dist', [ 'server:prod' ]);

};
