let canvas = document.getElementById("c");
let ctx = canvas.getContext("2d");

let width = canvas.width = 912;
let height = canvas.height = 912;

let candy = false;
let score = 0;
let grid = [];
let gridWidth, gridHeight;
let gridSquareSize = 48;
let ai = false;

function random(min,max) {
  var num = Math.random()*(max-min) + min;
  return num;
}

class Body{
	constructor(x, y, dir){
		this.x = x;
		this.y = y;
		this.direct = dir;
	}

	draw(){
		ctx.beginPath();
		ctx.rect(this.x, this.y, gridSquareSize, gridSquareSize)
		ctx.fillStyle = "green";
		ctx.fill();
	}
}

class Head{
	constructor(x, y){
		this.x = x;
		this.y = y;
		this.direct = "";
		this.last_direct = this.direct;
		this.body = [];

	}

	draw(){
		ctx.beginPath();
		ctx.rect(this.x, this.y, gridSquareSize, gridSquareSize);
		ctx.fillStyle = "darkgreen";
		ctx.fill();

		for(let a of this.body){
			a.draw();
		}

	}

	event(){
	  if(ai === false){
	  let _this = this;
	  window.onkeydown = function(e) {
	    if(e.keyCode === 65 && _this.last_direct !== "right") { // a
	      _this.direct = "left";
	    } else if(e.keyCode === 68 && _this.last_direct !== "left") { // d
	     _this.direct = "right";
	    } else if(e.keyCode === 87 && _this.last_direct !== "down") { // w
	      _this.direct = "up";
	    } else if(e.keyCode === 83 && _this.last_direct !== "up") { // s
	      _this.direct = "down";
	    }
	      else if (e.keyCode === 82){
	      	new_game();
	      }
	  };
	  }
	  else{
	  	//ai stuff
	  }
	}

	update(){
		if(this.direct == "right"){
			this.x += gridSquareSize;
		}
		else if(this.direct == "left"){
			this.x -= gridSquareSize;
		}
		else if(this.direct == "up"){
			this.y -= gridSquareSize;
		}
		else if(this.direct == "down"){
			this.y += gridSquareSize;
		}
		
		this.last_direct = this.direct;

		let direct = this.direct;
		for(let a of this.body){
			if(a.direct == "right"){
				a.x += gridSquareSize;
			}
			else if(a.direct == "left"){
				a.x -= gridSquareSize;
			}
			else if(a.direct == "up"){
				a.y -= gridSquareSize;
			}
			else if(a.direct == "down"){
				a.y += gridSquareSize;
			}
			let new_dir = a.direct;
			a.direct = direct;
			direct = new_dir;
		}

	}

	collision(){
		for(let a of this.body){
			if (a.x === this.x && a.y === this.y){
				return true;
			}
		}
		return false;
	}

}

class Candy{
	constructor(x, y){
		this.x = x;
		this.y = y;
	}

	draw(){
		ctx.beginPath();
		ctx.rect(this.x, this.y, gridSquareSize, gridSquareSize);
		ctx.fillStyle = "red";
		ctx.fill();
	}
}

class Square{
	constructor(x, y){
		this.x = x;
		this.y = y;
	}
}

function make_grid(){
	gridWidth = width / gridSquareSize;
	gridHeight = height / gridSquareSize;

	let squares = gridWidth * gridHeight;

	let x = 0;
	let y = 0;
	for(let i = 0; i <= squares; i++){
		if(x / gridSquareSize == gridWidth){
			x = 0;
			y += gridSquareSize;
		}
		grid.push(new Square(x, y));

		x += gridSquareSize;
	}

}

function draw_grid(){
	for (let s of grid){
		ctx.beginPath();
		ctx.rect(s.x, s.y, gridSquareSize, gridSquareSize);
		ctx.stroke();
	}
}

function new_game(){
	snek = new Head(Math.floor(gridWidth / 2) * gridSquareSize, Math.floor(gridHeight / 2) * gridSquareSize)
	if(ai === false){
		snek.event();
	}
	score = 0;
}

function loop(){
  	ctx.fillStyle = 'rgba(255,255,255)';
  	ctx.fillRect(0, 0, width, height);
  	draw_grid();
  	if (candy === false){
  		let x = Math.floor(random(0, gridWidth)) * gridSquareSize;
  		let y = Math.floor(random(0, gridHeight)) * gridSquareSize;
  			
  		let ready = false;
  		while (ready === false){
  			let brake = false;
  			for(let a of snek.body){
  				if ((x === a.x && y === a.y) || (x === snek.x && y === snek.y)){
	  				x = Math.floor(random(0, gridWidth)) * gridSquareSize;
	  				y = Math.floor(random(0, gridHeight)) * gridSquareSize;
	  				brake = true;
	  			}
  			}
  			if (brake === false) {
  				ready = true;
  			}
  		}
  		candy = new Candy(x, y)
  	}
	
	candy.draw();
	if (snek !== false){
		snek.draw();
		if (ai === true){
			snek.event();
		}
		let date = new Date();
		if (date - last_date > 75){
			snek.update();
			last_date = date;
			if (snek.x >= width || snek.x < 0 || snek.y >= height || snek.y < 0){
				snek = false;
			}
		}
		
		if (snek.x === candy.x && snek.y === candy.y){
			candy = false;
			score += 1;
			if (snek.body.length === 0){
				let x = snek.x;
				let y = snek.y;

				if (snek.direct === "right"){
					x -= gridSquareSize;
				}

				else if(snek.direct === "left"){
					x += gridSquareSize;
				}

				else if(snek.direct === "up"){
					y += gridSquareSize;
				}

				else if(snek.direct === "down"){
					y -= gridSquareSize;
				}
				snek.body.push(new Body(x, y, snek.direct))
			}
			else{
				let num = snek.body[snek.body.length - 1];

				let x = num.x;
				let y = num.y;

				if (num.direct === "right"){
					x -= gridSquareSize;
				}

				else if(num.direct === "left"){
					x += gridSquareSize;
				}

				else if(num.direct === "up"){
					y += gridSquareSize;
				}

				else if(num.direct === "down"){
					y -= gridSquareSize;
				}
				snek.body.push(new Body(x, y, num.direct))
			}
			
		}
		if (snek !== false){
			if (snek.collision()) {
				snek = false;
			}
		}
	}

	if (snek == false){
  		ctx.fillStyle = 'rgba(0,0,0, 0.4)';
  		ctx.fillRect(0,0,width,height);

  		ctx.textAlign = "center";
		ctx.font = "60px Arial";
		ctx.fillStyle = "white";
		ctx.fillText("Game Over", width / 2, height / 2);
		ctx.fillText("Score: " + score, width / 2, height / 2 + 60);
  	}
	requestAnimationFrame(loop);
}
make_grid();
new_game();
let last_date = new Date();
loop();