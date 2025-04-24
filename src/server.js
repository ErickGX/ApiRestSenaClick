const app = require("./app");

//1 jeito de fazer
//crio a variavel que me da acesso a lib dotenv
// const dotenv = require('dotenv');
//console.log(process.env.PORT); 3333 e qlq coisa definida la
// dotenv.config(); // e atraves desta variavel eu tenho acesso a sua config
//no arquivo .env e as suas variaveis q eu defini

//2 metodo mais simples
require("dotenv").config();

const PORT = process.env.PORT || 3333;

//backend ouvindo requisições a partir desta portar , e soltando log quando estiver ON
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
