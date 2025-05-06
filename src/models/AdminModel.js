const connection = require("./Connection");

const findAdminByEmail = async (email) => {

  const query = "SELECT * FROM administrador WHERE email = ?";
  const [rows] = await connection.execute(query, [email]);

  // Retorna o primeiro usuário encontrado ou false caso não encontre
  return rows.length > 0 ? rows[0] : false;
};


const createAdmin = async ({ nome, sobrenome, email, password }) => {
  const query =
    "INSERT INTO administrador (nome, sobrenome, email, senha) VALUES (?, ?, ?, ?)";
  const [result] = await connection.execute(query, [
    nome,
    sobrenome,
    email,
    password,
  ]);
  return result.insertId; // Retorna o ID do novo administrador
};



module.exports = {
  findAdminByEmail,
  createAdmin
};
