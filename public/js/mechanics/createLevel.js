define(['backbone',
	'jqueryrotate'
], function(
		Backbone,
		JQuery
	){

		var level = Backbone.View.extend ({
			createLevel: function(number_of_Level) {
				var sausage = new Object();
				switch(number_of_Level) {
					case 0: {
						sausage.X = [400];
						sausage.Y = [200];
						sausage.SPEED = [3];	
						break;
					}
					case 1: {
						sausage.X = [650];
						sausage.Y = [-80];
						sausage.SPEED = [1];
						break;
					}
					case 2: {
						sausage.X = [100,650];
						sausage.Y = [-80, -80];
						sausage.SPEED = [1.5, 0.5];
						break;
					}
					case 3: {
						sausage.X = [300, 600];
						sausage.Y = [-80, -80];
						sausage.SPEED = [1.5, 1.3];
						break;
					}
					case 4: {
						sausage.X = [300, 450, 600];
						sausage.Y = [-80, -80, -80];
						sausage.SPEED = [5, 1.3, 0.8];
						break;
					}
					case 5: {
						sausage.X = [100, 250, 500, 700];
						sausage.Y = [-80, -80, -80, -80];
						sausage.SPEED = [0.3, 1.3, 0.5, 2];
						break;
					}
					case 6: {
						sausage.X = [100, 250, 350, 500, 700];
						sausage.Y = [-80, -80, -80, -80, -80];
						sausage.SPEED = [0.7, 0.3, 0.5, 2, 1.6];
						break;
					}
					case 7: {
						sausage.X = [100, 250, 350, 400, 700, 300];
						sausage.Y = [-80, -80, -80, -80, -80, -40];
						sausage.SPEED = [0.7, 0.7, 0.5, 2, 1.6, 1.4];
						break;
					}
				}
				return sausage;
			}
		});
	return new level();
})