const clienteModel = require("../models/ClienteModel");
const planoModel = require("../models/PlanoModel");
const bcrypt = require('bcryptjs');

const createUser = async (request, response) => {
  try {
    let { idPlano, pagamento, email, senha, primeiroNome, sobrenome } = request.body;

       // Verifica se o e-mail já está cadastrado
    const checkEmailDuplicado = await clienteModel.findUserByEmail(email);
    if (checkEmailDuplicado) {
      return response
        .status(409) //codigo para conflito de dados
        .json({ error: "Usuário já cadastrado com esse e-mail." });
    }

    // Verifica se o plano existe
    const checkPlanoExists = await planoModel.checkPlanoExists(idPlano);
    if (!checkPlanoExists) {
      return response.status(404).json({ message: "Plano inexistente" });
    }

    // Criptografar a senha antes de salvar
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    // Cria o usuário
    const id_cliente = await clienteModel.createUser({
      primeiroNome,
      sobrenome,
      email,
      senha: senhaCriptografada,
    });

    if (!id_cliente) {
      return response
        .status(500)
        .json({ message: "Erro interno ao cadastrar o usuário." });
    }

    // Associa o usuário ao plano
    await planoModel.associateUserToPlan(id_cliente, idPlano, pagamento);

    // Retorna o sucesso com o id do cliente
    return response.status(201).json({ id: id_cliente });
  } catch (error) {
    // Log do erro para diagnóstico
    console.error("Erro ao processar a solicitação:", error);

    // Resposta genérica de erro para o usuário
    return response.status(500).json({
      error: "Erro interno do servidor. Tente novamente mais tarde.",
    });
  }
};

const getAll = async (request, response) => {
  const listaClientes = await clienteModel.getAll();

  return response.status(200).json(listaClientes);
};


const deleteUser = async (request, response) => {
  const { id } = request.params;
  await clienteModel.deleteUser(id);

  return response.status(204).send();
};


const updateUser = async (request, response) => {
  try {
      const { id } = request.params;

      const result = await clienteModel.updateUser(id, request.body);

      console.log("Obj recebido no controller" + result);

      if (result.affectedRows === 0) {
        return response.status(404).json({ message: "Cliente não encontrado" });
      }

      return response.status(204).send();
  } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      return response.status(500).json({ message: "Erro interno do servidor" });
  }
};

const loginUser = async (request, response) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response
        .status(400)
        .json({ error: "Email e senha são obrigatórios." });
    }

    // Busca o usuário pelo email
    const user = await clienteModel.findUserByEmail(email);

    if (!user) {
      return response.status(404).json({ error: "Email não encontrado." });
    }

    // Compara a senha fornecida com a senha armazenada no banco de dados
    const senhaValida = await bcrypt.compare(password, user.senha);
    if (!senhaValida) {
      return response.status(401).json({ error: "Senha incorreta." });
    }

    // Retorna sucesso no login
    return response.status(200).json({ message: "Login realizado com sucesso!" });
  } catch (error) {
    console.error("Erro ao processar login:", error);
    return response.status(500).json({ error: "Erro interno do servidor." });
  }
};

module.exports = {
  createUser,
  getAll,
  deleteUser,
  updateUser,
  loginUser,
};
