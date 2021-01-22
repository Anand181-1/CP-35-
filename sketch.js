var database;
var dog, happyDog, hungryDog;
var foodS, foodStock;

function preload(){
  hungryDog = loadImage("dogImg.png");
  happyDog = loadImage("dogImg1.png");
}

function setup() {
  createCanvas(500, 500);

  database = firebase.database();
  
  dog = createSprite(370, 250, 10, 10);
  dog.addImage(hungryDog);
  dog.scale = 0.15;
}


function draw() {  
  background(46, 139, 87);
  drawSprites();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

}

function keyPressed() {
  if (keyCode === UP_ARROW){
    writeStock(foodS);
    dog.changeImage(happyDog);
  }
}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {

  if (x <= 0) {
    x = 0;
  }else {
    x -= 1;
  }
  database.ref('/').update({
    Food: x
  });
}
