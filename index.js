// Importando a biblioteca do Express
const express = require("express");

// Criando instância do Express
const app = express();

// Definindo uma rota root
app.get('/',(request,response)=>{
    return response.send('Hello Word');
});

app.listen(3333);