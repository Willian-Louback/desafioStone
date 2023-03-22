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

        this.matriz = Array.from({ length: linhas.length }, () => Array.from({length: 85}), () => 0);

        for(let i = 0; i < linhas.length; i++){
            const atribuirValores = linhas[i].trim().split(' ').map(Number);
            this.matriz[i] = atribuirValores;
        }

        this.newMatriz = this.matriz.slice().map(arrays => arrays.slice());

        this.playerPosition = this.matriz[0][0];
        
        this.verificaPosicoes(this.matriz);
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
                }

                if(matriz[indiceArray][indice] == this.branco){ //Conferindo se é branco ou verde
                    this.quantidade > 1 && this.quantidade < 5 ? this.newMatriz[indiceArray][indice] = this.verde : null;
                } else if(matriz[indiceArray][indice] == this.verde){
                    this.quantidade > 3 && this.quantidade < 6 ? null : this.newMatriz[indiceArray][indice] = this.branco;
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
        let aleatorio;
        //console.log('this.evitar:',this.evitar) //Consertar erro de lógica, há algum problema fazendo verificar 1 antes, algo assim
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
        //testando aleatoriedade
        addAleatoriedade(this);
        function addAleatoriedade(thisRef){
            
            aleatorio = Math.floor(Math.random() * thisRef.evitar.length);
            //console.log(aleatorio)
            //console.log(thisRef.evitar[aleatorio])
            
            //Está indo para cima sem poder ir, há algo errado na verificação do null
            if(thisRef.evitar[aleatorio] == null || thisRef.evitar[aleatorio] == thisRef.verde){
                if(
                    (thisRef.evitar[0] == thisRef.verde || thisRef.evitar[0] == null) &&
                    (thisRef.evitar[1] == thisRef.verde || thisRef.evitar[1] == null) &&
                    (thisRef.evitar[2] == thisRef.verde || thisRef.evitar[2] == null) &&
                    (thisRef.evitar[3] == thisRef.verde || thisRef.evitar[3] == null)
                ){
                    //console.log(thisRef.evitar[0],thisRef.evitar[1],thisRef.evitar[2],thisRef.evitar[3])
                    if(thisRef.evitar[aleatorio] == null){
                        addAleatoriedade(thisRef);
                    } else {
                        return;
                    }
                }
                //console.log('Mudando resultado:', aleatorio);
                addAleatoriedade(thisRef);
            } else {
                return;
            }
        }
        
        //console.log('resultado:',aleatorio);
        
        //console.log("depois:",this.evitar)
        
        //Para ficar em um padrão, eu posso deixar tudo igual e adicionar um valor diferente de 0 e de 1 no evitar, para o if testar as possibilidades
        if(0 == aleatorio){ //direita
            this.evitar = [null, null, null, null];
            this.contadorH++;
            this.playerPosition = matrizAtualizada[this.contadorV][this.contadorH];
            //console.log('R');
            this.adicionarPosicao(matriz);
        } else if(1 == aleatorio){ //esquerda
            this.evitar = [null, null, null, null];
            this.contadorH--;
            this.playerPosition = matrizAtualizada[this.contadorV][this.contadorH];
            //console.log('L');
            this.adicionarPosicao(matriz);
        } else if(2 == aleatorio){ //baixo
            this.evitar = [null, null, null, null];
            this.contadorV++;
            this.playerPosition = matrizAtualizada[this.contadorV][this.contadorH];
            //console.log('D');
            this.adicionarPosicao(matriz);
        } else if(3 == aleatorio){ //cima
            this.evitar = [null, null, null, null];
            this.contadorV--;
            this.playerPosition = matrizAtualizada[this.contadorV][this.contadorH];
            //console.log('U');
            this.adicionarPosicao(matriz);
        } else { //morte
            //return;
            console.log('nada, L',aleatorio);
            this.evitar = [null, null, null, null];
            this.contadorH--;
            this.playerPosition = matrizAtualizada[this.contadorV][this.contadorH];
            this.adicionarPosicao(matriz);
        }
        
        
    }

    adicionarPosicao(matriz){ //Adicionando na Matriz
        matriz = this.newMatriz.slice().map(arrays => arrays.slice());
        this.wave++;
        //console.log("Wave:",this.wave);
        /*if(this.wave == 4){
            return;
        }*/

        if(this.playerPosition == this.verde){
            console.log('wave:',this.wave);
            console.log('Game Over: ', this.playerPosition);
            console.log('Position:',this.contadorV, this.contadorH);
            console.log('ValorPosition',matriz[this.contadorV][this.contadorH]);
            this.wave = 0;
            this.contadorH = 0;
            this.contadorV = 0;
            this.playerPosition = 0;
            setTimeout(() => {
                this.criarMatriz();
            },300);

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