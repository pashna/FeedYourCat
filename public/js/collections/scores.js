define([
    'backbone',
    'models/score'
], function(
    Backbone,
    Score
){
    var Collection = Backbone.Collection.extend({
    	model: Score,

    	comparator: function(score) {
            return -score.get("score");
        },

        initialize: function() {
        }

    });
    return new Collection();
});
