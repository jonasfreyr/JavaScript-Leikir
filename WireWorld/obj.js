class Rect{
	constructor(x, y, ground){
		Objs.push(this);
		this.x = x;
		this.y = y;

		this.size = tile_size;

		this.ground = ground;

		this.bground = background_colors[this.ground]

	}

	draw(){
		ctx.beginPath();
		ctx.fillStyle = this.bground;
		ctx.rect(this.x, this.y, this.size, this.size);
		ctx.fill();
	}

	update(){

	}
}

class Survivor{
	constructor(x, y){

	}
	draw(){

	}
	update(){

	}
}

class Fire_place{
	constructor(x, y){
		Objs.push(this);
		this.x = x;
		this.y = y;

		this.radius = 20;
		this.heat_radius = 60;

		this.length = 30;

		this.color = "#FF2B08"

	}

	draw(){
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		ctx.fillStyle = this.color
		ctx.fill();
	}

	update(){
		
	}
}

class Camera{
	constructor(){
		this.x = 0;
		this.y = 0;
	}

	translate(){
		ctx.translate(this.x, this.y);
		
	}

	move(x, y){
		this.x = x + camera_width / 2;
		this.y = y + camera_height / 2;
	}

}