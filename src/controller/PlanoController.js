const planoModel = require("../models/PlanoModel");
const { format, toZonedTime } = require("date-fns-tz");

// const createSubscription = async (request, response) => {
//   try {

//      const { tipo, preco } = request.body;

//      if (!tipo || !preco) {
//        return response
//          .status(400)
//          .json({ error: "Campos 'tipo' e 'preco' são obrigatórios" });
//      }

//     const createdSubscription = await planoModel.createSubscription(request.body);

//     return response.status(201).json({ id: createdSubscription.insertId });

//   } catch (error) {
//       console.error("Erro ao criar assinatura:", error.message);
//       return response.status(500).json({ error: "Erro interno do servidor" });
//   }
// };



//cria um plano
const createSubscription = async (request, response) => {

 // console.log("Body recebido:", request.body);
  try {
    const { titulo, preco, artigo, noticia, edicao, textoBotao, classe } =
      request.body;

      
    // Validação: Verifica se todos os campos obrigatórios estão presentes
if (
  !titulo ||
  typeof preco !== "number" || // Confirma que é um número
  preco < 0 || // Evita valores negativos (se necessário)
  !artigo ||
  !noticia ||
  !edicao ||
  !textoBotao ||
  !classe
) {
  return response
    .status(400)
    .json({ error: "Todos os campos são obrigatórios" });
}

    // Chama a função do Model para inserir no banco de dados
    const createdSubscription = await planoModel.createSubscription(
      request.body
    );

    return response.status(201).json({ id: createdSubscription.insertId });
  } catch (error) {
    console.error("Erro ao criar plano:", error.message);
    return response.status(500).json({ error: "Erro interno do servidor" });
  }
};


//deleta um plano pelo ID
const deleteSubscription = async (request, response) => {
  try {
       const id = Number(request.params.id); // Converte ID para número
    if (isNaN(id)) return response.status(400).json({ error: "ID inválido" });

      //console.log("Tentando excluir plano com ID:", id);
      const result = await planoModel.deleteSubscription(id);

    if (result.affectedRows === 0) {
      //console.log("Plano não encontrado");
      return response.status(404).json({ error: "Plano não encontrado" });
    }

      //console.log("Plano deletado com sucesso.");
      return response.status(204).send();
  } catch (error) {
      console.error("Erro ao deletar plano:", error.message);
      return response.status(500).json({ error: "Erro interno do servidor" });
  }
};


//lista todos os planos
const getAll = async (request, response) => {
  try {
    const listaPlanos = await planoModel.getAll();

    if (listaPlanos.length == 0) {
      return response.status(200).json([]);
    }

    return response.status(200).json(listaPlanos);
  } catch (error) {
        console.error("Erro Listar os Planos:", error.message);
        return response.status(500).json({ error: "Erro interno do servidor" });
  }
};


//lista todos os planos
const getPlanos = async (request, response) => {
  try {
    const listaPlanos = await planoModel.getPlanos();

    if (listaPlanos.length == 0) {
      return response.status(200).json([]);
    }
    console.log("Lista de planos apra o crud concluida com sucesso:", listaPlanos);
    
    return response.status(200).json(listaPlanos);
  } catch (error) {
        console.error("Erro Listar os Planos para o crud:", error.message);
        return response.status(500).json({ error: "Erro interno do servidor" });
  }
};


//atualiza um plano
const updateSubscription = async (request, response) => {
  try {
    const { id } = request.params;

    // Desestruturação para obter todos os campos do corpo da requisição
    const { titulo, preco, artigo, noticia, edicao, textoBotao, classe } =
      request.body;

    // Objeto que armazenará os campos a serem atualizados
    const updateData = {};

    // Verifica se os campos estão presentes e adiciona ao objeto de atualização
    if (titulo) updateData.titulo = titulo;
    if (preco) updateData.preco = preco;
    if (artigo) updateData.artigo = artigo;
    if (noticia) updateData.noticia = noticia;
    if (edicao) updateData.edicao = edicao;
    if (textoBotao) updateData.textoBotao = textoBotao;
    if (classe) updateData.classe = classe;

    // Se nenhum campo válido foi enviado para atualização, retorna erro
    if (Object.keys(updateData).length === 0) {
      return response
        .status(400)
        .json({ error: "Nenhum campo válido enviado para atualização." });
    }

    // Chama a função na model para realizar a atualização no banco de dados
    const result = await planoModel.updateSubscription(id, updateData);

    // Verifica se o plano foi encontrado e atualizado
    if (result.affectedRows === 0) {
      return response.status(404).json({ message: "Plano não encontrado" });
    }

    // Retorna sucesso após atualização
    return response.status(204).send();
  } catch (error) {
    console.error("Erro ao atualizar a assinatura:", error.message);
    return response.status(500).json({ error: "Erro interno do servidor" });
  }
};


const formatDateToTimezone = (date, timezone) => {
  const zonedDate = toZonedTime(new Date(date), timezone);
  return format(zonedDate, "dd/MM/yyyy HH:mm:ss", { timeZone: timezone });
};

const getAllSignatures = async (request, response) => {
  try {
    const result = await planoModel.getAllSignatures();
    const timezone = request.query.timezone || "America/Sao_Paulo"; // Pega o timezone da query ou usa o padrão

    const formattedResult = result.map((signature) => {
      return {
        ...signature,
        data_assinatura: formatDateToTimezone(
          signature.data_assinatura,
          timezone
        ),
      };
    });

    return response.status(200).json(formattedResult);
  } catch (error) {
      console.error("Erro ao buscar assinaturas:", error.message);
      return response.status(500).json({ error: "Erro interno do servidor" });
  }
};





module.exports = {
  createSubscription,
  deleteSubscription,
  getAll,
  getPlanos,
  updateSubscription,
  getAllSignatures,
};
