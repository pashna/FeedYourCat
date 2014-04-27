define([
    'backbone',
    'tmpl/scoreboard',
    'collections/scores',
    'views/ViewManager',
    'views/scoretable'
], function(
    Backbone,
    tmpl,
    Scoreboard,
    ViewManager,
    ScoreTable
){
  var View = Backbone.View.extend({
        el: "#scoreboard",
        template: tmpl,
        _name: "scoreboard",
        
        initialize: function () {
            this.render();
            this.scoreTable = new ScoreTable(); //Только после рендера основной вьюшки можем создать scoreTable
            this.hide();
        },
        render: function () {
            this.$el.html(this.template);
            self = this;
            $('#reload_scoreboard').click(function() {
                self.$el.show();
            });
            $(document).on("successLoad", function(event) { //UPDATE
                $("#reload_scoreboard").hide(); //UPDATE
            });
            $(document).on("errorLoad", function(event) { //UPDATE
                $("#reload_scoreboard").show(); //UPDATE
            });
        },
        show: function () {
            this.$el.show();
            this.scoreTable.show();
            $.event.trigger({
                type: "show",
                _name: this._name
            });
            
        },
        hide: function () {
            this.$el.hide();
        }
    });
    return new View();

});