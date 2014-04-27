require.config({
    urlArgs: "_=" + (new Date()).getTime(),
    baseUrl: "js",
    paths: {
        jquery: "lib/jquery",
        underscore: "lib/underscore",
        backbone: "lib/backbone",
        jqueryrotate: "lib/jqueryrotate"
        Connector: "lib/Connector",
        FnQuery: "lib/FnQuery",
        "socket.io": "/socket.io/socket.io"
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
        "socket.io": {
            exports: "io"
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
