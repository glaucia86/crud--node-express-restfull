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
var Bear            = require('./app/models/bear'); //adicionando a classe do modelo do arquivo - 'bear.js'
var app             = express();    //definção da nossa aplicação através do express

//mongoose.connect('mongodb://root:root@waffle.modulusmongo.net:27017/urevEw6a'); //testar em casa se vai funcionar.....
mongoose.connect('mongodb://localhost/node-api');

/** Configuração da variável 'app' para usar o 'bodyParser()'.
 * Ao fazermos isso nos permitirá retornar os dados a partir de um POST
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/** Definição da porta onde será executada a nossa aplicação */
var port = process.env.PORT || 8080;

//Rotas para a nossa API: 
//==============================================================

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

// Rotas que irão terminar em '/bears' - (servem tanto para: GET All & POST)
router.route('/bears')

    /* 1) Método: Criar Bear (acessar em: POST http://localhost:8080/api/bears */
    .post(function(req, res) {
        var bear = new Bear();
        bear.name = req.body.name; //aqui seta o nome dos bears (que virá do request)

        //Função para Salvar o bear e verificar se há algum erro:
        bear.save(function(error) {
            if(error)
                res.send(error);
            
            res.json({ message: 'Bear criado!' });
        });
    })

    /* 2) Método: Selecionar Todos (acessar em: GET http://locahost:8080/api/bears) */
    .get(function(req, res) {

        //Função para Selecionar Todos os 'bears' e verificar se há algum erro:
        Bear.find(function(err, bears) {
			if (err)
				res.send(err);

			res.json(bears);
		});
	});

// Rotas que irão terminar em '/bears/:bear_id' - (servem tanto para GET by Id, PUT, & DELETE)
router.route('/bears/:bear_id')

    /* 3) Método: Selecionar Por Id (acessar em: GET http://localhost:8080/api/bears/:bear_id) */
        .get(function(req, res) {
            Bear.findById(req.params.bear_id, function(error, bear) {
                if(error)
                    res.send(error);
                
                res.json(bear);
            });
        });

/* Todas as nossas rotas serão prefixadas com '/api' */
app.use('/api', router);

//Iniciando o Servidor (Aplicação):
app.listen(port);
console.log('Aplicação executando na porta ' + port);







