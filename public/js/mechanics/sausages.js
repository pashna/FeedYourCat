define([
    'backbone'
], function(
    Backbone
){
	var sauseg = Backbone.View.extend({
		moveSausage: function(x,y,speed) {
			function moveLine() {
				var canvas = document.getElementById('draw');
				var context = canvas.getContext('2d');
				var img = new Image();
				img.src = 'image.png';
				var img=document.getElementById('sause');
				context.fillStyle = '#FFFFFF';
				for (var i = 0; i<y.length; i++) {
					context.clearRect(x[i],y[i],50,600);
					context.drawImage(img,x[i],y[i]-620);
					y[i] += speed[i];
					if (y[i] > 350) {
					context.clearRect(x[i], 0,50 , 430);
					speed[i] = 0;
					}
				}
				setTimeout(moveLine, 20);
			}
			moveLine();
		}
	});
	return new sauseg();
});
	/*
	var Y = [0, 0, 0, 0]
	var X = [100, 450, 900, 1100];
	var SPEED = [1, 3, 4, 1.5];

	*/