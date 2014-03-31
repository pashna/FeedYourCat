define([
    'backbone',
    'tmpl/game',
    'mechanics'
], function(
    Backbone,
    tmpl,
    Mechanics
){

    var View = Backbone.View.extend({
        template: tmpl,
        el: $("#page"),
        mechanics: Mechanics,
        events: {
        'click #replay-button_lose':'newGame',
        'click #replay-button_win':'repeatLevel',
        'click #next-level':'nextLevel'
        },


        nextLevel: function() {
            $(".win-menu").css('display', 'none'); 
            this.mechanics.levelUp();
            this.mechanics.startGame();
        },

        newGame: function() {
            $(".lose-menu").css('display', 'none');
            this.mechanics.setNewGameParameters();
            this.mechanics.startGame();
        },

        repeatLevel: function() {
            $(".win-menu").css('display', 'none'); 
            this.mechanics.startGame();
        },

        initialize: function () {
        },

        render: function () {
            this.$el.html(this.template);
            this.mechanics.startGame();

//            var level = this.createLevel.createLevel(0);
//            this.startLevel.game(level);
//            this.sausages.moveSausage(X, Y, SPEED);
//            this.cat.showOnClick();
        },
        show: function () {
            this.render();
        },
        hide: function () {
            $(window).off('keydown');// TODO
        }
    });

    return new View();
});