const { database } = require('../../config/conexao')
const knex = require('../../database/connection') // Onde connection é o arquivo de conexão dentro da pasta database


// Pesquisa WBI por  sua id. 
const findAllLocal = async() =>{
    try {
  
           const registro = await knex('local_avarias_laudo_ld')
                            .select('id', 'descricao_local', 'status' )
            console.log('registro dentro do findAllLocal: ', registro)   
            return registro
    } catch (error) {
        return error
    }
      
   
}
const createLocal = async(novosdados) => {  
    novosdados.status = 1 

   const descricao_local = await verificarLocal(novosdados.descricao_local)
    if (!descricao_local) {
        try {
           
            const local = await knex('local_avarias_laudo_ld').insert({
            ...novosdados
        }) 
        // return ids ? true : false
        return local
    } catch (error) {
        console.log('Error: ', error)
        return error
    }
   } else {
       return 'Duplicado'
   }
  
}
const verificarLocal = async(inf) => {
    console.log('Verificando Local: ', inf)
    try {
         const verificacao = await knex('local_avarias_laudo_ld')
        .where('descricao_local', inf)
        .first()  
        return verificacao
    } catch (error) {
        return error
    }
}

const updateLocal = async(id, dados) => {   
    const verificacao = await verificarLocal(dados.descricao_local)
    if (!verificacao) {
        
            try {
                return await knex('local_avarias_laudo_ld')
                        .where({ id })
                        .update({...dados})
            } catch (error) {
                return error
            }
    }else{
        return false
    }
}
const updateStatus = async(autoinc_pedido, status) => {   
    try {
        return await knex('item_recolhido_ld')
                .where({ autoinc_pedido })
                .update({status})
    } catch (error) {
        return error
    }
}


const deletarLocal = async(autoinc_pedido) =>{

        try {
        return await knex('item_recolhido_ld')
                        .where({ autoinc_pedido })
                        .del()
        } catch (error) {
            return error
        }

}

module.exports = {findAllLocal, createLocal, updateLocal, deletarLocal}