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
    }

    verificaPosicoes = async () => {
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
        //this.adicionarPosicao(this.matriz);
    }

    automatizar(){
        this.chave = true;
        this.adicionarPosicao();
    }

    stop(){
        this.chave = false;
    }

    adicionarPosicao = () => {
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

                    this.cases.forEach(cases => cases == this.verde ? this.quantidade++ : null);
                    //console.log(this.quantidade);
                } else if(indiceArray == 0 && indice == 84){ //cuidando do canto superior direito
                    this.cases = [
                        this.matriz[indiceArray][indice-1],
                        this.matriz[indiceArray+1][indice],
                        this.matriz[indiceArray+1][indice-1]
                    ]

                    this.cases.forEach(cases => cases == this.verde ? this.quantidade++ : null);
                    //console.log(this.quantidade);
                } else if(indiceArray == 64 && indice == 0){ //cuidando do canto inferior esquerdo
                    this.cases = [
                        this.matriz[indiceArray-1][indice],
                        this.matriz[indiceArray-1][indice+1],
                        this.matriz[indiceArray][indice+1]
                    ]

                    this.cases.forEach(cases => cases == this.verde ? this.quantidade++ : null);
                    //console.log(this.quantidade);
                } else if(indiceArray == 64 && indice == 83){ //cuidando do canto inferior direito
                    this.cases = [
                        this.matriz[indiceArray-1][indice],
                        this.matriz[indiceArray-1][indice-1],
                        this.matriz[indiceArray-1][indice+1],
                        this.matriz[indiceArray][indice-1]
                    ]

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

                this.cases = [];
                this.quantidade = 0;
            })
        })

        this.matriz = this.newMatriz.slice().map(arrays => arrays.slice());

        this.matriz.forEach((valorArray, indiceArray) => {
            this.span.innerHTML += valorArray+"\n";
        })
        
        this.wave++;
        this.h1.innerHTML = `Geração: ${this.wave}`

        if(this.chave == true){
            setTimeout(() => {
                this.adicionarPosicao();
            }, 300);
        }
    }
}

const tabuleiro = new Tabuleiro(0, 1);

tabuleiro.verificaPosicoes();