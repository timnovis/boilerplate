module.exports = function(grunt) {
	grunt.initConfig({
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
			files:  "modules/**/*.js",
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
				proxy: 'http://localhost/~vektor/boilerplate/'
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
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks("grunt-jscs");
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-contrib-cssmin');


	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Launch CSSMin + BrowserSync + watch task
	grunt.registerTask('default', ['browserSync', 'cssmin', 'watch']);
}