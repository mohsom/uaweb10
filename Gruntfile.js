module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'build/index.html': 'index.html'
                }
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                    'build/js/script.js': [
                        'js/script.js'
                    ],
                    'build/js/offline-disable.js': [
                        'js/offline-disable.js'
                    ]
                }
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        src: [
                            'bower_components/**'
                        ],
                        dest: 'build/'
                    }
                ]
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'build/styles/css/style.css': [
                        'styles/css/style.css'
                    ]
                }
            }
        },

        clean: {
            build: ['build']
        },
        sass: {
            dist: {
                files: {
                    'styles/css/style.css': 'styles/sass/style.scss'
                }
            }
        },

        jade: {
            compile: {
                options: {
                    data: {
                        debug: false
                    }
                },
                files: {
                    "index.html": ["jade/index.jade"]
                }
            }
        },

        connect: {

            options: {
                port: 3000,
                hostname: 'localhost',
                livereload: 35719
            },

            livereload: {
                options: {
                    open: true
                }
            }
        },

        watch: {
            scss: {
                files: ['styles/sass/*.scss'],
                tasks: ['sass']
                //options:{
                //    livereload: '<%= connect.options.livereload %>',
                //}
            },
            jade:{
                files:['jade/*.jade'],
                tasks: ['jade']
            },
            css: {
                files: ['styles/css/*.css']
            },
            html: {
                files: ['*.html']
                //tasks: ['validation']
            },
            js: {
                files: ['js/*.js', 'Gruntfile.js']
            },
            options: {
                //livereload: '<%= connect.options.livereload %>'
            },
            livereload: {
                files: [
                    'styles/css/*.css',
                    '<%=watch.html.files%>',
                    '<%=watch.js.files%>'
                ],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            }
        },
        validation: {
            files: {
                src: ['*.html']
            }
        },
        scsslint: {
            allFiles: [
                'styles/sass/*.scss'
            ],
            options: {
                bundleExec: true,
                config: '.scss-lint.yml',
                reporterOutput: 'scss-lint-report.xml',
                colorizeOutput: true
            }
        },
        imagemin: {
            dynamic: {
                options: {
                    optimizationLevel: 7
                },
                files: [{
                    expand: true,
                    cwd: 'img/',
                    src: ['**/*.{png,jpg,jpeg}'],
                    dest: 'build/img'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-scss-lint');
    grunt.loadNpmTasks('grunt-html-validation');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.registerTask('build', ['clean:build', 'sass','jade', 'cssmin', 'htmlmin' ,'copy','uglify', 'imagemin']);
    grunt.registerTask('serve', ['jade','sass', 'connect', 'watch']);
    grunt.registerTask('valid', ['validation','scsslint']);
};
