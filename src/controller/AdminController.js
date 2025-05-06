const adminModel = require("../models/AdminModel");
const bcrypt = require("bcryptjs");

const loginAdm = async (request, response) => {
  const { email, password } = request.body;

  try {
    // Busca o administrador pelo email
    const administrador = await adminModel.findAdminByEmail(email);

    if (!administrador) {
      return response.status(404).json({ error: "Email não encontrado" });
    }

    // Verifica se a senha está correta usando bcrypt
    const senhaValida = await bcrypt.compare(password, administrador.senha);
    if (!senhaValida) {
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

const createAdmin = async (request, response) => {
  try {
    const { nome, sobrenome, email, password } = request.body;

    // Verifica se o email já está cadastrado
    const existingAdmin = await adminModel.findAdminByEmail(email);
    if (existingAdmin) {
      return response.status(409).json({ message: "Email já cadastrado." });
    }

    // Criptografa a senha antes de salvar
    const senhaCriptografada = await bcrypt.hash(password, 10);

    // Cria o administrador
    const adminId = await adminModel.createAdmin({
      nome,
      sobrenome,
      email,
      password: senhaCriptografada,
    });

    return response
      .status(201)
      .json({ message: "Administrador criado com sucesso!", id: adminId });
  } catch (error) {
    console.error("Erro ao criar administrador:", error);
    return response.status(500).json({ message: "Erro interno do servidor." });
  }
};



module.exports = {
  loginAdm,
  createAdmin,
};
