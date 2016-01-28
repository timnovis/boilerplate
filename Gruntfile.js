module.exports = function(grunt) {

	//Shows task time breakdown
	require('time-grunt')(grunt);

	grunt.initConfig({

	concurrent: {
		tasks1: ['compass', 'watch']
	},

	compass: {
		dist: {
			options: {
				sassDir: 'modules',
				cssDir: './'
			}
		}
	},

	watch: {
		css: {
			files: 'modules/**/*.scss',
			tasks: ['compass', 'cssmin']
		},
		js: {
			files: ['modules/**/*.js'],
			tasks: ['concat', 'uglify', 'jscs']
		}
	},

	jscs: {
		src: 'js/main.js',
		options: {
			config: "config.jscsrc"
		}
	},

	concat: {
		options: {
			separator: ';',
		},
		dist: {
			src: ['modules/**/*.js'],
			dest: 'js/main.js',
		},
	},

	cssmin: {
		target: {
			files: [{
				expand: true,
				cwd: './',
				src: ['*.css', '!*.min.css'],
				dest: './',
				ext: '.min.css'
			}]
		}
	},

	browserSync: {
		default_options: {
			bsFiles: {
				src: [
					'./*.css',
					"*.html"
					]
				},
			options: {
				watchTask: true,
				proxy: "localhost" + process.cwd().replace('/Sites', '').replace('/Users/','/~'),
			}
		}
	},

	uglify: {
		toUglify: {
			files: {
				'js/main.min.js': ['js/main.js']
			}
		}
	}
});

	//Load all grunt tasks using load-grunt-tasks (https://www.npmjs.com/package/load-grunt-tasks)
	require('load-grunt-tasks')(grunt);

	// Launch CSSMin + BrowserSync + watch task
	grunt.registerTask('default', ['browserSync', 'concurrent:tasks1']);
};