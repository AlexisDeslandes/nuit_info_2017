class Personne {

	constructor(x,y,link){
		this.size = 80;
		this.speed = 5;
		this.life = 10;
		this.x = x;
		this.y = y;
		this.vx = 0;
		this.vy = 0;
		this.lien = loadImage(link);
	}

	redirect(x,y){
		this.vx = x;
		this.vy = y;
	}

	getSize(){
		return this.size;
	}

	draw(){
		image(this.lien,this.x,this.y);
	}

	update(){
		this.x += this.vx * this.speed;
		this.y += this.vy * this.speed;
		if (this.x>1400-this.size/2) this.x=0
		if (this.x<0) this.x=1400-this.size/2;
		if (this.y>700-this.size/2) this.y = 0;
		if (this.y<0) this.y=700-this.size/2;
	}

	getX(){
		return this.x;
	}

	getY(){
		return this.y;
	}

	getVx(){
		return this.vx;
	}

	getVy(){
		return this.vy;
	}

	getDamaged(){
		this.life-= 1;
	}

	isDead(){
		return this.life <= 0;
	}


}
