const express = require("express");
const router = require("./router");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

//Configuração do CORS para permitir requisições do frontend Angular
app.use(
  cors({
    origin: "http://localhost:4200", // Substitua pelo endereço do seu frontend
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: false, // Se você precisa de cookies ou cabeçalhos de autorização
  })
);

app.use(express.json());
app.use(router); //O método app.use() serve para registrar middlewares ou roteadores no Express.
//No caso de app.use(router), o router contém várias rotas definidas e será responsável por lidar com as requisições correspondentes.

//a aplicação agora esta escutando os as requisicoes https

module.exports = app;
