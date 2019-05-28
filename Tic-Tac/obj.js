class Tile{
	constructor(x, y){
		Objs.push(this);
		this.x = x;
		this.y = y;

		this.place = null;

		this.img = new Image();
	}

	draw(){
		ctx.beginPath();
		ctx.strokeStyle = "black";
		ctx.rect(this.x, this.y, tile_size, tile_size);
		ctx.stroke();

		if (this.place != null) {
			ctx.drawImage(this.img, this.x, this.y, tile_size, tile_size);
		}
	}

	setPlace(place){
		// this.img = new Image();
		if (place == "X") {
			this.img.src = x_img_src;
		}
		
		else if(place == "O"){
			this.img.src = o_img_src;
		}

		this.place = place;
	}
}