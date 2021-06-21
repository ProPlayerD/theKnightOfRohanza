var pathImg, knightImg, zombieImg
var collided = 0

function preload(){
 pathImg = loadImage("Images/path.jpg");
 knightImg = loadAnimation("Images/tile012.png","Images/tile013.png","Images/tile014.png");
 knightImg2 = loadAnimation("Images/tile013.png");
 knightImg3 = loadAnimation("Images/tile014.png");
 zombieImg = loadImage("Images/zombie.png");
}

function setup() {
  createCanvas(displayWidth,displayHeight-200);
  path = createSprite(width/2,height/2);
  path.addImage(pathImg);
  path.scale = 2.5;

  knight = createSprite(width-100,height-100);
  knight.addAnimation("standing",knightImg2);
  knight.addAnimation("walking",knightImg);
  knight.addAnimation("jumping",knightImg3);

  ground = createSprite(width-750,height-60,1500,10);
  ground.visible = false;
  
  zombieGroup = createGroup();
}

function draw() {
  background(255,255,255);  

  knight.velocityX = 0
  knight.changeAnimation("standing",knightImg2);

  if(keyDown("a")){
    knight.velocityX = -3;
    knight.changeAnimation("walking",knightImg);
    knight.mirrorX(1);
  }

  if(keyDown("d")){
    knight.velocityX = 3;
    knight.changeAnimation("walking",knightImg);
    knight.mirrorX(-1);
  }

  if(keyDown("w")&&knight.y>height-130){
    knight.velocityY = -5;
    knight.changeAnimation("jumping",knightImg3);
  }


  knight.velocityY+=0.2;

  knight.collide(ground);
  for(var i = 0;i<zombieGroup.length;i++){
  if(zombieGroup.get(i).collide(ground) ){
    collided = 1
  }
}
for(var i = 0;i<zombieGroup.length;i++){
if(knight.x<zombieGroup.get(i).x && collided === 1){
  zombieGroup.get(i).velocity.x = -2
} else{
  zombieGroup.get(i).velocity.x = 2
}

}
  
  spawnZombie()
  drawSprites();
}

function spawnZombie(){
 if(frameCount%180===0){
   zombie = createSprite(random(100,width-100),0)
   zombie.addImage(zombieImg);
   zombie.velocityY = 10;
   zombie.scale = 0.25;
   zombieGroup.add(zombie)
   
 }

}