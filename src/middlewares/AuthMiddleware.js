require("dotenv").config();
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token =  req.headers["authorization"]?.split(" ")[1]; // Extrai o token do cabeçalho Authorization
     
    if(!token){
        return res
          .status(401)
          .json({ valid: false, message: "Token não fornecido" });
    }

    try {

    const decoded = jwt.verify(token, process.env.SECRET_KEY_API); // Verifica e decodifica o token usando a chave secreta    
    req.admin = decoded; // Adiciona os dados do administrador decodificado ao objeto de requisição
    
    next(); // Chama o próximo middleware ou rota    
    } catch {
        return res
          .status(401)
          .json({ valid: false, message: "Token inválido" });
    }
};

module.exports = authMiddleware;


 