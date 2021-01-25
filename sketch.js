var END = 1,
  PLAY = 0,
  gamestate = PLAY;
var monkey, monkey_running, ground, invisibleGround;
var banana, bananaImage, obstacle, obstacle_Image, ground_image, rock, food;
var FoodGroup, obstacleGroup;
var score = 0;
var Ate = 0;
var survival_time = 0

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacle_Image = loadImage("obstacle.png");

  ground_image = loadImage("ground.png")
}



function setup() {
  createCanvas(400, 400)
  monkey = createSprite(30, 300, 10, 10)
  monkey.addAnimation("moving", monkey_running)
  monkey.scale = 0.1
  FoodGroup = createGroup();
  obstacleGroup = createGroup();

  invisibleGround = createSprite(400, 390, 900, 10)
  invisibleGround.visible = false
  ground = createSprite(200, 310, 100, 10)
  ground.addImage(ground_image)
  ground.velocityX = -3



}


function draw() {
  background("white")
  console.log(monkey.y)

  monkey.depth = monkey.depth + 1
  monkey.collide(invisibleGround)
  if (ground.x < 0) {
    ground.x = 400
  }
  if (keyDown("space") && monkey.y >= 354 && gamestate == PLAY) {
    monkey.velocityY = -17
  }
  if (keyDown("r") && gamestate == END) {
    gamestate = PLAY
    survival_time = 0
    Ate = 0
  }
  monkey.velocityY = monkey.velocityY + 0.90
  obstacle();
  banana();
  text("ATE:" + Ate, 300, 20)

  text("SURVIVAL TIME:" + survival_time, 250, 40)
  if (gamestate === END) {
    ground.velocityX = 0
    obstacleGroup.velocityX = (0)
    obstacleGroup.destroyEach();
    stroke("black")
    textSize = 30
    text("GAMEOVER", 160, 160)
    food.velocityX = 0
    FoodGroup.destroyEach();
    text("PRESS R TO RESTART", 135, 200)

  }

  if (gamestate === PLAY) {
    ground.velocityX = -5
    stroke("black")
    survival_time = Math.ceil(frameCount / frameRate())
  }
  if (monkey.isTouching(FoodGroup)) {
    FoodGroup.destroyEach();
    Ate += 1
  }

  drawSprites();

}


function obstacle() {
  if (frameCount % 100 === 0) {
    rock = createSprite(400, 365, 10, 10)
    rock.addImage(obstacle_Image)
    rock.velocityX = -(3 + survival_time / 4)
    rock.scale = 0.15
    rock.lifeTime = 80
    obstacleGroup.add(rock)
  }
  if (monkey.isTouching(obstacleGroup)) {
    gamestate = END
  }
}

function banana() {
  if (frameCount % 90 === 0) {
    food = createSprite(400, 100, 10, 10)
    food.addImage(bananaImage)
    food.scale = 0.1
    food.velocityX = -(5 + survival_time / 10)
    food.y = Math.round(random(200, 120))
    food.lifeTime = 80
    FoodGroup.add(food)
  }
}