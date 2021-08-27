window.addEventListener("load", function(event) {
    class Player{
        constructor(name) {
            this.name = name;
            this.health = 100;
            this.attack = 10;
            this.defence = 10;
            this.active = false;       
        }
        heal(){
            this.health += Math.floor(Math.random() * (16 - 1)) + 1;
            if(this.health > 100){
                this.health = 100;
            }
        }
    }
    let vueApp = new Vue({
        el: "#app",
        data:{
            message: "falcon punch",
            players:  [(new Player("Player 1")), (new Player("Player 2"))],
            activeIndex: 0,
            isCritical: false,
            isDodge: false,
            activeChange(){
                this.players[this.activeIndex].active = false;
                while(this.players[(this.activeIndex + 1)%this.players.length].health <= 0){
                    console.log('aaa');
                    this.activeIndex = (this.activeIndex + 1)%this.players.length ;
                }
                this.activeIndex = (this.activeIndex + 1)%this.players.length ;
                this.players[this.activeIndex].active = true;
            },
            changePar(){
                return Math.floor(Math.random() * (51 - 1)) + 1;
            },
            attack(pl1, pl2){
                console.log(pl1.name + ' => ' + pl2.name);
                console.log(pl1.attack + ' => ' + pl2.defence)
                this.isCritical =  false;
                this.isDodge =  false;
                let attack = pl1.attack;
                let rand = chance.integer({ min: -4, max: 4 });
                if(!rand){
                    attack = Math.floor(1.5 * attack);
                    this.isCritical = true;
                }
                if(!(rand - 1)){
                    attack = 0;
                    this.isDodge = true;
                }
                let damage = attack - pl2.defence;
                if(damage >= 0){
                    pl2.health -= damage;
                    attack -= pl2.defence;
                    if(!this.isDodge){
                        pl1.attack = attack;
                    }
                    pl2.defence = 0;
                }
                else{
                    if(!this.isDodge){
                        pl2.defence = -damage;
                        pl1.attack = 0;
                    }
                } 
                console.log(damage);
            }
        },
        mounted(){
            this.players[0].active = true;
        },
    })
    // here is the Vue code2
  });
