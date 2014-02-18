define([
], function(
){

    var Router = Backbone.Router.extend({
        routes: {
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            '*default': 'defaultActions'
        },
        defaultActions: function () {
            // TODO
        },
        scoreboardAction: function () {
            // TODO
        },
        gameAction: function () {
            // TODO
        }
    });

    return new Router();
});