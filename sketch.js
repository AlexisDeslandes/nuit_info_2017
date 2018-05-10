var x = 1400;
var y = 700
;
var perso;
var perso2;
var arrows = [];
var arrows2 = [];
var touch_target = false;
var range = 150;
var time_count = -200;
var end;
var started = false;

function setup() {
	createCanvas(x,y);
	perso = new Personne(x/2,0,"globox.png");
	perso2 = new Personne(x/2,y-80,"andre.png");
	end = loadImage("drugs.png");
}

function back(){
	background(50);
	fill(255);
	for (var i=0;i<1400;i+=300){
		rect(i,350,150,30);
	}
	drawLife();
}

function initialiseDraw(){
	textSize(25);
	text("Vous ne deviez pas arriver ici !!!\nLes touches Z,Q,S,D pour se deplacer\net la souris pour viser avec son arc !\npasser d'un cote d'un mur vous fais apparaitre de l'autre cote.\nF5 pour recommencer la partie !" ,400,200);
}

function drawLife(){
	textSize(15);
	text("Personnage : " + perso.life + "HP\nEnnemi : " + perso2.life + "HP" ,1250,15);
}

function draw() {
	back();
	if (!started) initialiseDraw();
	perso.update();
	perso.draw();
	perso2.update();
	if (arrows.length!=0) move_ia();
	if (time_count++===1){
		started = true;
		attack_ia();
		time_count=0;
	}
	perso2.draw();

	for (var i =0;i<arrows.length;i++){
		arrows[i].update();
		arrows[i].draw();
		if (arrows[i].intersect(perso2)){
			arrows[i].damage(perso2);
			arrows.splice(i,1);
			touch_target = true;
		}
		if (touch_target || arrows[i].out_of_map()) arrows.splice(i,1);
		touch_target = false;
	}



	for (var i =0;i<arrows2.length;i++){
		arrows2[i].update();
		arrows2[i].draw();
		if (arrows2[i].intersect(perso)){
			arrows2[i].damage(perso);
			arrows2.splice(i,1);
			touch_target = true;
		}
		if (!touch_target && arrows2[i].out_of_map()) arrows2.splice(i,1);
		touch_target = false;
	}


	if (perso.isDead() || perso2.isDead()){
		back();
		image(end,500,250);
		textSize(26);
		text("Il n'existe pas de gobelin et d'archer sur les autoroutes.\nF5 pour recommencer",450,200);
		noLoop();
	}
}

function keyPressed(){
	if (keyCode === 90){
		perso.redirect(0,-1);
	}else if (keyCode === 83){
		perso.redirect(0,1);
	}else if (keyCode === 81){
		perso.redirect(-1,0);
	}else if (keyCode === 68){
		perso.redirect(1,0);
	}
}

function mouseClicked(){
	var direction_x = 0;
	if (mouseX>perso.getX()+range){
		direction_x = 1;
	}else if (mouseX<perso.getX()-50){
		direction_x = -1;
	}
	var direction_y = 0;
	if (mouseY>perso.getY()+range){
		direction_y = 1;
	}else if (mouseY<perso.getY()-50){
		direction_y = -1;
	}
	if (direction_x===0 & direction_y===0){
		direction_x = abs(direction_x);
		direction_y = abs(direction_y);
		if (direction_x>direction_y){
			direction_x=1;
		}else{
			direction_y=1;
		}
	}
	arrows[arrows.length] = new Arrow(perso.getX(),perso.getY(),direction_x,direction_y);
}

function move_ia(){
	var shorten_distance = 1000;
	var best_arrow;
	for (var i=0;i<arrows.length;i++){
		var arrow = arrows[i];
		var dista = dist(arrow.x,arrow.y,perso2.getX(),perso2.getY());
		if (dista<shorten_distance){
			shorten_distance =dista;
			best_arrow = arrows[i];
		}
	}
	if (best_arrow.vx===1 && best_arrow.vy===1){
		perso2.redirect(-1,1);
	}else if (best_arrow.vx===-1 && best_arrow.vy===-1){
		perso2.redirect(1,-1);
	}else if (best_arrow.vx===1 && best_arrow.vy===-1){
		perso2.redirect(1,1);
	}else if (best_arrow.vx===-1 && best_arrow.vy===1){
		perso2.redirect(1,1);
	}else if (best_arrow.vx===0 && best_arrow.vy===1){
		perso2.redirect(1,0);
	}else if (best_arrow.vx===0 && best_arrow.vy===-1){
		perso2.redirect(1,0);
	}else if (best_arrow.vx===1 && best_arrow.vy===0){
		perso2.redirect(0,-1);
	}else if (best_arrow.vx===-1 && best_arrow.vy===0){
		perso2.redirect(0,1);
	}
}

function attack_ia(){
	var distance_x = perso2.x-perso.x;
	var distance_y = perso2.y-perso.y;
	var choice_x = 0;
	if (distance_x>range) choice_x=-1;
	if (distance_x<-range) choice_x=1;
	var choise_y = 0;
	if (distance_y>range) choise_y=-1;
	if (distance_y<-range) choise_y=1;

	if (choice_x===0 & choise_y===0){
		choice_x = abs(choice_x);
		choise_y = abs(choise_y);
		if (choice_x>choise_y){
			choice_x=1;
		}else{
			choise_y=1;
		}
	}

	arrows2[arrows2.length]=new Arrow(perso2.x,perso2.y,choice_x,choise_y);
}
