const connection = require('./Connection');

const createUser = async (cliente) => {

  try {
    const { primeiroNome, sobrenome, email, senha } = cliente;

    //console.log("Dados recebidos para criar usuário:", cliente);

    const query =
      "INSERT INTO cliente(nome, sobrenome, email, senha) VALUES(?,?,?,?)";

    const [createUser] = await connection.execute(query, [
      primeiroNome,
      sobrenome,
      email,
      senha
    ]);

     return createUser.insertId; 
    
  } catch (error) {
    console.error(error);
  }
}


const getAll = async () => {

    const [clientes] = await connection.execute("SELECT id, nome , sobrenome, email FROM cliente"); 

    return clientes;
}

const findUserByEmail = async (email) => {
  const query = "SELECT * FROM cliente WHERE email = ?";

  const [rows] = await connection.execute(query, [email]);

  return rows.length > 0 ? true : false; // Retorna o true se usuário encontrado ou false
};


const deleteUser = async (id) => {
    
    const [deleteCliente] = await connection.execute("DELETE FROM cliente WHERE id = ?", [id]);

    return deleteCliente;
}


const updateUser =  async (id, cliente) => {
    //console.log("iD DO CLIENTE : " + id);
    
        //caso id for null ou undefined
        //Isso impede que uma atualização seja feita sem um ID válido.
        if (!id) throw new Error("O ID do cliente é obrigatório.");

        //Caso cliente seja undefined ou null, evita erro atribuindo um objeto vazio {}.
        const { nome, sobrenome} = cliente || {};

        //Se algum dos campos estiver undefined, lança um erro.
     

        if (nome === undefined) {
          throw new Error("O campo 'primeiroNome' não foi fornecido.");
        } else if (sobrenome === undefined) {
          throw new Error("O campo 'sobrenome' não foi fornecido.");
        } else {
        
          console.log("Dados corretos");
          
        }

        const [updatedUser] = await connection.execute(
          "UPDATE cliente SET nome = ?, sobrenome = ? WHERE id = ?",
          [
            nome || null,
            sobrenome || null,
            id || null,
          ]
        );

    return updatedUser;
};

module.exports = {
  createUser,
  getAll,
  deleteUser,
  updateUser,
  findUserByEmail
};