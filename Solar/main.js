function choose(choices) {
  let index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

function mousedown(event){
	let rect = c.getBoundingClientRect();
	let x = event.clientX - rect.left;
	let y = event.clientY - rect.top;

	color = choose(colors);

	mouse_is_down = setInterval(function() { add(x, y, color)}, 1);
}

function add(x, y, color) {
	add_radius += 0.1;

	ctx.beginPath();
	ctx.fillStyle = color;
	ctx.globalAlpha = 0.9;
	ctx.arc(x, y, add_radius, 0, 2*Math.PI);
	ctx.fill();
}

function mouseup(event) {
	let rect = c.getBoundingClientRect();
	let x = event.clientX - rect.left;
	let y = event.clientY - rect.top;

	clearInterval(mouse_is_down);

	a = new Planet(x, y, add_radius, color);

	a.vel.x = 1;

	add_radius = 0;
}

class Game{
	constructor(){
		 new Planet(width / 2, height / 2, 80, "yellow", false);
	}
	event(){

	}

	update(){
		for (let obj of Objs){
			//console.log(obj.vel)

			obj.update();
		}

		for (let obj of Objs){
			//console.log(obj.vel)

			obj.updateForce();
		}
	}

	draw(){
		ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
		ctx.fillRect(0, 0, width, height);
		for (let obj of Objs){
			obj.draw();
		}
	}
}

Game = new Game();

function loop(){
	Game.event();
	Game.update();
	Game.draw();

	requestAnimationFrame(loop);
}

loop();