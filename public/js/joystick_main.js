require.config({
    urlArgs: "_=" + (new Date()).getTime(),
    baseUrl: "js",
    paths: {
	    jquery: "/js/lib/jquery",
        underscore: "/js/lib/underscore",
        backbone: "/js/lib/backbone",
        Connector: "/js/lib/Connector",
        FnQuery: "/js/lib/FnQuery",
        "socket.io": "/socket.io/socket.io"
    },
    shim: {
	    'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        "socket.io": {
            exports: "io"
        }
    }
});

define([
    'Connector'
], function(
    Connector
){
	/*var message = document.getElementById('message');*/
	var input = document.getElementById('input-token');
	var start, init, reconnect;
	var token_screen = document.getElementById('token-screen');
	var joystick = document.getElementById('joystick');

	// Создаем связь с сервером
	var server = new Connector({
			server: ['bind'],
			remote: '/player'
		}
	);

	// Инициализация
	init = function() {
//		message.innerHTML = 'ready';
		// Если id нет
		if (!localStorage.getItem('playerguid')){
			// Ждем ввода токена
			input.parentNode.addEventListener('submit', function(e){
				e.preventDefault();
				// И отправляем его на сервер
				console.log("inputlavue="+input.value);
				server.bind({token: input.value}, function(data){
					if (data.status == 'success'){ //  В случае успеха
						// Стартуем джостик
						start(data.guid);
					}
				});
			}, false);

		} else { // иначе
			// переподключаемся к уже созданной связке
			reconnect();
		}
	};

	// Переподключение
	// Используем сохранненный id связки
	reconnect = function(){
		server.bind({guid: localStorage.getItem('playerguid')}, function(data){
			// Если все ок
			if (data.status == 'success'){
				// Стартуем
				start(data.guid);
			// Если связки уже нет
			} else if (data.status == 'undefined guid'){
				// Начинаем все заново
				localStorage.removeItem('playerguid');
				init();
			}
		});
	};


	// Старт игры
	start = function(guid){
		localStorage.setItem('playerguid', guid);
		console.log("12345");
		console.log("token\n"+token_screen);
		console.log("joy\n"+joystick);
		token_screen.style.display = "none";
		joystick.style.display = "block";
		on('my other event', function (data) {
    		console.log(data);
  		});
	};

	server.on('reconnect', reconnect);

	init();

	window.addEventListener('deviceorientation', handleOrientation);



	function handleOrientation(event) {
		currentAngle = Math.floor(event.beta); // In degree in the range [-180,180]
		if (currentAngle > 70) currentAngle = 70;
		if (currentAngle < -70) currentAngle = -70;
		server.send(currentAngle, function(answer){
			console.log(answer);
		});
	}


	// Обмен сообщениями
	server.on('message', function(data, answer){
		console.log('message', data);
		answer('answer');
	});

	window.server = server;

	/*
	server.send('message', function(answer){
		console.log(answer);
	});
	*/
});

