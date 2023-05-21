const Knex =  require('knex')

//Criação da tabela. 
exports.up = async function (knex) {
   return await knex.schema
            .createTable('avarias_condicoes_laudo_ld', table => {
                table.increments('id').primary()
                table.string('tipo').notNullable();
                table.string('descricao').notNullable(); 
                table.integer('status').notNullable();               
            })
            
}

//deletar a tabela. Desfaz o metodo UP.
exports.down =  async function (knex){
    return await knex.schema
            .dropTable('avarias_condicoes_laudo_ld')
}