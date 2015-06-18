module.exports = function (grunt) {

    grunt.initConfig({
        requirejs: {
            js: {
                options: {
                    mainConfigFile: "public/js/config.js",
                    baseUrl: "public/",
                    name: "app",
                    out: "public/js/main.js",
                    findNestedDependencies: true,
                }
            },
            css: {
                options: {
                    cssIn: "public/css/styles.css",
                    out: "public/css/styles.min.css",
                    optimizeCss: "default"
                }
            }
        },
        "string-replace": {
            updateHtmlIncludes: {
                files: {
                    'public/index.html': "public/index.html"
                },
                options: {
                    replacements: [
                        {
                            pattern: "js/config.js",
                            replacement: "js/main.js"
                        },
                        {
                            pattern: "css/styles.css",
                            replacement: "css/styles.min.css"
                        }
                    ]
                }
            },
        }

    });

    grunt.loadNpmTasks("grunt-contrib-requirejs");
    grunt.loadNpmTasks("grunt-string-replace");

    grunt.registerTask("deploy", ["requirejs", "string-replace"]);
};