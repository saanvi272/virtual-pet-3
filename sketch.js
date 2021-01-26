var pet,petimg,petimg2;
var database,foodS;
var lastFed;
var gameState;
function preload()
{
  petimg = loadImage("dogImg.png");
  petimg2 = loadImage("dogImg1.png");
  bedroom=loadImage("virtual pet images/Bed Room.png");
  garden=loadImage("virtual pet images/Garden.png");
  washroom=loadImage("virtual pet images/Wash Room.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000, 500);
  pet = createSprite(900,300,5,5);
  pet.addImage(petimg);
  pet.scale =0.25;

  feed=createButton("feed dog")
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("add food")
  addFood.position(820,95);
  addFood.mousePressed(addfood);

  timeRef=database.ref("fedTime");
  timeRef.on("value",function(data){
    lastFed=data.val()
});

  food=new Food();
  food.getFoodStock();

  var readGameState=database.ref("gameState");
  readGameState.on("value",function(data){
    gameState=data.val()
  });
}


function draw() {
  background("green");

fill("white");
text("note:Press UP_ARROW key to feed Drago Milk",100,50);
text("food remaining:"+foodS,150,100);

if(lastFed>=12){
  text("Last fed at: "+lastFed%12+" p.m.",750,50);
}
else if(lastFed===0){
  text("Last fed at: 12 a.m.",750,50);
}
else{
  text("Last fed at: "+lastFed+" a.m.",750,50);
}
currentTime=hour();
if(currentTime===lastFed+1){
  food.garden();
  updateGs("playing");
}
else if(currentTime===lastFed+2){
  food.bedroom();
  updateGs("sleeping");
  pet.addImage(petimg);
  pet.scale=0.3;
  fill("black");
  text("LET ME SLEEP",450,40);
}

else if(currentTime>lastFed+2&&currentTime<=lastFed+4){
  food.washroom();
  updateGs("bathing");
  pet.addImage(petimg);
  pet.scale=0.3;
  fill("black");
  text("BATH TIME",450,40);
}

else{
  food.display();
  updateGs("hungry");
  pet.addImage(petimg);
  pet.scale=0.3;
  fill("black");
  text("I AM HUNGRY",450,40);
}

if(gameState!=="hungry"){
  feed.hide();
  addFood.hide();
  pet.remove();
}
else{
  feed.show();
  addFood.show();
  pet.addImage(petimg2);
}
drawSprites();

}

  function feedDog(){
    pet.addImage(petimg2);
    pet.x=850;
    if(foodS>=1){
      foodS=foodS-1;
    }
    food.updateStock(foodS);
    updateHour(hour());
  }

  function addfood(){
    pet.addImage(petimg);
    pet.x=850;
    if(foodS<20){
      foodS=foodS+1;
    }
    food.updateStock(foodS);
  }

  function updateHour(time){
    database.ref("/").update({
      fedTime:time
    })

  }
  function updateGs(state){
    database.ref("/").update({
      gameState:state
    })
  }

  