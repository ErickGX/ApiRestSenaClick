// Sanitização e validação de dados do cliente
const validateClientData = (request, response, next) => {
  const { idPlano, tipoPlano, primeiroNome, sobrenome, email, senha, pagamento } = request.body;

  // Verifica se os campos obrigatórios estão presentes
  if (!idPlano || !tipoPlano || !primeiroNome || !sobrenome || !email || !senha || !pagamento) {
    return response.status(400).json({ message: "Todos os campos são obrigatórios." });
  }

  // Verifica se o ID do plano é um número válido
  if (typeof idPlano !== "number" || idPlano <= 0) {
    return response.status(400).json({ message: "ID do plano inválido." });
  }

  // Verifica se o tipo do plano é uma string válida
  if (typeof tipoPlano !== "string" || tipoPlano.trim() === "") {
    return response.status(400).json({ message: "Tipo do plano inválido." });
  }

  // Verifica se o nome e sobrenome são strings válidas
  if (typeof primeiroNome !== "string" || primeiroNome.trim() === "") {
    return response.status(400).json({ message: "Primeiro nome inválido." });
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
  if (senha.length < 8) {
    return response.status(400).json({ message: "A senha deve ter pelo menos 8 caracteres." });
  }

  // Verifica se o método de pagamento é válido
  // Futura troca de valor enviada pelo Front-end
  
  //const metodosPagamentoValidos = ["Boleto Bancário", "Cartão de Crédito", "Pix", ""];
  const metodosPagamentoValidos = ["boleto", "cartao", "pix", ""];
  if (!metodosPagamentoValidos.includes(pagamento.toLowerCase())) {
    return response.status(400).json({ message: "Método de pagamento inválido." });
  }

  // Se o pagamento for vazio, atribuir "Grátis" para consistência
  if (pagamento === "") {
    request.body.pagamento = "Grátis";
  }

  next();
};

module.exports = validateClientData;