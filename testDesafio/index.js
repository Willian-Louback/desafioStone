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
        this.chaveC = false;
        this.ativadorC = false;
        this.playerPosition = 3;
        //this.aleatorio = -1; //Só testes, normal: this.aleatorio;
        this.aleatorio;
        //contador
        this.contadorH = 0;
        this.contadorV = 0;
        //Verificar nova geração
        this.chave = false;
        this.contadorHV = 0;
        this.contadorVV = 0;
        this.playerPositionV = 3;
        this.verificaEvitarV = [];
        this.evitarV = [null, null, null, null];
        this.matrizAnterior = [];
        this.newMatrizAnterior = [];
        this.verificaVezes = 0;
        this.numbers = "";
        //posições ruins
        this.evitar = [null, null, null, null];
        this.verificaEvitar = [];
        //MoverManualmente
        this.ignorar = false;
        this.chaveManual = false;
        //SalvarGeração
        this.caminhoVisual = "";
        this.caminho = "";
        this.distanciaAtual = 148;
        this.distancia = 148;
        this.contadorCaminho = 0;
        this.melhorGeracao = "";
        this.sortearNumero = 0;
        //Testes
        this.tentativas = 1;
        this.melhorGeracao = "00020002020200220020002122222120220302102222002332322023002022111102222332123023101023121323020200022300000200002300001001002020213320200230021100122213211000220200220020303001212020202202212300122032002022330021200101121323113300023032032000200220200022223102122200010001010103211031210100321010013211001030310002333102100302200200201310000102";
        // A melhor até agora:
        //this.melhorGeracao = "0022202220202200210010002122302202123103202020200212202001303123100120020002120203223002300120220002203223233220100000100100022021332222001101000213220002322021320022020032121000300002010032100203203022202222000022022331031110000203130332130300002030200213221002302222022302222033000212022200";
    }

    criarMatriz = async () => {
        this.span.innerHTML = "";
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
        this.ativadorC == true ? this.automatizar() : null;
    }

    automatizar(){
        this.chaveC = true;
        this.verificaPosicoes();
    }

    stop(){
        this.chaveC = false;
        this.ativadorC = false;
    }

    up(){
        this.ignorar = true;
        this.chaveManual = true;
        this.aleatorio = 3;
        this.verificaPosicoes();
    }

    down(){
        this.ignorar = true;
        this.chaveManual = true;
        this.aleatorio = 2;
        this.verificaPosicoes();
    }

    left(){
        this.ignorar = true;
        this.chaveManual = true;
        this.aleatorio = 1;
        this.verificaPosicoes();
    }

    right(){
        this.ignorar = true;
        this.chaveManual = true;
        this.aleatorio = 0;
        this.verificaPosicoes();
    }

    verificaPosicoes = () => {
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
        if(this.chaveManual == true){
            this.moverPlayer();
        } else if(this.contadorCaminho < ((this.melhorGeracao.length)-(this.sortearNumero))){
            this.seguirMelhorGeracao();
        } else {
            this.escolherCaminho();
        }
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
                thisRef.aleatorio = Math.floor(Math.random() * 10) < 1 ? Math.floor(Math.random() * 2) : //Vai deixar uma possibilidade de 1/10  (10%) de ser o 0 ou 1
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
                }
                //console.log(thisRef.aleatorio)
                /*//thisRef.aleatorio++;     //ARRUMAR DEPOIS
                if(thisRef.aleatorio > 3){
                    thisRef.aleatorio--;
                    thisRef.evitar[thisRef.aleatorio] == null ? thisRef.aleatorio-- : null;
                    console.log('error')
                    thisRef.verificaVezes = 0;
                    thisRef.chave = false;
                    thisRef.matriz = thisRef.matrizAnterior.slice().map(arrays => arrays.slice());
                    thisRef.newMatriz = thisRef.newMatrizAnterior.slice().map(arrays => arrays.slice());
                    thisRef.moverPlayer();
                }*/

                if(
                    (thisRef.numbers.indexOf(thisRef.aleatorio) == -1 && thisRef.evitar[thisRef.aleatorio] == null) ||
                    (thisRef.numbers.indexOf(thisRef.aleatorio) == -1 && thisRef.evitar[thisRef.aleatorio] == thisRef.verde)
                ){
                    thisRef.numbers += thisRef.aleatorio + " "; 
                }
                
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
                            addAleatoriedade(thisRef);
                        } else if(thisRef.evitar[thisRef.aleatorio] == thisRef.verde){
                            //Aqui é meio que aceitando a derrota...
                            //console.log('Não devia passar aqui...',thisRef.evitar);
                            thisRef.chave = true;
                            thisRef.verificarProximaGeracao();
                        }
                    } else {
                        //console.log(thisRef.aleatorio,thisRef.evitar[thisRef.aleatorio])
                        addAleatoriedade(thisRef);
                    }

                } else {
                    //console.log(thisRef.aleatorio, thisRef.evitar);
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

        function addAleatoriedadeV(thisRef){
            if(
                (thisRef.evitarV[0] == thisRef.verde || thisRef.evitarV[0] == null) &&
                (thisRef.evitarV[1] == thisRef.verde || thisRef.evitarV[1] == null) &&
                (thisRef.evitarV[2] == thisRef.verde || thisRef.evitarV[2] == null) &&
                (thisRef.evitarV[3] == thisRef.verde || thisRef.evitarV[3] == null)
            ){
                //console.log(thisRef.evitarV[0],thisRef.evitarV[1],thisRef.evitarV[2],thisRef.evitarV[3]);
                if(thisRef.numbers.indexOf(thisRef.aleatorio) == -1){
                    thisRef.numbers += thisRef.aleatorio + " ";
                    //console.log(thisRef.aleatorio, thisRef.numbers, thisRef.numbers.length)
                }
        
                if(thisRef.numbers.length == 8){
                    if(thisRef.evitar[thisRef.aleatorio] != null){
                        thisRef.matriz = thisRef.matrizAnterior.slice().map(arrays => arrays.slice());
                        thisRef.newMatriz = thisRef.newMatrizAnterior.slice().map(arrays => arrays.slice());
                        //console.log(thisRef.aleatorio, thisRef.evitarV)
                        thisRef.verificarProximaGeracao();
                    }
                } else {
                    thisRef.chave = false;
                    thisRef.matriz = thisRef.matrizAnterior.slice().map(arrays => arrays.slice());
                    thisRef.newMatriz = thisRef.newMatrizAnterior.slice().map(arrays => arrays.slice());
                    thisRef.contadorHV = thisRef.contadorH;
                    thisRef.contadorVV = thisRef.contadorV;
                    //console.log(thisRef.aleatorio,thisRef.evitar[thisRef.aleatorio], thisRef.evitarV)
                    //console.log("AQUI:",thisRef.aleatorio, thisRef.evitarV)
                    thisRef.escolherCaminho();     
                }
            } else {
                thisRef.matriz = thisRef.matrizAnterior.slice().map(arrays => arrays.slice());
                thisRef.newMatriz = thisRef.newMatrizAnterior.slice().map(arrays => arrays.slice());
                //console.log(thisRef.aleatorio, thisRef.evitarV)
                thisRef.verificarProximaGeracao();
            }
        }
        
        addAleatoriedadeV(this);
    }

    verificarProximaGeracao() {//Eu achei o erro, alguma coisa aqui está dando certo. O primeiro funciona normalmente, mas o segundo está mandando uns números suspeitos
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

    seguirMelhorGeracao(){
        this.aleatorio = this.melhorGeracao[this.contadorCaminho];
        this.contadorCaminho++;
        if(this.sortearNumero == 0){
            //this.sortearNumero = Math.floor(Math.random()*40) + 1;
        }
        this.moverPlayer();
    }

    moverPlayer = () => {
        // Para arrumar as coisas
        this.numbers = "";
        this.chaveManual = false;
        this.ignorar = false;
        //Para ficar em um padrão, eu posso deixar tudo igual e adicionar um valor diferente de 0 e de 1 no evitar, para o if testar as possibilidades
        // Testar tirar estes nulls depois
        if(0 == this.aleatorio){ //direita
            this.evitar = [null, null, null, null];
            this.contadorH++;
            this.playerPosition = this.newMatriz[this.contadorV][this.contadorH];
            this.caminhoVisual += "R ";
            this.caminho += "0";
            this.adicionarPosicao();
        } else if(1 == this.aleatorio){ //esquerda
            this.evitar = [null, null, null, null];
            this.contadorH--;
            this.playerPosition = this.newMatriz[this.contadorV][this.contadorH];
            this.caminhoVisual += "L ";
            this.caminho += "1";
            this.adicionarPosicao();
        } else if(2 == this.aleatorio){ //baixo
            this.evitar = [null, null, null, null];
            this.contadorV++;
            this.playerPosition = this.newMatriz[this.contadorV][this.contadorH];
            this.caminhoVisual += "D ";
            this.caminho += "2";
            this.adicionarPosicao();
        } else if(3 == this.aleatorio){ //cima
            this.evitar = [null, null, null, null];
            this.contadorV--;
            this.playerPosition = this.newMatriz[this.contadorV][this.contadorH];
            this.caminhoVisual += "U ";
            this.caminho += "3";
            this.adicionarPosicao();
        } else { //morte
            //return;
            console.log('nada, L',this.aleatorio);
            return;
            this.evitar = [null, null, null, null];
            this.contadorH--;
            this.playerPosition = matrizAtualizada[this.contadorV][this.contadorH];
            this.adicionarPosicao();
        }
        
    }

    adicionarPosicao(){
        this.matriz = this.newMatriz.slice().map(arrays => arrays.slice());
        this.matriz[this.contadorV][this.contadorH] = this.matriz[this.contadorV][this.contadorH]+"P";

        this.matriz.forEach(valorArray => {
            this.span.innerHTML += valorArray+"\n";
        })

        this.matriz = this.newMatriz.slice().map(arrays => arrays.slice());
        
        this.wave++;
        this.h1.innerHTML = `Geração: ${this.wave}`;

        //this.aleatorio = -1; //Ficar de olho nisso aqui
        this.evitarV = [null, null, null, null];
        this.contadorHV = this.contadorH;
        this.contadorVV = this.contadorV;

        if(this.playerPosition == this.verde){
            this.tentativas++;
            this.distanciaAtual = (parseInt(64) - parseInt(this.contadorV)) + (parseInt(84) - parseInt(this.contadorH));

            if(this.distanciaAtual < this.distancia){
                this.distancia = this.distanciaAtual;
                this.melhorGeracao = this.caminho;
            }
            console.log("Tentativa Atual:", this.tentativas);
            console.log('wave:',this.wave);
            console.log('Game Over: ', this.playerPosition);
            console.log("Distância restante:", this.distanciaAtual);
            console.log("Melhor distancia:",this.distancia);
            console.log("Número Sorteado:", this.sortearNumero);
            this.caminhoVisual = "";
            this.caminho = "";
            this.wave = 0;
            this.contadorH = 0;
            this.contadorV = 0;
            this.playerPosition = 0;
            this.playerPositionV = 0;
            this.contadorHV = 0;
            this.contadorVV = 0;
            this.chaveC = false;
            this.ativadorC = true;
            this.distanciaAtual = 148;
            this.contadorCaminho = 0;
            this.sortearNumero = 0;
            setTimeout(() => {
                this.criarMatriz();
            },50);

            //this.verificaPosicoes(matriz);
        } else if(this.playerPosition == 4){
            console.log('Parabéns, você chegou!');
            console.log("Tentativa Atual:", this.tentativas);
            console.log('wave:',this.wave);
            console.log('Player position: ', this.playerPosition);
            console.log('Position:',this.contadorV, this.contadorH);
            console.log("Distância restante:", this.distanciaAtual);
            console.log("Melhor distancia:",this.distancia);
            console.log('Caminho seguido:', this.caminhoVisual);
            console.log("Caminho numeral:", this.caminho);
            this.chaveC = false;
            setTimeout(() => {
                alert("Parabéns, você conseguiu!");
            },300); 
        } else {
            if(this.chaveC == true){
                setTimeout(() => {
                    this.verificaPosicoes();
                }, 150);
            }
        }
    }
}

const tabuleiro = new Tabuleiro(0, 1);

tabuleiro.criarMatriz();