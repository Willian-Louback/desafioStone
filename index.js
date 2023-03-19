const fs = require('fs');

class Tabuleiro{
    constructor(branco, verde){
        this.branco = branco;
        this.verde = verde;
        this.cases = [];
        this.wave = 0;
        this.quantidade = 0;
    }

    criarMatriz = () => {
        const data = fs.readFileSync('padrao.txt', 'utf8');

        const linhas = data.split('\n');

        const matriz = Array.from({ length: linhas.length }, () => Array.from({length: 85}), () => 0);

        for(let i = 0; i < linhas.length; i++){
            const atribuirValores = linhas[i].trim().split(' ').map(Number);
            matriz[i] = atribuirValores;
        }
        //matriz[0][1] = 1;
        /*matriz[0][2] = 1;
        matriz[1][1] = 1;
        matriz[1][0] = 1;
        matriz[1][2] = 1;*/
        /*matriz[1][2] = 1;
        matriz[1][3] = 1;
        matriz[1][3] = 1;
        matriz[1][4] = 1;*/
        this.verificaPosicoes(matriz);
    }

    verificaPosicoes = (matriz) => {
        this.adicionarPosicao(matriz);
    }

    adicionarPosicao(matriz){
        matriz.forEach((arrays, indiceArray) => {
            arrays.forEach((numbers, indice) => {
                if(indiceArray == 0 && indice == 1){ //cuidando do canto superior esquerdo
                    this.cases = [
                        matriz[indiceArray][indice+1],
                        matriz[indiceArray+1][indice],
                        matriz[indiceArray+1][indice-1],
                        matriz[indiceArray+1][indice+1]
                    ]

                    this.cases.forEach(cases => cases == this.verde ? this.quantidade++ : null);
                    //console.log(this.quantidade);
                } else if(indiceArray == 0 && indice != 0 && indice != 84){ // cuidando do topo
                    this.cases = [
                        matriz[indiceArray][indice+1],
                        matriz[indiceArray][indice-1],
                        matriz[indiceArray+1][indice],
                        matriz[indiceArray+1][indice-1],
                        matriz[indiceArray+1][indice+1]
                    ]

                    this.cases.forEach(cases => cases == this.verde ? this.quantidade++ : null);
                    //console.log(this.quantidade);
                } else if(indiceArray == 0 && indice == 84){ //cuidando do canto superior direito
                    this.cases = [
                        matriz[indiceArray][indice-1],
                        matriz[indiceArray+1][indice],
                        matriz[indiceArray+1][indice-1]
                    ]

                    this.cases.forEach(cases => cases == this.verde ? this.quantidade++ : null);
                    //console.log(this.quantidade);
                } else if(indiceArray == 64 && indice == 0){ //cuidando do canto inferior esquerdo
                    this.cases = [
                        matriz[indiceArray-1][indice],
                        matriz[indiceArray-1][indice+1],
                        matriz[indiceArray][indice+1]
                    ]

                    this.cases.forEach(cases => cases == this.verde ? this.quantidade++ : null);
                    //console.log(this.quantidade);
                } else if(indiceArray == 64 && indice == 83){ //cuidando do canto inferior direito
                    this.cases = [
                        matriz[indiceArray-1][indice],
                        matriz[indiceArray-1][indice-1],
                        matriz[indiceArray-1][indice+1],
                        matriz[indiceArray][indice-1]
                    ]

                    this.cases.forEach(cases => cases == this.verde ? this.quantidade++ : null);
                    //console.log(this.quantidade);
                } else if(indiceArray == 64 && indice != 84){ //cuidando da parte de baixo
                    this.cases = [
                        matriz[indiceArray-1][indice],
                        matriz[indiceArray-1][indice-1],
                        matriz[indiceArray-1][indice+1],
                        matriz[indiceArray][indice-1],
                        matriz[indiceArray][indice+1]
                    ]

                    this.cases.forEach(cases => cases == this.verde ? this.quantidade++ : null);
                    //console.log(this.quantidade);
                } else if(indice == 0 && indiceArray != 0){ //cuidando do canto esquerdo
                    this.cases = [
                        matriz[indiceArray-1][indice],
                        matriz[indiceArray-1][indice+1],
                        matriz[indiceArray+1][indice],
                        matriz[indiceArray+1][indice+1],
                        matriz[indiceArray][indice+1]
                    ]

                    this.cases.forEach(cases => cases == this.verde ? this.quantidade++ : null);
                    //console.log(this.quantidade);
                } else if(indice == 84 && indiceArray != 64){ //cuidando do canto direito
                    this.cases = [
                        matriz[indiceArray-1][indice],
                        matriz[indiceArray-1][indice-1],
                        matriz[indiceArray+1][indice],
                        matriz[indiceArray+1][indice-1],
                        matriz[indiceArray][indice-1]
                    ]

                    this.cases.forEach(cases => cases == this.verde ? this.quantidade++ : null);
                    //console.log(this.quantidade);
                } else if(indiceArray != 0 && indiceArray != 64 && indice != 0 && indice != 84){ //restante (Arrumar depois, acho que posso remover algumas condições)
                    this.cases = [
                        matriz[indiceArray][indice+1],
                        matriz[indiceArray][indice-1],
                        matriz[indiceArray-1][indice],
                        matriz[indiceArray+1][indice],
                        matriz[indiceArray-1][indice+1],
                        matriz[indiceArray-1][indice-1],
                        matriz[indiceArray+1][indice-1],
                        matriz[indiceArray+1][indice+1]
                    ]

                    this.cases.forEach(cases => cases == this.verde ? this.quantidade++ : null);
                    //console.log(this.quantidade);
                } 

                if(matriz[indiceArray][indice] == this.branco){ //Conferindo se é branco ou verde
                    this.quantidade > 1 && this.quantidade < 5 ? matriz[indiceArray][indice] = this.verde : null;
                    //console.log('era branco:',matriz[indiceArray][indice]);
                } else if(matriz[indiceArray][indice] == this.verde){
                    this.quantidade > 3 && this.quantidade < 6 ? null : matriz[indiceArray][indice] = this.branco;
                    //console.log('era verde:',matriz[indiceArray][indice]);
                }

                this.cases = [];
                this.quantidade = 0;
            })
        })
        
        this.wave++;
        console.log("Wave:",this.wave);
        if(this.wave == 10){
            return;
        }
        console.log(matriz[0]);
        this.verificaPosicoes(matriz);
    }
}

const tabuleiro = new Tabuleiro(0, 1);

tabuleiro.criarMatriz();