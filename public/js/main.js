require.config({
    urlArgs: "_=" + (new Date()).getTime(),
    baseUrl: "js",
    paths: {
        jquery: "lib/jquery",
        underscore: "lib/underscore",
        backbone: "lib/backbone",
        jqueryrotate: "lib/jqueryrotate"
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'jqueryrotate': {
            deps: ['jquery'],
            exports: 'JQueryRotate'
        }
    }
});

define([
    'router'
], function(
    router
){
    Backbone.history.start();
});
