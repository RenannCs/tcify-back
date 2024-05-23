/**
 * Criar função na classe TCC que busque por ID de usuário.
 * A função verifica se há TCC atribuído à aquele usuário e,
 * caso sim, retorna o TCC, se não, retorna false.
 * 
 * Fazer aqui o controle para retornar apenas o TCC do 
 * usuário.
 */

const ModelTcc = require('../../Model/TCC');

module.exports = async (request , response)=>{
    const id = request.body.id;

    const tcc = new ModelTcc();

    tcc.readByUser(id)
        .then((resolve)=>{
            return response.send(resolve)
        })
}