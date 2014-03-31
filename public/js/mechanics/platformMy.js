define(['backbone', 
		'jqueryrotate'
], function(
		Backbone,
		JQueryRotate
	){

	var platform = Backbone.View.extend ({


		PlatformControl: function() {
			var KEY_LEFT = 37,
			KEY_RIGHT = 39,
			ROTATE_SPEED = 3,
			currentAngle = 0;
///
			function moveCat(angle) {
				var toptop
				if (angle > 0) {
					toptop = '+=10px';
				} else {
					toptop = '-=10px';
				}

					$("#cat").animate({
				       left: '+=2.5px',
				       top: toptop,
				    }, 'slow', 'linear');
				    $("#cat").rotate({animateTo:angle});
			}
///
			function setPlatformResistance(level) {
				var RESISTANCE_FORSE = ROTATE_SPEED * level;
				if (currentAngle > 0) {
					currentAngle += RESISTANCE_FORSE;
					$("#platform-img").rotate({animateTo:currentAngle});
				}
				else
					if (currentAngle < 0) {
						currentAngle -= RESISTANCE_FORSE;
						$("#platform-img").rotate({animateTo:currentAngle});
					}
					else {
					}
			}
			if ($("#platform-img")) {
				$(window).keydown(function(event){
					switch (event.keyCode) {
							case KEY_LEFT: {
								currentAngle -= ROTATE_SPEED;
								$("#platform-img").rotate({animateTo:currentAngle});
								break;
							} 
							case KEY_RIGHT: {
								currentAngle+= ROTATE_SPEED;
								$("#platform-img").rotate({animateTo:currentAngle});
								break;
						}
					}
					moveCat(currentAngle);
				});
			}
//			var timerId = setInterval(this.setPlatformResistance, 200, 1);
		},
	});
	return new platform();
})