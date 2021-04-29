class Player {
    constructor(){
        this.index = null;
        this.distance = 0;
        this.name = null;
        this.score =0;
    }

    getCount(){
        var playerCountRef = database.ref('PlayerCount');
        playerCountRef.on("value", (data) => {
            playerCount = data.val();
        })
    }

    updateCount(count){
        database.ref('/').update({
            PlayerCount: count
        });
    }

    update(){
        var playerIndex = "players/player" + this.index;
        database.ref(playerIndex).set({
            name: this.name,
            distance: this.distance,
            score:this.score
        });
        var playerName1Ref = database.ref('players/player1/name');
        playerName1Ref.on("value", (data) => {
            playerName1 = data.val();
        })
        var playerName2Ref = database.ref('players/player2/name');
        playerName2Ref.on("value", (data) => {
            playerName2 = data.val();
        })
    }
    getFinishedPlayers(){
        var rankRef = database.ref('Rank');
        rankRef.on("value",(data)=>{
            finishedPlayers = data.val();
        });
        }
        static updateFinishedPlayers(){
        database.ref('/').update({
            Rank: finishedPlayers + 1
        });
        this.place += 1;
    }

    static getPlayerInfo(){
        var playerInfoRef = database.ref('players');
        playerInfoRef.on("value", (data) => {
            allPlayers = data.val();
        })
    }

    
}
