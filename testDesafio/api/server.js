const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 3010;

app.use(cors());

app.get('/matriz', (req, res) => {
  const data = fs.readFileSync('./padrao.txt', 'utf8');
  const linhas = data.split('\n');
  const matriz = Array.from({ length: linhas.length }, () => Array.from({length: 85}), () => 0);

  for(let i = 0; i < linhas.length; i++){
    const atribuirValores = linhas[i].trim().split(' ').map(Number);
    matriz[i] = atribuirValores;
  }

  res.json(matriz);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

