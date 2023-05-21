const Knex =  require('knex')

//Inserindo itens na tabela 
exports.seed = async function (knex) {
   return await knex('local_avarias_laudo_ld').insert([
	    {id: 1, descricao:'Assento',status: 0 },
       {id: 2, descricao:'Braço',status: 0 },
       {id: 3, descricao:'Caixa',status: 0 },
       {id: 3, descricao:'Catraca',status:0 },
   ])
           
            
}