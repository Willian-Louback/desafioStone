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
        this.ativadorC = false;
        this.playerPosition;
        this.aleatorio;
        //contador
        this.contadorH = 0;
        this.contadorV = 0;
        //posições ruins
        this.evitar = [];
        this.verificaEvitar = [];
        //MoverManualmente
        this.ignorar = false;
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
        this.chave = true;
        this.verificarPosicoes();
    }

    stop(){
        this.chave = false;
        this.ativadorC = false;
    }

    up(){
        this.ignorar = true;
        this.aleatorio = 3;
        this.verificarPosicoes();
    }

    down(){
        this.ignorar = true;
        this.aleatorio = 2;
        this.verificarPosicoes();
    }

    left(){
        this.ignorar = true;
        this.aleatorio = 1;
        this.verificarPosicoes();
    }

    right(){
        this.ignorar = true;
        this.aleatorio = 0;
        this.verificarPosicoes();
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

                        //console.log(this.verificaEvitar[0], this.evitar[0])
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
        console.log('this.evitar:',this.evitar)
        //console.log("depois:",this.evitar)

        if(this.ignorar == false){
            addAleatoriedade(this);
            function addAleatoriedade(thisRef){
                //thisRef.aleatorio = Math.floor(Math.random() * thisRef.evitar.length);
                
                thisRef.aleatorio = Math.floor(Math.random() * 10) < 2 ? Math.floor(Math.random() * 2) : //Vai deixar uma possibilidade de 2/10  (20%) de ser o 0 ou 1
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

                //console.log(thisRef.evitar[this.aleatorio])
                
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
                        } else {
                            return;
                        }
                    }
                    //console.log('Mudando resultado:', this.aleatorio);
                    addAleatoriedade(thisRef);
                } else {
                    return;
                }
            }
        }

        // Para arrumar as coisas
        this.ignorar = false;
        //Para ficar em um padrão, eu posso deixar tudo igual e adicionar um valor diferente de 0 e de 1 no evitar, para o if testar as possibilidades
        if(0 == this.aleatorio){ //direita
            this.evitar = [null, null, null, null];
            this.contadorH++;
            this.playerPosition = matrizAtualizada[this.contadorV][this.contadorH];
            console.log('R');
            this.adicionarPosicao(matriz);
        } else if(1 == this.aleatorio){ //esquerda
            this.evitar = [null, null, null, null];
            this.contadorH--;
            this.playerPosition = matrizAtualizada[this.contadorV][this.contadorH];
            console.log('L');
            this.adicionarPosicao(matriz);
        } else if(2 == this.aleatorio){ //baixo
            this.evitar = [null, null, null, null];
            this.contadorV++;
            this.playerPosition = matrizAtualizada[this.contadorV][this.contadorH];
            console.log('D');
            this.adicionarPosicao(matriz);
        } else if(3 == this.aleatorio){ //cima
            this.evitar = [null, null, null, null];
            this.contadorV--;
            this.playerPosition = matrizAtualizada[this.contadorV][this.contadorH];
            console.log('U');
            this.adicionarPosicao(matriz);
        } else { //morte
            //return;
            console.log('nada, L',this.aleatorio);
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
            console.log('wave:',this.wave);
            console.log('Game Over: ', this.playerPosition);
            console.log('Position:',this.contadorV, this.contadorH);
            console.log('ValorPosition',this.matriz[this.contadorV][this.contadorH]);
            this.wave = 0;
            this.contadorH = 0;
            this.contadorV = 0;
            this.playerPosition = 0;
            this.chave = false;
            this.ativadorC = true;
            /*setTimeout(() => {
                this.criarMatriz();
            },300);*/

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