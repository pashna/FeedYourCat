define([
    'backbone',
    'mechanics/startLevel', 
    'mechanics/createLevel'
], function(
    Backbone,
    StartLevel,
    CreateLevel
){


    var mechanics = Backbone.View.extend({
        startLevel: StartLevel,
        createLevel: CreateLevel,
        currentLevel: 1,

        initialize: function () {
            function Scores(_sc) {
                this.score = _sc;
            }
            this.currentScore = new Scores(0);
            this.scoreAfterLevel = new Scores(0);
            self = this;
            $(document).on("newGame", function(event) {
                self.setNewGameParameters();
                self.startGame();
            });
            $(document).on("setNull", function(event) {
                self.setNewGameParameters();
            });
        },

        setNewGameParameters: function () {
            this.currentLevel = 1;
            this.currentScore.score = 0;
        },

        startGame: function() {
            this.scoreAfterLevel.score = this.currentScore.score;
            var level = this.createLevel.createLevel(this.currentLevel);
            this.startLevel.game(level, this.scoreAfterLevel);  
        },

        levelUp: function() {
            this.currentLevel++;
            this.currentScore.score = this.scoreAfterLevel.score;
        }
    });
    return new mechanics();
})