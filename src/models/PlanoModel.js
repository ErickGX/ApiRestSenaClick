const connection = require("./Connection");


const checkPlanoExists = async (id_plano) => {
  
  const [result] = await connection.execute(
    "SELECT * FROM plano WHERE id = ?",
    [id_plano]
  );


  return result.length > 0;
}

  const associateUserToPlan = async (id_cliente, id_plano, pagamento) => {

    try {
  await connection.execute(
    "INSERT INTO cliente_plano(id_cliente, id_plano, pagamento) VALUES (?,?,?)",
    [id_cliente, id_plano, pagamento]
  );

      
    } catch (error) {
      console.log(error);
    }
  

};


const createSubscription = async (subscription) => {
  const { titulo, preco, artigo, noticia, edicao, textoBotao, classe } =
    subscription;

  const query = `
    INSERT INTO plano (titulo, preco, artigo, noticia, edicao, textoBotao, classe) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const [createdSubscription] = await connection.execute(query, [
    titulo,
    preco,
    artigo,
    noticia,
    edicao,
    textoBotao,
    classe,
  ]);

  return createdSubscription;
};


const getAll = async () => {
    const query = "SELECT * FROM plano"; // Evita SELECT *
    const [subscriptions] = await connection.execute(query);
    return subscriptions;
};

const getPlanos = async () => {
  const query = "SELECT id, titulo, preco, artigo, noticia FROM plano"; // Evita SELECT *
  const [subscriptions] = await connection.execute(query);
  return subscriptions;
};



const deleteSubscription = async (id) => {
  if (!id) throw new Error("ID não fornecido para deletar plano.");

  //console.log("ID recebido para exclusão:", id);

  const [deletedSubscription] = await connection.execute(
    "DELETE FROM plano WHERE id = ?",
    [id]
  );

  return deletedSubscription;
};



const updateSubscription = async (id, subscription) => {
  // Caso id for null ou undefined
  // Isso impede que uma atualização seja feita sem um ID válido.
  if (!id) throw new Error("O ID do cliente é obrigatório.");

  const { titulo, preco, artigo, noticia, edicao, textoBotao, classe } =
    subscription || {};

  // Verifica se algum dos campos está indefinido
  if (
    titulo === undefined ||
    preco === undefined ||
    artigo === undefined ||
    noticia === undefined ||
    edicao === undefined ||
    textoBotao === undefined ||
    classe === undefined
  ) {
    throw new Error(
      "Todos os campos (titulo, preco, artigo, noticia, edicao, textoBotao, classe) são obrigatórios."
    );
  }

  // Atualiza a assinatura (plano) com os novos dados
  const [updatedSubscription] = await connection.execute(
    "UPDATE plano SET titulo = ?, preco = ?, artigo = ?, noticia = ?, edicao = ?, textoBotao = ?, classe = ? WHERE id = ?",
    [titulo, preco, artigo, noticia, edicao, textoBotao, classe, id]
  );

  return updatedSubscription;
};

const getAllSignatures = async () => {

          //uso de crases para quebra de linha
          const query = `
            SELECT cliente.id, cliente.nome, plano.titulo, pagamento, plano.preco, data_assinatura
            FROM cliente_plano
            INNER JOIN cliente ON cliente_plano.id_cliente = cliente.id
            INNER JOIN plano ON cliente_plano.id_plano = plano.id `;
   
  const [signatures] = await connection.execute(query);

  return signatures;

}

module.exports = {
  createSubscription,
  getAll,
  getPlanos,
  updateSubscription,
  deleteSubscription,
  checkPlanoExists,
  associateUserToPlan,
  getAllSignatures,
};
