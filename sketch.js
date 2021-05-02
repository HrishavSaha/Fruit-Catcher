//database variables
var database;
var gameState =0;
var playerCount = 0;
var score =0;
var finishedPlayers;
var playerName1, playerName2;

//image variables
var back_img;
var fruit1_img, fruit2_img, fruit3_img, fruit4_img, fruit5_img;
var player_img;

//sprite variables
var player1,player2;
var player1score =0;
var player2score =0;

//group variables
var fruitGroup;

//class variables
var player, form, game;

//array variables
var players;

//misc variables
var allPlayers;
var fruits;
var finish;

function preload(){
  back_img = loadImage("images/jungle.jpg");
  player_img = loadImage("images/basket2.png");
  fruit1_img = loadImage("images/apple2.png");
  fruit2_img = loadImage("images/banana2.png");
  fruit3_img = loadImage("images/melon2.png");
  fruit4_img = loadImage("images/orange2.png");
  fruit5_img = loadImage("images/pineapple2.png");
  fruitGroup = new Group();
}
function setup() {
  createCanvas(1000, 600);
  database = firebase.database();
  gameState = 0;
  distance = 0;

  yVel = 0;
  xVel = 0;
  xSet = false;

  game = new Game();
  game.getState();
  game.start();
  
}

function draw() {
  background(back_img);

  // Add conditions for gameStates and playerCount
  //start the game
  if (playerCount === 2) {
    game.update(1);
  }
  //start the game for real
  if (gameState === 1) {
    clear();
    game.play();
  }
  if (gameState === 2) {
    console.log("End");
    game.end();
  }
  //if(gameState === 2 && finishedPlayers === 2){
    //game.displayRanks();
  //}
}