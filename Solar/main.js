window.addEventListener('keydown',function(e){
    keyState[e.keyCode || e.which] = true;
},true);

window.addEventListener('keyup',function(e){
	if (e.keyCode == 112) {
		white = !white;
	}
	
	else{
		keyState[e.keyCode || e.which] = false;
	}
    
},true);

function choose(choices) {
  let index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

function mousedown(event){
	let rect = c.getBoundingClientRect();
	let x = event.clientX - rect.left;
	let y = event.clientY - rect.top;

	if(event.button == 0){
		color = choose(colors);

		mouse_is_down = setInterval(function() { add(x, y, color)}, 1);
	}
}

function add(x, y, color) {
	add_radius += 0.1;

	ctx.beginPath();

	ctx.fillStyle = color;
	ctx.globalAlpha = 0.9;
	ctx.arc(x, y, add_radius, 0, 2 * Math.PI);
	ctx.fill();
}

function mouseup(event) {
	let rect = c.getBoundingClientRect();
	let x = event.clientX - rect.left;
	let y = event.clientY - rect.top;

	let new_x = (x / (g.camera.zoomed) - (g.camera.x ));
	let new_y = (y / (g.camera.zoomed) - (g.camera.y ));

	if(event.button == 0){
		clearInterval(mouse_is_down);

		a = new Planet(new_x, new_y, add_radius, color);

		a.vel.x = 1;

		add_radius = 0
	}

	else if (event.button == 1){
		let length;
		for (let obj of Objs){
			length = Math.sqrt(Math.pow(new_x - obj.pos.x, 2) + Math.pow(new_y - obj.pos.y, 2));
			
			console.log(length);			
			if (length <= obj.r){
				obj.focused = !obj.focused;
				//console.log("big yay")
				break;
			}
		}
	}
}

class Game{
	constructor(){
		 new Planet(camera_width / 2, camera_height / 2, 80, "yellow", false);
		 this.camera = new Camera();

	}

	event(){
		if (keyState[87]) {
			this.camera.y += camera_speed;
			
		}
		if (keyState[83]) {
			this.camera.y -= camera_speed;
		}
		if (keyState[65]) {
			this.camera.x += camera_speed;
		}
		if (keyState[68]){
			this.camera.x -= camera_speed;
		}

		if (keyState[81]){
			this.camera.zoomed += zoom_speed;
		}

		if (keyState[69]){
			this.camera.zoomed -= zoom_speed;
		}
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
		if (white){
			ctx.fillStyle = "rgba(255, 255, 255)";
			
		}
		else{
			ctx.fillStyle = "rgba(0, 0, 0)";
		}

		ctx.fillRect(0, 0, camera_width, camera_height);

		ctx.save();
		for (let obj of Objs){
			// console.log(obj.focused);
			if(obj.focused){
				this.camera.move(-obj.pos.x, -obj.pos.y)

				break;
			}
		}

		this.camera.zoom();
		this.camera.translate();
		for (let obj of Objs){
			obj.draw();
			//obj.draw_trail();
		}
		ctx.restore();
	}
}
let g = new Game();

function loop(){
	g.event();
	g.update();
	g.draw();

	requestAnimationFrame(loop);
}

loop();