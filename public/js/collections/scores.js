define([
    'backbone',
    'models/score'
], function(
    Backbone,
    Score
){
    var playerList = [
        {name: "Beatle", score: 1000},
        {name: "Rocky", score: 1200},
        {name: "Lada_Granta", score: 500},
        {name: "mr.ChocoBoy", score: 3100},
        {name: "HomerJ.Simpson", score: 2400},
        {name: "SandmanFromHell", score: 1250},
        {name: "SpiderMan", score: 900},
        {name: "Max", score: 2100},
        {name: "Voloshin", score: 1800},
        {name: "Kenny", score: 2400},
    ];

    var Collection = Backbone.Collection.extend({
    	model: Score,

    	comparator: function(score) {
            return -score.get("score");
        },

        initialize: function() {
            this.add(playerList);
        }

    });
    return new Collection();
});
