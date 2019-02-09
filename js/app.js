var Calculadora = {
	x:"",
	y:"",
	op:"",
	ultimaOp:"",
	display:"",	
	
	init: function(){
		this.display = document.getElementById('display');
		this.teclando();
	},

	// Función para presioanr botones
	teclando: function(){
		var teclas = document.getElementsByClassName('tecla');

		for (var i = 0; i < teclas.length; i++) {
			teclas[i].onclick = this.presionarTecla;
		}
	},
	sumar: function(a,b){
		return a + b;;
	},
	restar: function(a,b){
		return a - b;
	},
	multiplicar: function(a,b){
		return a * b;
	},
	dividir: function(a,b){
		return a / b;
	},
	reset: function(){
		display.textContent = "0";
		Calculadora.x ="";
		Calculadora.y = "";
		Calculadora.op = "";
		Calculadora.ultimaOp = "";
	},
	calcular: function(){
		var res = 0;
		var error = false;

		switch(Calculadora.op){
			case "mas":
				res = this.sumar(Calculadora.x, Number(display.textContent));
				Calculadora.ultimaOp = "mas";
				Calculadora.y = Number(display.textContent);
				break;
			case "menos":
				res = this.restar(Calculadora.x, Number(display.textContent));
				Calculadora.ultimaOp = "menos";
				Calculadora.y = Number(display.textContent);
				break;
			case "por":
				res = this.multiplicar(Calculadora.x, Number(display.textContent));
				Calculadora.ultimaOp = "por";
				Calculadora.y = Number(display.textContent);
				break;
			case "dividido":
				if (Number(display.textContent) === 0) {
					error = true;
					display.textContent = "error";
				}else{
					res = this.dividir(Calculadora.x, Number(display.textContent));
					Calculadora.ultimaOp = "dividido";
					Calculadora.y = Number(display.textContent);
				}
				break;
			default:
				var resAnterior = Number(display.textContent);
				switch (Calculadora.ultimaOp){
					case "mas":
						res = resAnterior + Calculadora.y;
						break;
					case "menos":
						res= resAnterior - Calculadora.y;
						break;
					case "por":
						res = resAnterior * Calculadora.y;
						break;
					case "dividido":
						res = resAnterior / Calculadora.y;
						break;
				}
		}

		if (res.toString().indexOf(".") !== -1) {
			res = Number(res.toFixed(2));
		}

		if (res.toString().length >=8) {
			display.textContent = "error";
			error = true;
		}

		if (!error) {
			if (res.toString().indexOf(".") !== -1) {
				display.textContent = res.toFixed(2);
			}else{
				display.textContent = res;
			}
			Calculadora.op = "";
		}
	}, 

	// Reducir botones 
	presionarTecla: function (event){
		var tecla = event.target;
		tecla.style.transform = "scale(0.8)";

		setTimeout(function(){
			tecla.style.transform = "scale(1.0)";
		},100);

		switch (tecla.alt){
			case "On":
				Calculadora.reset();
			break;
			case "signo":
				if (display.textContent.length > 0) {
					if (display.textContent.substr(0, 1) === "-") {
						display.textContent = display.textContent.substr(1);
					}else{
						display.textContent = "-" + display.textContent;
					}
				}
				break;
			case "mas":
			case "menos":
			case "por":
			case "dividido":
				if (display.textContent.length !== 0) {
						Calculadora.x = Number(display.textContent);
				}
				Calculadora.op = tecla.alt;
				display.textContent = "";

				break;

			case "0":
				if (display.textContent.length > 0 && display.textContent.substr(0, 1) !== "0"
					|| display.textContent.length ===0
					|| display.textContent.indexOf(".") !== -1) {
					if (Calculadora.checarLargoDisplay()) {
						display.textContent = display.textContent + tecla.alt;
					}
				}
				break;
			case "1":
			case "2":
			case "3":
			case "4":
			case "5":
			case "6":
			case "7":
			case "8":
			case "9":
				if (Calculadora.checarLargoDisplay()) {
					Calculadora.quitarCeroDisplay();
					display.textContent = display.textContent + tecla.alt;
				}
				break;
			case "punto":
				if (display.textContent.length >0 && display.textContent.indexOf(".") === -1) {
					display.textContent = display.textContent + ".";
				}
				break;
			case "igual":
				Calculadora.calcular();
		}
	},
	checarLargoDisplay: function(){
		if (this.display.textContent.indexOf('-') !== -1) {
			return this.display.textContent.length < 9;
		}else{
			return this.display.textContent.length < 8;
		}
	},
	quitarCeroDisplay: function(){
		if (this.display.textContent.length === 1 && this.display.textContent === "0") {
			this.display.textContent = "";
		}
	}
}

Calculadora.init();