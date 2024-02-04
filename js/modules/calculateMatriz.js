const calculateMatriz = async (matriz, playerPosition, valuePossibleMovement) => {
    return new Promise(resolve => {
        const newMatriz = matriz.slice().map(arrays => arrays.slice());

        let cases = [];
        let possibleMoves;
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

                if(playerPosition[1] == indexArray && playerPosition[0] == index){
                    possibleMoves = [
                        index + 1 > 84 ? null : [indexArray, index + 1],
                        index - 1 < 0 ? null : [indexArray, index - 1],
                        indexArray + 1 > 64 ? null : [indexArray + 1, index],
                        indexArray - 1 < 0 ? null : [indexArray - 1, index]
                    ];
                }

                if(matriz[indexArray][index] == 0){ //Conferindo se é branco ou verde e aplicando a configuração de disseminação das células
                    quantityDangerous > 1 && quantityDangerous < 5 ? newMatriz[indexArray][index] = 1 : null;
                } else if(matriz[indexArray][index] == 1){
                    quantityDangerous > 3 && quantityDangerous < 6 ? null : newMatriz[indexArray][index] = 0;
                }

                // if(this.chave != true){
                if(indexArray == 64 && index == 84){
                    if(possibleMoves[0] != null){
                        valuePossibleMovement[0] = parseInt(newMatriz[possibleMoves[0][0]][possibleMoves[0][1]]); //direita
                    }
                    if(possibleMoves[1] != null){
                        valuePossibleMovement[1] =  parseInt(newMatriz[possibleMoves[1][0]][possibleMoves[1][1]]); //esquerda
                    }
                    if(possibleMoves[2] != null){
                        valuePossibleMovement[2] =  parseInt(newMatriz[possibleMoves[2][0]][possibleMoves[2][1]]); //baixo
                    }
                    if(possibleMoves[3] != null){
                        valuePossibleMovement[3] =  parseInt(newMatriz[possibleMoves[3][0]][possibleMoves[3][1]]); //cima
                    }

                    resolve({
                        newMatriz,
                        valuePossibleMovement
                    });
                }

                cases = [];
                quantityDangerous = 0;
            });
        });
    });
};

export default calculateMatriz;