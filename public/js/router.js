define([
    'backbone',
    'views/main',
    'views/scoreboard',
    'views/game',
    'views/ViewManager'
], function(Backbone,
    mainScreen,
    scoreboardScreen,
    gameScreen,
    ViewManager
){
    var currentScreen = "";
    var Router = Backbone.Router.extend({
        routes: {
            'scoreboard': 'scoreboardAction',
            'game'      : 'gameAction',
            '*default'  : 'defaultActions'
        },
        initialize: function() {
             this.ViewManager = ViewManager;
        },
        defaultActions: function () {
            ViewManager.addView(mainScreen._name , mainScreen );
            mainScreen.show();
        },
        scoreboardAction: function () {
            ViewManager.addView(scoreboardScreen._name , scoreboardScreen );
            scoreboardScreen.show();
        },
        gameAction: function () {
            ViewManager.addView(gameScreen._name , gameScreen );
            gameScreen.show();
        }
    });

    return new Router();
});