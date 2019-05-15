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
		if (this.state == "Head") {
			for (let obj of Objs){
				if ((obj.x == this.x - tile_size || obj.x == this.x + tile_size || obj.x == this.x) && (obj.y == this.y - tile_size || obj.y == this.y + tile_size || obj.y == this.y)) {
					if (obj.state == "Unactivated") {
						obj.state = "Head";
						obj.color = states[obj.state]
					}
				}
			}
			this.state = "Tail";
			this.color = states[this.state]
		}
		else if (this.state == "Tail"){
			this.state = "Unactivated";
			this.color = states[this.state]
		}
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
		if (this.zoomed < 0.1){
			this.zoomed = 0.1;
		}
		ctx.scale(this.zoomed, this.zoomed)
	}

	move(x, y){
		this.x = x + camera_width / 2;
		this.y = y + camera_height / 2;
	}

}