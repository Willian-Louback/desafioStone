import Draw from "./Draw.js";

const generateMatriz = async () => {
    return new Promise(resolve => {
        fetch("../../data/padrao.txt")
            .then(response => response.text())
            .then(data => {
                let matriz = [];

                data.split("\n").forEach(value => {
                    matriz.push(value.split(" "));
                });

                const draw = new Draw();

                draw.draw(
                    matriz,
                    [{
                        position: [ 0, 0 ]
                    }]
                );

                resolve(matriz);
            })
            .catch(error => console.error(error));
    });
};

export default generateMatriz;