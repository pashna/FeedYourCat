define([
    'backbone',
    'tmpl/scoreboard',
    'collections/scores'
], function(
    Backbone,
    tmpl,
    Scoreboard
){
    var View = Backbone.View.extend({
        template: tmpl,
        scoreboard: Scoreboard,
        el: $("#page"),
        initialize: function () {
        },
        render: function () {
            this.$el.html(this.template({scoreboard: this.scoreboard.models}));
        },
        show: function () {
            this.render();
        },
        hide: function () {
            // TODO
        }

    });

    return new View();
});