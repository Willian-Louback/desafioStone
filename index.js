const fs = require('fs');

class Tabuleiro{
    constructor(branco, verde){
        this.branco = branco;
        this.verde = verde;
        this.cases = [];
        this.wave = 0;
        this.quantidade = 0;
        this.newMatriz = [];
        //playerSettings
        this.playerPosition;
        this.playerArray;
        this.playerIndice;
        //testes Abaixo
        this.contador = 0; // Excluir depois estes contador, só para testes
        this.evitar = [];
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
                    if(this.playerArray == indiceArray && this.playerIndice == indice){ 
                        /*Eu preciso verificar se o player está no primeiro indiceArray (0),
                        e também o indice em que ele está*/
                        console.log('passou\n playerArray:',this.playerArray,'array:',indiceArray,'\nplayerIndice:',this.playerIndice,'indice:',indice);
                        this.evitar = [
                            matriz[indiceArray][indice+1],
                            matriz[indiceArray+1][indice],
                            matriz[indiceArray+1][indice-1],
                            matriz[indiceArray+1][indice+1]
                        ]
                    }

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
                    this.quantidade > 1 && this.quantidade < 5 ? this.newMatriz[indiceArray][indice] = this.verde : null;
                    //console.log('era branco:',matriz[indiceArray][indice]);
                } else if(matriz[indiceArray][indice] == this.verde){
                    this.quantidade > 3 && this.quantidade < 6 ? null : this.newMatriz[indiceArray][indice] = this.branco;
                    //console.log('era verde:',matriz[indiceArray][indice]);
                }

                this.cases = [];
                this.quantidade = 0;
            })
        })
        this.moverPlayer(this.newMatriz, matriz);
    }

    moverPlayer = (matrizAtualizada, matriz) => {
        console.log(this.playerPosition);
        this.contador++;
        //Colocar condições depois
        this.playerPosition = matriz[0][this.contador];
        this.playerArray = 0;
        this.playerIndice = this.contador;

        if(this.evitar[0] == this.branco){ //Para ficar em um padrão, eu posso deixar tudo igual e adicionar um valor diferente de 0 e de 1 no evitar, para o if testar as possibilidades
            this.evitar = [];
            this.adicionarPosicao(matriz);
        } else if(this.evitar[1] == this.branco){
            this.evitar = [];
            this.adicionarPosicao(matriz);
        } else if(this.evitar[2] == this.branco){
            this.evitar = [];
            this.adicionarPosicao(matriz);
        } else if(this.evitar[3] == this.branco){
            this.evitar = [];
            this.adicionarPosicao(matriz);
        } else {
            console.log('nada');
            this.evitar = [];
            this.adicionarPosicao(matriz);
        }
        
        
    }

    adicionarPosicao(matriz){ //Adicionando na Matriz
        matriz = this.newMatriz.slice().map(arrays => arrays.slice());
        this.wave++;
        console.log("Wave:",this.wave);
        //console.log(matriz[0])
        /*if(this.wave == 2){
            return;
        }*/

        if(this.playerPosition == this.verde){
            console.log('Game Over: ', this.playerPosition);
        } else if(this.playerPosition == 4){
            console.log('Parabéns, você chegou!');
        } else {
            this.verificaPosicoes(matriz);
        }
    }
}

const tabuleiro = new Tabuleiro(0, 1);

tabuleiro.criarMatriz();