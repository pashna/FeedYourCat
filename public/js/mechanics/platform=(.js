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
			ROTATE_SPEED = 0.9,
			currentAngle = 0;
			function setPlatformResistance(level) {
				var RESISTANCE_FORSE = ROTATE_SPEED * level;
				if (currentAngle > 0) {
					currentAngle += RESISTANCE_FORSE;
					$("#platform-img").rotate({animateTo:currentAngle});
				}
				else {
					if (currentAngle < 0) {
						currentAngle -= RESISTANCE_FORSE;
						$("#platform-img").rotate({animateTo:currentAngle});
					}
					else {
					}
				}
			}
			if ($("#platform-img")) {
				$(window).keydown(function(event){
					switch (event.keyCode) {
							case KEY_LEFT: {
								currentAngle -= ROTATE_SPEED;
								$("#platform-img").rotate({animateTo:currentAngle});
							} 
							case KEY_RIGHT: {
								currentAngle+= ROTATE_SPEED;
								$("#platform-img").rotate({animateTo:currentAngle});
								break;
						}
					}
				});
			}

			function calcY(x) {
				return Math.tan(currentAngle*Math.PI/180)*x+290-currentAngle*6.2;
			}
			
			var xs = 0.2;
			var currentX = 400;

			function setCatMovement() {
					currentX+=xs;
					currentY=calcY(currentX);
				console.log("currentY = " + currentY + " currentX = " + currentX);
				if (currentAngle > 0) {
					$("#cat").css('left',currentX).css('top',currentY);
					$("#cat").rotate({animateTo:currentAngle});
					$("#platform-img").rotate({animateTo:currentAngle});
				}
				else {
					if (currentAngle < 0) {
						currentAngle -= RESISTANCE_FORSE;
						$("#platform-img").rotate({animateTo:currentAngle});
					}
					else {
					}
				}
			}
			var timerId = setInterval(setCatMovement, 25);
		},
	});
	return new platform();
})