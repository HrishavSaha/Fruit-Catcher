class Game{ 
    constructor(){}

    getState(){
        var gameStateRef = database.ref('GameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })
    }

    update(state){
        database.ref('/').update({
            GameState: state
        });
    }

    async start(){
        if (gameState === 0) {
            player = new Player();
            var playerCountRef = await database.ref('PlayerCount').once("value");
            if (playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                player.getCount();
            }
            form = new Form()
            form.display();
        }
        player1 = createSprite(200,500);
        player1.addImage("player1",player_img);
    
        player2 = createSprite(800,500);
        player2.addImage("player2", player_img);
        players=[player1,player2];
        console.log(players);
        finish = false;
    }
    
    play(){
        
        form.hide();

        Player.getPlayerInfo();
        
        if(allPlayers !== undefined){
            image(back_img, 0, 0, 1000, 800);
            var xVal =100;
            var yVal=200;
            var index =0;

            for(var plr in allPlayers){
        
                index = index+1;
                xVal = 500-allPlayers[plr].distance;
                yVal=500;
                
                if(index === 1){
                    player1.x = xVal;
                    player1.y = yVal;
                }
                if(index === 2){
                    player2.x = xVal;
                    player2.y = yVal;
                }

                //players[index -1].x = xVal;
                //players[index - 1].y = yVal;

                // Differentiate the main player by printing
                // the name of the player on the basket. 
                if(index === 1){
                    fill("black");
                    textSize(25);
                    text(playerName1, player1.x-25, player1.y+70);
                }
                if(index === 2){
                    //fill("black");
                    textSize(25);
                    text(playerName2, player2.x-25, player2.y+70);
                }

            }


            // Give movements for the players using arrow keys
            //if(keyIsDown(38) && player.index !== null){
                //yVel += 0.9;
                //carSound.play();
                if(keyIsDown(LEFT_ARROW) && player.index !== null){
                    player.distance += 10;
                    player.update();
                }
                if(keyIsDown(RIGHT_ARROW) && player.index !== null){
                    player.distance -= 10
                    player.update();
                }
            //}else if(keyIsDown(38) && yVel > 0 && player.index !== null){
                //yVel -= 0.1;
                //xVel *= 0.9;
            //}
            else if(finish === false){
                yVel *= 0.7;
                xVel *= 0.7;
                //Player.updateFinishedPlayers();
                player.place = finishedPlayers;
                player.update();
                finish === true;
            }//else{
                //yVel *= 0.985;
                //xVel *= 0.985;
            //}

            //move the car
            player.distance += xVel;
            //yVel *= 0.98;
            //player.xPos += xVel;
            xVel *= 0.985;

            // Create and spawn fruits randomly
            if(frameCount % 20 === 0){
                fruits = createSprite(random(100,1000), 0, 100, 100);
                fruits.velocityY = 6;
                var rand = Math.round(random(1,5));
                switch(rand){
                    case 1: fruits.addImage(fruit1_img);
                    break;
                    case 2: fruits.addImage(fruit2_img);
                    break;
                    case 3: fruits.addImage(fruit3_img);
                    break;
                    case 4: fruits.addImage(fruit4_img);
                    break;
                    case 5: fruits.addImage(fruit5_img);
                    break;
                }
                fruitGroup.add(fruits);
            }

            textSize(25);
            fill("white");
            text("Player 1 : " + allPlayers.player1.score, 50, 50);
            text("Player 2 : " + allPlayers.player2.score, 50, 100);

            if(player.index !== null){
                for(var i = 0; i < fruitGroup.length; i++){
                    if(fruitGroup.get(i).isTouching(players)){
                        fruitGroup.get(i).destroy();
                        player.score += 1;
                        player.update();
                    }
                }
            }

            if(player.score >= 10){
                game.update(2);
                game.getState();
            }

            drawSprites();
        }
    }

    end(){
        game.update(2);
        clear();
        fill("blue");
        textSize(40);
        text("Game Over", 350, 300);
        text(player.name + " Won!", 350, 400);
       console.log("Game Ended");
    }
}