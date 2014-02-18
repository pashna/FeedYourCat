module.exports = function (grunt) {

    grunt.initConfig({
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['public/js/*/*.js'],
                dest: 'public/built.js'
            }
        },
        watch: {
            fest: {
                files: ['templates/*.xml'],
                tasks: ['concat', 'fest'],
                options: {
                    atBegin: true
                }
            },
            server: {
                files: [
                    'public/js/**/*.js', /* следим за статикой */
                    'public/css/**/*.css'
                ],
                options: {
                    interrupt: true,
                    livereload: true /* перезагрузить страницу */
                }
            }
        },
        connect: {
            server: {
                options: {
                    livereload: true, /* поддержка перезагрузки страницы */
                    port: 8000,
                    base: 'public'
                }
            }
        },
        fest: {
            templates: {
                files: [{
                    expand: true,
                    cwd: 'templates',
                    src: '*.xml',
                    dest: 'public/js/tmpl'
                }],
                options: {
                    template: function (data) {
                        return grunt.template.process(
                            'var <%= name %>Tmpl = <%= contents %> ;',
                            {data: data}
                        );
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-fest');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.registerTask('default', ['connect', 'watch', 'concat']);

};