define(['backbone', 
		'jqueryrotate',
		'views/GameOver'
], function(
		Backbone,
		JQueryRotate,
		GameOver
	){

	var platform = Backbone.View.extend ({


		game: function(game_level, start_score) {
			var KEY_LEFT = 37;
			var KEY_RIGHT = 39;
			var ROTATE_SPEED = 1;
			var currentAngle = 0;
			var START_LEFT = 435;
			var START_TOP = 417;
			var DELTA_X = 9;
			var HORISONTAL_FRICTION = 0.025;
			var FRICTION_COEFFICIENT_BACK = 0.022;
			var FRICTION_COEFFICIENT = 0.007;
			var currentX = 0;
			var side = "";
			var speed = 0;
			var platform = $("#platform-img");
			var cat_left = $("#cat_left");
			var cat_right = $("#cat_right");
			var cat_hungry = $("#cat_hungry");
			var cat_perfect = $("#cat_perfect");
			cat_perfect.css("display", "none");
			cat_hungry.css("display", "none");
			var sausage = document.getElementById('sausage');
			var canvas = document.getElementById('draw');
			var context = canvas.getContext('2d');
			context.font='40px Baskerville Old Face';
			context.fillStyle='#FFFFFF';
			context.clearRect(0,0, 800, 800); 
			var score_x = 930;
			var score_y = 50;
			var song = $('#score-sound');
			var score = start_score.score;
			var count_of_hide_sausage = 0;
			context.fillText(score, score_x, score_y); 
			var star1 = $("#1_star");
			var star2 = $("#2_star");
			var star3 = $("#3_star");
			var curXonPlatform = 0; // UPDATED
			var curYonPlatform = 0; // UPDATED
			$('.win-menu').css('display', 'none');
			window.pause = false;
			window.sound = true;
			server.on('message', function(data, answer){
				console.log("data="+data.type+"  "+data.value);
				switch(data.type) {
					case "angle": currentAngle = data.value; break;
					case "pause": window.pause = data.value; console.log("pause="+window.pause); break;
					case "sound": window.sound = data.value; console.log("sound="+window.sound); break;
				}
			});
			

			function moveLine() { // Переместить Сосиски
				for (var i = 0; i<game_level.Y.length; i++) {
					context.clearRect(game_level.X[i],game_level.Y[i],50,680);
					context.drawImage(sausage,game_level.X[i],game_level.Y[i]-620);
					game_level.Y[i] += game_level.SPEED[i];
					if (game_level.Y[i] > 500) {
						context.clearRect(game_level.X[i], 0, 50, 700);
						game_level.Y[i] = -5000;
						game_level.SPEED[i] = 0;
					}
				}
			}

			function sendShowIconC() {
				server.send(({
            		type: "show_iconc"
            	}), function(answer){
                		console.log(answer);
            		}
        		);
			}

			function isLevelEnd() { // Проверка на завершения уровня
				count_of_hide_sausage = 0;
				for (var i = 0; i<game_level.Y.length; i++) {
					if (game_level.Y[i]<-1000)
						count_of_hide_sausage++;
				}
				return ((count_of_hide_sausage == game_level.Y.length)||(isNotInArea()));
			}

			function doWinner() { // Действия при победе
				setTimeout("clearInterval("+timerId+")", 10);
				context.clearRect(0,0, 1000, 800); 
				start_score.score = score;
				$('.win-menu').css('display', 'block');
				sendShowIconC();
//					context.fillText("Score: "+ score, 420, score_y); 
			}

			function doLoser() { // Действия при поражении
				setTimeout("clearInterval("+timerId+")", 10);
				server.send(({
            		type: "show_newGame"
            	}), function(answer){
                		console.log(answer);
            		}
        		);

				context.clearRect(0,0, 1000, 800); 
				start_score.score = score;
				GameOver.show(start_score.score);

//					context.fillText("Score: "+ score, 420, score_y); 
			}

			function setPlatformResistance(level) { // Установка сопротивления платформы
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

			function countLeft(radius, angle) { // Вычисление значения left кота
				return radius*Math.cos(angle*Math.PI/180);
			}

			function countTop(radius, angle) { // Вычисление значения top кота
				return radius*Math.sin(angle*Math.PI/180);
			}

			if (platform) { // Пересчет текущего угла ???
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

			function isNotInArea() { // UPDATED Проверка на выход за границы
				return ((curXonPlatform>1110)|| // UPDATED
					(curXonPlatform<-110)|| // UPDATED
					(curYonPlatform>650)); // UPDATED
			} // UPDATED
			cat_right.css("left", START_LEFT + countLeft(currentX, currentAngle) +'px').css("top",  //UPDATED
				START_TOP + countTop(currentX, currentAngle) +'px'); // UPDATED
			cat_left.css("left", START_LEFT + countLeft(currentX, currentAngle) +'px').css("top",  //UPDATED
				START_TOP + countTop(currentX, currentAngle) +'px'); // UPDATED

			function setCatMovement() { // Основная функция
//				console.log("server="+window.server);
				if (!window.pause) {
					curXonPlatform = START_LEFT + countLeft(currentX, currentAngle); // UPDATED
					curYonPlatform = START_TOP + countTop(currentX, currentAngle); // UPDATED
					for (var i = 0; i<game_level.Y.length; i++) { // 
						if ((Math.abs((game_level.X[i]-curXonPlatform)) < 60 )&& // UPDATED
							(Math.abs(game_level.Y[i]-curYonPlatform) < 40 )) { // UPDATED
							console.log("sound="+window.sound);
								if (window.sound)
									song.get(0).play();
								game_level.Y[i]=-5000;
								game_level.SPEED[i]=0;
								score++;
								context.clearRect(0,0, 1000, 800); 
								context.fillText(score, score_x, score_y); 
							}
					}
					moveLine();
					if (isLevelEnd()) { // Действия при завершении уровня
						console.log("LEVEL END");
						var winner_percent=(score-start_score.score)/game_level.Y.length;
						if ((winner_percent>0.75)&&(winner_percent<0.85)) {
							star1.css('display','none');
							star2.css('display','none');
							doWinner();
						}
						if ((winner_percent>0.85)&&(winner_percent<0.95)) {
							star1.css('display','none');
							doWinner();
						}
						if ((winner_percent>0.95)) {
							doWinner();
						}
						if (winner_percent<=0.75) { 
							doLoser();
						}
					}
					$('#game-screen__back').click(function() {
	                	setTimeout("clearInterval("+timerId+")", 10);
	            	});
					platform.css('transform','rotate('+currentAngle+'deg)'); // Синхронизация поворота кота и платформы
					cat_left.css('transform','rotate('+currentAngle+'deg)'); // Синхронизация поворота кота и платформы
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
									if (speed < (-HORISONTAL_FRICTION-0.01)) speed += HORISONTAL_FRICTION;
									currentX += speed;
									cat_left.css("left", START_LEFT + countLeft(currentX, currentAngle) +'px').css("top", 
										START_TOP + countTop(currentX, currentAngle) +'px');
									break;

								}
								case 'left': {
									if (speed < 0) speed += HORISONTAL_FRICTION;
									if ((speed > 0)&&( speed < (HORISONTAL_FRICTION+0.01) ))
										speed=0;
									if (speed > (HORISONTAL_FRICTION+0.01)) speed -= HORISONTAL_FRICTION;
									currentX += speed;
									cat_right.css("left", START_LEFT + countLeft(currentX, currentAngle) +'px').css("top", 
										START_TOP + countTop(currentX, currentAngle) +'px');
									break;
								}
							}

						}
					}
				}
				else {
					console.log(window.pause);
					return 0;	
				}
			} 
			var timerId = setInterval(setCatMovement, 25);
		},
	});
	return new platform();
})