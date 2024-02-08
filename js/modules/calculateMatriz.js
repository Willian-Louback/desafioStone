const calculateMatriz = async (matriz, individuals) => {
    return new Promise(resolve => {
        const newMatriz = matriz.slice().map(arrays => arrays.slice());

        let cases = [];
        const possibleMoves = [];
        let quantityDangerous = 0;

        matriz.forEach((arrays, indexArray) => {
            arrays.forEach((_value, index) => {
                if(indexArray == 0 && index == 1){ //cuidando do canto superior esquerdo
                    cases = [
                        matriz[indexArray][index + 1],
                        matriz[indexArray + 1][index],
                        matriz[indexArray + 1][index - 1],
                        matriz[indexArray + 1][index + 1]
                    ];

                    cases.forEach(cases => cases == 1 ? quantityDangerous++ : null);
                } else if(indexArray == 0 && index != 0 && index != 84){ // cuidando do topo
                    cases = [
                        matriz[indexArray][index + 1],
                        matriz[indexArray][index - 1],
                        matriz[indexArray + 1][index],
                        matriz[indexArray + 1][index - 1],
                        matriz[indexArray + 1][index + 1]
                    ];

                    cases.forEach(cases => cases == 1 ? quantityDangerous++ : null);
                } else if(indexArray == 0 && index == 84){ //cuidando do canto superior direito
                    cases = [
                        matriz[indexArray][index - 1],
                        matriz[indexArray + 1][index],
                        matriz[indexArray + 1][index - 1]
                    ];

                    cases.forEach(cases => cases == 1 ? quantityDangerous++ : null);
                } else if(indexArray == 64 && index == 0){ //cuidando do canto inferior esquerdo
                    cases = [
                        matriz[indexArray - 1][index],
                        matriz[indexArray - 1][index + 1],
                        matriz[indexArray][index + 1]
                    ];

                    cases.forEach(cases => cases == 1 ? quantityDangerous++ : null);
                } else if(indexArray == 64 && index == 83){ //cuidando do canto inferior direito
                    cases = [
                        matriz[indexArray - 1][index],
                        matriz[indexArray - 1][index - 1],
                        matriz[indexArray - 1][index + 1],
                        matriz[indexArray][index - 1]
                    ];

                    cases.forEach(cases => cases == 1 ? quantityDangerous++ : null);
                } else if(indexArray == 64 && index != 84){ //cuidando da parte de baixo
                    cases = [
                        matriz[indexArray - 1][index],
                        matriz[indexArray - 1][index - 1],
                        matriz[indexArray - 1][index + 1],
                        matriz[indexArray][index - 1],
                        matriz[indexArray][index + 1]
                    ];

                    cases.forEach(cases => cases == 1 ? quantityDangerous++ : null);
                } else if(indexArray != 0 && index == 0){ //cuidando do canto esquerdo
                    cases = [
                        matriz[indexArray - 1][index],
                        matriz[indexArray - 1][index + 1],
                        matriz[indexArray + 1][index],
                        matriz[indexArray + 1][index + 1],
                        matriz[indexArray][index + 1]
                    ];

                    cases.forEach(cases => cases == 1 ? quantityDangerous++ : null);
                } else if(indexArray != 64 && index == 84){ //cuidando do canto direito
                    cases = [
                        matriz[indexArray - 1][index],
                        matriz[indexArray - 1][index - 1],
                        matriz[indexArray + 1][index],
                        matriz[indexArray + 1][index - 1],
                        matriz[indexArray][index - 1]
                    ];

                    cases.forEach(cases => cases == 1 ? quantityDangerous++ : null);
                } else if((indexArray != 0 && index != 0) && (indexArray != 64 && index != 84)){ //restante
                    cases = [
                        matriz[indexArray][index + 1],
                        matriz[indexArray][index - 1],
                        matriz[indexArray - 1][index],
                        matriz[indexArray + 1][index],
                        matriz[indexArray - 1][index + 1],
                        matriz[indexArray - 1][index - 1],
                        matriz[indexArray + 1][index - 1],
                        matriz[indexArray + 1][index + 1]
                    ];

                    cases.forEach(cases => cases == 1 ? quantityDangerous++ : null);
                }

                Object.values(individuals).forEach(individual => {
                    if(individual.position[1] == indexArray && individual.position[0] == index){
                        if(individual.status == "death") {
                            return;
                        }

                        possibleMoves.push({
                            id: individual.id,
                            values: [
                                index + 1 > 84 ? null : [indexArray, index + 1],
                                index - 1 < 0 ? null : [indexArray, index - 1],
                                indexArray + 1 > 64 ? null : [indexArray + 1, index],
                                indexArray - 1 < 0 ? null : [indexArray - 1, index]
                            ]
                        });
                    }
                });

                if(matriz[indexArray][index] == 0){ //Conferindo se é branco ou verde e aplicando a configuração de disseminação das células
                    quantityDangerous > 1 && quantityDangerous < 5 ? newMatriz[indexArray][index] = 1 : null;
                } else if(matriz[indexArray][index] == 1){
                    quantityDangerous > 3 && quantityDangerous < 6 ? null : newMatriz[indexArray][index] = 0;
                }

                if(indexArray == 64 && index == 84){
                    possibleMoves.forEach(possibleMove => {
                        if(possibleMove.values[0]){
                            individuals[possibleMove.id].valuePossibleMovement[0] = parseInt(newMatriz[possibleMove.values[0][0]][possibleMove.values[0][1]]); //direita
                        } else {
                            individuals[possibleMove.id].valuePossibleMovement[0] = null;
                        }

                        if(possibleMove.values[1]){
                            individuals[possibleMove.id].valuePossibleMovement[1] = parseInt(newMatriz[possibleMove.values[1][0]][possibleMove.values[1][1]]); //esquerda
                        } else {
                            individuals[possibleMove.id].valuePossibleMovement[1] = null;
                        }

                        if(possibleMove.values[2]){
                            individuals[possibleMove.id].valuePossibleMovement[2] = parseInt(newMatriz[possibleMove.values[2][0]][possibleMove.values[2][1]]); //baixo
                        } else {
                            individuals[possibleMove.id].valuePossibleMovement[2] = null;
                        }

                        if(possibleMove.values[3]){
                            individuals[possibleMove.id].valuePossibleMovement[3] = parseInt(newMatriz[possibleMove.values[3][0]][possibleMove.values[3][1]]); //cima
                        } else {
                            individuals[possibleMove.id].valuePossibleMovement[3] = null;
                        }
                    });

                    resolve({
                        newMatriz,
                        individuals
                    });
                }

                cases = [];
                quantityDangerous = 0;
            });
        });
    });
};

export default calculateMatriz;