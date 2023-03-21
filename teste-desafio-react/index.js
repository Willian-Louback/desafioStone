class Tabuleiro{
    constructor(branco, verde){
        this.branco = branco;
        this.verde = verde;
        this.cases = [];
        this.wave = 0;
        this.quantidade = 0;
        this.matriz = [];
        this.span = document.getElementById('span');
        this.newMatriz = [];
        this.h1 = document.getElementById('geracao');
        this.chave = false;
        this.playerPosition;
        //contador
        this.contadorH = 0;
        this.contadorV = 0;
        //posições ruins
        this.evitar = [];
        this.verificaEvitar = [];
    }

    criarMatriz = async () => {
        await fetch('http://localhost:3010/matriz')
            .then(response => response.json())
            .then(data => this.matriz = data)
            .catch(error => console.error(error));
        //console.log(this.matriz[64])

        this.matriz.forEach((valorArray, indiceArray) => {
            /*valorArray.forEach((valor, indice) => {
                this.span.innerHTML += this.matriz[indiceArray][indice];
                if(indice == (this.matriz.length-1)){
                    this.span.innerHTML += "\n";
                }
            })*/
            this.span.innerHTML += this.matriz[indiceArray]+"\n";
        })

        this.h1.innerHTML = 'Geração: 0';
        this.newMatriz = this.matriz.slice().map(arrays => arrays.slice());
        this.playerPosition = this.matriz[0][0];
    }

    automatizar(){
        this.chave = true;
        this.verificarPosicoes();
    }

    stop(){
        this.chave = false;
    }

    verificarPosicoes = () => {
        this.span.innerHTML = "";

        this.matriz.forEach((arrays, indiceArray) => {
            arrays.forEach((numbers, indice) => {
                if(indiceArray == 0 && indice == 1){ //cuidando do canto superior esquerdo
                    this.cases = [
                        this.matriz[indiceArray][indice+1],
                        this.matriz[indiceArray+1][indice],
                        this.matriz[indiceArray+1][indice-1],
                        this.matriz[indiceArray+1][indice+1]
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
                } else if(indiceArray == 0 && indice != 0 && indice != 84){ // cuidando do topo
                    this.cases = [
                        this.matriz[indiceArray][indice+1],
                        this.matriz[indiceArray][indice-1],
                        this.matriz[indiceArray+1][indice],
                        this.matriz[indiceArray+1][indice-1],
                        this.matriz[indiceArray+1][indice+1]
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
                        this.matriz[indiceArray][indice-1],
                        this.matriz[indiceArray+1][indice],
                        this.matriz[indiceArray+1][indice-1]
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
                        this.matriz[indiceArray-1][indice],
                        this.matriz[indiceArray-1][indice+1],
                        this.matriz[indiceArray][indice+1]
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
                        this.matriz[indiceArray-1][indice],
                        this.matriz[indiceArray-1][indice-1],
                        this.matriz[indiceArray-1][indice+1],
                        this.matriz[indiceArray][indice-1]
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
                        this.matriz[indiceArray-1][indice],
                        this.matriz[indiceArray-1][indice-1],
                        this.matriz[indiceArray-1][indice+1],
                        this.matriz[indiceArray][indice-1],
                        this.matriz[indiceArray][indice+1]
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
                        this.matriz[indiceArray-1][indice],
                        this.matriz[indiceArray-1][indice+1],
                        this.matriz[indiceArray+1][indice],
                        this.matriz[indiceArray+1][indice+1],
                        this.matriz[indiceArray][indice+1]
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
                        this.matriz[indiceArray-1][indice],
                        this.matriz[indiceArray-1][indice-1],
                        this.matriz[indiceArray+1][indice],
                        this.matriz[indiceArray+1][indice-1],
                        this.matriz[indiceArray][indice-1]
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
                        this.matriz[indiceArray][indice+1],
                        this.matriz[indiceArray][indice-1],
                        this.matriz[indiceArray-1][indice],
                        this.matriz[indiceArray+1][indice],
                        this.matriz[indiceArray-1][indice+1],
                        this.matriz[indiceArray-1][indice-1],
                        this.matriz[indiceArray+1][indice-1],
                        this.matriz[indiceArray+1][indice+1]
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
                    //console.log("Array:", indiceArray, "Indice:", indice);
                }

                if(this.matriz[indiceArray][indice] == this.branco){ //Conferindo se é branco ou verde
                    this.quantidade > 1 && this.quantidade < 5 ? this.newMatriz[indiceArray][indice] = this.verde : null;
                    //console.log('era branco:',this.matriz[indiceArray][indice]);
                } else if(this.matriz[indiceArray][indice] == this.verde){
                    this.quantidade > 3 && this.quantidade < 6 ? null : this.newMatriz[indiceArray][indice] = this.branco;
                    //console.log('era verde:',this.matriz[indiceArray][indice]);
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

        this.moverPlayer(this.newMatriz, this.matriz);
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

    adicionarPosicao(){
        this.matriz = this.newMatriz.slice().map(arrays => arrays.slice());
        this.matriz[this.contadorV][this.contadorH] = this.matriz[this.contadorV][this.contadorH]+"P";

        this.matriz.forEach((valorArray, indiceArray) => {
            this.span.innerHTML += valorArray+"\n";
        })

        this.matriz = this.newMatriz.slice().map(arrays => arrays.slice());
        
        this.wave++;
        this.h1.innerHTML = `Geração: ${this.wave}`

        if(this.playerPosition == this.verde){
            console.log('Game Over: ', this.playerPosition);
            console.log('Position:',this.contadorV, this.contadorH)
            console.log('ValorPosition',this.matriz[this.contadorV][this.contadorH]);
            this.chave = false;
            //this.verificaPosicoes(matriz);
        } else if(this.playerPosition == 4){
            console.log('Parabéns, você chegou!');
            this.chave = false;
        } else {
            if(this.chave == true){
                setTimeout(() => {
                    this.verificarPosicoes();
                }, 300);
            }
        }
    }
}

const tabuleiro = new Tabuleiro(0, 1);

tabuleiro.criarMatriz();