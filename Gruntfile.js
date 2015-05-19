module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            browserify: {
                files: ['javascripts/src/**/*.js', 'javascripts/src/**/*.jsx'],
                tasks: ['browserify:dev']
            },
            less: {
                files: 'styles/src/**/*.less',
                tasks: ['less:dev']
            }
        },

        browserify: {
            dev: {
                options: {
                    browserifyOptions: {
                        debug: true
                    },
                    watch: true,
                    keepAlive: false,
                    watchifyOptions: {
                        fullPaths: true
                    },
                    transform: [require('grunt-react').browserify]
                },
                src: ['javascripts/src/**/*.js'],
                dest: 'javascripts/build/application.js'
            },
            build: {
                options: {
                    browserifyOptions: {
                        debug: false
                    },
                    watch: false,
                    keepAlive: false,
                    watchifyOptions: {
                        fullPaths: false
                    },
                    transform: [require('grunt-react').browserify]
                },
                src: ['javascripts/src/**/*.js'],
                dest: 'javascripts/build/application.js'
            }
        },
        uglify: {
            client: {
                options: {
                    sourceMap: true,
                    sourceMapName: 'javascripts/build/application.min.js.sourcemap'
                },
                files: {
                    'javascripts/build/application.min.js': ['javascripts/build/application.js']
                }
            }
        },

        less: {
            dev: {
                options: {
                    paths: ["styles"],
                    sourceMap: true,
                    sourceMapFilename: "styles/build/site.css.map",
                    sourceMapBasepath: "styles/build"
                },
                files: {
                    "styles/build/site.css": "styles/src/import.less"
                }
            },
            build: {
                options: {
                    paths: ["styles"],
                    compress: true
                },
                files: {
                    "styles/build/site.min.css": "styles/src/import.less"
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerTask('default', ['browserify', 'less:dev']);
    grunt.registerTask('auto', ['browserify', 'less:dev', 'watch']);
    grunt.registerTask('build', ['browserify:build', 'uglify', 'less:build']);
};