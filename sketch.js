let player;
let zombies = [];

let framesTillCreate = 300;
let frame = 0;
let speed = 2;
let score = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  player = new Player();
  zombieImg = loadImage("/images/zombie.png");
  playerImg = loadImage("/images/player.png");
  mapImg = loadImage("/images/map.png");
  explosionImg = loadImage("/images/explosion.png");
  zombies.push(new Zombie(random(speed)));
}

function draw() {
  image(mapImg, 0, 0, width*2, height * 2);
  
  frame++;
  player.draw();
  player.update();
  
  for (let i = zombies.length - 1; i >= 0; i--) {
    zombies[i].draw();
    zombies[i].update();

    if(zombies[i].ateYou()){
      restart();
      break;
    }

    
    if (player.shot(zombies[i])) {
      zombies.splice(i, 1);
      score++;
    }
  }
  
  if (frame > framesTillCreate && zombies.length < 300) {
    zombies.push(new Zombie(random(speed)));
    frame = 0;
    if (framesTillCreate > 20) {
      framesTillCreate *= 0.95;
    }
  }
  
  if (frameCount % 1000 == 0) {
    speed+=0.1;
  }
  textAlign(CENTER);
  textSize(40);
  text(score, width/2, 50);
  fill(73,198,212);
}

function mouseClicked() {
  player.shoot();

  // if player.ateYou
}

function restart() {
  player = new Player();
  zombies = [];
  zombieSpawnTime = 300;
  zombieMaxSpeed = 2;
  score = 0;
}