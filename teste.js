const fs = require('fs');

class Tabuleiro{
    constructor(branco, verde){
        this.branco = branco;
        this.verde = verde;
        this.cases = [];
        this.wave = 0;
        this.quantidade = 0;
        this.matriz = [];
        this.newMatriz = [];
        this.playerPosition = 3;
        this.chave = false;
        this.aleatorio = -1; //Só testes, normal: this.aleatorio;
        //contador
        this.contadorH = 0;
        this.contadorV = 0;
        //Verificar nova geração
        this.contadorHV = 0;
        this.contadorVV = 0;
        this.playerPositionV = 3;
        this.verificaEvitarV = [];
        this.evitarV = [];
        this.matrizAnterior = [];
        this.newMatrizAnterior = [];
        this.verificaVezes = 0;
        //posições ruins
        this.evitar = [];
        this.verificaEvitar = [];
    }

    criarMatriz = () => {
        /*console.log(this.contadorH, this.contadorV)
        console.log(this.contadorHV, this.contadorVV)
        console.log(this.evitar, this.evitarV)
        console.log(this.matriz, this.newMatriz)
        console.log(this.chave)
        console.log(this.aleatorio)
        console.log(this.playerPosition, this.playerPositionV)
        console.log(this.verificaEvitarV, this.verificaEvitar)
        console.log(this.verificaVezes)*/

        const data = fs.readFileSync('padrao.txt', 'utf8');

        const linhas = data.split('\n');

        this.matriz = Array.from({ length: linhas.length }, () => Array.from({length: 85}), () => 0);

        for(let i = 0; i < linhas.length; i++){
            const atribuirValores = linhas[i].trim().split(' ').map(Number);
            this.matriz[i] = atribuirValores;
        }

        this.newMatriz = this.matriz.slice().map(arrays => arrays.slice());

        this.playerPosition = this.matriz[0][0];
        this.playerPositionV = this.matriz[0][0];
        
        this.verificaPosicoes();
    }

    verificaPosicoes = () => { //Verificando as posições, mas sem adicionar na Matriz
        this.matriz.forEach((arrays, indiceArray) => {
            arrays.forEach((numbers, indice) => {
                if(indiceArray == 0 && indice == 1){ //cuidando do canto superior esquerdo
                    this.cases = [
                        this.matriz[indiceArray][indice+1],
                        this.matriz[indiceArray+1][indice],
                        this.matriz[indiceArray+1][indice-1],
                        this.matriz[indiceArray+1][indice+1]
                    ]

                    if (this.chave != true){
                        if(this.contadorV == indiceArray && this.contadorH == indice){ 
                            //console.log('passou\n playerArray:',this.contadorV,'array:',indiceArray,'\nplayerIndice:',this.contadorH,'indice:',indice);
                            this.verificaEvitar = [
                                [indiceArray,indice+1],
                                [indiceArray,indice-1],
                                [indiceArray+1,indice],
                                null
                            ]
                        }
                    } else {
                        if(this.contadorVV == indiceArray && this.contadorHV == indice){ 
                            //console.log('passou\n playerArray:',this.contadorV,'array:',indiceArray,'\nplayerIndice:',this.contadorH,'indice:',indice);
                            this.verificaEvitarV = [
                                [indiceArray,indice+1],
                                [indiceArray,indice-1],
                                [indiceArray+1,indice],
                                null
                            ]
                        }
                    }
                    /*console.log(this.contadorV, indiceArray)
                    console.log("---")
                    console.log(this.contadorH, indice)*/

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

                    if (this.chave != true){
                        if(this.contadorV == indiceArray && this.contadorH == indice){ 
                            //console.log('passou\n playerArray:',this.contadorV,'array:',indiceArray,'\nplayerIndice:',this.contadorH,'indice:',indice);

                            this.verificaEvitar = [
                                [indiceArray,indice+1],
                                [indiceArray,indice-1],
                                [indiceArray+1,indice],
                                null
                            ]
                        }
                    } else {
                        if(this.contadorVV == indiceArray && this.contadorHV == indice){ 
                            //console.log('passou\n playerArray:',this.contadorV,'array:',indiceArray,'\nplayerIndice:',this.contadorH,'indice:',indice);
                            this.verificaEvitarV = [
                                [indiceArray,indice+1],
                                [indiceArray,indice-1],
                                [indiceArray+1,indice],
                                null
                            ]
                        }
                    }

                    this.cases.forEach(cases => cases == this.verde ? this.quantidade++ : null);
                    //console.log(this.quantidade);
                } else if(indiceArray == 0 && indice == 84){ //cuidando do canto superior direito
                    this.cases = [
                        this.matriz[indiceArray][indice-1],
                        this.matriz[indiceArray+1][indice],
                        this.matriz[indiceArray+1][indice-1]
                    ]

                    if (this.chave != true){
                        if(this.contadorV == indiceArray && this.contadorH == indice){ 
                            //console.log('passou\n playerArray:',this.contadorV,'array:',indiceArray,'\nplayerIndice:',this.contadorH,'indice:',indice);

                            this.verificaEvitar = [
                                null,
                                [indiceArray,indice-1],
                                [indiceArray+1,indice],
                                null
                            ]
                        }
                    } else {
                        if(this.contadorVV == indiceArray && this.contadorHV == indice){ 
                            //console.log('passou\n playerArray:',this.contadorV,'array:',indiceArray,'\nplayerIndice:',this.contadorH,'indice:',indice);
                            this.verificaEvitarV = [
                                null,
                                [indiceArray,indice-1],
                                [indiceArray+1,indice],
                                null
                            ]
                        }
                    }

                    this.cases.forEach(cases => cases == this.verde ? this.quantidade++ : null);
                    //console.log(this.quantidade);
                } else if(indiceArray == 64 && indice == 0){ //cuidando do canto inferior esquerdo
                    this.cases = [
                        this.matriz[indiceArray-1][indice],
                        this.matriz[indiceArray-1][indice+1],
                        this.matriz[indiceArray][indice+1]
                    ]

                    if (this.chave != true){
                        if(this.contadorV == indiceArray && this.contadorH == indice){ 
                        // console.log('passou\n playerArray:',this.contadorV,'array:',indiceArray,'\nplayerIndice:',this.contadorH,'indice:',indice);

                            this.verificaEvitar = [
                                [indiceArray,indice+1],
                                null,
                                null,
                                [indiceArray-1,indice]
                            ]
                        }
                    } else {
                        if(this.contadorVV == indiceArray && this.contadorHV == indice){ 
                            //console.log('passou\n playerArray:',this.contadorV,'array:',indiceArray,'\nplayerIndice:',this.contadorH,'indice:',indice);
                            this.verificaEvitarV = [
                                [indiceArray,indice+1],
                                null,
                                null,
                                [indiceArray-1,indice]
                            ]
                        }
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

                    if (this.chave != true){
                        if(this.contadorV == indiceArray && this.contadorH == indice){ 
                            //console.log('passou\n playerArray:',this.contadorV,'array:',indiceArray,'\nplayerIndice:',this.contadorH,'indice:',indice);

                            this.verificaEvitar = [
                                [indiceArray][indice+1],
                                [indiceArray][indice-1],
                                null,
                                [indiceArray-1,indice]
                            ]
                        }
                    } else {
                        if(this.contadorVV == indiceArray && this.contadorHV == indice){ 
                            //console.log('passou\n playerArray:',this.contadorV,'array:',indiceArray,'\nplayerIndice:',this.contadorH,'indice:',indice);
                            this.verificaEvitarV = [
                                [indiceArray][indice+1],
                                [indiceArray][indice-1],
                                null,
                                [indiceArray-1,indice]
                            ]
                        }
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

                    if (this.chave != true){
                        if(this.contadorV == indiceArray && this.contadorH == indice){ 
                            //console.log('passou\n playerArray:',this.contadorV,'array:',indiceArray,'\nplayerIndice:',this.contadorH,'indice:',indice);

                            this.verificaEvitar = [
                                [indiceArray,indice+1],
                                [indiceArray,indice-1],
                                null,
                                [indiceArray-1,indice]
                            ]
                        }
                    } else {
                        if(this.contadorVV == indiceArray && this.contadorHV == indice){ 
                            //console.log('passou\n playerArray:',this.contadorV,'array:',indiceArray,'\nplayerIndice:',this.contadorH,'indice:',indice);
                            this.verificaEvitarV = [
                                [indiceArray,indice+1],
                                [indiceArray,indice-1],
                                null,
                                [indiceArray-1,indice]
                            ]
                        }
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

                    if (this.chave != true){
                        if(this.contadorV == indiceArray && this.contadorH == indice){ 
                            //console.log('passou\n playerArray:',this.contadorV,'array:',indiceArray,'\nplayerIndice:',this.contadorH,'indice:',indice);

                            this.verificaEvitar = [
                                [indiceArray,indice+1],
                                null,
                                [indiceArray+1,indice],
                                [indiceArray-1,indice]
                            ]
                        }
                    } else {
                        if(this.contadorVV == indiceArray && this.contadorHV == indice){ 
                            //console.log('passou\n playerArray:',this.contadorV,'array:',indiceArray,'\nplayerIndice:',this.contadorH,'indice:',indice);
                            this.verificaEvitarV = [
                                [indiceArray,indice+1],
                                null,
                                [indiceArray+1,indice],
                                [indiceArray-1,indice]
                            ]
                        }
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

                    if (this.chave != true){
                        if(this.contadorV == indiceArray && this.contadorH == indice){ 
                            //console.log('passou\n playerArray:',this.contadorV,'array:',indiceArray,'\nplayerIndice:',this.contadorH,'indice:',indice);

                            this.verificaEvitar = [
                                null,
                                [indiceArray,indice-1],
                                [indiceArray+1,indice],
                                [indiceArray-1,indice]
                            ]
                        }
                    } else {
                        if(this.contadorVV == indiceArray && this.contadorHV == indice){ 
                            //console.log('passou\n playerArray:',this.contadorV,'array:',indiceArray,'\nplayerIndice:',this.contadorH,'indice:',indice);
                            this.verificaEvitarV = [
                                null,
                                [indiceArray,indice-1],
                                [indiceArray+1,indice],
                                [indiceArray-1,indice]
                            ]
                        }
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

                    if (this.chave != true){
                        if(this.contadorV == indiceArray && this.contadorH == indice){ 
                            //console.log('passou\n playerArray:',this.contadorV,'array:',indiceArray,'\nplayerIndice:',this.contadorH,'indice:',indice);

                            this.verificaEvitar = [
                                [indiceArray,indice+1],
                                [indiceArray,indice-1],
                                [indiceArray+1,indice],
                                [indiceArray-1,indice]
                            ]
                        }
                    } else {
                        if(this.contadorVV == indiceArray && this.contadorHV == indice){ 
                            //console.log('passou\n playerArray:',this.contadorV,'array:',indiceArray,'\nplayerIndice:',this.contadorH,'indice:',indice);
                            this.verificaEvitarV = [
                                [indiceArray,indice+1],
                                [indiceArray,indice-1],
                                [indiceArray+1,indice],
                                [indiceArray-1,indice]
                            ]
                        }
                    }

                    this.cases.forEach(cases => cases == this.verde ? this.quantidade++ : null);
                }

                if(this.matriz[indiceArray][indice] == this.branco){ //Conferindo se é branco ou verde
                    this.quantidade > 1 && this.quantidade < 5 ? this.newMatriz[indiceArray][indice] = this.verde : null;
                } else if(this.matriz[indiceArray][indice] == this.verde){
                    this.quantidade > 3 && this.quantidade < 6 ? null : this.newMatriz[indiceArray][indice] = this.branco;
                }
                
                if(this.chave != true){
                    if(indiceArray == 64 && indice == 84){
                        if(this.verificaEvitar[0] != null){
                            this.evitar[0] = this.newMatriz[this.verificaEvitar[0][0]][this.verificaEvitar[0][1]]; //direita
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
                } else {
                    if(indiceArray == 64 && indice == 84){
                        if(this.verificaEvitarV[0] != null){
                            this.evitarV[0] = this.newMatriz[this.verificaEvitarV[0][0]][this.verificaEvitarV[0][1]]; //direita
                        }
                        if(this.verificaEvitarV[1] != null){
                            this.evitarV[1] = this.newMatriz[this.verificaEvitarV[1][0]][this.verificaEvitarV[1][1]]; //esquerda
                        } 
                        if(this.verificaEvitarV[2] != null){
                            this.evitarV[2] = this.newMatriz[this.verificaEvitarV[2][0]][this.verificaEvitarV[2][1]]; //baixo
                        } 
                        if(this.verificaEvitarV[3] != null){
                            this.evitarV[3] = this.newMatriz[this.verificaEvitarV[3][0]][this.verificaEvitarV[3][1]]; //cima
                        }
                    }
                }

                this.cases = [];
                this.quantidade = 0;
            })
        })
        this.escolherCaminho();
    }

    escolherCaminho(){
        this.verificaVezes++;

        if(this.chave == false){
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
            //console.log(this.aleatorio)
            function addAleatoriedade(thisRef){
                /*thisRef.aleatorio = Math.floor(Math.random() * 10) < 2 ? Math.floor(Math.random() * 2) : //Vai deixar uma possibilidade de 2/10  (20%) de ser o 0 ou 1
                2 + Math.floor(Math.random() * 2); //50% de ser 2 ou 3 
                //Como eu quero deixar a probabilidade de 10% para cima e esquerda e 40% para direita ou baixo, aqui está os ajustes:
                if(thisRef.aleatorio == 1){
                    thisRef.aleatorio = 1;
                } else if(thisRef.aleatorio == 3){
                    thisRef.aleatorio = 0;
                } else if(thisRef.aleatorio == 0){
                    thisRef.aleatorio = 3;
                } else if(thisRef.aleatorio == 2){
                    thisRef.aleatorio = 2;
                }*/
                //console.log(thisRef.aleatorio)
                thisRef.aleatorio++;

                //console.log(thisRef.aleatorio)
                //console.log(thisRef.evitar[thisRef.aleatorio])
                
                //Está indo para cima sem poder ir, há algo errado na verificação do null
                if(thisRef.evitar[thisRef.aleatorio] == null || thisRef.evitar[thisRef.aleatorio] == thisRef.verde){
                    if(
                        (thisRef.evitar[0] == thisRef.verde || thisRef.evitar[0] == null) &&
                        (thisRef.evitar[1] == thisRef.verde || thisRef.evitar[1] == null) &&
                        (thisRef.evitar[2] == thisRef.verde || thisRef.evitar[2] == null) &&
                        (thisRef.evitar[3] == thisRef.verde || thisRef.evitar[3] == null)
                    ){
                        //console.log(thisRef.evitar[0],thisRef.evitar[1],thisRef.evitar[2],thisRef.evitar[3])
                        if(thisRef.evitar[thisRef.aleatorio] == null){
                            if(
                                (thisRef.evitar[0] == null) &&
                                (thisRef.evitar[1] == null) &&
                                (thisRef.evitar[2] == null) &&
                                (thisRef.evitar[3] == null)
                            ){ 
                                console.log('impossivel');
                            } else {
                                //console.log(thisRef.evitar);
                                addAleatoriedade(thisRef);
                            }
                        } else {
                            //Aqui é meio que aceitando a derrota...
                            console.log('Não devia passar aqui...',thisRef.evitar);
                            thisRef.verificaVezes = 0;
                            thisRef.moverPlayer();
                        }
                    } else {
                        //console.log(thisRef.aleatorio,thisRef.evitar[thisRef.aleatorio])
                        addAleatoriedade(thisRef);
                    }

                } else {
                    thisRef.verificarProximaGeracao();
                }
            }
            addAleatoriedade(this);
        } else {
            this.escolherCaminho2();
        }      
    }

    escolherCaminho2(){
        this.verificaEvitarV = [];

        if(this.contadorVV == 0 && this.contadorHV == 0){
            this.evitarV = [
                this.newMatriz[0][1],
                null,
                this.newMatriz[1][0],
                null
            ]
        }

        function addAleatoriedade(thisRef){
            if(
                (thisRef.evitarV[0] == thisRef.verde || thisRef.evitarV[0] == null) &&
                (thisRef.evitarV[1] == thisRef.verde || thisRef.evitarV[1] == null) &&
                (thisRef.evitarV[2] == thisRef.verde || thisRef.evitarV[2] == null) &&
                (thisRef.evitarV[3] == thisRef.verde || thisRef.evitarV[3] == null)
            ){
                //console.log(thisRef.evitarV[0],thisRef.evitarV[1],thisRef.evitarV[2],thisRef.evitarV[3]);
                //Precisa ser feito a tratativa, caso, nada tenha possibilidades, para não ficar me um loop infinito
                thisRef.chave = false;
                thisRef.matriz = thisRef.matrizAnterior.slice().map(arrays => arrays.slice());
                thisRef.newMatriz = thisRef.newMatrizAnterior.slice().map(arrays => arrays.slice());
                //console.log(thisRef.aleatorio,thisRef.evitar[thisRef.aleatorio], thisRef.evitarV)
                console.log("AQUI:",thisRef.aleatorio, thisRef.evitarV)
                thisRef.escolherCaminho();
            } else {
                thisRef.matriz = thisRef.matrizAnterior.slice().map(arrays => arrays.slice());
                thisRef.newMatriz = thisRef.newMatrizAnterior.slice().map(arrays => arrays.slice());
                console.log(thisRef.aleatorio, thisRef.evitarV)
                thisRef.verificarProximaGeracao();
            }
        }
        
        addAleatoriedade(this);
    }

    verificarProximaGeracao() {
        if(this.verificaVezes == 1){
            this.matrizAnterior = this.matriz.slice().map(arrays => arrays.slice());
            this.newMatrizAnterior = this.newMatriz.slice().map(arrays => arrays.slice());
        }

        if(this.chave == false){
            this.chave = true;
            this.matriz = this.newMatriz.slice().map(arrays => arrays.slice());
            //this.playerPositionV = matriz[this.contadorVV][this.contadorHV];
            if(0 == this.aleatorio){ //direita
                this.contadorHV++;
                //console.log('R');
                this.verificaPosicoes();
            } else if(1 == this.aleatorio){ //esquerda
                this.contadorHV--;
                //console.log('L');
                this.verificaPosicoes();
            } else if(2 == this.aleatorio){ //baixo
                this.contadorVV++;
                //console.log('D');
                this.verificaPosicoes();
            } else if(3 == this.aleatorio){ //cima
                this.contadorVV--;
                //console.log('U');
                this.verificaPosicoes();
            } else { //morte
                console.log('nada, L',this.aleatorio);
                return;
                this.contadorHV--;
                this.verificaPosicoes();
            }
        } else {
            this.verificaVezes = 0;
            this.chave = false;
            this.moverPlayer();
        }
    }

    moverPlayer = () => {
        
        //console.log('resultado:',this.aleatorio);
        
        //console.log("depois:",this.evitar)
        
        if(0 == this.aleatorio){ //direita
            this.contadorH++;
            //console.log('R');
            this.adicionarPosicao();
        } else if(1 == this.aleatorio){ //esquerda
            this.contadorH--;
            //console.log('L');
            this.adicionarPosicao();
        } else if(2 == this.aleatorio){ //baixo
            this.contadorV++;
            //console.log('D');
            this.adicionarPosicao();
        } else if(3 == this.aleatorio){ //cima
            this.contadorV--;
            //console.log('U');
            this.adicionarPosicao();
        } else { //morte
            console.log('nada, L',this.aleatorio);
            return;
            this.contadorH--;
            this.adicionarPosicao();
        }
        
        
    }

    adicionarPosicao(){ //Adicionando na Matriz
        this.matriz = this.newMatriz.slice().map(arrays => arrays.slice());

        this.aleatorio = -1; //Ficar de olho nisso aqui
        this.wave++;
        this.evitar = [null, null, null, null];
        this.evitarV = [null, null, null, null];
        this.contadorHV = this.contadorH;
        this.contadorVV = this.contadorV;
       // console.log(this.playerPosition)
       // console.log(this.contadorV, this.contadorH);
        //console.log(this.matriz[0])
        this.playerPosition = this.matriz[this.contadorV][this.contadorH];
        this.playerPositionV = this.matriz[this.contadorV][this.contadorH];
        console.log("Wave:",this.wave);
        /*if(this.wave == 4){
            return;
        }*/

        if(this.playerPosition == this.verde){
            console.log('wave:',this.wave);
            console.log('Game Over: ', this.playerPosition);
            console.log('Position:',this.contadorV, this.contadorH);
            console.log('ValorPosition',this.matriz[this.contadorV][this.contadorH]);
            this.wave = 0;
            this.contadorH = 0;
            this.contadorV = 0;
            this.playerPosition = 0;
            this.playerPositionV = 0;
            this.contadorHV = 0;
            this.contadorVV = 0;
            /*this.playerPosition = 3;
            this.playerPositionV = 3;
            this.verificaEvitar = [];*/
            setTimeout(() => {
                this.criarMatriz();
            },300);

            //this.verificaPosicoes(matriz);
        } else if(this.playerPosition == 4){
            console.log('Parabéns, você chegou!');
        } else {
            this.verificaPosicoes();
        }
    }
}

const tabuleiro = new Tabuleiro(0, 1);

tabuleiro.criarMatriz();