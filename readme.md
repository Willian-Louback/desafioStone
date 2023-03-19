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
