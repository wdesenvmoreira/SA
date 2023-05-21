const Knex =  require('knex')

//Criação da tabela. 
exports.up = async function (knex) {
   return await knex.schema
            .createTable('local_avarias_laudo_ld', table => {
                table.increments('id').primary()
                table.string('descricao_local').notNullable();
                table.integer('status').notNullable() 
            })
            
}

//deletar a tabela. Desfaz o metodo UP.
exports.down =  async function (knex){
    return await knex.schema
            .dropTable('local_avarias_laudo_ld')
}