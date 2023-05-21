const Knex =  require('knex')

//Criação da tabela. 
exports.up = async function (knex) {
   return await knex.schema
            .createTable('laudo_ld', table => {
                table.increments('id').primary()
                table.string('tipo').notNullable();
                table.string('data_inicio').notNullable();
                table.string('hora_inicio').notNullable();
                table.string('data_fim').notNullable();
                table.string('hora_fim').notNullable();
                table.string('emissao').notNullable();
                table.integer('controle').notNullable(); 
                table.integer('volumes').notNullable(); 
                table.integer('documento').notNullable()
                .references('id')
				.inTable('item_recolhido_ld')
                
            })
            
}

//deletar a tabela. Desfaz o metodo UP.
exports.down =  async function (knex){
    return await knex.schema
            .dropTable('laudo_ld')
}