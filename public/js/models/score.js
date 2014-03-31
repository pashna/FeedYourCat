define([
    'backbone'
], function(
    Backbone
){

    var Model = Backbone.Model.extend({
        default: {
        	name: '',
        	score: 0
        }
    });
    return Model;
});