const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;
var gameState

var gameState = "onSling";
var bg = "sprites/bg1.png";
var score = 0;

function preload() {
    getBackgroundImg();
    rockImg = loadImage("rocks..png")
    exitImg = loadImage("exit.png")
}

function setup(){
    var canvas = createCanvas(windowWidth,windowHeight);
    engine = Engine.create();
    world = engine.world;
   exit = createSprite(1200,50,10,10)
    ground = new Ground(600,height,1200,20);
   // platform = new Ground(150, 305, 300, 170);
Box1 = new Box(800,200,60,60)
Box2 = new Box(1000,100,60,60)

      rock = createSprite(300,300,10,10)
      rock.addImage(rockImg)
   rock.scale = 0.5
    bird = new Bird(200,50);

    exit.addImage(exitImg)
    exit.scale = 0.05

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});
}

function draw(){
    if(backgroundImg)
        background(backgroundImg);
     if(Box1.speed>= 15 || Box2.speed>= 15) {
         score = 15
     }   
    if(bird.isTouching(exit)){
        gameState = 2
    }
        
    
    Engine.update(engine);
    //strokeWeight(4);
   console.log(Box1.speed)
   console.log(Box2.speed)
   Box1.display();
    bird.display();
    //platform.display();
    //log6.display();
    slingshot.display();
    Box2.display();
    console.log(bird.body.speed);    
    drawSprites()
}

function mouseDragged(){
    //if (gameState!=="launched"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    //}
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32 && bird.body.speed < 1){
       bird.trajectory = [];
       Matter.Body.setPosition(bird.body,{x:200, y:50});
       slingshot.attach(bird.body);
    }
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=0600 && hour<=1900){
        bg = "sprites/bg1.png";
    }
    else{
        bg = "background.jpg";
    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}