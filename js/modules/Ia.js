import calculateMatriz from "./calculateMatriz.js";

class Ia {
    constructor() {
        this.drawnNumber;
        this.saveMatriz;
        this.saveValueMovement;
        this.saveValuePossibleMovement;
        this.savePlayerPosition;
        this.drawnNumbers = "";
        // this.quantityNumbersDrawn = 0;
        // this.verifyQuantity;
        this.numberToFollow = 0;
        this.path = "";
        this.pathCounter = 0;
        this.bestGeneration = "";
        this.distance = 148;
        this.currentDistance = 148;
        this.onlyFollow = false;
        this.firstTime = true;
        this.resolve;

        // A melhor até agora:
        // this.bestGeneration = "0022202220202200210010002122302202123103202020200212202001303123100120020002120203223002300120220002203223233220100000100100022021332222001101000213220002322021320022020032121000300002010032100203203022202222000022022331031110000203130332130300002030200213221002302222022302222033000212022200";
    }

    async choosePath(playerPosition, valuePossibleMovement, newMatriz, wave){
        if((wave < (this.bestGeneration.length - this.numberToFollow) || this.onlyFollow)) {
            return await this.followBetterGeneration();
        }

        return new Promise(resolve => {

            if(playerPosition[0] == 0 && playerPosition[1] == 0){
                valuePossibleMovement = [
                    newMatriz[0][1],
                    null,
                    newMatriz[1][0],
                    null
                ];
            }

            this.resolve = resolve;

            this.drawNumber(playerPosition, valuePossibleMovement, newMatriz, "");
        });
    }

    drawNumber(playerPosition, valuePossibleMovement, newMatriz, drawnNumbers) {
        this.drawnNumber = Math.floor(Math.random() * 8) < 1 ? Math.floor(Math.random() * 2) :
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

        if(drawnNumbers.indexOf(this.drawnNumber) != -1) {
            this.drawNumber(playerPosition, valuePossibleMovement, newMatriz, drawnNumbers);
            return;
        }

        if(
            (drawnNumbers.indexOf(this.drawnNumber) == -1 && valuePossibleMovement[this.drawnNumber] == null) ||
            (drawnNumbers.indexOf(this.drawnNumber) == -1 && valuePossibleMovement[this.drawnNumber] == 1)
        ){
            drawnNumbers += this.drawnNumber + " ";
        }


        if(valuePossibleMovement[this.drawnNumber] == null || valuePossibleMovement[this.drawnNumber] == 1){
            if(this.firstTime && this.drawnNumbers.indexOf(this.drawnNumber) == -1) {
                this.drawnNumbers += this.drawnNumber + " ";
            }

            if(
                (valuePossibleMovement[0] == 1 || valuePossibleMovement[0] == null) &&
                (valuePossibleMovement[1] == 1 || valuePossibleMovement[1] == null) &&
                (valuePossibleMovement[2] == 1 || valuePossibleMovement[2] == null) &&
                (valuePossibleMovement[3] == 1 || valuePossibleMovement[3] == null)
            ){
                if(valuePossibleMovement[this.drawnNumber] == null){
                    this.drawNumber(playerPosition, valuePossibleMovement, newMatriz, drawnNumbers);
                    return;
                } else if(valuePossibleMovement[this.drawnNumber] == 1){
                    if(!this.firstTime) { //aqui vai precisar de outro verificador
                        this.verifyNextGeneration(this.saveMatriz, this.saveValuePossibleMovement, this.savePlayerPosition);
                        return;
                    }

                    this.drawnNumbers = "";

                    this.resolve({
                        drawnNumber: this.drawnNumber,
                        numberToFollow: this.numberToFollow
                    });
                }
            } else {
                this.drawNumber(playerPosition, valuePossibleMovement, newMatriz, drawnNumbers);
                return;
            }
        } else {
            if(this.firstTime && this.drawnNumbers.length != 8) {
                if(this.drawnNumbers.indexOf(this.drawnNumber) == -1) {
                    this.drawnNumbers += this.drawnNumber + " ";
                }

                this.verifyNextGeneration(newMatriz, valuePossibleMovement, playerPosition);
                return;
            }

            this.firstTime = true;
            this.drawnNumbers = "";

            this.resolve({
                drawnNumber: this.saveValueMovement,
                numberToFollow: this.numberToFollow
            });
            console.log("resolvido", this.saveValuePossibleMovement, valuePossibleMovement, this.saveValueMovement);
        }
    }

    async verifyNextGeneration(newMatrizP, valuePossibleMovementP, playerPosition) { //Eu achei o erro, alguma coisa aqui está dando certo. O primeiro funciona normalmente, mas o segundo está mandando uns números suspeitos
        if(this.firstTime) {
            this.saveMatriz = newMatrizP.slice().map(arrays => arrays.slice());
            this.saveValueMovement = this.drawnNumber;
            this.saveValuePossibleMovement = [ ...valuePossibleMovementP ];
            this.savePlayerPosition = [ ...playerPosition ];
            this.firstTime = false;
        } else {
            this.firstTime = true;
            this.drawNumber(this.savePlayerPosition, this.saveValuePossibleMovement, this.saveMatriz, "");
            return;
        }

        const newPlayerPosition = [ ...playerPosition ];

        if(0 == this.drawnNumber){ //direita
            newPlayerPosition[0]++;
            const { newMatriz, valuePossibleMovement } = await calculateMatriz(newMatrizP, newPlayerPosition, valuePossibleMovementP);

            this.drawNumber(newPlayerPosition, valuePossibleMovement, newMatriz, "");
        } else if(1 == this.drawnNumber){ //esquerda
            newPlayerPosition[0]--;
            const { newMatriz, valuePossibleMovement } = await calculateMatriz(newMatrizP, newPlayerPosition, valuePossibleMovementP);

            this.drawNumber(newPlayerPosition, valuePossibleMovement, newMatriz, "");
        } else if(2 == this.drawnNumber){ //baixo
            newPlayerPosition[1]++;
            const { newMatriz, valuePossibleMovement } = await calculateMatriz(newMatrizP, newPlayerPosition, valuePossibleMovementP);

            this.drawNumber(newPlayerPosition, valuePossibleMovement, newMatriz, "");
        } else if(3 == this.drawnNumber){ //cima
            newPlayerPosition[1]--;
            const { newMatriz, valuePossibleMovement } = await calculateMatriz(newMatrizP, newPlayerPosition, valuePossibleMovementP);

            this.drawNumber(newPlayerPosition, valuePossibleMovement, newMatriz, "");
        }
    }

    async followBetterGeneration(){
        return new Promise(resolve => {
            this.drawnNumber = parseInt(this.bestGeneration[this.pathCounter]);

            if(this.numberToFollow == 0){
                // if(Math.floor(Math.random() * 2) == 0) {
                // console.log("40");
                this.numberToFollow = Math.floor(Math.random() * 40) + 1;
                // } else {
                //     console.log("length");
                //     this.numberToFollow = Math.floor(Math.random() * (this.bestGeneration.length - 1));
                // }
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

    win() {
        console.log("geração atual:", this.path);
    }
}

export default Ia;