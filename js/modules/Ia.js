// import calculateMatriz from "./calculateMatriz.js";

class Ia {
    constructor() {
        this.drawnNumber;
        this.drawnNumbers = "";
        this.nextMatriz;
        this.nextNewMatriz;
        this.numberToFollow = 0;
    }

    async choosePath(playerPosition, valuePossibleMovement, matriz, newMatriz){
        return new Promise(resolve => {
            if(playerPosition[0] == 0 && playerPosition[1] == 0){
                valuePossibleMovement = [
                    newMatriz[0][1],
                    null,
                    newMatriz[1][0],
                    null
                ];
            }

            const drawNumber = () => {
                this.drawnNumber = Math.floor(Math.random() * 7) < 1 ? Math.floor(Math.random() * 2) : //Vai deixar uma possibilidade de 1/10  (10%) de ser o 0 ou 1
                    2 + Math.floor(Math.random() * 2); //50% de ser 2 ou 3

                //Como eu quero deixar a probabilidade de 10% para cima e esquerda e 40% para direita ou baixo, aqui está os ajustes:
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
                    (this.drawnNumbers.indexOf(this.drawnNumber) == -1 && valuePossibleMovement[this.drawnNumber] == null) ||
                    (this.drawnNumbers.indexOf(this.drawnNumber) == -1 && valuePossibleMovement[this.drawnNumber] == 1)
                ){
                    this.drawnNumbers += this.drawnNumber + " ";
                }

                if(valuePossibleMovement[this.drawnNumber] == null || valuePossibleMovement[this.drawnNumber] == 1){
                    if(
                        (valuePossibleMovement[0] == 1 || valuePossibleMovement[0] == null) &&
                        (valuePossibleMovement[1] == 1 || valuePossibleMovement[1] == null) &&
                        (valuePossibleMovement[2] == 1 || valuePossibleMovement[2] == null) &&
                        (valuePossibleMovement[3] == 1 || valuePossibleMovement[3] == null)
                    ){
                        //console.log(valuePossibleMovement[0],valuePossibleMovement[1],valuePossibleMovement[2],valuePossibleMovement[3])
                        if(valuePossibleMovement[this.drawnNumber] == null){
                            drawNumber();
                        } else if(valuePossibleMovement[this.drawnNumber] == 1){
                            //Aqui é meio que aceitando a derrota...
                            // this.verificarProximaGeracao(matriz, newMatriz, valuePossibleMovement, playerPosition);
                            resolve(this.drawnNumber);
                        }
                    } else {
                        //console.log(drawnNumber,valuePossibleMovement[drawnNumber])
                        drawNumber();
                    }
                } else {
                    //console.log(drawnNumber, valuePossibleMovement);
                    // this.verificarProximaGeracao(matriz, newMatriz, valuePossibleMovement, playerPosition);
                    resolve(this.drawnNumber);
                }
            };

            drawNumber();
        });
    }

    async followBetterGeneration(bestGeneration, pathCounter){
        return new Promise(resolve => {
            if(pathCounter == 0) {
                this.numberToFollow = 0;
            }

            this.drawnNumber = parseInt(bestGeneration[pathCounter]);

            if(this.numberToFollow == 0){
                if(bestGeneration.length > 40) {
                    this.numberToFollow = Math.floor(Math.random() * 40) + 1;
                } else {
                    this.numberToFollow = Math.floor(Math.random() * (bestGeneration.length - 1));
                }
            }

            // console.log(bestGeneration, bestGeneration.length, this.drawnNumber, this.numberToFollow, pathCounter);
            resolve({
                drawnNumber: this.drawnNumber,
                numberToFollow: this.numberToFollow
            });
        });
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