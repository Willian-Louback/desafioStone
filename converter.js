// Vou usar este arquivo apenas para converter as letras em números

const valor = "R R D D D R D D D R D R D D R R D L R R L R R R D L D D U R D D R D L D U L R U D R D R D R D R R D L D D R D R R L U R U L D U L R R L D R R D R R R D L D R D R U D D U R R D U R R L D R D D R R R D D R U D D U D U U D D R L R R R R R L R R L R R R D D R D L U U D D D D R R L L R L R R R D L U D D R R R D U D D R D L U D R R D D R D R R U D L D L R R R U R R R R D R L R R U D L R R D R U D R U R D D D R D D D D R R R R D D R D D U U L R U L L L R R R R D R U L U R U U D L U R U R R R R D R U R D R R D L U D D L R R D U R D D D D R D D U R D D D D R U U R R R D L D R D D D R R";

const removeEspaco = valor.split(" ");

const resultado = removeEspaco.map(valor => {
    if(valor == "R"){
        return 0;
    } else if(valor == "L"){
        return 1;
    } else if(valor == "D"){
        return 2;
    } else if(valor = "U"){
        return 3;
    }
}).join("");

console.log(resultado);