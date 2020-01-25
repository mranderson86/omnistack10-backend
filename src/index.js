// Importando a biblioteca do Express
const express = require("express");

// importando a biblioteca de comunicação com o MongoDB
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

const { setupWebSocket } = require('./webSocket');

// importando o módulo de rotas
const routes = require('./routes');

// Criando instância do Express
const app = express();

const server = http.Server(app);

// Configura socket.io
setupWebSocket(server);

const port = process.env.PORT || 3333;

// Conexão com o mongdb
mongoose.connect('mongodb+srv://mranderson86:mranderson86@cluster0-eshy2.mongodb.net/devs?retryWrites=true&w=majority',{
     useNewUrlParser: true,
     useCreateIndex: true,
     useUnifiedTopology: true,
});

app.use(cors());
// aceita requisões com corpo no formato do json
app.use(express.json());
app.use(routes);

// Métodos HTTP: GET , POST , PUT , DELETE
// Tipos de parâmetros:

// Query Params: request.query (Filtros, ordenação, paginação)
// Route Params: request.params (Identificar um recurso na alteração ou remoção)
// Body Params: request.body (Dados para criação ou alteração de um registro)

// MongoDB (Não-relacional)
//app.listen(port);
server.listen(port);