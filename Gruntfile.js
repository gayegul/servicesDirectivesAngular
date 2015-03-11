'use strict';

module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-simple-mocha');

	grunt.initConfig({
		clean: {
			build: {
				src: ['/build']
			}
		}, 
		copy: {
			build: {
				expand: true,
				cwd: 'app/',
				src: '**/*.html',
				dest: 'build/',
				flatten: false,
				filter: 'isFile'
			}
		},
		browserify: {
			dev: {
				src: ['app/js/**/*.js'],
				dest: 'build/bundle.js'
			},
			test: {
				src: ['test/client_side/*_test.js'],
				dest: 'test/client_side/test_bundle.js'
			},
			karmatest: {
				src: ['test/karma_tests/*_test.js'],
				dest:'test/karma_tests/karma_test_bundle.js'
			},
			options: {
				transform: ['debowerify']
			}
		},
		karma: {
			unit: {
				configFile: 'karma.conf.js'
			}
		},
		jshint: {
			dev: {
				options: {
					node: true,
					globals: {
						describe: true,
						it: true,
						before: true,
						after: true,
						expect: true,
						afterEach: true,
						beforeEach: true,
						angular: true,
						chai: true
					}
				},
				src: ['Gruntfile.js', 'app/**/*.js', 'test/**/*_test.js', 'index.js']
			}
		},
		simplemocha: {
			all: {
				src: ['test/server/*_test.js']
			}
		}
	});

	grunt.registerTask('build', ['clean', 'jshint:dev', 'browserify', 'copy']);
	grunt.registerTask('build:test', ['browserify:test']);
	grunt.registerTask('test:client', ['browserify:karmatest', 'karma:unit']);
	grunt.registerTask('test:server', ['simplemocha:all']);
	grunt.registerTask('default', ['build', 'build:test', 'test:client', 'test:server']);
};