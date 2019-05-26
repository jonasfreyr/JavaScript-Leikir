class Vector{
	constructor(x, y){
		this.x = x;
		this.y = y;
	}

	deg2rad(degrees){
		return degrees * (Math.PI/180);
	}

	rotate(angle){
		let a = this.deg2rad(angle);

		let cs = Math.cos(a);
		let sn = Math.sin(a);

		let px = this.x * cs - this.y * sn;
		let py = this.x * sn + this.y * cs;

		this.x = px;
		this.y = py;
	}

	applyForce(vector){
		this.x += vector.x;
		this.y += vector.y;
	}

	getMagnitute(){
		return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
	}

	multiply(num){
		this.x *= num;
		this.y *= num;
	}

	divide(num){
		this.x /= num;
		this.y /= num;
	}

	sub(vector){
		return new Vector(this.x - vector.x, this.y - vector.y)
	}

	setMagnitute(mag){
		v = this.normalize();

		v.multiply(mag);

		this.x = v.x;
		this.y = v.y;
	}

	normalize(){
		let mag = this.getMagnitute();
		if (mag > 0){
			this.divide(mag);
		}
	}
}