Qualquer coisa eu devo testar com menos casas;

const fs = require('fs');

// Lê o arquivo de texto
const data = fs.readFileSync('arquivo.txt', 'utf8');

// Separa as linhas do arquivo
const linhas = data.split('\n');

// Cria uma matriz vazia com o tamanho especificado
const matriz = Array.from({length: linhas.length}, () => 
                   Array.from({length: 85}, () => 0));

// Preenche a matriz com os valores do arquivo
for (let i = 0; i < linhas.length; i++) {
  const valores = linhas[i].trim().split(' ').map(Number);
  matriz[i] = valores;
}

// Exibe a matriz no console
console.log(matriz);

/*
  Eu tenho algumas opções:
    1. Deixar o meu algoritmo genético vizualizar uma geração a mais. 
    // Este vai dar um trabalho, mas é quase garantido que o Player vai chegar ao destino, porém, vai precisar da etapa 2 ou da etapa 3 para funcionar corretamente.

    2. Aumentar a % da aleatoriedade para a direita e para baixo. 
    // Este é o mais simples de ser feito, então vou tentar ele primeiro.

    3. calcular a distância do player até a casa "4". Para o algoritmo tentar fazer o movimento que é mais próximo a casa "4".
    // Este pode ser bem útil, mas precisa de trabalhar junto com a aleatoriedade, pois há chances de ficar repetindo a mesma posição.

    4. E, o mais complicado: Savar os dados da melhor geração e fazer a próxima geração imitar a melhor, até chegar ao resultado. 
    // Apesar deste ser o mais difícil de ser feito, ele não me garante que vai funcionar e além disso, provavelmente vai demorar bem mais do que os outros, pelo ou menos até eu ter um bom modelo de uma geração.
*/