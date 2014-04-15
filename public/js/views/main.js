define([
    'backbone',
    'tmpl/main',
    'views/ViewManager'
], function(
    Backbone,
    tmpl,
    ViewManager
){

    var View = Backbone.View.extend({
        template: tmpl,
        el: "#main",
        _name: "main",
        initialize: function () {
            this.render();
            this.hide();
        },
        render: function () {
            this.$el.html(this.template);
        },
        show: function () {
            $.event.trigger({type: "show",name: this._name}); 
           this.$el.show();
        },
        hide: function () {
            this.$el.hide();
        }

    });

    return new View();
});