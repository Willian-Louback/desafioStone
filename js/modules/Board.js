import generateMatriz from "./generateMatriz.js";
import calculateMatriz from "./calculateMatriz.js";
import Ia from "./Ia.js";

class Board{
    constructor(){
        this.matriz;
        this.newMatriz;
        this.player = 3;
        this.playerPosition = [ 0, 0 ];
        this.wave = 0;
        this.valuePossibleMovement = [ null, null, null, null ];
        this.attempts = 1;
        this.drawnNumber;
        this.automateKey = false;
        this.distance = 148;
        this.currentDistance = 148;
        this.path = "";
        this.pathCounter = 0;
        this.bestGeneration = "";
        this.numberToFollow = 0;
        this.Ia = new Ia();

        //SalvarGeração
        // this.pathVisual = "";

        //Testes
        //this.bestGeneration = "22012022212000232222222300302320001023220020230300300012302023202020020230332202203222222311220312231232310003131300223110010320223220202102032010302000333202120301221021313211203112020332221313302102030200222222002001320110202022120022333202000230231112201110022202103212220230200000203022202003201120302020232110000000001101000000000113000021003300020330220002";
        // A melhor até agora:
        //this.bestGeneration = "0022202220202200210010002122302202123103202020200212202001303123100120020002120203223002300120220002203223233220100000100100022021332222001101000213220002322021320022020032121000300002010032100203203022202222000022022331031110000203130332130300002030200213221002302222022302222033000212022200";
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

        if(!this.bestGeneration || this.wave > (this.bestGeneration.length - this.numberToFollow)) {
            this.drawnNumber = await this.Ia.choosePath(this.playerPosition, this.valuePossibleMovement, this.matriz, this.newMatriz);
        } else {
            const { drawnNumber, numberToFollow } = await this.Ia.followBetterGeneration(this.bestGeneration, this.pathCounter);

            this.drawnNumber = drawnNumber;
            this.numberToFollow = numberToFollow;

            this.pathCounter++;
        }

        this.movePlayer();
    }

    // stop(){
    //     this.chaveC = false;
    //     this.ativadorC = false;
    // }

    up(){
        this.ignorar = true;
        this.chaveManual = true;
        this.drawnNumber = 3;

        this.movePlayer();
    }

    down(){
        this.ignorar = true;
        this.chaveManual = true;
        this.drawnNumber = 2;

        this.movePlayer();
    }

    left(){
        this.ignorar = true;
        this.chaveManual = true;
        this.drawnNumber = 1;

        this.movePlayer();
    }

    right(){
        this.ignorar = true;
        this.chaveManual = true;
        this.drawnNumber = 0;

        this.movePlayer();
    }

    movePlayer() {
        if(0 == this.drawnNumber){ //direita
            this.playerPosition[0]++;
            // pathVisual += "R ";
            this.path += "0";
        } else if(1 == this.drawnNumber){ //esquerda
            this.playerPosition[0]--;
            // pathVisual += "L ";
            this.path += "1";
        } else if(2 == this.drawnNumber){ //baixo
            this.playerPosition[1]++;
            // pathVisual += "D ";
            this.path += "2";
        } else if(3 == this.drawnNumber){ //cima
            this.playerPosition[1]--;
            // pathVisual += "U ";
            this.path += "3";
        } else { //morte
            console.log("ERROR", this.drawnNumber);
            return;
        }

        this.player = this.newMatriz[this.playerPosition[1]][this.playerPosition[0]];
        this.addMove();
    }

    addMove() {
        this.matriz = this.newMatriz.slice().map(arrays => arrays.slice());
        this.matriz[this.playerPosition[1]][this.playerPosition[0]] = this.matriz[this.playerPosition[1]][this.playerPosition[0]] + "P"; // essa parte precisa de otimização

        document.querySelector("#matriz").innerText = ``;

        this.matriz.forEach(value => {
            document.querySelector("#matriz").innerText += `${value.join(" ")}\n`;
        });

        this.matriz = this.newMatriz.slice().map(arrays => arrays.slice());

        this.valuePossibleMovement = [ null, null, null, null ];
        this.wave++;
        document.querySelector(`#generation`).innerText = `Geração: ${this.wave}`;

        if(this.player == 1){
            this.attempts++;

            this.currentDistance = (64 - parseInt(this.playerPosition[1])) + (84 - parseInt(this.playerPosition[0]));

            if(this.currentDistance < this.distance){
                this.distance = this.currentDistance;
                this.bestGeneration = this.path;
            }

            console.log("Tentativa Atual:", this.attempts);
            console.log("wave:", this.wave);
            console.log("Game Over: ", this.player);
            console.log("Distância restante:", this.currentDistance);
            console.log("Melhor distância:", this.distance);
            console.log("Geração atual:", this.path);
            console.log("Melhor geração: ", this.bestGeneration);
            console.log("Número Sorteado:", this.numberToFollow);
            // this.pathVisual = "";
            this.currentDistance = 148;
            this.path = "";
            this.pathCounter = 0;
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
            }, 100);
        } else if(this.player == 4){
            console.log("Parabéns, você chegou!");
            console.log("Tentativa Atual:", this.attempts);
            console.log("wave:", this.wave);
            console.log("Player position: ", this.player);
            console.log("Position:", this.playerPosition[1], this.playerPosition[0]);
            // console.log("Distância restante:", this.currentDistance);
            // console.log("Melhor distance:",this.distance);
            // console.log("path seguido:", this.pathVisual);
            // console.log("path numeral:", this.path);
            // this.chaveC = false;

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
            }, 10);
        }
    }
}

export default Board;