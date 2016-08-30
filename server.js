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
var Bear            = require('./app/models/bear.js'); //adicionando a classe do modelo do arquivo - 'bear.js'
var app             = express();    //definção da nossa aplicação através do express

mongoose.connect('mongodb://admin:admin123456@jello.modulusmongo.net:27017/awEte9ne')

/** Configuração da variável 'app' para usar o 'bodyParser()'.
 * Ao fazermos isso nos permitirá retornar os dados a partir de um POST
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/** Definição da porta onde será executada a nossa aplicação */
var port = process.env.PORT || 8080;

//Rotas para a nossa API: 

/* Aqui o 'router' irá pegar as instâncias das Rotas do Express */
var router  = express.Router();

/* Middleware para usar em todos os requests enviados para a nossa API- Mensagem Padrão */
router.use(function(req, res, next) {
    console.log('Algo está acontecendo aqui......');
    next(); //aqui é para sinalizar de que prosseguiremos para a próxima rota. E que não irá parar por aqui!!!
});

/* Rota de Teste para sabermos se tudo está realmente funcionando (acessar através: GET: http://localhost:8080/api) */
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







