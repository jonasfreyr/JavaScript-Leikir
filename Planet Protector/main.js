let canvas = document.getElementById("c");
let ctx = canvas.getContext("2d");

let width = canvas.width = 912;
let height = canvas.height = 912;

let mouse = false;
let enemySize = 30;
let enemySpeed = 10;

let booms = [];
let enemies = [];

class Enemy{
	constructor(x, y, vel){
		this.x = x;
		this.y = y;

		this.vel = vel

		this.size = enemySize;
	}

	draw(){
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
		ctx.fillStyle = "white";
		ctx.fill();
	}

	update(){
		this.x += this.vel[0];
		this.y += this.vel[1];
	}

	collison(){
		let x1 = this.x;
		let y1 = this.y;

		let x2 = p.dot.pos[0];
		let y2 = p.dot.pos[1];

		let vector = [x1 - x2, y1 - y2];
		let length = Math.sqrt(Math.pow(vector[0], 2) + Math.pow(vector[1], 2));

		if(this.size + p.dot.size >= length){
			return true;
		}
		else{
			return false;
		}
	}
}

class Weapon{
	constructor(size){
		this.pos = null;
		this.size = size;
	}

	draw(){

		if (this.pos !== null){
			ctx.beginPath();
			ctx.arc(this.pos[0], this.pos[1], this.size, 0, 2*Math.PI);
			ctx.fillStyle = "red";
			ctx.fill();
		}

	}
}
class Boom{
	constructor(x, y, size){
		this.x = x;
		this.y = y;
		this.Size = size;
		this.trans = 1;
		
	}
	draw(){
		this.trans -= 0.01 
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.Size, 0, 2*Math.PI);
		let strengur = "rgba(255,69,0," + this.trans + ")"
		ctx.fillStyle = strengur;
		ctx.fill();
	}
}

class Player{
	constructor(x, y, size){
		this.x = x;
		this.y = y;
		this.size = size;
		this.life = 10;

		this.dot = new Weapon(20);
	}
	draw(){
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
		ctx.fillStyle = "blue";
		ctx.fill();

		ctx.textAlign = "center";
		ctx.font = "60px Arial";
		ctx.fillStyle = "white";
		ctx.fillText(this.life, width / 2, height / 2 + 20);

		this.dot.draw();
	}
	event(){
		canvas.addEventListener("mousedown", function(e){
			mouse = true;
			let rect = e.target.getBoundingClientRect();
			p.dot.pos = [e.clientX - rect.left, e.clientY - rect.top]
		
		});

		canvas.addEventListener("mouseup", function(e){
				mouse = false;
				p.dot.pos = null;
		});

		canvas.addEventListener("mousemove", function(e){
			if (mouse === true){
				let rect = e.target.getBoundingClientRect();
				p.dot.pos = [e.clientX - rect.left, e.clientY - rect.top]
			}
			else{
				p.dot.pos = null;
			}
		});
	}

	collison(){
		let x1 = this.x;
		let y1 = this.y;

		for(let i = 0; i <= enemies.length -1; i++){
			let x2 = enemies[i].x;
			let y2 = enemies[i].y;

			let vector = [x1 - x2, y1 - y2];
			let length = Math.sqrt(Math.pow(vector[0], 2) + Math.pow(vector[1], 2));

			if(this.size + enemies[i].size >= length){
				booms.push(new Boom(x2, y2, enemies[i].size + 10))
				enemies.splice(i, 1);
				
				this.life -= 1
			}
		}

	}
}

function random(min,max) {
  var num = Math.random()*(max-min) + min;
  return num;
}

function newEnemy(x, y){
	if (!x && !y){
		let side = Math.floor(random(0, 4));
		if (side === 0){
			x = random(-500, 0 - enemySize / 2);
			y = random(-500, height + 500);
		}

		else if(side === 1){
			x = random(-500, width + 500);
			y = random(-500, 0 - enemySize / 2);
		}

		else if(side === 2){
			x = random(width + enemySize / 2, width + 500);
			y = random(-500, height + 500);
		}

		else if(side === 3){
			x = random(-500, width + 500);
			y = random(height + enemySize / 2, height + 500);
		}
	}

	let vector = [p.x - x, p.y - y];
	let length = Math.sqrt(Math.pow(vector[0], 2) + Math.pow(vector[1], 2));

	length = enemySpeed / length;

	vector[0] = (vector[0] * length);
	vector[1] = (vector[1] * length);

	enemies.push(new Enemy(x, y, vector));
}

function loop(){
	ctx.fillStyle = 'rgba(0,0,0, 0.1)';
  	ctx.fillRect(0, 0, width, height);

  	enemies.forEach(function(i, index){
  		i.update();
  		i.draw();

  		if(p.dot.pos !== null){
  			i.collison();
	  		if(i.collison() === true){
	  			booms.push(new Boom(i.x, i.y, i.size + 10));
	  			enemies.splice(index, 1)
	  		}
  		}
  	});
  	if(p.life !== 0){
  		p.collison();

  		p.draw();
  	}

  	if(p.life === 0){
  		ctx.fillStyle = 'rgba(0,0,0, 0.4)';
  		ctx.fillRect(0,0,width,height);

  		ctx.textAlign = "center";
		ctx.font = "60px Arial";
		ctx.fillStyle = "white";
		ctx.fillText("Game Over", width / 2, height / 2);
  	}

  	booms.forEach(function(boom, index){
		if (boom.trans <= 0){
			booms.splice(index, 1)
		
		}
		else{
			boom.draw();
		}
	})

  	requestAnimationFrame(loop);
}

let p = new Player(width / 2, height / 2, 50);

p.event();
//newEnemy(100, 100);

setInterval(newEnemy, 500)

loop();