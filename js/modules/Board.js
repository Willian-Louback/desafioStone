import generateMatriz from "./generateMatriz.js";
import calculateMatriz from "./calculateMatriz.js";
import Draw from "./Draw.js";
import Ia from "./Ia.js";

class Board {
    constructor(){
        this.matriz;
        this.newMatriz;
        this.player = 3;
        this.playerPosition = [ 0, 0 ];
        this.wave = 0;
        this.valuePossibleMovement = [ null, null, null, null ];
        this.attempts = 1;
        this.positionMoveNumber;
        this.automateKey = false;
        this.numberToFollow = 0;
        this.Ia = new Ia();
        this.Draw = new Draw();
    }

    async init() {
        this.matriz = await generateMatriz();

        const { newMatriz, valuePossibleMovement } = await calculateMatriz(this.matriz, this.playerPosition, this.valuePossibleMovement);

        this.newMatriz = newMatriz;
        this.valuePossibleMovement = valuePossibleMovement;

        document.querySelector(".up").addEventListener("click", this.up.bind(this));
        document.querySelector(".down").addEventListener("click", this.down.bind(this));
        document.querySelector(".right").addEventListener("click", this.right.bind(this));
        document.querySelector(".left").addEventListener("click", this.left.bind(this));
        document.querySelector("#automate").addEventListener("click", this.automate.bind(this));
    }

    async automate(){
        this.automateKey = true;

        const { drawnNumber, numberToFollow } = await this.Ia.choosePath(this.playerPosition, this.valuePossibleMovement, this.newMatriz, this.wave);

        this.positionMoveNumber = drawnNumber;
        this.numberToFollow = numberToFollow;

        this.movePlayer();
    }

    // stop(){
    //     this.chaveC = false;
    //     this.ativadorC = false;
    // }

    up(){
        this.positionMoveNumber = 3;

        this.movePlayer();
    }

    down(){
        this.positionMoveNumber = 2;

        this.movePlayer();
    }

    left(){
        this.positionMoveNumber = 1;

        this.movePlayer();
    }

    right(){
        this.positionMoveNumber = 0;

        this.movePlayer();
    }

    movePlayer() { // Talvez eu posso remover esse método
        if(0 == this.positionMoveNumber){ //direita
            this.playerPosition[0]++;
            // pathVisual += "R ";
            this.Ia.addPath("0");
        } else if(1 == this.positionMoveNumber){ //esquerda
            this.playerPosition[0]--;
            // pathVisual += "L ";
            this.Ia.addPath("1");
        } else if(2 == this.positionMoveNumber){ //baixo
            this.playerPosition[1]++;
            // pathVisual += "D ";
            this.Ia.addPath("2");
        } else if(3 == this.positionMoveNumber){ //cima
            this.playerPosition[1]--;
            // pathVisual += "U ";
            this.Ia.addPath("3");
        } else { //morte
            console.log("ERROR", this.positionMoveNumber);
            return;
        }

        this.player = this.newMatriz[this.playerPosition[1]][this.playerPosition[0]];
        this.addMove();
    }

    addMove() {
        this.matriz = this.newMatriz.slice().map(arrays => arrays.slice());

        this.Draw.draw(this.matriz, this.playerPosition);

        this.valuePossibleMovement = [ null, null, null, null ];
        this.wave++;
        document.querySelector(`#generation`).innerText = `Wave: ${this.wave}`;

        if(this.player == 1){ // Isso aqui pode ser feito na própria Ia, pois eu posso ter vários indivíduos
            this.attempts++;

            this.Ia.death(this.playerPosition);

            console.log("Tentativa Atual:", this.attempts);
            console.log("wave:", this.wave);
            console.log("Game Over: ", this.player);
            console.log("Número Sorteado:", this.numberToFollow);
            this.wave = 0;
            this.playerPosition[0] = 0;
            this.playerPosition[1] = 0;
            this.player = 3;

            setTimeout(async () => {
                if(this.automateKey) {
                    this.matriz = await generateMatriz();

                    const { newMatriz, valuePossibleMovement } = await calculateMatriz(this.matriz, this.playerPosition, this.valuePossibleMovement);

                    this.newMatriz = newMatriz;
                    this.valuePossibleMovement = valuePossibleMovement;

                    this.automate();
                }
            }, 500);
        } else if(this.player == 4){
            this.Ia.win(this.playerPosition);

            console.log("Parabéns, você chegou!");
            console.log("Tentativa Atual:", this.attempts);
            console.log("wave:", this.wave);
            console.log("Player position: ", this.player);
            console.log("Position:", this.playerPosition[1], this.playerPosition[0]);

            setTimeout(() => {
                alert("Parabéns, você conseguiu!");
            }, 300);
        } else {
            setTimeout(async () => {
                const { newMatriz, valuePossibleMovement } = await calculateMatriz(this.matriz, this.playerPosition, this.valuePossibleMovement);

                this.newMatriz = newMatriz;
                this.valuePossibleMovement = valuePossibleMovement;

                if(this.automateKey) {
                    this.automate();
                }
            }, 100);
        }
    }
}

export default Board;