const fs = require('fs');

/*class Tabuleiro{
    constructor(x, y, inicio, destino){ //x linha; y coluna;
        this.x = x;
        this.y = y;
        this.inicio = inicio;
        this.destino = destino;
        this.branco = 0;
        this.verde = 1;
        this.casas = [];
        this.casaDestino = this.x*this.y;
        this.casaInicio = 1;
    }

    gerarCasas(){
        let casas = this.casas;
        for(let i = 1; i <= this.x * this.y; i++){
            if(i == this.casaInicio){
                casas.push(this.inicio);
            } else if(i == this.casaDestino){
                casas.push(this.destino);
                console.log(i)
            } else{
                casas.push(this.branco);
            }
        }
        this.atualizarPosicoes(casas);
    }

    atualizarPosicoes(casas){
        casas.forEach((valor, indice) => {
            if((indice+1) == 55){
                casas.splice(indice, 1, this.verde);
            }
        });
        this.testeDados();
    }
    
    testeDados(){
        console.log(this.x * this.y, this.inicio, this.destino);
        console.log("cores:",this.branco, this.verde);
        console.log('Array:', this.casas);
        console.log("Tamanho:", this.casas.length);
        //this.casas.forEach(casas =>{
        //    console.log(casas);
        //})
    }
}

//const tabuleiro = new Tabuleiro(65, 85, 3, 4);
const tabuleiro = new Tabuleiro(7, 8, 3, 4);

//tabuleiro.gerarCasas();*/
class Tabuleiro{
    constructor(branco, verde){
        this.branco = branco;
        this.verde = verde;
        this.positionVerdes = [];
        this.cases = [];
        this.wave = 0;
        this.quantidade = 0;
        //this.matriz = this.criarMatriz();
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
        this.positionVerdes = [];

        //matriz.forEach((arrays, indiceArray) =>{
            /*arrays.forEach((numbers, indice) => {
            
                if(indiceArray == 0 && indice == 1){
                    if(
                        matriz[indiceArray][indice+1] == this.verde &&
                        matriz[indiceArray+1][indice] == this.verde &&
                        matriz[indiceArray+1][indice-1] == this.verde 
                    ){

                    }
                }
                if(numbers == this.verde){
                    this.positionVerdes.push(["Array:", indiceArray, "indice:", indice]);
                }
            })
        })*/

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
                } else if(indiceArray == 0 && indice != 1 && indice != 0 && indice != 84){ // cuidando do topo
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
                } else if(indiceArray == 64 && indice == 83){ //cuidando da parte de baixo
                    this.cases = [
                        matriz[indiceArray-1][indice],
                        matriz[indiceArray-1][indice-1],
                        matriz[indiceArray-1][indice+1],
                        matriz[indiceArray][indice-1],
                        matriz[indiceArray][indice+1]
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