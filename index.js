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
        matriz[0][1] = 1;
        this.verificaPosicoes(matriz);
    }

    verificaPosicoes = (matriz) => {
        matriz.forEach((arrays, indiceArray) =>{
            arrays.forEach((numbers, indice) => {
            
                /*if(indiceArray == 0 && indice == 1){
                    if(
                        matriz[indiceArray][indice+1] == this.verde &&
                        matriz[indiceArray+1][indice] == this.verde &&
                        matriz[indiceArray+1][indice-1] == this.verde 
                    ){

                    }
                }*/
                if(numbers == this.verde){
                    this.positionVerdes.push(["Array:",indiceArray, "indice:",indice]);
                }
            })
        })

        console.log(this.positionVerdes);
    }

    adicionarPosicao(){

    }
}

const tabuleiro = new Tabuleiro(0, 1);

tabuleiro.criarMatriz();