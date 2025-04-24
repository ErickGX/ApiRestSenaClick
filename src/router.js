const express = require("express");
const router = express.Router();

const clienteController = require('./controller/ClienteController');
const planoController = require('./controller/PlanoController');
const adminController = require('./controller/AdminController');

router.get("/hello"); // rota para teste

router.get("/" , (request, response)=>{
    response.send("Rota funcionando");
});


router.get("/cliente/login", clienteController.loginUser); //logar um cliente 
router.post("/admin/login", adminController.loginAdm);//login adm



//cadastro do admin vai ser apenas via DBA / Banco de dados
//Unica utilizavel pelo usuario
router.post("/cliente",clienteController.createUser); //criar um cliente





//conjunto de rotas cliente de manipulação exclusica do administrador
router.get("/cliente", clienteController.getAll);//Listar todos clientes
router.put("/cliente/:id", clienteController.updateUser); //atualizar um cliente pelo id e json
router.delete("/cliente/:id", clienteController.deleteUser); //deletar um cliente por id


//conjunto de rotas Planos de manipulação exclusica do administrador
router.post("/plano", planoController.createSubscription); //criar um plano
router.get("/plano", planoController.getAll); //listar todos os plano
router.get("/planos", planoController.getPlanos); //listar todos os planos para o crud personalizado
router.put("/plano/:id", planoController.updateSubscription); //atualizar um plano pelo id e json
router.delete("/plano/:id", planoController.deleteSubscription); //deletar um plano por id
//retorna todas as assinaturas feitas pelos clientes
router.get("/assinaturas", planoController.getAllSignatures);


module.exports = router;
//muito parecido com o conceito de public class ou metodos publicos no java

//Quando você usa module.exports, você define o que será exportado (ou seja, compartilhado) por aquele módulo.
//Qualquer outro arquivo que importar esse módulo (require('./nomeDoArquivo')) receberá o que foi atribuído ao module.exports.


