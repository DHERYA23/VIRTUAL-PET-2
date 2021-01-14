//Create variables here
var dog,dogImg,lastFed,fedTime;
var happyDog,database,foodS,foodStock;
var bottleImage,b1,b2,b3,b4,b5,b6,b7,b8,b9,b10;
function preload(){
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
  bottleImage = loadImage("images/Milk.png");
}

function setup() {
  database=firebase.database();
  createCanvas(500, 500);
  food = new Food();
  dog = createSprite(350,225,20,20);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);


  feed  = createButton("Feed the Dog");
  feed.position(600,95);
  feed.mousePressed(feedDog);

  add  = createButton("Add Food");
  add.position(740,95);
  add.mousePressed(addFood)

  console.log(foodStock);
}


function draw() {  
  background(49,138,87)
  food.display();
  fedTime=database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed=data.val();
  });
  //add styles here
  
 
  fill("black");
  text("Food remaining: "+foodS,170,100);
  strokeWeight(4);
  text("NOTE : PRESS THE UP_ARROW TO FEED THE DRAGO MILK",100,20);
  if(lastFed>=12) {
    text("Last Feed:"+lastFed%12+"pm",325,40);
  }
   else if(lastFed == 0){
     text("Last Feed: 12am",325,40);
   }
   else{
     text("last Fed:"+lastFed+"am",325,40);
   }
  
  //if(foodS>0){
   // updateFoodStock();
    //}

    drawSprites();

}



function readStock(data){
 
  foodS = data.val();
  food.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDog);
  food.updateFoodStock(food.getFoodStock()-1);
  database.ref('/').update({
    Food:food.getFoodStock(),
    FeedTime:hour()
  })
  
}
function addFood(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
  

} 
/*function writeStock(x){
  if(x<=0) {
    x=0;
  }
  else {
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}*/


/*function addingTheFood(y){
  if(y<=0){
    y = y + 1;
}


  else{
    y=foodS;
  }
}*/










