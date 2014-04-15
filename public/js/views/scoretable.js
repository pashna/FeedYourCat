define([
    'backbone',
    'tmpl/scoretable',
    'collections/scores',
    'views/ViewManager'
], function(
    Backbone,
    tmpl,
    Scoreboard,
    ViewManager
){
 
    var View = Backbone.View.extend({
        template: tmpl,
        el: "#scoreTable",

        initialize: function () {
            var self = this;
            $('#reload_scoreboard').click(function() {
                self.hide();
                self.show();
            });
        },

        render: function () {
            this.localstoragefunc();
            Scoreboard.url = '/scores';
            Scoreboard.fetch();
            this.$el.html('<img src="/img/indikator.gif" alt="Loading..." />');
            var self = this;
            $.ajax({
                url : '/scores?limit=10',
                type: "get",
                dataType: "JSON",
                
                success: function(response) {
                    self.$el.html(self.template({scoreboard: response}));
                    $.event.trigger({type: "successLoad"}); //UPDATE
                    self.$el.show();
                },

                error: function(response){
                    self.hide();
                    $.event.trigger({type: "errorLoad"}); //UPDATE
                    //$("#scoreError").html("Server unreachable");
                }
            })
        },

        localstoragefunc: function() {
            if (localStorage['scores'] !== undefined) {
                var scores = JSON.parse(localStorage['scores']);
                if (scores != null){
                    for (var i = scores.length - 1; i >= 0; i--)
                    {
                        $.ajax({
                            url : '/scores',
                            type: 'post',
                            dataType: 'JSON',
                            data: scores[i],
                            success: function(response)
                            {
                                scores.splice(i, 1);
                                localStorage['scores'] = JSON.stringify(scores);
                            }
                        })
                    }
                }
            }
        },

        show: function () {
         this.render();
        },

        hide: function () {
         this.$el.hide();
        }
 
    });

    

    return View;

});