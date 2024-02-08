const verifyMovement = async (individual, matriz) => {
    return new Promise(resolve => {
        const values = [
            individual.position[0] + 1 > 84 ? null : [individual.position[1], individual.position[0] + 1],
            individual.position[0] - 1 < 0 ? null : [individual.position[1], individual.position[0] - 1],
            individual.position[1] + 1 > 64 ? null : [individual.position[1] + 1, individual.position[0]],
            individual.position[1] - 1 < 0 ? null : [individual.position[1] - 1, individual.position[0]]
        ];

        if(values[0]){
            individual.valuePossibleMovement[0] = parseInt(matriz[values[0][0]][values[0][1]]); //direita
        } else {
            individual.valuePossibleMovement[0] = null;
        }

        if(values[1]){
            individual.valuePossibleMovement[1] = parseInt(matriz[values[1][0]][values[1][1]]); //esquerda
        } else {
            individual.valuePossibleMovement[1] = null;
        }

        if(values[2]){
            individual.valuePossibleMovement[2] = parseInt(matriz[values[2][0]][values[2][1]]); //baixo
        } else {
            individual.valuePossibleMovement[2] = null;
        }

        if(values[3]){
            individual.valuePossibleMovement[3] = parseInt(matriz[values[3][0]][values[3][1]]); //cima
        } else {
            individual.valuePossibleMovement[3] = null;
        }

        resolve(individual);
    });
};

export default verifyMovement;