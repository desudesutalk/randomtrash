module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        concat: {
            basic: {
                "options": { "separator": "\n" },
                "files": {
                    "tripwars.user.js": [
                                    'src/meta.js',
                                    'src/libs/zepto.min.js',
                                    'src/libs/md5.js',
                                    'src/libs/FileSaver.min.js',
                                    'src/libs/jszip.min.js',
                                    "src/utils.js",
                                    "src/odometer.js",
                                    "src/tw_parser.js",
                                    "src/tw_render.js",
                                    "src/tw_main.js"],
                    "tripwars.meta.js": ["src/meta.js"]
                }
            }
        },

        jshint: {
            all: ['src/**/*.js', 'src/misc/*.js'],
            options: {
                ignores: ['src/_tail.js','src/meta.js','src/_head.js','src/libs/*.js'],
                strict: false,
                browser: true,
                devel: true,
            }
        }
    });

    // Load required modules
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Task definitions
    grunt.registerTask('default', ['jshint', 'concat']);
};
