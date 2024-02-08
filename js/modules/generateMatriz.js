const generateMatriz = async (draw) => {
    return new Promise(resolve => {
        fetch("../../data/padrao.txt")
            .then(response => response.text())
            .then(data => {
                let matriz = [];

                data.split("\n").forEach(value => {
                    matriz.push(value.split(" "));
                });

                draw.configCanvas();

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