import generateMatriz from "./generateMatriz.js";
import calculateMatriz from "./calculateMatriz.js";

class Board{
    constructor(){
        this.matriz;
        this.newMatriz;
        this.player = 3;
        this.playerPosition = [ 0, 0 ];
        this.wave = 0;
        this.valuePossibleMovement = [null, null, null, null];
        this.attempts = 1;


        this.chaveC = false;
        this.ativadorC = false;
        //this.aleatorio = -1; //Só testes, normal: this.aleatorio;
        this.aleatorio;
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
        //posições ruin
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
        //this.melhorGeracao = "22012022212000232222222300302320001023220020230300300012302023202020020230332202203222222311220312231232310003131300223110010320223220202102032010302000333202120301221021313211203112020332221313302102030200222222002001320110202022120022333202000230231112201110022202103212220230200000203022202003201120302020232110000000001101000000000113000021003300020330220002";
        // A melhor até agora:
        //this.melhorGeracao = "0022202220202200210010002122302202123103202020200212202001303123100120020002120203223002300120220002203223233220100000100100022021332222001101000213220002322021320022020032121000300002010032100203203022202222000022022331031110000203130332130300002030200213221002302222022302222033000212022200";
    }

    async init() {
        this.matriz = await generateMatriz();

        const { newMatriz, valuePossibleMovement } = await calculateMatriz(this.matriz, this.playerPosition, this.valuePossibleMovement);

        this.newMatriz = newMatriz;
        this.valuePossibleMovement = valuePossibleMovement;

        document.querySelector(".up").addEventListener("click", this.up.bind(this));
        document.querySelector(".down").addEventListener("click", this.down.bind(this));
        document.querySelector(".right").addEventListener("click", this.right.bind(this));
        document.querySelector(".left").addEventListener("click", this.left.bind(this));
    }

    // automatizar(){
    //     this.chaveC = true;
    //     this.verificaPosicoes();
    // }

    // stop(){
    //     this.chaveC = false;
    //     this.ativadorC = false;
    // }

    up(){
        this.ignorar = true;
        this.chaveManual = true;
        this.aleatorio = 3;

        this.movePlayer();
    }

    down(){
        this.ignorar = true;
        this.chaveManual = true;
        this.aleatorio = 2;

        this.movePlayer();
    }

    left(){
        this.ignorar = true;
        this.chaveManual = true;
        this.aleatorio = 1;

        this.movePlayer();
    }

    right(){
        this.ignorar = true;
        this.chaveManual = true;
        this.aleatorio = 0;

        this.movePlayer();
    }

    verificaPosicoes = () => {
        // this.span.innerHTML = "";

        if(this.chaveManual == true){
            this.movePlayer();
        } else if(this.contadorCaminho < ((this.melhorGeracao.length)-(this.sortearNumero))){
            this.seguirMelhorGeracao();
        } else {
            this.escolherCaminho();
        }
    };

    escolherCaminho(){
        this.verificaVezes++;

        if(this.chave == false){
            //console.log("antes:",this.evitar)
            if(this.contadorV == 0 && this.contadorH == 0){
                this.evitar = [
                    this.newMatriz[0][1],
                    null,
                    this.newMatriz[1][0],
                    null
                ];
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
                    thisRef.movePlayer();
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
            ];
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
                console.log("nada, L",this.aleatorio);
                return;
                this.contadorHV--;
                this.verificaPosicoes();
            }
        } else {
            this.verificaVezes = 0;
            this.chave = false;
            this.movePlayer();
        }
    }

    seguirMelhorGeracao(){
        this.aleatorio = this.melhorGeracao[this.contadorCaminho];
        this.contadorCaminho++;
        if(this.sortearNumero == 0){
            this.sortearNumero = Math.floor(Math.random()*40) + 1;
        }
        this.movePlayer();
    }

    movePlayer() {
        // Para arrumar as coisas
        // numbers = "";
        // chaveManual = false;
        // ignorar = false;
        //Para ficar em um padrão, eu posso deixar tudo igual e adicionar um valor diferente de 0 e de 1 no evitar, para o if testar as possibilidades

        if(0 == this.aleatorio){ //direita
            this.playerPosition[0]++;
            // caminhoVisual += "R ";
            // caminho += "0";
        } else if(1 == this.aleatorio){ //esquerda
            this.playerPosition[0]--;
            // caminhoVisual += "L ";
            // caminho += "1";
        } else if(2 == this.aleatorio){ //baixo
            this.playerPosition[1]++;
            // caminhoVisual += "D ";
            // caminho += "2";
        } else if(3 == this.aleatorio){ //cima
            this.playerPosition[1]--;
            // caminhoVisual += "U ";
            // caminho += "3";
        } else { //morte
            //return;
            console.log("ERROR",this.aleatorio);
            return;
        }

        this.player = this.newMatriz[this.playerPosition[1]][this.playerPosition[0]];
        this.addMove();
    }

    addMove() {
        this.matriz = this.newMatriz.slice().map(arrays => arrays.slice());
        this.matriz[this.playerPosition[1]][this.playerPosition[0]] = this.matriz[this.playerPosition[1]][this.playerPosition[0]] + "P"; // essa parte precisa de otimização

        document.querySelector("#matriz").innerText = ``;

        this.matriz.forEach(value => {
            document.querySelector("#matriz").innerText += `${value.join(" ")}\n`;
        });

        this.matriz = this.newMatriz.slice().map(arrays => arrays.slice());

        this.wave++;
        document.querySelector(`#generation`).innerText = `Geração: ${this.wave}`;

        if(this.player == 1){
            this.attempts++;
            // this.distanciaAtual = (parseInt(64) - parseInt(this.playerPosition[1])) + (parseInt(84) - parseInt(this.playerPosition[0]));

            // if(this.distanciaAtual < this.distancia){
            //     this.distancia = this.distanciaAtual;
            //     this.melhorGeracao = this.caminho;
            // }

            console.log("Tentativa Atual:", this.attempts);
            console.log("wave:", this.wave);
            console.log("Game Over: ", this.player);
            // console.log("Distância restante:", this.distanciaAtual);
            // console.log("Melhor distancia:", this.distancia);
            // console.log("Número Sorteado:", this.sortearNumero);
            // this.caminhoVisual = "";
            // this.caminho = "";
            // this.playerPositionV = 0;
            // this.contadorHV = 0;
            // this.contadorVV = 0;
            // this.chaveC = false;
            // this.ativadorC = true;
            // this.distanciaAtual = 148;
            // this.contadorCaminho = 0;
            // this.sortearNumero = 0;
            this.wave = 0;
            this.playerPosition[0] = 0;
            this.playerPosition[1] = 0;
            this.player = 3;

            setTimeout(() => {
                // calculateMatriz();
                console.log("morte");
            }, 50);
        } else if(this.player == 4){
            console.log("Parabéns, você chegou!");
            console.log("Tentativa Atual:", this.attempts);
            console.log("wave:", this.wave);
            console.log("Player position: ", this.player);
            console.log("Position:", this.playerPosition[1], this.playerPosition[0]);
            // console.log("Distância restante:", this.distanciaAtual);
            // console.log("Melhor distancia:",this.distancia);
            // console.log("Caminho seguido:", this.caminhoVisual);
            // console.log("Caminho numeral:", this.caminho);
            // this.chaveC = false;

            setTimeout(() => {
                alert("Parabéns, você conseguiu!");
            }, 300);
        } else {
            setTimeout(async () => {
                const { newMatriz, valuePossibleMovement } = await calculateMatriz(this.matriz, this.playerPosition, this.valuePossibleMovement);

                this.newMatriz = newMatriz;
                this.valuePossibleMovement = valuePossibleMovement;
            }, 120);
        }

        //this.aleatorio = -1; //Ficar de olho nisso aqui
        // this.evitarV = [null, null, null, null];
        // this.contadorHV = this.playerPosition[0];
        // this.contadorVV = this.this.playerPosition[1];

        // if(this.player == this.verde){
        // this.tentativas++;
        // this.distanciaAtual = (parseInt(64) - parseInt(this.playerPosition[1])) + (parseInt(84) - parseInt(this.playerPosition[0]));

        // if(this.distanciaAtual < this.distancia){
        //     this.distancia = this.distanciaAtual;
        //     this.melhorGeracao = this.caminho;
        // }
        // console.log("Tentativa Atual:", this.tentativas);
        // console.log("wave:",this.wave);
        // console.log("Game Over: ", this.player);
        // console.log("Distância restante:", this.distanciaAtual);
        // console.log("Melhor distancia:",this.distancia);
        // console.log("Número Sorteado:", this.sortearNumero);
        // this.caminhoVisual = "";
        // this.caminho = "";
        // this.wave = 0;
        // this.playerPosition[0] = 0;
        // this.playerPosition[1] = 0;
        // this.player = 0;
        // this.playerPositionV = 0;
        // this.contadorHV = 0;
        // this.contadorVV = 0;
        // this.chaveC = false;
        // this.ativadorC = true;
        // this.distanciaAtual = 148;
        // this.contadorCaminho = 0;
        // this.sortearNumero = 0;
        // setTimeout(() => {
        //     this.criarMatriz();
        // },50);

        //this.verificaPosicoes(matriz);
        // } else if(this.player == 4){
        // console.log("Parabéns, você chegou!");
        // console.log("Tentativa Atual:", this.tentativas);
        // console.log("wave:",this.wave);
        // console.log("Player position: ", this.player);
        // console.log("Position:", this.playerPosition[1], this.playerPosition[0]);
        // console.log("Distância restante:", this.distanciaAtual);
        // console.log("Melhor distancia:",this.distancia);
        // console.log("Caminho seguido:", this.caminhoVisual);
        // console.log("Caminho numeral:", this.caminho);
        // this.chaveC = false;
        // setTimeout(() => {
        //     alert("Parabéns, você conseguiu!");
        // },300);
        // } else {
        // if(this.chaveC == true){
        //     setTimeout(() => {
        //         this.verificaPosicoes();
        //     }, 120);
        // }
        // }
    }
}

export default Board;