class Planet{
	constructor(x, y, r, color, fixed=false){
		Objs.push(this);
		this.pos = new Vector(x, y)

		this.r = r

		this.fixed = fixed;

		this.mass = r
		this.color = color;

		this.vel = new Vector(0, 0);
		this.acceleration = new Vector(0, 0)
	}

	draw(){
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2*Math.PI);
		ctx.fill();
	}

	updateForce(){
		if (!this.fixed){
			this.vel.applyForce(this.acceleration);
			this.pos.applyForce(this.vel);
		}

		this.acceleration.multiply(0);
	}

	update(){
		let force, distance, strength;
		for (let obj of Objs){
			if (obj != this){
				force = this.pos.sub(obj.pos);

				// console.log(force)

				distance = force.getMagnitute();

				// console.log(distance);

				strength = (G * obj.mass * this.mass) / (distance * distance);

				//console.log(strength);

				force.normalize();

				force.multiply(strength);

				// console.log(strength)

				force.divide(obj.mass)

				force.multiply(this.mass);

				obj.acceleration.applyForce(force);
			}
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