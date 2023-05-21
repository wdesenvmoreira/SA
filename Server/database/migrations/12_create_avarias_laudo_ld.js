const Knex =  require('knex')

//Criação da tabela. 
exports.up = async function (knex) {
   return await knex.schema
            .createTable('avarias_laudo_ld', table => {
                table.increments('id').primary()
                table.integer('local').notNullable()
                .references('id')
				.inTable('local_avarias_laudo_ld');
                table.integer('avaria').notNullable()
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
            .dropTable('avarias_laudo_ld')
}