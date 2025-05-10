// Middleware para validação dos dados de login do administrador
const validateAdminLogin = (request, response, next) => {
  const { email, password } = request.body;

  // Verifica se os campos obrigatórios estão presentes
  if (!email || !password) {
    return response
      .status(400)
      .json({ message: "Email e senha são obrigatórios." });
  }

  // Verifica se o email é válido
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return response.status(400).json({ message: "Email inválido." });
  }

  // Verifica se a senha tem pelo menos 8 caracteres
  if (password.length < 8) {
    return response
      .status(400)
      .json({ message: "A senha deve ter pelo menos 8 caracteres." });
  }

  next();
};


// Middleware para validação dos dados de cadastro do administrador
const validateAdminCreation = (request, response, next) => {
  const { nome, sobrenome, email, password } = request.body;

  // Verifica se todos os campos obrigatórios estão presentes
  if (!nome || !sobrenome || !email || !password) {
    return response
      .status(400)
      .json({ message: "Nome, sobrenome, email e senha são obrigatórios." });
  }

  // Verifica se o nome e sobrenome são strings válidas
  if (typeof nome !== "string" || nome.trim() === "") {
    return response.status(400).json({ message: "Nome inválido." });
  }

  if (typeof sobrenome !== "string" || sobrenome.trim() === "") {
    return response.status(400).json({ message: "Sobrenome inválido." });
  }

  // Verifica se o email é válido
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return response.status(400).json({ message: "Email inválido." });
  }

  // Verifica se a senha tem pelo menos 8 caracteres
  if (password.length < 8) {
    return response
      .status(400)
      .json({ message: "A senha deve ter pelo menos 8 caracteres." });
  }

  next();
};



module.exports = {
  validateAdminLogin,
  validateAdminCreation,
};
