c.width = camera_width;
c.height = camera_height;

let keyState = {};

window.addEventListener('keydown',function(e){
    keyState[e.keyCode || e.which] = true;
},true);    
window.addEventListener('keyup',function(e){
    keyState[e.keyCode || e.which] = false;
},true);

slider.oninput = function(){
	speed = this.value;
	output.innerHTML = this.value;
}

class Game{
	constructor(){
		this.camera = new Camera();
		this.mouse = false;
		this.del = false;
		this.start = false;
		this.state = "Unactivated";

		//this.camera.x = -world_widthP / 2;
		//this.camera.y = -world_heightP / 2;
	}

	blue(){
		this.state = "Head";
	}

	yellow(){
		this.state = "Unactivated";
	}

	starting(){
		this.start = true;
	}

	stop(){
		this.start = false;
	}

	mousedown(event){
		this.mouse = true;

		if (event.button == 0){
			this.del = false;
		}

		else if(event.button == 1){
			this.del = true;
		}

		this.show_coords(event)
	}

	mouseup(){
		this.mouse = false;
		this.del = false;
	}

	show_coords(event){
		let rect = c.getBoundingClientRect();
		let x = event.clientX - rect.left;
		let y = event.clientY - rect.top;
		
		// console.table([x, y, this.camera.x, this.camera.y])
		let new_x = (x / (this.camera.zoomed) - (this.camera.x ));
		let new_y = (y / (this.camera.zoomed) - (this.camera.y ));

		// console.log(new_x);
		// console.log(new_y);

		if (this.mouse) {
			x = 0;
			let rect_x;
			let rect_y;
			let index;
			let make_rect = false;
			for (let i = 0; i < (world_width); i++) {
				y = 0;
				for (let j = 0; j < (world_height); j++) {
					if (new_x >= x && new_x <= x + tile_size && new_y >= y && new_y <= y + tile_size) {
						rect_x = x;
						rect_y = y;
						make_rect = true;
						index = 0;
						for (let obj of Objs){
							if(obj.x == x && obj.y == y){
								if (this.del){
									Objs.splice(index, 1)
								}
								make_rect = false;
								break;
							}
							index++
						}
						break;						
					}
					y += tile_size;
				}
				x += tile_size;
			}
			if (make_rect && !this.del){
				new Rect(rect_x, rect_y, this.state)
			}
			// console.log(Objs.length);
		}
		
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

	draw_text(){
		let text;
		ctx.textAlign = "left";
		ctx.fillStyle = "rgba(127, 127, 127, 0.6)";

		ctx.font = "20px Arial";
		if (this.start){
			text = "Running"
		}

		else{
			text = "Paused"
		}

		ctx.fillText(text, 5, 20);
	}

	draw(){
		ctx.fillStyle = world_background;
		ctx.fillRect(0, 0, camera_width, camera_height);

		ctx.save();
		this.camera.zoom();
		this.camera.translate();
		ctx.moveTo((this.camera.x - this.camera_width) / 2, (this.camera.y - this.camera_height) / 2)
		

		//this.draw_grid();
		//console.log(this.camera)
		for(let obj of Objs){
			if (obj.x < -this.camera.x + camera_width / this.camera.zoomed &&
			   obj.x + obj.size > -this.camera.x &&
			   obj.y < -this.camera.y + camera_height / this.camera.zoomed &&
			   obj.y + obj.size > -this.camera.y) {
			    // collision detected!
				obj.draw();
			}
		}

		this.draw_grid();

		ctx.restore();

		this.draw_text();
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

		if (keyState[81]){
			this.camera.zoomed += zoom_speed;
		}

		if (keyState[69]){
			this.camera.zoomed -= zoom_speed;
		}


	}

	update(){
		if (this.start){
			let tails = []
			let heads = []
			for (let obj of Objs){
				if (obj.state == "Head"){
					heads.push(obj);
				}
				else if (obj.state == "Tail"){
					tails.push(obj);
				}
			}
			for (let obj of heads){
				obj.update();
			}

			for (let obj of Objs){
				console.log(obj.count);
				if (obj.count > 0 && obj.count < 3) {
					obj.state = "Head";
					obj.color = states[obj.state]
				}
				obj.count = 0;
			}

			for (let obj of tails){
				obj.update();
			}

			if (tails.length == 0 && heads.length == 0){
				this.start = false;
			}
			
		}
	}
}

let game = new Game();

function randint(min, max) {
	return Math.floor(Math.random() * max) + min;
}

function choose(choices) {
  let index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

function make_map() {
	let x = 0;
	let y = 0;
	for (let i = 0; i < (world_width * world_height); i++) {
		// new Rect(x * tile_size, y * tile_size, "None");

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
	game.event();
	now = new Date();
	if (now - last > speed) {
		last = now;
		game.update();
	}
	requestAnimationFrame(loop);
}


loop();
