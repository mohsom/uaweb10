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
                    'build/index.html': 'index.html',
                    'build/lecture.html': 'lecture.html',
                    'build/lectures-all.html': 'lectures-all.html'
                }
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                    'build/js/es5/script.js': ['js/es5/script.js']
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
                    'build/styles/css/main-page.css': [
                        'styles/css/main-page.css'
                    ],
                    'build/styles/css/lecture-page.css': [
                        'styles/css/lecture-page.css'
                    ],
                    'build/styles/css/all-lectures-page.css': [
                        'styles/css/all-lectures-page.css'
                    ],
                }
            }
        },

        babel: {
            options: {
                sourceMap: true,
                presets: ['es2015'],
                plugins:['transform-es2015-modules-commonjs']
            },
            dist: {
                files: {
                    'js/es5/script.js': 'js/es6/script.es6'
                }
            }
        },

        clean: {
            build: ['build']
        },
        sass: {
            dist: {
                files: {
                    'styles/css/main-page.css': 'styles/sass/main-page.scss',
                    'styles/css/lecture-page.css': 'styles/sass/lecture-page.scss',
                    'styles/css/all-lectures-page.css': 'styles/sass/all-lectures-page.scss'
                }
            }
        },

        pug: {
            compile: {
                options: {
                    data: {
                        debug: false
                    }
                },
                files: {
                    "index.html": ["pug/index.pug"],
                    "lecture.html": ["pug/lecture.pug"],
                    "lectures-all.html": ["pug/lectures-all.pug"]
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
                files: ['styles/sass/*.scss', 'styles/sass/components/*.scss'],
                tasks: ['sass']
                //options:{
                //    livereload: '<%= connect.options.livereload %>',
                //}
            },
            pug: {
                files: ['pug/*.pug', 'pug/components/*.pug'],
                tasks: ['pug']
            },

            es6: {
                files: ['js/es6/*.es6'],
                tasks: ['babel']
            },

            options: {
                //livereload: '<%= connect.options.livereload %>'
            },
            livereload: {
                files: [
                    'styles/css/*.css',
                    '<%=watch.pug.files%>',
                    '<%=watch.es6.files%>',
                    '<%=watch.scss.files%>',
                ],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
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
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-pug');
    grunt.loadNpmTasks('grunt-babel');
    grunt.registerTask('build', ['clean:build', 'sass', 'pug', 'babel', 'cssmin', 'htmlmin', 'copy', 'uglify', 'imagemin']);
    grunt.registerTask('serve', ['pug', 'sass', 'babel', 'connect', 'watch']);
};
