const { database } = require('../../config/conexao')
const knex = require('../../database/connection') // Onde connection é o arquivo de conexão dentro da pasta database
const firebird = require('../controllerFirebird')



const SaldoItem = async(cod_analitico, status) =>{

    let condicao = {cod_analitico: cod_analitico}
    
    try {
       
        let registro
        if(cod_analitico != 'V'){ 
            if(status != 0){
                condicao.status = status
            }
            console.log('codicao diferente de V: ', condicao)
        registro =  await knex
        .select('cod_item', 'desc_item', 'cod_variacao', 'desc_variacao', 'cod_acabamento', 'desc_acabamento', 'cod_analitico',  'status','status.descricao')
        .sum({saldo: 'quantidade'})
        .from('item_recolhido_ld')
        .leftJoin('status', 'item_recolhido_ld.status', 'status.id')
        // .where('cod_analitico', cod_analitico)
        .where(condicao)
        .orderBy('cod_item', 'asc')
           
          
        }else{
            if(status != 0){console.log('codicao igual a sem status V: ', condicao)
                registro =  await knex
                .sum({saldo: 'quantidade'})
                // .select('cod_item', 'desc_item', 'cod_variacao', 'desc_variacao', 'cod_acabamento', 'desc_acabamento', 'cod_analitico',  'status','status.descricao')
                .from('item_recolhido_ld')
                .leftJoin('status', 'item_recolhido_ld.status', 'status.id')
                .where(condicao)
                .orderBy('cod_item', 'asc')
            }else{console.log('codicao igual a V: status diferente de  4')
                registro =  await knex
                // .select('cod_item', 'desc_item', 'cod_variacao', 'desc_variacao', 'cod_acabamento', 'desc_acabamento', 'cod_analitico',  'status','status.descricao')
                .sum({saldo: 'quantidade'})
                .from('item_recolhido_ld')
                .leftJoin('status', 'item_recolhido_ld.status', 'status.id')
                .whereNot('status', 4)
                .orderBy('cod_item', 'asc')
            }
            
               
        }
                            
         return registro
 } catch (error) {
     return error
 }
} 

const BuscarDados = async(codProduto) =>{


    try {
       
        let registro
        if(codProduto != 'V'){ 
        registro =  await knex
        .select('cod_analitico','desc_item', 'desc_variacao', 'desc_acabamento' )
        .distinct('cod_analitico')
        .from('item_recolhido_ld')
        .where('cod_item', codProduto)
                 
        }else{
            registro =  await knex
            .select('cod_analitico','desc_item', 'desc_variacao', 'desc_acabamento' )
            .distinct('cod_analitico')
            .from('item_recolhido_ld')
            .where('cod_item', '>', 0 )
            .orderBy('cod_item', 'asc')
               
        }
                            
         return registro
 } catch (error) {
     return error
 }
} 





// Pesquisa WBI por  sua id. 
const findById = async(id) =>{
    try {
  
           const registro = await knex('item_recolhido_ld')
                            .where('id', id)
                            .select('id', 'descricao' )
                            .first()     
            return registro
    } catch (error) {
        return error
    }
      
   
}
// Pesquisa WBI por  sua id. 
const verificaItemRecolhimento = async(id) =>{
    try {
  
           const registro = await knex('item_recolhido_ld')
                            .where('autoinc_pedido', id)
                            .select('autoinc_pedido')
                            .first()     
            return registro
    } catch (error) {
        return error
    }
      
   
}

const buscaAutoIncRecolhimento = async(id) =>{
    try {
  
           const registro = await knex('item_recolhido_ld')
                            .where('recolhimento', id)
                            .select('autoinc_pedido')
                               
            return registro
    } catch (error) {
        return error
    }
      
   
}

// Irá verificar se o WBI existe através da id do WBI ou do nome do usuário. 
// Caso digite um valor que seja inteiro a pesquisa será por id utilizando a função findByWBI senão a pesquisa será por nome de ususario . 
const findByStatus = async(inf) => {
    console.log('inf: ',inf)
    if(inf / 1 || inf == 0){

        let data = []
        data.push(await findById(inf))
        console.log('data:',data)
        return data
         
    }else{
        try {
            
            inf = inf.trim()
            return await knex('item_recolhido_ld')
            .where('descricao', 'like', `%${inf}%`)
            .select('id', 'descricao')
        
        } catch (error) {
            return error
        }
    }
}


// Irá verificar se o usuario existe através da id do usuario ou do nome do usuário. 
// Caso digite um valor que seja inteiro a pesquisa será por id utilizando a função findByUsuario senão a pesquisa será por nome de ususario . 
const verificarStatus = async(inf) => {
    console.log('Verificando Status: ', inf)
    try {
         const verificacao = await knex('item_recolhido_ld')
        .where('autoinc_pedido', inf)
        .first()  
        return verificacao
    } catch (error) {
        return error
    }
}


const create = async(novosdados) => {  
    novosdados.status = 1 

   const autoincPedido = await verificarStatus(novosdados.autoinc_pedido)
    if (!autoincPedido) {
        try {
           
            const status = await knex('item_recolhido_ld').insert({
            ...novosdados
        }) 
        // return ids ? true : false
        return status
    } catch (error) {
        console.log('Error: ', error)
        return error
    }
   } else {
       return 'Duplicado'
   }
  
}

const update = async(id, dados) => {   
    try {
        return await knex('item_recolhido_ld')
                .where({ id })
                .update({...dados})
    } catch (error) {
        return error
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


const deletar = async(autoinc_pedido) =>{

        try {
        return await knex('item_recolhido_ld')
                        .where({ autoinc_pedido })
                        .del()
        } catch (error) {
            return error
        }

}

module.exports = {SaldoItem,BuscarDados, findById, create, deletar, update, updateStatus, findByStatus, verificarStatus,  verificaItemRecolhimento, buscaAutoIncRecolhimento}