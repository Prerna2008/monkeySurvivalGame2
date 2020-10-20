var Play = 1;
var End = 0;
var gameState = Play;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivalTime = 0;
var score = 0;
var jungleImage,backgroundImage;

function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  jungleImage=loadImage("jungle.jpg")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}
function setup() {
  createCanvas(windowWidth,windowHeight);
  
  monkey = createSprite(windowWidth-750,windowHeight-50,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  monkey.visible = true;
  
 backgroundImage = createSprite(windowWidth/2,windowHeight/2,windowWidth,windowHeight);
  backgroundImage.addImage(jungleImage);
  backgroundImage.velocityX=-4;
  
  ground = createSprite(windowWidth- 0,windowHeight-10,900,5);
  ground.velocityX=-4;
  ground.visible=false;
  
  console.log(ground.x);
  
  FoodGroup = new Group();
  ObstacleGroup= new Group();
}


function draw() {
  if(gameState==Play){
 background("white");
  survivalTime= Math.ceil(frameCount/getFrameRate());
  obstacles();
    banana();
    size();
 drawSprites();
  if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score=score+1;
  }
  if(touches.length>0||keyDown("space")&&monkey.y>height-150){
    monkey.velocityY= -10;
    touches=[];
  }
    if(score%10==0){
      ObstacleGroup.velocityXEach=ObstacleGroup.velocityX-3;
      FoodGroup.velocityXEach= FoodGroup.velocityX-6;
    }
  if(monkey.y<windowHeight/2){
  monkey.velocityY = monkey.velocityY+1.5;
 }
 if(ground.x<windowWidth/2){ 
  ground.x=ground.width/2;
 }
 if(backgroundImage.x<windowWidth/2){ 
  backgroundImage.x=backgroundImage.width/2;
 }
 
    if(ObstacleGroup.isTouching(monkey) && monkey.scale==0.1){
   gameState=End;
  }
   backgroundImage.depth=monkey.depth;
    monkey.depth=5;
    fill("black");
    textSize(24);
    text("Score="+score,windowWidth-550,windowHeight-750);
    fill("black");
    textSize(24);
    text("SurvivalTime="+survivalTime,windowWidth-750,windowHeight-750);
    monkey.collide(ground);
  }
  
  if(gameState==End){
   background("black")
   textSize(30);
   fill("yellow")
   text("Game Over",windowWidth/2,windowHeight/2);
    FoodGroup.velocityX = 0;
   ObstacleGroup.velocityY = 0;
   ground.destroy();
   monkey.destroy();
   ObstacleGroup.destroyEach();
   FoodGroup.destroyEach();
 }
}

function banana(){
  if(frameCount%80==0){
    var fruit = createSprite(windowWidth-0 ,0,10,10)
    fruit.addImage(bananaImage);
    fruit.y = Math.round(random(windowHeight-120,windowHeight-250));
    fruit.scale=0.1
    fruit.velocityX=-6  ;
    FoodGroup.add(fruit);
  }
}
function obstacles(){
  if(frameCount%300==0){
    var obstacle = createSprite(windowWidth-0,windowHeight-25 ,10,10)
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.1;
    obstacle.velocityX=-6  ;
    ObstacleGroup.add(obstacle);
  }
}
function size(){
  if(score%10==0){
     switch(score){
       case 10:monkey.scale = 0.12;
         break;
         case 20:monkey.scale = 0.14;
         break;
         case 30:monkey.scale = 0.16;
         break;
         case 40:monkey.scale = 0.18;
         break;
     }
  }   
}
