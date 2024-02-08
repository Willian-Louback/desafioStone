const calculateMatriz = async (matriz) => {
    return new Promise(resolve => {
        const newMatriz = matriz.slice().map(arrays => arrays.slice());

        let cases = [];
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

                if(matriz[indexArray][index] == 0){ //Conferindo se é branco ou verde e aplicando a configuração de disseminação das células
                    quantityDangerous > 1 && quantityDangerous < 5 ? newMatriz[indexArray][index] = 1 : null;
                } else if(matriz[indexArray][index] == 1){
                    quantityDangerous > 3 && quantityDangerous < 6 ? null : newMatriz[indexArray][index] = 0;
                }

                if(indexArray == 64 && index == 84){
                    resolve(newMatriz);
                }

                cases = [];
                quantityDangerous = 0;
            });
        });
    });
};

export default calculateMatriz;