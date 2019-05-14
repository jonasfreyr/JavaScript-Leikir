c.width = camera_width;
c.height = camera_height;

let keyState = {};

window.addEventListener('keydown',function(e){
    keyState[e.keyCode || e.which] = true;
},true);    
window.addEventListener('keyup',function(e){
    keyState[e.keyCode || e.which] = false;
},true);

function choose(choices) {
  let index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

class Game{
	constructor(){
		this.pause = false;
		this.camera = new Camera();
	}

	draw_grid(){
		ctx.beginPath()
		let x = 0;
		for (let i = 0; i <= (world_width); i++) {
			ctx.moveTo(x, 0);
			ctx.lineTo(x, world_heightP);
			x += tile_size;
		}
		let y = 0;
		for (let i = 0; i <= (world_height); i++) {
			ctx.moveTo(0, y);
			ctx.lineTo(world_widthP, y);
			y += tile_size;
		}
		ctx.stroke();
	}

	draw(){
		ctx.fillStyle = world_background;
		ctx.fillRect(0, 0, camera_width, camera_height);

		ctx.save();
		this.camera.translate();

		//this.draw_grid();

		Objs.forEach(function(obj){
			obj.draw();
		});


		ctx.restore();
	}

	event(){
		if (keyState[87]) {
			if (this.camera.y + world_heightP < world_heightP + camera_height / 2){
				this.camera.y += camera_speed;
			}
			
		}
		if (keyState[83]) {
			if (this.camera.y + world_heightP > camera_height / 2) {
				this.camera.y -= camera_speed;
			}
		}
		if (keyState[65]) {
			if (this.camera.x + world_widthP < world_widthP + camera_width / 2) {
				this.camera.x += camera_speed;
			}	
		}
		if (keyState[68]){
			if (this.camera.x + world_widthP > camera_width / 2) {
				this.camera.x -= camera_speed;
			}
		}

	}

	update(){
		//this.camera.move(4000, 30);
		// console.log(this.camera);
		
	}
}

let game = new Game();

function randint(min, max) {
	return Math.floor(Math.random() * max) + min;
}

function make_map() {
	let x = 0;
	let y = 0;
	let num, rect;
	let counter = 0;
	let ground_nums = {};
	for(let j of ground){
		ground_nums[j] = [counter, counter + chances[j]]

		counter = counter + chances[j]
	}

	for (let i = 0; i < (world_width * world_height); i++) {
		num = randint(0, 100);
		rect = false;
		for(let j of ground){
			if (num >= ground_nums[j][0] && num <= ground_nums[j][1]) {
				new Rect(x * tile_size, y * tile_size, j);
				rect = true;
			}
			
		}

		if (!rect) {
			new Rect(x * tile_size, y * tile_size, "Grass");
		}

		x += 1;

		if (x >= world_width){
			x = 0;
			y += 1;
		}
	}
}
let now = new Date();
let last = now;
let fps;

function loop(){
	game.draw();

	now = new Date()

	fps = 1000 / (now - last);
	last = now

	console.log(fps)

	if (!game.pause){
		game.event();
		game.update();
	}

	requestAnimationFrame(loop);
}

function New() {
	make_map();
	new Fire_place(30, 30);
}

New();
loop();