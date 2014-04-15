define([
    'backbone',
    'tmpl/gameover',
    'models/score',
    'collections/scores'

], function(
    Backbone,
    tmpl,
    Score,
    Scoreboard
){

    var View = Backbone.View.extend({
        template: tmpl,
        el: "#lose",
        score: 0,

        events: {'click #replay-button_lose':'newGame' //UPDATE
        },

        newGame: function() {
            this.$el.hide();
            $.event.trigger({type: "newGame"}); //UPDATE
        },

        initialize: function () {
            //TODO
        },

        render: function (score) {
            this.$el.html(this.template({score: score}));
            var self=this;
            $('#submit_score').click(function() {self.submit()});
            $('#game-screen__back').click(function() {self.hide()});    //!!!!!!!!!skdfjsdlfjdslfkdjs
        },

        show: function (score) {
            this.render(score);
            this.$el.show();
            this.score = score;
        },

        hide: function () {
            this.$el.hide();
        },

        submit: function() {
            var name = $('input[name="name"]').val();
            var score = this.score;
	        var input_name = $('input[name="name"]');
            input_name.prop("disabled", true);
	        var div_button = $('div[id="submit_score"]');
	        div_button.hide();

            var player = new Score({name: name, score: score});
            Scoreboard.add(player);
            $.event.trigger({type: "setNull"}); //UPDATE
            jQuery.ajax({
                url     : '/scores',
                type    : "POST", //Тип запроса
                dataType: "json", //Тип данных
                data    :  player.toJSON(), 
                success: function(response) { //Если все нормально
//                        $('lose-menu__form').prop("disabled", false);
                        $('#lose').hide();
                        window.location.replace("/#scoreboard");
                    },

                error: function(response) { //Если ошибка
                    if(response.status === 400) {   
                        $("#error_message").show();
			            input_name.prop("disables", false);
			            div_button.show();
                        name.val(null);//type again
                    } else {
                        if ($.isEmptyObject(localStorage['scores'])) {
                            console.log(localStorage['scores']+"=localStorage");
                            scores = [];
                        } else {
                            scores = JSON.parse(localStorage['scores']);
                        }
                        scores.push(player.toJSON());
                        localStorage['scores'] = JSON.stringify(scores);
                        console.log(localStorage['scores']+"=localStorage");
                        window.location.replace("/#");
                        $('#lose').hide();
			            input_name.prop("disables", false);
			            div_button.show();
                    }
                 }
            })
        }
    })
    return new View();
});

