module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    var functions = ['src/js/base.js'];
    var libs = [];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                jshintrc: '.jshintrc'

            },
            grunt: 'Gruntfile.js',
            files: [functions]
        },
        concat: {
            devExpanded: {
                options: {
                    sourceMap: false
                },
                src: [libs, functions],
                dest: 'js/functions.js',
            },
            distExpanded: {
                options: {
                    sourceMap: false
                },
                src: [libs, functions],
                dest: 'js/functions.expanded.js',
            }
        },
        uglify: {
            dist: {
                files: {
                    'js/functions.js': [libs, functions]
                },
                options: { sourceMap: true }
            },
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed',
                    unixNewlines: true,
                    sourcemap: 'auto'
                },
                files: {
                    'css/main.css': 'src/sass/main.scss'

                }
            },
            dev: {
                options: {
                    style: 'compact',
                    unixNewlines: true
                },
                files: {
                    'css/main.css': 'src/sass/main.scss'
                }
            }
        },
        jasmine: {
            src: ['js/functions.js'],
            options: {
                '--web-security': false,
                '--local-to-remote-url-access': true,
                '--ignore-ssl-errors': true,
                vendor: 'tests/libs/**/*.js',
                helpers: ['tests/jquery/jquery-1.12.4.min.js', 'tests/helpers/**/*.js'],
                specs: 'tests/spec/**/*.js',
            }
        },
        watchdev: {
            options: {
                livereload: true
            },
            js: {
                files: [libs, functions],
                tasks: ['jshint:files', 'concat:devExpanded']
            },
            sass: {
                files: ['src/sass/**/*.{scss,sass}'],
                tasks: ['sass:dev']
            },
        },
        watch: {
            options: {
                livereload: true
            },
            js: {
                files: [libs, functions],
                tasks: ['jshint:files', 'uglify:dist', 'concat:distExpanded']
            },
            sass: {
                files: ['src/sass/**/*.{scss,sass}'],
                tasks: ['sass:dist']
            }
        }
    });

    grunt.renameTask('watch', 'watchdev');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['jshint:files', 'uglify:dist', 'sass:dist', 'jasmine','watch']);
    grunt.registerTask('dev', ['jshint:files', 'concat:mainExpanded', 'sass:dev', 'jasmine', 'watchdev']);

}