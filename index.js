const fs = require('fs');

class Tabuleiro{
    constructor(branco, verde){
        //Dados Necessários
        this.branco = branco;
        this.verde = verde;
        this.cases = [];
        this.wave = 0;
        this.quantidade = 0;
        this.matriz = [];
        this.newMatriz = [];
        this.playerPosition = 3;
        this.aleatorio;
        this.evitar = [null, null, null, null];
        this.verificaEvitar = [];
        this.contadorH = 0;
        this.contadorV = 0;
        //Verificar nova geração
        this.chave = false;
        this.contadorHV = 0;
        this.contadorVV = 0;
        this.verificaEvitarV = [];
        this.evitarV = [null, null, null, null];
        this.matrizAnterior = [];
        this.newMatrizAnterior = [];
        this.verificaVezes = 0;
        this.numbers = "";
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
    }

    criarMatriz = () => { // Criando a matriz de acordo com o arquivo "padrao.txt"
        const data = fs.readFileSync('padrao.txt', 'utf8'); // Lê o arquivo de texto

        const linhas = data.split('\n'); // Separa as linhas do arquivo

        this.matriz = Array.from({ length: linhas.length }, () => Array.from({length: 85}), () => 0); // Cria uma matriz vazia com o tamanho especificado

        for(let i = 0; i < linhas.length; i++){ // Preenche a matriz com os valores do arquivo
            const atribuirValores = linhas[i].trim().split(' ').map(Number);
            this.matriz[i] = atribuirValores;
        }

        this.newMatriz = this.matriz.slice().map(arrays => arrays.slice());

        this.playerPosition = this.matriz[0][0];
        
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
                            this.verificaEvitar = [
                                [indiceArray,indice+1],
                                [indiceArray,indice-1],
                                [indiceArray+1,indice],
                                null
                            ]
                        }
                    } else {
                        if(this.contadorVV == indiceArray && this.contadorHV == indice){ 
                            this.verificaEvitarV = [
                                [indiceArray,indice+1],
                                [indiceArray,indice-1],
                                [indiceArray+1,indice],
                                null
                            ]
                        }
                    }

                    this.cases.forEach(cases => cases == this.verde ? this.quantidade++ : null);
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
                            this.verificaEvitar = [
                                [indiceArray,indice+1],
                                [indiceArray,indice-1],
                                [indiceArray+1,indice],
                                null
                            ]
                        }
                    } else {
                        if(this.contadorVV == indiceArray && this.contadorHV == indice){ 
                            this.verificaEvitarV = [
                                [indiceArray,indice+1],
                                [indiceArray,indice-1],
                                [indiceArray+1,indice],
                                null
                            ]
                        }
                    }

                    this.cases.forEach(cases => cases == this.verde ? this.quantidade++ : null);;
                } else if(indiceArray == 0 && indice == 84){ //cuidando do canto superior direito
                    this.cases = [
                        this.matriz[indiceArray][indice-1],
                        this.matriz[indiceArray+1][indice],
                        this.matriz[indiceArray+1][indice-1]
                    ]

                    if (this.chave != true){
                        if(this.contadorV == indiceArray && this.contadorH == indice){
                            this.verificaEvitar = [
                                null,
                                [indiceArray,indice-1],
                                [indiceArray+1,indice],
                                null
                            ]
                        }
                    } else {
                        if(this.contadorVV == indiceArray && this.contadorHV == indice){ 
                            this.verificaEvitarV = [
                                null,
                                [indiceArray,indice-1],
                                [indiceArray+1,indice],
                                null
                            ]
                        }
                    }

                    this.cases.forEach(cases => cases == this.verde ? this.quantidade++ : null);
                } else if(indiceArray == 64 && indice == 0){ //cuidando do canto inferior esquerdo
                    this.cases = [
                        this.matriz[indiceArray-1][indice],
                        this.matriz[indiceArray-1][indice+1],
                        this.matriz[indiceArray][indice+1]
                    ]

                    if (this.chave != true){
                        if(this.contadorV == indiceArray && this.contadorH == indice){ 
                            this.verificaEvitar = [
                                [indiceArray,indice+1],
                                null,
                                null,
                                [indiceArray-1,indice]
                            ]
                        }
                    } else {
                        if(this.contadorVV == indiceArray && this.contadorHV == indice){ 
                            this.verificaEvitarV = [
                                [indiceArray,indice+1],
                                null,
                                null,
                                [indiceArray-1,indice]
                            ]
                        }
                    }

                    this.cases.forEach(cases => cases == this.verde ? this.quantidade++ : null);
                } else if(indiceArray == 64 && indice == 83){ //cuidando do canto inferior direito
                    this.cases = [
                        this.matriz[indiceArray-1][indice],
                        this.matriz[indiceArray-1][indice-1],
                        this.matriz[indiceArray-1][indice+1],
                        this.matriz[indiceArray][indice-1]
                    ]

                    if (this.chave != true){
                        if(this.contadorV == indiceArray && this.contadorH == indice){ 
                            this.verificaEvitar = [
                                [indiceArray][indice+1],
                                [indiceArray][indice-1],
                                null,
                                [indiceArray-1,indice]
                            ]
                        }
                    } else {
                        if(this.contadorVV == indiceArray && this.contadorHV == indice){ 
                            this.verificaEvitarV = [
                                [indiceArray][indice+1],
                                [indiceArray][indice-1],
                                null,
                                [indiceArray-1,indice]
                            ]
                        }
                    }

                    this.cases.forEach(cases => cases == this.verde ? this.quantidade++ : null);
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
                            this.verificaEvitar = [
                                [indiceArray,indice+1],
                                [indiceArray,indice-1],
                                null,
                                [indiceArray-1,indice]
                            ]
                        }
                    } else {
                        if(this.contadorVV == indiceArray && this.contadorHV == indice){ 
                            this.verificaEvitarV = [
                                [indiceArray,indice+1],
                                [indiceArray,indice-1],
                                null,
                                [indiceArray-1,indice]
                            ]
                        }
                    }

                    this.cases.forEach(cases => cases == this.verde ? this.quantidade++ : null);
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
                            this.verificaEvitar = [
                                [indiceArray,indice+1],
                                null,
                                [indiceArray+1,indice],
                                [indiceArray-1,indice]
                            ]
                        }
                    } else {
                        if(this.contadorVV == indiceArray && this.contadorHV == indice){ 
                           this.verificaEvitarV = [
                                [indiceArray,indice+1],
                                null,
                                [indiceArray+1,indice],
                                [indiceArray-1,indice]
                            ]
                        }
                    }

                    this.cases.forEach(cases => cases == this.verde ? this.quantidade++ : null);
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
                            this.verificaEvitar = [
                                null,
                                [indiceArray,indice-1],
                                [indiceArray+1,indice],
                                [indiceArray-1,indice]
                            ]
                        }
                    } else {
                        if(this.contadorVV == indiceArray && this.contadorHV == indice){ 
                            this.verificaEvitarV = [
                                null,
                                [indiceArray,indice-1],
                                [indiceArray+1,indice],
                                [indiceArray-1,indice]
                            ]
                        }
                    }

                    this.cases.forEach(cases => cases == this.verde ? this.quantidade++ : null);
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
                            this.verificaEvitar = [
                                [indiceArray,indice+1],
                                [indiceArray,indice-1],
                                [indiceArray+1,indice],
                                [indiceArray-1,indice]
                            ]
                        }
                    } else {
                        if(this.contadorVV == indiceArray && this.contadorHV == indice){ 
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

                if(this.matriz[indiceArray][indice] == this.branco){ //Conferindo se é branco ou verde e adicionando na newMatriz
                    this.quantidade > 1 && this.quantidade < 5 ? this.newMatriz[indiceArray][indice] = this.verde : null;
                } else if(this.matriz[indiceArray][indice] == this.verde){
                    this.quantidade > 3 && this.quantidade < 6 ? null : this.newMatriz[indiceArray][indice] = this.branco;
                }
                
                if(this.chave != true){ // Passando pela primeira vez e adicionando os possíveis lances
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
                } else { // Aqui irá passar após ativar a chave no método "verificarProximageracao()", fazendo o algoritmo genético visualizar mais gerações à frente
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
        // Caso exista uma melhor geração, ele irá imitar os lances dela, e parar de acordo com o número gerado aleatoriamente, assim voltando a procurar lances novos
        if(this.contadorCaminho < ((this.melhorGeracao.length)-(this.sortearNumero))){
            this.seguirMelhorGeracao();
        } else {
            this.escolherCaminho();
        }
    }

    escolherCaminho(){ // Vai passar aqui para escolher o caminho, caso já tenha passado, vai pular para o escolherCaminho2()
        this.verificaVezes++;

        if(this.chave == false){
            this.verificaEvitar = [];
            if(this.contadorV == 0 && this.contadorH == 0){
                this.evitar = [
                    this.newMatriz[0][1],
                    null,
                    this.newMatriz[1][0],
                    null
                ]
            }

            function addAleatoriedade(thisRef){
                thisRef.aleatorio = Math.floor(Math.random() * 10) < 1 ? Math.floor(Math.random() * 2) : //Vai deixar uma probabilidade de 1/10 (10%) de ser 0 ou 1
                2 + Math.floor(Math.random() * 2); //50% de ser 2 ou 3 
                //Como eu quero deixar a probabilidade de 5% para cima e esquerda e 45% para direita ou baixo, aqui está os ajustes:
                if(thisRef.aleatorio == 1){ // esquerda para esquerda
                    thisRef.aleatorio = 1;
                } else if(thisRef.aleatorio == 3){ // cima para direita
                    thisRef.aleatorio = 0;
                } else if(thisRef.aleatorio == 0){ // direita para cima
                    thisRef.aleatorio = 3;
                } else if(thisRef.aleatorio == 2){ // baixo para baixo
                    thisRef.aleatorio = 2;
                }

                if(
                    (thisRef.numbers.indexOf(thisRef.aleatorio) == -1 && thisRef.evitar[thisRef.aleatorio] == null) ||
                    (thisRef.numbers.indexOf(thisRef.aleatorio) == -1 && thisRef.evitar[thisRef.aleatorio] == thisRef.verde)
                ){
                    thisRef.numbers += thisRef.aleatorio + " "; 
                }
                
                if(thisRef.evitar[thisRef.aleatorio] == null || thisRef.evitar[thisRef.aleatorio] == thisRef.verde){
                    if(
                        (thisRef.evitar[0] == thisRef.verde || thisRef.evitar[0] == null) &&
                        (thisRef.evitar[1] == thisRef.verde || thisRef.evitar[1] == null) &&
                        (thisRef.evitar[2] == thisRef.verde || thisRef.evitar[2] == null) &&
                        (thisRef.evitar[3] == thisRef.verde || thisRef.evitar[3] == null)
                    ){
                        if(thisRef.evitar[thisRef.aleatorio] == null){
                            addAleatoriedade(thisRef);
                        } else if(thisRef.evitar[thisRef.aleatorio] == thisRef.verde){
                            thisRef.chave = true;
                            thisRef.verificarProximaGeracao();
                        }
                    } else {
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

    escolherCaminho2(){ // Verificando os caminhos da próxima geração
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
                if(thisRef.numbers.indexOf(thisRef.aleatorio) == -1){
                    thisRef.numbers += thisRef.aleatorio + " ";
                }
        
                if(thisRef.numbers.length == 8){
                    if(thisRef.evitar[thisRef.aleatorio] != null){
                        thisRef.matriz = thisRef.matrizAnterior.slice().map(arrays => arrays.slice());
                        thisRef.newMatriz = thisRef.newMatrizAnterior.slice().map(arrays => arrays.slice());
                        thisRef.verificarProximaGeracao();
                    }
                } else {
                    thisRef.chave = false;
                    thisRef.matriz = thisRef.matrizAnterior.slice().map(arrays => arrays.slice());
                    thisRef.newMatriz = thisRef.newMatrizAnterior.slice().map(arrays => arrays.slice());
                    thisRef.contadorHV = thisRef.contadorH;
                    thisRef.contadorVV = thisRef.contadorV;
                    thisRef.escolherCaminho();     
                }
            } else {
                thisRef.matriz = thisRef.matrizAnterior.slice().map(arrays => arrays.slice());
                thisRef.newMatriz = thisRef.newMatrizAnterior.slice().map(arrays => arrays.slice());
                thisRef.verificarProximaGeracao();
            }
        }
        
        addAleatoriedadeV(this);
    }

    verificarProximaGeracao() { // Aqui irá voltar para o verificaPosicoes() ou irá permitir o avanço ao moverPlayer()
        if(this.verificaVezes == 1){ 
            this.matrizAnterior = this.matriz.slice().map(arrays => arrays.slice());
            this.newMatrizAnterior = this.newMatriz.slice().map(arrays => arrays.slice());
        }

        if(this.chave == false){ // Voltando para verificar a próxima geração
            this.chave = true;
            this.matriz = this.newMatriz.slice().map(arrays => arrays.slice());
            if(0 == this.aleatorio){ //direita
                this.contadorHV++;
                this.verificaPosicoes();
            } else if(1 == this.aleatorio){ //esquerda
                this.contadorHV--;
                this.verificaPosicoes();
            } else if(2 == this.aleatorio){ //baixo
                this.contadorVV++;
                this.verificaPosicoes();
            } else if(3 == this.aleatorio){ //cima
                this.contadorVV--;
                this.verificaPosicoes();
            } else { // Apenas para desenvolvimento
                console.log("Isso é impossível de acontecer!");
                return;
            }
        } else { // Avançando
            this.verificaVezes = 0;
            this.chave = false;
            this.moverPlayer();
        }
    }

    seguirMelhorGeracao(){ // Vai seguir a melhor geração até um certo ponto
        this.aleatorio = this.melhorGeracao[this.contadorCaminho];
        this.contadorCaminho++;
        if(this.sortearNumero == 0){
            this.sortearNumero = Math.floor(Math.random()*40) + 1;
        }
        this.moverPlayer();
    }

    moverPlayer = () => { // Movendo o player
        // Para arrumar as coisas
        this.numbers = "";

        if(0 == this.aleatorio){ //direita
            this.contadorH++;
            this.caminhoVisual += "R ";
            this.caminho += "0";
            this.adicionarPosicao();
        } else if(1 == this.aleatorio){ //esquerda
            this.contadorH--;
            this.caminhoVisual += "L ";
            this.caminho += "1";
            this.adicionarPosicao();
        } else if(2 == this.aleatorio){ //baixo
            this.contadorV++;
            this.caminhoVisual += "D ";
            this.caminho += "2";
            this.adicionarPosicao();
        } else if(3 == this.aleatorio){ //cima
            this.contadorV--;
            this.caminhoVisual += "U ";
            this.caminho += "3";
            this.adicionarPosicao();
        } else { // Apenas para desenvolvimento
            console.log("Isso é impossível de acontecer!");
            return;
        }
    }

    adicionarPosicao(){ //Adicionando na Matriz
        this.matriz = this.newMatriz.slice().map(arrays => arrays.slice());

        this.wave++;
        this.evitar = [null, null, null, null];
        this.evitarV = [null, null, null, null];
        this.contadorHV = this.contadorH;
        this.contadorVV = this.contadorV;
        this.playerPosition = this.newMatriz[this.contadorV][this.contadorH];

        if(this.playerPosition == this.verde){
            this.tentativas++;
            this.distanciaAtual = (parseInt(64) - parseInt(this.contadorV)) + (parseInt(84) - parseInt(this.contadorH));

            if(this.distanciaAtual < this.distancia){
                this.distancia = this.distanciaAtual;
                this.melhorGeracao = this.caminho;
            }
            console.log('Game Over: ', this.playerPosition);
            console.log("Tentativa Atual:", this.tentativas);
            console.log('wave:',this.wave);
            console.log("Distância restante:", this.distanciaAtual);
            console.log("Melhor distancia:",this.distancia);
            console.log("Número Sorteado:", this.sortearNumero);
            this.caminhoVisual = "";
            this.caminho = "";
            this.wave = 0;
            this.contadorH = 0;
            this.contadorV = 0;
            this.playerPosition = 3;
            this.contadorHV = 0;
            this.contadorVV = 0;
            this.distanciaAtual = 148;
            this.contadorCaminho = 0;
            this.sortearNumero = 0;
            setTimeout(() => {
                this.criarMatriz();
            },50);
        } else if(this.playerPosition == 4){
            this.tentativas++;
            this.distanciaAtual = (parseInt(64) - parseInt(this.contadorV)) + (parseInt(84) - parseInt(this.contadorH));

            console.log('Parabéns, você chegou!');
            console.log("Tentativa Atual:", this.tentativas);
            console.log('wave:',this.wave);
            console.log('Player position: ', this.playerPosition);
            console.log('Position:',this.contadorV, this.contadorH);
            console.log("Distância anterior:", this.distancia);
            console.log("Distância:",this.distanciaAtual);
            console.log('Caminho seguido:', this.caminhoVisual);
            console.log("Caminho numeral:", this.caminho);
        } else {
            //setTimeout(() => {
                this.verificaPosicoes();
            //}, 1)
        }
    }
}

const tabuleiro = new Tabuleiro(0, 1);

tabuleiro.criarMatriz();