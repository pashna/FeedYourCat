define(['backbone', 
		'jqueryrotate'
], function(
		Backbone,
		JQueryRotate
	){

	var platform = Backbone.View.extend ({

			

		PlatformControl: function(x_sausage, y_sausage, speed_sausage) {
			var KEY_LEFT = 37,
			KEY_RIGHT = 39,
			ROTATE_SPEED = 1,
			currentAngle = 0;
			
			var START_LEFT = 362.5;
			var START_TOP = 430;
			var DELTA_X = 9;
			var HORISONTAL_FRICTION = 0.04;
			var FRICTION_COEFFICIENT_BACK = 0.022;
			var FRICTION_COEFFICIENT = 0.007;
			var currentX = 0;
			var side = "";
			var speed = 0;
			var platform = $("#platform-img");
			var cat_left = $("#cat_left");
			var cat_right = $("#cat_right");
			var sausage=document.getElementById('sausage');
			var canvas = document.getElementById('draw');
			var context = canvas.getContext('2d');
			var div_score = $(".score");
			var song = $('#score-sound');
			var score = 0;

			function moveLine() {
				for (var i = 0; i<y_sausage.length; i++) {
					context.clearRect(x_sausage[i],y_sausage[i],50,600);
					context.drawImage(sausage,x_sausage[i],y_sausage[i]-620);
					y_sausage[i] += speed_sausage[i];
					if (y_sausage[i] > 430) {
					context.clearRect(x_sausage[i], 0,50 , 700);
					y_sausage[i]=5000;
					speed_sausage[i] = 0;
					}
				}
			}

			function setPlatformResistance(level) {
				var RESISTANCE_FORSE = ROTATE_SPEED * level;
				if (currentAngle > 0) {
					currentAngle += RESISTANCE_FORSE;
				}
				else {
					if (currentAngle <= 0) {
						currentAngle -= RESISTANCE_FORSE;
					}
					else {
					}
				}
			}
			if (platform) {
				$(window).keydown(function(event){
					switch (event.keyCode) {
							case KEY_LEFT: {
								currentAngle -= ROTATE_SPEED;
								break;
							} 
							case KEY_RIGHT: {
								currentAngle+= ROTATE_SPEED;
								break;
							}
					}
				})
			}

			function countLeft(radius, angle) {
				return radius*Math.cos(angle*Math.PI/180);
			}

			function countTop(radius, angle) {
				return radius*Math.sin(angle*Math.PI/180);
			}

			function setCatMovement() {
				for (var i = 0; i<y_sausage.length; i++) {
					if ((Math.abs((x_sausage[i]-(START_LEFT + countLeft(currentX, currentAngle)))) < 50 )&&
						(Math.abs(y_sausage[i]-(START_TOP + countTop(currentX, currentAngle))) < 50 )) {
							y_sausage[i]=5000;
							score++;
							div_score.text(score);
							song.get(0).play();
						}
				}
/*				console.log("x_s="+x_sausage[0]+" y_s="+y_sausage[0]);
							console.log("x="+(START_LEFT + countLeft(currentX, currentAngle))+" y="+
								(START_TOP + countTop(currentX, currentAngle))); */
				moveLine();
				platform.css('transform','rotate('+currentAngle+'deg)');
				cat_left.css('transform','rotate('+currentAngle+'deg)');
				if (currentAngle > 0) {
					if (speed > 0) speed+=currentAngle*FRICTION_COEFFICIENT;
						else speed+=currentAngle*FRICTION_COEFFICIENT_BACK;
					currentX += speed;
					side = 'right';
					cat_right.css("display", "none");
					cat_left.css("display", "block");
					cat_left.css("left", START_LEFT + countLeft(currentX, currentAngle) +'px').css("top", 
						START_TOP + countTop(currentX, currentAngle) +'px');
				}
				else {
					if (currentAngle < 0) {
						if (speed < 0) speed += currentAngle*FRICTION_COEFFICIENT;
							else speed += currentAngle*FRICTION_COEFFICIENT_BACK;
						currentX += speed;
						side = 'left';
						cat_left.css("display", "none");
						cat_right.css("display", "block");
						cat_right.css("left", START_LEFT + countLeft(currentX, currentAngle) +'px').css("top", 
						START_TOP + countTop(currentX, currentAngle) +'px');
					}
					else {
						switch (side) { // При нуле если едет вправо и если едет влево (тормоз)
							case 'right': {
								if (speed > 0) speed -= HORISONTAL_FRICTION;
								if ((speed < 0)&&(speed > (-HORISONTAL_FRICTION-0.01) )) speed = 0;
								currentX += speed;
								cat_left.css("left", START_LEFT + countLeft(currentX, currentAngle) +'px').css("top", 
									START_TOP + countTop(currentX, currentAngle) +'px');
								break;

							}
							case 'left': {
								if (speed < 0) speed += HORISONTAL_FRICTION;
								if ((speed > 0)&&( speed < (HORISONTAL_FRICTION+0.01) ))
									speed=0;
								currentX += speed;
								cat_right.css("left", START_LEFT + countLeft(currentX, currentAngle) +'px').css("top", 
									START_TOP + countTop(currentX, currentAngle) +'px');
								break;
							}
						}

					}
				}
			}
			var timerId = setInterval(setCatMovement, 25);
		},
	});
	return new platform();
})