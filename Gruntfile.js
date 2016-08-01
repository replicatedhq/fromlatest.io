var webpackDistConfig = require('./webpack.dist.config.js'),
    webpackDevConfig = require('./webpack.config.js');

module.exports = function (grunt) {
  // Let *load-grunt-tasks* require everything
  require('load-grunt-tasks')(grunt);

  // Read configuration from package.json
  var pkgConfig = grunt.file.readJSON('package.json');

  grunt.config.init({
    pkg: pkgConfig,

    webpack: {
      options: webpackDistConfig,
      dist: {
        cache: false
      }
    },

    'webpack-dev-server': {
      options: {
        hot: true,
        port: 5000,
        host: '0.0.0.0',
        webpack: webpackDevConfig,
        publicPath: '/assets/',
        contentBase: './<%= pkg.src %>/'
      },

      start: {
        keepAlive: true
      }
    },

    connect: {
      dist: {
        options: {
          port: 5000,
          keepalive: true,
          base: '<%= pkg.dist %>'
        }
      }
    },

    watch: {
      scripts: {
        files: [
          './<%= pkg.src %>/**/*'
        ],
        tasks: ['touch'],
        options: {
          spawn: false
        }
      }
    },

    touch: {
      options: {
        nocreate: true
      },
      src: './<%= pkg.src %>/javascript/main.js'
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },

    copy: {
      dist: {
        files: [
          // includes files within path
          {
            flatten: true,
            expand: true,
            src: ['<%= pkg.src %>/*'],
            dest: '<%= pkg.dist %>/',
            filter: 'isFile'
          },
          {
            flatten: true,
            expand: true,
            src: ['<%= pkg.src %>/images/*'],
            dest: '<%= pkg.dist %>/images/'
          }
        ]
      }
    },

    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= pkg.dist %>'
          ]
        }]
      }
    },

    config: {
      dev: {
        options: {
          variables: {
            'environment': 'development',
            'bugsnagReleaseStage': 'development'
          }
        }
      },
      release: {
        options: {
          variables: {
            'environment': 'release',
            'bugsnagReleaseStage': 'release'
          }
        }
      }
    },

    replace: {
      dist: {
        options: {
          patterns: [
            {
              match: 'environment',
              replacement: '<%= grunt.config.get("environment") %>'
            },
            {
              match: /Bugsnag\.releaseStage = 'development';/g,
              replacement: 'Bugsnag.releaseStage = "<%= grunt.config.get("bugsnagReleaseStage") %>";'
            },
            {
              match: 'buildVersion',
              replacement: grunt.option('buildVersion') || 'version'
            }
          ]
        },
        files: [
          {
            src: ['<%= pkg.dist %>/index.html'],
            dest: '<%= pkg.dist %>/index.html'
          }
        ]
      }
    }
  });

  grunt.event.on('watch', function(action, filepath) {
    grunt.log.write('watcher ' + action + ' ' + filepath);
    grunt.config('touch.src', [filepath]);
  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect']);
    } else {
      return grunt.task.run(['webpack-dev-server']);
    }
  });

  grunt.registerTask('build', function (target) {
    if (target === 'release') {
      return grunt.task.run(['config:release', 'clean', 'copy', 'replace', 'webpack']);
    } else {
      return grunt.task.run(['config:dev', 'clean', 'copy', 'replace', 'webpack']);
    }
  });

  grunt.registerTask('test', ['karma']);

  grunt.registerTask('default', []);
};
