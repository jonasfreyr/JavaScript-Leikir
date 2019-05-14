class Rect{
	constructor(x, y, state){
		Objs.push(this);
		this.x = x;
		this.y = y;

		this.size = tile_size;

		this.state = state;
		this.color = states[state];
		
	}

	draw(){
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.rect(this.x, this.y, this.size, this.size);
		ctx.fill();
	}

	update(){

	}
}

class Mouse{
	constructor(){
		this.x = null;
		this.y = null;
	}
	
	show_coords(event){
	let rect = c.getBoundingClientRect();
	this.x = event.clientX - rect.left;
	this.y = event.clientY - rect.top;
	console.log(this.x);
	console.log(this.y);
}
}

class Camera{
	constructor(){
		this.x = 0;
		this.y = 0;

		this.zoomed = 1;
	}

	translate(){
		ctx.translate(this.x, this.y);
		
	}

	zoom(){
		//if (this.zoomed < 1){
		//	this.zoomed = 1;
		//}
		ctx.scale(this.zoomed, this.zoomed)
	}

	move(x, y){
		this.x = x + camera_width / 2;
		this.y = y + camera_height / 2;
	}

}