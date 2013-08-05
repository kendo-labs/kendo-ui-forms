module.exports = function(grunt) {

  // karma setup
  var browsers;
  (function() {
    try {
      var config = grunt.file.readJSON('local.json');
      if (config.browsers) {
        browsers = config.browsers;
      }
    } catch (e) {
      var os = require('os');
      browsers = ['Chrome', 'Firefox', 'Opera'];
      if (os.type() === 'Darwin') {
        browsers.push('ChromeCanary');
        // Karma doesn't shut down Safari automatically, so commenting this out
        // for my sanity, for now.
        // browsers.push('Safari');
      }
      if (os.type() === 'Windows_NT') {
        browsers.push('IE');
      }
    }
  })();

  var banner = '/*\n * kendo-ui-forms v<%= pkg.version %>' +
                ' (<%= grunt.template.today("yyyy-mm-dd") %>)' +
                '\n * Copyright © 2013 Telerik\n *\n * Licensed under the' +
                ' Apache License, Version 2.0 (the "License")\n * you may' +
                ' not use this file except in compliance with the License.\n' +
                ' * You may obtain a copy of the License at\n *' +
                ' http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless' +
                ' required by applicable law or agreed to in writing,' +
                ' software\n * distributed under the License is distributed' +
                ' on an "AS IS" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS' +
                ' OF ANY KIND, either express or implied.\n * See the License' +
                ' for the specific language governing permissions and\n *' +
                ' limitations under the License.\n */\n';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';',
        banner: banner
      },
      dist: {
        src: [
          'src/js/kendo.forms.utils.js',
          'src/js/kendo.forms.features.js',
          'src/js/kendo.forms.types.js',
          'src/js/kendo.forms.js'
        ],
        dest: 'dist/js/kendo.forms.js'
      }
    },
    uglify: {
      options: {
        banner: banner
      },
      dist: {
        files: {
          'dist/js/kendo.forms.min.js': '<%= concat.dist.dest %>'
        }
      }
    },
    cssmin: {
      options: {
        banner: banner
      },
      combine: {
        files: {
          'dist/css/kendo.forms.css': 'src/css/*.css'
        }
      },
      minify: {
        expand: true,
        cwd: 'src/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'dist/css/',
        ext: '.forms.min.css'
      }
    },
    karma: {
      options: {
        configFile: 'conf/karma.conf.js',
        keepalive: true
      },
      browserstack: {
        browsers: ['BrowserStack:IE:Win']
      },
      forms: {
        browsers: browsers
      }
    },
    jshint: {
      files: ['gruntfile.js', 'src/**/*.js', 'spec/js/*.js'],
      options: {
        jshintrc: '.jshintrc',
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    kendo_lint: {
      files: ['src/**/*.js']
    },
    watch: {
      scripts: {
        files: ['<%= jshint.files %>'],
        tasks: ['minify', 'test', 'notify:watch'],
        options: {
          nospawn: true
        }
      }
    },
    jasmine: {
      src: ['lib/**/*.js', 'dist/js/kendo.forms.min.js'],
      options: {
        specs: 'spec/js/*.js',
        vendor: [
          'spec/lib/jasmine-jquery.js'
        ]
      }
    },
    changelog: {
      options: {
        dest: 'CHANGELOG.md',
        github: 'kendo-labs/kendo-ui-forms',
        version: grunt.file.readJSON('package.json').version
      }
    },
    notify: {
      watch: {
        options: {
          title: 'Watch complete',  // optional
          message: 'Minfication and tests have finished running', //required
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-karma-0.9.1');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-kendo-lint');
  grunt.loadNpmTasks('grunt-conventional-changelog');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'kendo_lint']);
	grunt.registerTask('minify', ['jshint', 'kendo_lint', 'concat',
    'cssmin', 'uglify']);
  grunt.registerTask('x-test', ['minify', 'karma:forms']);
	grunt.registerTask('test', ['jasmine']);
  grunt.registerTask('release', ['x-test', 'changelog']);
};