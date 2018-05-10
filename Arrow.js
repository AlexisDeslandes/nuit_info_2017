class Arrow{

  constructor(x,y,vx,vy){
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.speed = 6;
    this.size = 80;
    this.lien;

    if(vx===0 && vy===1){
      this.lien = loadImage("flechebas.png");
    }else if(vx===1 && vy===0){
      this.lien = loadImage("flechedroit.png");
    }
    else if(vx===0 && vy===-1){
      this.lien = loadImage("flechehaut.png");
    }
    else if(vx===-1 && vy===0){
      this.lien = loadImage("flechegauche.png");
    }
    else if(vx===1 && vy===1){
      this.lien = loadImage("flechedb.png");
    }
    else if(vx===1 && vy===-1){
      this.lien = loadImage("flechedh.png");
    }
    else if(vx===-1 && vy===-1){
      this.lien = loadImage("flechegh.png");
    }else if (vx===-1 && vy===1){
      this.lien = loadImage("flechebg.png");
    }
  }

  update(){
    this.x += this.vx * this.speed;
    this.y += this.vy * this.speed;
  }

  draw(){
    image(this.lien,this.x,this.y);
  }

  intersect(person){
    var distance = dist(this.x,this.y,person.getX(),person.getY());
    if (distance < this.size/2 + person.getSize()/2){
      return true;
    }else{
      return false;
    }
  }

  damage(person){
    person.getDamaged();
  }

  out_of_map(){
    return this.x<0 || this.x>1400 || this.y<0 || this.y>700;
  }


}
