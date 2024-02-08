import calculateMatriz from "./calculateMatriz.js";

class Ia {
    constructor() {
        this.drawnNumber;
        this.saveMatriz;
        this.saveValueMovement;
        this.saveValuePossibleMovement;
        this.saveIndividualPosition;
        this.drawnNumbers = "";
        this.bestGeneration = "";
        this.distance = 148;
        this.currentDistance = 148;
        this.onlyFollow = false;
        this.firstTime = true;
        this.resolve;

        //pesos do algoritmo genético
        this.individuals = {};
        this.currentIndividual;
        this.weight = 0;

        // A melhor até agora:
        // this.bestGeneration = "0022202220202200210010002122302202123103202020200212202001303123100120020002120203223002300120220002203223233220100000100100022021332222001101000213220002322021320022020032121000300002010032100203203022202222000022022331031110000203130332130300002030200213221002302222022302222033000212022200";
    }

    createIndividuals(numberOfIndividuals) {
        const individualsToReturn = {};
        this.individuals = {};

        for(let i = 0; i < numberOfIndividuals; i++) {
            this.individuals[i] = {
                id: i,
                position: [ 0, 0 ],
                weight: this.weight > 4 ?
                    (Math.floor(Math.random() * 2)) == 0 ?
                        this.weight + (Math.floor(Math.random() * 3))
                        : this.weight - (Math.floor(Math.random() * 3))
                    : (Math.floor(Math.random() * 10) + 2),
                path: "",
                cellValue: 3,
                valuePossibleMovement: [ null, null, null, null ],
                numberToFollow: 0,
                pathCounter: 0,
                distance: 148,
                status: "alive"
            };

            individualsToReturn[i] = {
                id: i,
                position: [ 0, 0 ],
                cellValue: 3,
                valuePossibleMovement: [ null, null, null, null ],
                status: "alive"
            };
        }

        return individualsToReturn;
    }

    async choosePath(individual, newMatriz, wave){
        this.currentIndividual = individual.id;

        if(this.bestGeneration.length > 0 && this.individuals[this.currentIndividual].numberToFollow == 0){
            this.newNumberToFollow();
        }

        if((wave < this.individuals[this.currentIndividual].numberToFollow || this.onlyFollow)) {
            return await this.followBetterGeneration();
        }

        return new Promise(resolve => {
            this.resolve = resolve;

            this.saveMatriz = newMatriz.slice().map(arrays => arrays.slice());
            this.saveValuePossibleMovement = [ ...individual.valuePossibleMovement ];
            this.saveIndividualPosition = [ ...individual.position ];

            this.drawNumber(individual.position, individual.valuePossibleMovement, newMatriz, "");
        });
    }

    drawNumber(playerPosition, valuePossibleMovement, newMatriz, drawnNumbers) {
        this.drawnNumber = Math.floor(Math.random() * this.individuals[this.currentIndividual].weight) < 1 ? Math.floor(Math.random() * 2) :
            2 + Math.floor(Math.random() * 2);

        if(this.drawnNumber == 3){
            this.drawnNumber = 0;
        } else if(this.drawnNumber == 0){
            this.drawnNumber = 3;
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
                    if(!this.firstTime) { // Aqui pode ser criado outro verificador para melhorar a eficiência
                        if(this.drawnNumbers.indexOf(this.drawnNumber) == -1) {
                            this.drawnNumbers += this.drawnNumber + " ";
                        }

                        this.verifyNextGeneration(this.saveMatriz);
                        return;
                    }

                    this.drawnNumbers = "";
                    this.individuals[this.currentIndividual].position = this.saveIndividualPosition;

                    this.resolve(this.drawnNumber);                }
            } else {
                this.drawNumber(playerPosition, valuePossibleMovement, newMatriz, drawnNumbers);
                return;
            }
        } else {
            this.individuals[this.currentIndividual].position = this.saveIndividualPosition;

            if(this.firstTime && this.drawnNumbers.length != 8) {
                if(this.drawnNumbers.indexOf(this.drawnNumber) == -1) {
                    this.drawnNumbers += this.drawnNumber + " ";
                }

                this.verifyNextGeneration(newMatriz);
                return;
            }

            this.firstTime = true;
            this.drawnNumbers = "";

            this.resolve(this.saveValueMovement);
        }
    }

    async verifyNextGeneration(newMatrizP) {
        if(this.firstTime) {
            this.saveValueMovement = this.drawnNumber;
            this.firstTime = false;
        } else {
            this.firstTime = true;
            this.drawNumber(this.saveIndividualPosition, this.saveValuePossibleMovement, this.saveMatriz, "");
            return;
        }

        if(0 == this.drawnNumber){ //direita
            this.individuals[this.currentIndividual].position[0]++;
            const { newMatriz, individuals } = await calculateMatriz(newMatrizP, this.individuals);

            this.drawNumber(individuals.position, individuals[this.currentIndividual].valuePossibleMovement, newMatriz, "");
        } else if(1 == this.drawnNumber){ //esquerda
            this.individuals[this.currentIndividual].position[0]--;
            const { newMatriz, individuals } = await calculateMatriz(newMatrizP, this.individuals);

            this.drawNumber(individuals.position, individuals[this.currentIndividual].valuePossibleMovement, newMatriz, "");
        } else if(2 == this.drawnNumber){ //baixo
            this.individuals[this.currentIndividual].position[1]++;
            const { newMatriz, individuals } = await calculateMatriz(newMatrizP, this.individuals);

            this.drawNumber(individuals.position, individuals[this.currentIndividual].valuePossibleMovement, newMatriz, "");
        } else if(3 == this.drawnNumber){ //cima
            this.individuals[this.currentIndividual].position[1]--;
            const { newMatriz, individuals } = await calculateMatriz(newMatrizP, this.individuals);

            this.drawNumber(individuals.position, individuals[this.currentIndividual].valuePossibleMovement, newMatriz, "");
        }
    }

    newNumberToFollow() {
        if(Math.floor(Math.random() * 2) == 0) {
            this.individuals[this.currentIndividual].numberToFollow = this.bestGeneration.length - Math.floor(Math.random() * 40);
        } else {
            this.individuals[this.currentIndividual].numberToFollow = Math.floor(Math.random() * (this.bestGeneration.length - 1));
        }
    }

    async followBetterGeneration(){
        return new Promise(resolve => {
            this.drawnNumber = parseInt(this.bestGeneration[this.individuals[this.currentIndividual].pathCounter]);

            this.individuals[this.currentIndividual].pathCounter++;

            resolve(this.drawnNumber);
        });
    }

    addPath(path, position) {
        this.individuals[position].path += path;

        if(0 == path){ //direita
            this.individuals[position].position[0]++;
        } else if(1 == path){ //esquerda
            this.individuals[position].position[0]--;
        } else if(2 == path){ //baixo
            this.individuals[position].position[1]++;
        } else if(3 == path){ //cima
            this.individuals[position].position[1]--;
        }
    }

    saveBestGeneration() {
        Object.values(this.individuals).forEach(individual => {
            if(individual.distance < this.distance) {
                this.distance = individual.distance;
                this.bestGeneration = individual.path;
                this.weight = individual.weight;
            }
        });
    }

    death(individual) {
        this.currentDistance = (64 - parseInt(individual.position[1])) + (84 - parseInt(individual.position[0]));

        this.individuals[individual.id].distance = this.currentDistance;

        console.log("Indivíduo:", this.individuals[individual.id]);
        console.log("Distância restante:", this.currentDistance);
        console.log("Melhor distância:", this.distance);
        console.log("Geração atual:", this.individuals[individual.id].path);
        console.log("Melhor geração: ", this.bestGeneration);

        this.currentDistance = 148;
        this.individuals[individual.id].status = "death";

        return "death";
    }

    win(individual) {
        console.log("Indivíduo:", this.individuals[individual.id]);
    }
}

export default Ia;