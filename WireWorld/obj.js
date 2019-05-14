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