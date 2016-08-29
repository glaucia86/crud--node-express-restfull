/** 
 * Arquivo: server.js
 * Descrição: Arquivo responsável por levantar o serviço do Node.Js para poder
 * executar a aplicação e a API através do Express.Js.
 * Author: Glaucia Lemos
 * Data de Criação: 26/08/2016
 */

//Base do Setup da Aplicação:

/* Chamada das Packages que iremos precisar para a nossa aplicação */
var express         = require('express');
var bodyParser      = require('body-parser');
var mongoose        = require('mongoose');
var app             = express();    //definção da nossa aplicação através do express

mongoose.connect('mongodb://admin:admin123456@jello.modulusmongo.net:27017/awEte9ne')

/** Configuração da variável 'app' para usar o 'bodyParser()'.
 * Ao fazermos isso nos permitirá retornar os dados a partir de um POST
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/** Definição da porta onde será executada a nossa aplicação */
var port = process.env.PORT || 8080;

//Rotas para a API 

/* Aqui o 'router' irá pegar as instâncias das Rotas do Express */
var router  = express.Router();

/*  Aqui iremos testar para saber se a rota está funcionando corretamente
    O acesso será através do link (GET): http://localhost:8080/api
 */
router.get('/', function(req, res) {
    res.json({ message: "WOW!!! Seja Bem-Vindo a API!" });
});

/* TODO: Mais rotas a definir aqui */

//Registrando as Rotas:

/* Todas as nossas rotas serão prefixadas com '/api' */
app.use('/api', router);

//Iniciando o Servidor (Aplicação):
app.listen(port);
console.log('Aplicação executando na porta ' + port);







