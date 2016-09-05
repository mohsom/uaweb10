import grunt from 'grunt';
import loadTasks from 'load-grunt-tasks';
loadTasks(grunt);
grunt.initConfig({
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
        jade: {
            files: ['jade/*.jade'],
            tasks: ['jade']
        },
        js: {
            files: ['js/es6/*.es6'],
            tasks: ['babel']
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

    babel: {
        options: {
            sourceMap: true,
            presets: ['es2015']
        },
        dist: {
            files: {
                'js/es5/script.js': 'js/es6/script.es6'
            }
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

grunt.registerTask('build', ['clean:build', 'sass', 'jade', 'cssmin', 'htmlmin', 'copy', 'babel' ,'uglify', 'imagemin']);
grunt.registerTask('serve', ['jade', 'sass', 'babel','connect', 'watch']);
grunt.registerTask('valid', ['validation', 'scsslint']);
