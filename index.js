const fs = require('fs');

class Tabuleiro{
    constructor(branco, verde){
        this.branco = branco;
        this.verde = verde;
        this.cases = [];
        this.wave = 0;
        this.quantidade = 0;
        this.newMatriz = [];
        this.playerPosition;
        //contador
        this.contadorH = 0;
        this.contadorV = 0;
        //posições ruins
        this.evitar = [];
        this.verificaEvitar = [];
    }

    criarMatriz = () => {
        const data = fs.readFileSync('padrao.txt', 'utf8');

        const linhas = data.split('\n');

        const matriz = Array.from({ length: linhas.length }, () => Array.from({length: 85}), () => 0);

        for(let i = 0; i < linhas.length; i++){
            const atribuirValores = linhas[i].trim().split(' ').map(Number);
            matriz[i] = atribuirValores;
        }

        this.newMatriz = matriz.slice().map(arrays => arrays.slice());

        this.playerPosition = matriz[0][0];

        this.verificaPosicoes(matriz);
    }

    verificaPosicoes = (matriz) => { //Verificando as posições, mas sem adicionar na Matriz
        matriz.forEach((arrays, indiceArray) => {
            arrays.forEach((numbers, indice) => {
                if(indiceArray == 0 && indice == 1){ //cuidando do canto superior esquerdo
                    this.cases = [
                        matriz[indiceArray][indice+1],
                        matriz[indiceArray+1][indice],
                        matriz[indiceArray+1][indice-1],
                        matriz[indiceArray+1][indice+1]
                    ]

                    if(this.contadorV == indiceArray && this.contadorH == indice){ 
                        //console.log('passou\n playerArray:',this.contadorV,'array:',indiceArray,'\nplayerIndice:',this.contadorH,'indice:',indice);
                        this.verificaEvitar = [
                            [indiceArray,indice+1],
                            [indiceArray,indice-1],
                            [indiceArray+1,indice],
                            null
                        ]
                    }
                    /*console.log(this.contadorV, indiceArray)
                    console.log("---")
                    console.log(this.contadorH, indice)*/

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

                    if(this.contadorV == indiceArray && this.contadorH == indice){ 
                        //console.log('passou\n playerArray:',this.contadorV,'array:',indiceArray,'\nplayerIndice:',this.contadorH,'indice:',indice);

                        this.verificaEvitar = [
                            [indiceArray,indice+1],
                            [indiceArray,indice-1],
                            [indiceArray+1,indice],
                            null
                        ]
                    }

                    this.cases.forEach(cases => cases == this.verde ? this.quantidade++ : null);
                    //console.log(this.quantidade);
                } else if(indiceArray == 0 && indice == 84){ //cuidando do canto superior direito
                    this.cases = [
                        matriz[indiceArray][indice-1],
                        matriz[indiceArray+1][indice],
                        matriz[indiceArray+1][indice-1]
                    ]

                    if(this.contadorV == indiceArray && this.contadorH == indice){ 
                        //console.log('passou\n playerArray:',this.contadorV,'array:',indiceArray,'\nplayerIndice:',this.contadorH,'indice:',indice);

                        this.verificaEvitar = [
                            null,
                            [indiceArray,indice-1],
                            [indiceArray+1,indice],
                            null
                        ]
                    }

                    this.cases.forEach(cases => cases == this.verde ? this.quantidade++ : null);
                    //console.log(this.quantidade);
                } else if(indiceArray == 64 && indice == 0){ //cuidando do canto inferior esquerdo
                    this.cases = [
                        matriz[indiceArray-1][indice],
                        matriz[indiceArray-1][indice+1],
                        matriz[indiceArray][indice+1]
                    ]

                    if(this.contadorV == indiceArray && this.contadorH == indice){ 
                       // console.log('passou\n playerArray:',this.contadorV,'array:',indiceArray,'\nplayerIndice:',this.contadorH,'indice:',indice);

                        this.verificaEvitar = [
                            [indiceArray,indice+1],
                            null,
                            null,
                            [indiceArray-1,indice]
                        ]
                    }

                    this.cases.forEach(cases => cases == this.verde ? this.quantidade++ : null);
                    //console.log(this.quantidade);
                } else if(indiceArray == 64 && indice == 83){ //cuidando do canto inferior direito
                    this.cases = [
                        matriz[indiceArray-1][indice],
                        matriz[indiceArray-1][indice-1],
                        matriz[indiceArray-1][indice+1],
                        matriz[indiceArray][indice-1]
                    ]

                    if(this.contadorV == indiceArray && this.contadorH == indice){ 
                        //console.log('passou\n playerArray:',this.contadorV,'array:',indiceArray,'\nplayerIndice:',this.contadorH,'indice:',indice);

                        this.verificaEvitar = [
                            [indiceArray][indice+1],
                            [indiceArray][indice-1],
                            null,
                            [indiceArray-1,indice]
                        ]
                    }

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

                    if(this.contadorV == indiceArray && this.contadorH == indice){ 
                        //console.log('passou\n playerArray:',this.contadorV,'array:',indiceArray,'\nplayerIndice:',this.contadorH,'indice:',indice);

                        this.verificaEvitar = [
                            [indiceArray,indice+1],
                            [indiceArray,indice-1],
                            null,
                            [indiceArray-1,indice]
                        ]
                    }

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

                    if(this.contadorV == indiceArray && this.contadorH == indice){ 
                        //console.log('passou\n playerArray:',this.contadorV,'array:',indiceArray,'\nplayerIndice:',this.contadorH,'indice:',indice);

                        this.verificaEvitar = [
                            [indiceArray,indice+1],
                            null,
                            [indiceArray+1,indice],
                            [indiceArray-1,indice]
                        ]
                    }

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

                    if(this.contadorV == indiceArray && this.contadorH == indice){ 
                        //console.log('passou\n playerArray:',this.contadorV,'array:',indiceArray,'\nplayerIndice:',this.contadorH,'indice:',indice);

                        this.verificaEvitar = [
                            null,
                            [indiceArray,indice-1],
                            [indiceArray+1,indice],
                            [indiceArray-1,indice]
                        ]
                    }

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

                    if(this.contadorV == indiceArray && this.contadorH == indice){ 
                        //console.log('passou\n playerArray:',this.contadorV,'array:',indiceArray,'\nplayerIndice:',this.contadorH,'indice:',indice);

                        this.verificaEvitar = [
                            [indiceArray,indice+1],
                            [indiceArray,indice-1],
                            [indiceArray+1,indice],
                            [indiceArray-1,indice]
                        ]
                    }

                    this.cases.forEach(cases => cases == this.verde ? this.quantidade++ : null);
                    //console.log(this.quantidade);
                }

                if(matriz[indiceArray][indice] == this.branco){ //Conferindo se é branco ou verde
                    this.quantidade > 1 && this.quantidade < 5 ? this.newMatriz[indiceArray][indice] = this.verde : null;
                    //console.log('era branco:',this.newMatriz[indiceArray][indice]);
                } else if(matriz[indiceArray][indice] == this.verde){
                    this.quantidade > 3 && this.quantidade < 6 ? null : this.newMatriz[indiceArray][indice] = this.branco;
                    //console.log('era verde:',matriz[indiceArray][indice]);
                }
                
                if(indiceArray == 64 && indice == 84){
                    if(this.verificaEvitar[0] != null){
                        this.evitar[0] = this.newMatriz[this.verificaEvitar[0][0]][this.verificaEvitar[0][1]]; //direita
                            /*console.log('Player:',this.playerPosition)
                            console.log('playerPosition:', this.contadorV, this.contadorH)
                            console.log('verificaEvitar:',this.verificaEvitar[0]) 
                            console.log('indices:',indiceArray,indice)
                            console.log('valorMatriz:',this.newMatriz[this.verificaEvitar[0][0]][this.verificaEvitar[0][1]])
                            console.log('Evitar:',this.evitar[0])*/

                        console.log(this.verificaEvitar[0], this.evitar[0])
                    }
                    if(this.verificaEvitar[1] != null){
                        this.evitar[1] = this.newMatriz[this.verificaEvitar[1][0]][this.verificaEvitar[1][1]]; //esquerda
                    } 
                    if(this.verificaEvitar[2] != null){
                        this.evitar[2] = this.newMatriz[this.verificaEvitar[2][0]][this.verificaEvitar[2][1]]; //baixo
                    } 
                    if(this.verificaEvitar[3] != null){
                        this.evitar[3] = this.newMatriz[this.verificaEvitar[3][0]][this.verificaEvitar[3][1]]; //cima
                    }
                }

                this.cases = [];
                this.quantidade = 0;
            })
        })
        this.moverPlayer(this.newMatriz, matriz);
    }

    moverPlayer = (matrizAtualizada, matriz) => {
        
        console.log('this.evitar:',this.evitar) //Consertar erro de lógica, há algum problema fazendo verificar 1 antes, algo assim
        //console.log(this.wave)
        this.verificaEvitar = [];
        //console.log("antes:",this.evitar)
        if(this.contadorV == 0 && this.contadorH == 0){
            this.evitar = [
                this.newMatriz[0][1],
                null,
                this.newMatriz[1][0],
                null
            ]
        }
        //console.log("depois:",this.evitar)
        
        //Para ficar em um padrão, eu posso deixar tudo igual e adicionar um valor diferente de 0 e de 1 no evitar, para o if testar as possibilidades
        if(this.evitar[0] == this.branco){ //direita
            this.evitar = [null, null, null, null];
            this.contadorH++;
            this.playerPosition = matrizAtualizada[this.contadorV][this.contadorH];
            console.log('R');
            this.adicionarPosicao(matriz);
        } else if(this.evitar[1] == this.branco){ //esquerda
            this.evitar = [null, null, null, null];
            this.contadorH--;
            this.playerPosition = matrizAtualizada[this.contadorV][this.contadorH];
            console.log('L');
            this.adicionarPosicao(matriz);
        } else if(this.evitar[2] == this.branco){ //baixo
            this.evitar = [null, null, null, null];
            this.contadorV++;
            this.playerPosition = matrizAtualizada[this.contadorV][this.contadorH];
            console.log('D');
            this.adicionarPosicao(matriz);
        } else if(this.evitar[3] == this.branco){ //cima
            this.evitar = [null, null, null, null];
            this.contadorH--;
            this.playerPosition = matrizAtualizada[this.contadorV][this.contadorH];
            console.log('U');
            this.adicionarPosicao(matriz);
        } else { //morte
            //return;
            console.log('nada, L');
            this.evitar = [null, null, null, null];
            this.contadorH--;
            this.playerPosition = matrizAtualizada[this.contadorV][this.contadorH];
            this.adicionarPosicao(matriz);
        }
        
        
    }

    adicionarPosicao(matriz){ //Adicionando na Matriz
        matriz = this.newMatriz.slice().map(arrays => arrays.slice());
        this.wave++;
        console.log("Wave:",this.wave);
        //console.log(matriz[0])
        /*if(this.wave == 24){
            return;
        }*/

        if(this.playerPosition == this.verde){
            console.log('Game Over: ', this.playerPosition);
            console.log('Position:',this.contadorV, this.contadorH)
            console.log('ValorPosition',matriz[this.contadorV][this.contadorH]);

            //this.verificaPosicoes(matriz);
        } else if(this.playerPosition == 4){
            console.log('Parabéns, você chegou!');
        } else {
            this.verificaPosicoes(matriz);
        }
    }
}

const tabuleiro = new Tabuleiro(0, 1);

tabuleiro.criarMatriz();