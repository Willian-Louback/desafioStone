// import calculateMatriz from "./calculateMatriz.js";

class Ia {
    constructor() {
        this.drawnNumber;
        this.nextMatriz;
        this.nextNewMatriz;
        this.numberToFollow = 0;
        this.path = "";
        this.pathCounter = 0;
        this.bestGeneration = "";
        this.distance = 148;
        this.currentDistance = 148;
        this.onlyFollow = false;

        //Testes
        // this.bestGeneration = "023212220300020222102022300320222210220302202300222230023202120231103002032200202322300231002202000120000000300003120221002112203101030032230320010302203003220112103010002200122013220312023222202200322212221200200102333001010221122020320320002002202020220231021300202212100323020110312101003210100132110011323213020103000000";
        // A melhor até agora:
        // this.bestGeneration = "0022202220202200210010002122302202123103202020200212202001303123100120020002120203223002300120220002203223233220100000100100022021332222001101000213220002322021320022020032121000300002010032100203203022202222000022022331031110000203130332130300002030200213221002302222022302222033000212022200";
    }

    async choosePath(playerPosition, valuePossibleMovement, matriz, newMatriz, wave){
        if((wave < (this.bestGeneration.length - this.numberToFollow) || this.onlyFollow)) {
            return await this.followBetterGeneration();
        }

        return new Promise(resolve => {
            let drawnNumbers = "";

            if(playerPosition[0] == 0 && playerPosition[1] == 0){
                valuePossibleMovement = [
                    newMatriz[0][1],
                    null,
                    newMatriz[1][0],
                    null
                ];
            }

            const drawNumber = () => {
                this.drawnNumber = Math.floor(Math.random() * 7) < 1 ? Math.floor(Math.random() * 2) :
                    2 + Math.floor(Math.random() * 2);

                if(this.drawnNumber == 1){
                    this.drawnNumber = 1;
                } else if(this.drawnNumber == 3){
                    this.drawnNumber = 0;
                } else if(this.drawnNumber == 0){
                    this.drawnNumber = 3;
                } else if(this.drawnNumber == 2){
                    this.drawnNumber = 2;
                }

                if(
                    (drawnNumbers.indexOf(this.drawnNumber) == -1 && valuePossibleMovement[this.drawnNumber] == null) ||
                    (drawnNumbers.indexOf(this.drawnNumber) == -1 && valuePossibleMovement[this.drawnNumber] == 1)
                ){
                    drawnNumbers += this.drawnNumber + " ";
                }

                if(valuePossibleMovement[this.drawnNumber] == null || valuePossibleMovement[this.drawnNumber] == 1){
                    if(
                        (valuePossibleMovement[0] == 1 || valuePossibleMovement[0] == null) &&
                        (valuePossibleMovement[1] == 1 || valuePossibleMovement[1] == null) &&
                        (valuePossibleMovement[2] == 1 || valuePossibleMovement[2] == null) &&
                        (valuePossibleMovement[3] == 1 || valuePossibleMovement[3] == null)
                    ){
                        if(valuePossibleMovement[this.drawnNumber] == null){
                            drawNumber();
                        } else if(valuePossibleMovement[this.drawnNumber] == 1){
                            resolve({
                                drawnNumber: this.drawnNumber,
                                numberToFollow: this.numberToFollow
                            });
                        }
                    } else {
                        drawNumber();
                    }
                } else {
                    resolve({
                        drawnNumber: this.drawnNumber,
                        numberToFollow: this.numberToFollow
                    });
                }
            };

            drawNumber();
        });
    }

    async followBetterGeneration(){
        return new Promise(resolve => {
            this.drawnNumber = parseInt(this.bestGeneration[this.pathCounter]);

            if(this.numberToFollow == 0){
                if(Math.floor(Math.random() * 2) == 0) {
                    console.log("40");
                    this.numberToFollow = Math.floor(Math.random() * 60) + 1;
                } else {
                    console.log("length");
                    this.numberToFollow = Math.floor(Math.random() * (this.bestGeneration.length - 1));
                }
            }

            this.pathCounter++;

            resolve({
                drawnNumber: this.drawnNumber,
                numberToFollow: this.numberToFollow
            });
        });
    }

    addPath(path) {
        this.path += path;
    }

    death(playerPosition) {
        this.currentDistance = (64 - parseInt(playerPosition[1])) + (84 - parseInt(playerPosition[0]));

        if(this.currentDistance < this.distance){
            this.distance = this.currentDistance;
            this.bestGeneration = this.path;
        }

        this.pathCounter = 0;
        this.numberToFollow = 0;

        console.log("Distância restante:", this.currentDistance);
        console.log("Melhor distância:", this.distance);
        console.log("Geração atual:", this.path);
        console.log("Melhor geração: ", this.bestGeneration);

        this.path = "";
        this.currentDistance = 148;
        return;
    }

    /*async verificarProximaGeracao(matriz, newMatriz, valuePossibleMovement, playerPosition) { //Eu achei o erro, alguma coisa aqui está dando certo. O primeiro funciona normalmente, mas o segundo está mandando uns números suspeitos
        this.nextMatriz = matriz.slice().map(arrays => arrays.slice());
        this.nextNewMatriz = newMatriz.slice().map(arrays => arrays.slice());

        this.matriz = newMatriz.slice().map(arrays => arrays.slice());
        //this.playerPositionV = matriz[this.contadorVV][this.contadorHV];
        if(0 == this.drawnNumber){ //direita
            playerPosition[0]++;
            //console.log('R');
            const { newMatriz, valuePossibleMovement } = await calculateMatriz(matriz, playerPosition, valuePossibleMovement);
        } else if(1 == this.drawnNumber){ //esquerda
            playerPosition[0]--;
            //console.log('L');
            const { newMatriz, valuePossibleMovement } = await calculateMatriz(matriz, playerPosition, valuePossibleMovement);
        } else if(2 == this.drawnNumber){ //baixo
            playerPosition[1]++;
            //console.log('D');
            const { newMatriz, valuePossibleMovement } = await calculateMatriz(matriz, playerPosition, valuePossibleMovement);
        } else if(3 == this.drawnNumber){ //cima
            playerPosition[1]--;
            //console.log('U');
            const { newMatriz, valuePossibleMovement } = await calculateMatriz(matriz, playerPosition, valuePossibleMovement);
        } else { //morte
            console.log("nada, L", this.drawnNumber);
        }

        // this.movePlayer();
    }*/
}

export default Ia;