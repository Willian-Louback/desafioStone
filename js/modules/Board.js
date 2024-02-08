import generateMatriz from "./generateMatriz.js";
import calculateMatriz from "./calculateMatriz.js";
import verifyMovement from "./verifyMovement.js";
import Draw from "./Draw.js";
import Ia from "./Ia.js";

class Board {
    constructor(){
        this.matriz;
        this.newMatriz;
        this.individuals;
        this.numberOfIndividuals = 400;
        this.deathIndividuals = 0;
        this.wave = 0;
        this.attempts = 1;
        this.positionMoveNumber;
        this.automateKey = false;
        this.Ia = new Ia();
        this.Draw = new Draw();
        this.win = false;
    }

    stop(){
        this.automateKey = false;
    }

    up(){
        this.positionMoveNumber = 3;

        this.movePlayer(0);
    }

    down(){
        this.positionMoveNumber = 2;

        this.movePlayer(0);
    }

    left(){
        this.positionMoveNumber = 1;

        this.movePlayer(0);
    }

    right(){
        this.positionMoveNumber = 0;

        this.movePlayer(0);
    }

    next() {
        this.calculateMove();
    }

    init() {
        document.querySelector(".up").addEventListener("click", this.up.bind(this));
        document.querySelector(".down").addEventListener("click", this.down.bind(this));
        document.querySelector(".right").addEventListener("click", this.right.bind(this));
        document.querySelector(".left").addEventListener("click", this.left.bind(this));
        document.querySelector("#automate").addEventListener("click", this.automate.bind(this));
        document.querySelector("#stop").addEventListener("click", this.stop.bind(this));
        document.querySelector("#nextGenerationButton").addEventListener("click", this.next.bind(this));

        this.createMatriz();
    }

    automate(){
        this.automateKey = true;

        this.calculateMove();
    }

    async createMatriz(){
        this.individuals = this.Ia.createIndividuals(this.numberOfIndividuals);
        this.deathIndividuals = 0;

        this.matriz = await generateMatriz(this.Draw);

        this.newMatriz = await calculateMatriz(this.matriz);
    }

    async calculateMove() {
        await this.Ia.verifyNextMatriz(this.newMatriz);

        for(let i = 0; i < this.numberOfIndividuals; i++){
            if(this.individuals[i].status == "alive") {
                this.individuals[i] = await verifyMovement(this.individuals[i], this.newMatriz);
                this.positionMoveNumber = await this.Ia.choosePath(this.individuals[i], this.wave);

                await this.movePlayer(this.individuals[i]);
            }
        }

        this.addMove();
    }

    async movePlayer(individual) {
        return new Promise(resolve => {
            if(0 == this.positionMoveNumber){ //direita
                individual.position[0]++;
            } else if(1 == this.positionMoveNumber){ //esquerda
                individual.position[0]--;
            } else if(2 == this.positionMoveNumber){ //baixo
                individual.position[1]++;
            } else if(3 == this.positionMoveNumber){ //cima
                individual.position[1]--;
            } else { //morte
                console.log("ERROR", this.positionMoveNumber);
                return;
            }

            this.Ia.saveConfig(this.positionMoveNumber, individual);

            individual.cellValue = this.newMatriz[individual.position[1]][individual.position[0]];
            resolve();
        });
    }

    async addMove() {
        this.matriz = this.newMatriz.slice().map(arrays => arrays.slice());

        await this.Draw.draw(this.matriz, this.individuals);

        this.wave++;
        document.querySelector(`#generation`).innerText = `Wave: ${this.wave}`;

        Object.values(this.individuals).forEach(individual => {
            if(individual.status == "death" || this.win) {
                return;
            }

            if(individual.cellValue == 1){
                this.attempts++;

                individual.status = this.Ia.death(individual);
                this.deathIndividuals++;

                if(this.deathIndividuals == this.numberOfIndividuals) {
                    console.log("Tentativa Atual:", this.attempts);
                    console.log("wave:", this.wave);
                    console.log("Game Over: ", individual.cellValue);

                    this.wave = 0;
                    this.Ia.saveBestGeneration();

                    setTimeout(async () => {
                        await this.createMatriz();

                        if(this.automateKey) {
                            this.calculateMove();
                        }
                    }, 50);
                }
            } else if(individual.cellValue == 4){
                console.log("Parabéns, você chegou!");
                console.log("Tentativa Atual:", this.attempts);
                console.log("wave:", this.wave);

                this.Ia.win(individual);

                setTimeout(() => {
                    alert("Parabéns, você conseguiu!");
                }, 300);

                this.win = true;
            }
        });

        if(this.deathIndividuals != this.numberOfIndividuals && !this.win) {
            setTimeout(async () => {
                this.newMatriz = await calculateMatriz(this.matriz);

                if(this.automateKey) {
                    this.calculateMove();
                }
            }, 10);
        }
    }
}

export default Board;