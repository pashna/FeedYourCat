define([
    'backbone',
    'views/main',
    'views/scoreboard',
    'views/game'
], function(Backbone,
    mainScreen,
    scoreboardScreen,
    gameScreen
){
    var currentScreen = "";
    var Router = Backbone.Router.extend({
        routes: {
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            '*default': 'defaultActions'
        },
        defaultActions: function () {
            if (currentScreen === "scoreboard") {
                scoreboardScreen.hide();
            }
            else if (currentScreen === "game") {
                gameScreen.hide();
            };
            mainScreen.show();
            currentScreen = "main";
        },
        scoreboardAction: function () {
            if (currentScreen === "main") {
                mainScreen.hide();
            }
            else if (currentScreen === "game") {
                gameScreen.hide();
            };
            scoreboardScreen.show();
            currentScreen = "scoreboard";
        },
        gameAction: function () {
            if (currentScreen === "main") {
                mainScreen.hide();
            }
            else if (currentScreen === "scoreboard") {
                scoreboardScreen.hide();
            };
            gameScreen.show();
            currentScreen = "game";
        }
    });

    return new Router();
});