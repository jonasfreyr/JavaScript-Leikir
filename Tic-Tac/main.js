window.addEventListener("keyup", function(e){
	if (e.keyCode == 82) {
		g.restart();
	}
});

class Game{
	constructor(){
		this.turn = false;

		this.winner = null;
		ctx.font = "60px Arial";
		ctx.textAlign = "center";
	}

	restart(){
		for (let obj of Objs){
			obj.place = null;
			obj.img = new Image();
		}

		this.winner = null;
	}

	make_map(){
		let x = 0;
		let y = 0;
		for (let i = 0; i < tile_width * tile_height; i++){
			new Tile(x, y);

			x += tile_size;

			if (x >= width){
				x = 0;
				y += tile_size;
			}
		}
	}

	setPlace(obj){
		if (this.turn){
			obj.setPlace("X");
		}

		else{
			obj.setPlace("O");
		}

		this.turn = !this.turn;
	}

	mouseevent(event){
		let rect = c.getBoundingClientRect();
		let x = event.clientX - rect.left;
		let y = event.clientY - rect.top;

		if (this.winner == null){
			for (let obj of Objs){
				if ((x >= obj.x && x <= obj.x + tile_size) && (y >= obj.y && y <= obj.y + tile_size)){
					if (obj.place == null) {
						this.setPlace(obj);
					}
				}
			}
		}
	}

	check(place){
		for (let i = 0; i < 3; i++){
			if (Objs[i * 3].place == place && Objs[(i * 3) + 1].place == place && Objs[i * 3 + 2].place == place) {
				return true;
			}

			else if (Objs[i].place == place && Objs[i + 3].place == place && Objs[i + 6].place == place){
				return true;
			}
		}

		if ((Objs[0].place == place && Objs[4].place == place && Objs[8].place == place) || (Objs[2].place == place && Objs[4].place == place && Objs[6].place == place)) {
			return true;
		}

		return false;
	}

	update(){
		if (this.winner == null) {
			if (this.check("X")){
				this.winner = "X";
			}

			else if (this.check("O")){
				this.winner = "O";
			}
		}
	}

	draw(){
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, width, height);

		
		ctx.fillStyle = "grey";
		ctx.fillText("R - restart", width / 2, height - 30);

		for (let obj of Objs){
			obj.draw();
		}

		if (this.winner != null){
			ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
			ctx.fillRect(0, 0, width, height);
			
			ctx.fillStyle = "white";
			ctx.fillText(this.winner + " won!", width / 2, height / 2);
			//ctx.fill();
		}
	}
}

let g = new Game();
g.make_map();

function loop() {
	g.update();
	g.draw();

	requestAnimationFrame(loop);
}

loop();