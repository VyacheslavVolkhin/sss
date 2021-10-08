module.exports = function (grunt) {
    /*const mozjpeg = require('imagemin-mozjpeg');*/
    grunt.initConfig({

        fixturesPath: "_includes",




        htmlbuild: {
            dist: {
                src: './_html/*.html',
                dest: './',
                options: {
                    beautify: true,
                    sections: {
                        scripts: '<%= fixturesPath %>/**/scripts.html',
                        head: '<%= fixturesPath %>/**/head.html',
                        header: '<%= fixturesPath %>/**/header.html',
                        footer: '<%= fixturesPath %>/**/footer.html',
                        footerorder: '<%= fixturesPath %>/**/footerorder.html',
                        sbs: '<%= fixturesPath %>/**/sbs.html',
                        popups: '<%= fixturesPath %>/**/popups.html',
                    },
                    data: {
                        version: "0.1.0",
                        title: "test",
                    },
                }
            }
        },

        css_datauri: {
            build: {
                options: {
                    exclude: ['*.svg']
                },
                src: 'css/style.css',
                dest: 'css/styleURI.css'
            }
        },

        imagemin: {
            /*static: {
                options: {
                    optimizationLevel: 3,
                    svgoPlugins: [{removeViewBox: false}],
                },
                files: {
                    'img/!*.png': 'img/!*.png',
                    'img/!*.jpg': 'img/!*.jpg',
                    'img/!*.gif': 'img/!*.gif',
                    'img/!*.svg': 'img/!*.svg',
                }
            },*/
            dynamic: {
                options: {
                    optimizationLevel: 6,
                    svgoPlugins: [{removeViewBox: false}],
                },
                files: [{
                    expand: true,
                    cwd: 'img/',
                    src: ['**/*.{png,jpg,gif, svg}'],
                    dest: 'img/'
                }]
            }
        },

        sprite: {
            all: {
                src: 'img/spr/*.png',
                dest: 'img/spr.png',
                destCss: 'css/less/icons.less',
                padding: 20,
                imgPath: '../img/spr.png',
                cssFormat: 'css',
                cssOpts: {
                    'functions': false,

                    'cssClass': function (item) {
                        return '.i-' + item.name;
                    }
                },
                algorithm: 'binary-tree'
            }
        },

        less: {
            development: {
                options: {
                    compress: false,
                    yuicompress: false,
                    optimization: 2
                },
                files: {
                    "css/style.css": "css/less/style.less",
                    "css/style.min.css": "css/less/style.less"
                }
            }
        },


        postcss: {
            min: {
                options: {
                    /*map: {
                        inline: false,
                        annotation: 'css/maps/'
                    },*/
                    processors: [
                        require('pixrem')(), // add fallbacks for rem units
                        require('autoprefixer')({overrideBrowserslist: 'last 2 versions'}), // add vendor prefixes
                        require('cssnano')({
                            options: {
                                sourcemap: false
                            },
                            dist: {
                                files: {
                                    "css/style.min.css": "css/style.min.css"
                                }
                            }
                        })
                    ]
                },
                src: 'css/style.min.css',
                dist: 'css/style.min.css',
            },
            style: {
                options: {
                    /*map: {
                        inline: false,
                        annotation: 'css/maps/'
                    },*/
                    processors: [
                        require('pixrem')(), // add fallbacks for rem units
                        require('autoprefixer')({overrideBrowserslist: 'last 2 versions'}),
                    ]
                },
                src: 'css/style.css',
                dist: 'css/style.css',
            }
        },



        watch: {
            html: {
                files: ['_includes/*.html', '_html/*.html'],
                tasks: 'htmlbuild'
            },
            sprite: {
                files: ['img/spr/*.png'],
                tasks: 'sprite'
            },
            styles: {
                files: ['css/less/*.less'],
                tasks: ['less', 'postcss'],
                options: {
                    nospawn: true
                }
            },
            // css: {
            //     files: ['css/style.css'],
            //     tasks: 'css_datauri'
            // },
        }
    });

    require('load-grunt-tasks')(grunt);
    require('postcss-plugin')({});

    grunt.registerTask('default', ['watch'], ["css_datauri"], ['less'], ['sprite'],  ['htmlbuild'], ['postcss'], ['imagemin']);
};