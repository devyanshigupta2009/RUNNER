var PLAY = 1;
var END = 0;
var gameState = PLAY;

var player;
var invisibleGround;

var obstaclesGroup, obstacle1, obstacle2, obstacle3;

var score=0;

var canvas;

var ground;

var restart;
function preload(){
  canvas= loadImage("background.png")
player= loadImage("player.png");
  obstacle1 = loadImage("obstacle.jpg");
  obstacle2 = loadImage("obstacle1.jpg");
  obstacle3 = loadImage("obstacle2.jpg");
  restart = loadImage("restart.jpg");
  
  
}

function setup() {
  canvas=createCanvas(600, 200);

  
  player = createSprite(50,180,20,50);
  player.addImage("player", player);
  player.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    
  
    if(keyDown("space") && player.y >= 159) {
      player.velocityY = -14;
    }
  
    player.velocityY = player.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    player.collide(invisibleGround);
    spawnObstacles();
    
    if (score>0 && score%100 === 0){
      checkPointSound.play();
    }
  
    if(obstaclesGroup.isTouching(player)){
      dieSound.play();  
      gameState = END;
        
    }
  }
  else if (gameState === END) {
    restart.visible = true;
  
    ground.velocityX = 0;
    player.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    
    obstaclesGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}


function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      default: break;
    }
      
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  ground.velocityX = -(6 + 3*score/100);
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  
  score = 0;
  
}
