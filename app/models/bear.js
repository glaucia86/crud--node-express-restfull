/**
 * Arquivo: bear.js
 * Author: Glaucia Lemos
 * Description: Arquivo onde trataremos o modelo do projeto. Definição dos esquemas para serem utilizadas na Base de Dados (MongoDb)
 * Data: 30/08/2016
 */

var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var BearSchema  = new Schema({
    name: String
});

module.exports = mongoose.model('Bear', BearSchema);