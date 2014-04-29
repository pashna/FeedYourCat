define([
    'backbone',
    'tmpl/game',
    'mechanics',
    'views/ViewManager',
    'serverConnection'
], function(
    Backbone,
    tmpl,
    Mechanics,
    ViewManager,
    serverHelper
){

    var View = Backbone.View.extend({
        template: tmpl,
        el: "#game",
        _name: "game",
        mechanics: Mechanics,
        events: {
            'click #replay-button_win':'repeatLevel',
            'click #next-level':'nextLevel'
        },

        nextLevel: function() { 
            this.mechanics.levelUp();
            this.mechanics.startGame();
            server.send(({
            type: "hide_iconc",
            }), function(answer){
                console.log(answer);
                }
            );
        },

        repeatLevel: function() {
            this.mechanics.startGame();
            server.send(({
                type: "hide_iconc",
                }), function(answer){
                    console.log(answer);
                    }
            );
        },

        initialize: function () {
            this.render();
            this.hide();
            $(document).on("startGame", function(event) {
                Mechanics.startGame();
            });
            var self = this;
            server.on('message', function(data, answer){
                if (data.type == 'click') {
                    switch(data.value) {
                        case 'replay':
                            self.repeatLevel();
                            break
                        case 'next':
                            self.nextLevel();
                            break
                    }
                    server.send(({
                        type: "hide_iconc",
                        }), function(answer){
                            console.log(answer);
                        }
                    );
                }
            });
            self = this;
            server.on('message', function(data, answer) {
                if (data.type == "orien") {
                    //alert("davavalue="+data.value);
                    if (data.value == 1) {
                        $(".warning").css("display", "block");
                    } else {
                        $(".warning").css("display", "none");
                    }
                }
            });
        },

        render: function () {
            this.$el.html(this.template);
        },

        show: function () {
            $.event.trigger({type: "show",_name: this._name}); 
            this.$el.show();
            serverHelper.init();
        },  

        hide: function () {
            this.$el.hide();
            $(window).off('keydown');// TODO
        }
    });

    return new View();
});