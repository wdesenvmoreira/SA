const Knex =  require('knex')

//Criação da tabela. 
exports.up = async function (knex) {
   return await knex.schema
            .createTable('condicoes_laudo_ld', table => {
                table.increments('id').primary()
                table.integer('condicao').notNullable()
                .references('id')
				.inTable('avarias_condicoes_laudo_ld');
                table.integer('laudo').notNullable()
                .references('id')
				.inTable('laudo_ld');
                table.integer('status').notNullable() 
                
            })
            
}

//deletar a tabela. Desfaz o metodo UP.
exports.down =  async function (knex){
    return await knex.schema
            .dropTable('condicoes_laudo_ld')
}