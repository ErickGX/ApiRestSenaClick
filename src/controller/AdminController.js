const adminModel = require("../models/AdminModel");


const loginAdm = async (request, response) => {
  console.log("Requisicao Front :" + request.body);
  
  const { email, password } = request.body;

  console.log("Controller : " + email + "  Senha : " +password);
  

  if (!email || !password) {
    return response
      .status(400)
      .json({ error: "Email e senha são obrigatórios" });
  }

  try {
    const administrador = await adminModel.findAdminByEmail(email);


    if (!administrador) {
      return response.status(404).json({ error: "Email não encontrado" });
    }

    console.log(administrador.senha  + "Senha ADM BD");
    console.log("Senha front end Angular: "  + password);
    
    

    if (administrador.senha !== password) {
      return response.status(401).json({ error: "Senha incorreta" });
    }

    return response
      .status(200)
      .json({ message: "Login realizado com sucesso!" });
  } catch (error) {
    console.error("Erro ao tentar fazer login:", error);
    return response.status(500).json({ error: "Erro interno do servidor" });
  }
};

module.exports = {
  loginAdm,
};