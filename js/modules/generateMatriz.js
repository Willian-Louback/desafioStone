const generateMatriz = async () => {
    return new Promise(resolve => {
        fetch("../../data/padrao.txt")
            .then(response => response.text())
            .then(data => {
                let matriz = [];

                data.split("\n").forEach(value => {
                    matriz.push(value.split(" "));

                    document.querySelector("#matriz").innerText += `${value} \n`;
                });

                resolve(matriz);
            })
            .catch(error => console.error(error));
    });
    // this.h1.innerHTML = "Geração: 0";
    // this.newMatriz = this.matriz.slice().map(arrays => arrays.slice());
    // this.playerPosition = this.matriz[0][0];
    // this.ativadorC == true ? this.automatizar() : null;
};

export default generateMatriz;