const connection = require("./Connection");

const findAdminByEmail = async (email) => {
console.log("MODEL ADMIN >:" + email);


  const query = "SELECT * FROM administrador WHERE email = ?";

  const [rows] = await connection.execute(query, [email]);

  // Retorna o primeiro usuário encontrado ou null caso não encontre
  return rows.length > 0 ? rows[0] : false;
};

module.exports = {
  findAdminByEmail,
};
