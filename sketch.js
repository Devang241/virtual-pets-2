var dog, database;
var dogImg, happyDogImg;
var feedDogBtn, addFoodBtn;
var fedTime, lastFed;
var foodObj;
var food, foodS;

function preload() {
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");

}

function setup() {
  canvas = createCanvas(900, 500);
  dog = createSprite(500, 250, 10, 10);
  dog.addImage("dog1", dogImg);

  dog.scale = 0.5
  database = firebase.database();

  feedDogBtn = createButton("Feed the dog");
  feedDogBtn.position(400, 350);
  feedDogBtn.mousePressed(feedDog);

  addFoodBtn = createButton("Add Food");
  addFoodBtn.position(400, 450);
  addFoodBtn.mousePressed(addFoodS);


  foodObj = new Food();
  food = database.ref("Food");
  food.on("value", readStock);
}


function draw() {
  background(46, 139, 87);

  drawSprites();

  fedTime = database.ref("Feedtime");
  fedTime.on("value",function(data){
    lastFed = data.val();
  });
  
  fill(255, 255, 254);
  textSize(15);
  if (lastFed >= 12) {
    text("Last Fed Time: " + lastFed % 12 + " PM", 250, 50);
  } else if (lastFed === 0) {
    text("Last Fed Time: 12 AM", 250, 50);
  } else {
    text("Last Fed Time: " + lastFed + " AM", 250, 50);

  }
  foodObj.display();
  
  textSize(15);
  fill("white");
  text("Feed food!", 250, 30);
  text("Food Stock : " + foodS, 250, 70);
}
function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
  if (foodS < 0) {
    foodS = 0
  }
}
function feedDog() {
  dog.addImage("dog", happyDogImg);

  foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    LastFed: hour()
  })
}

function addFoodS() {
  foodS++
  database.ref('/').update({
    Food: foodS
  })
}