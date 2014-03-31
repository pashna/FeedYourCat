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
		currentLevel: 0,

		initialize: function () {
			function Scores(_sc) {
				this.score = _sc;
			}
			this.currentScore = new Scores(0);
			this.scoreAfterLevel = new Scores(0);
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