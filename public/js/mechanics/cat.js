define(['backbone',
	'jqueryrotate'
], function(
		Backbone,
		JQuery
	){

	var cat = Backbone.View.extend ({

		showOnClick: function() {
				$(window).keydown(function(event) {
					$("#cat").animate({
				       left: '+=2px',
//				       top: '+=30px'
				    }, 'slow', 'linear');
				    $("#cat").rotate({animateTo:currentAngle});
				});

			}

	});
	return new cat();
})