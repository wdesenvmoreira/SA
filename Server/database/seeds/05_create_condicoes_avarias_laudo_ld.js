const Knex =  require('knex')

//Inserindo itens na tabela 
exports.seed = async function (knex) {
   return await knex('avarias_condicoes_laudo_ld').insert([
	    {tipo: 'Condição', descricao:'Sem Embalagem', status:0 },
       {tipo: 'Condição', descricao:'Diferente Tonalidade', status:0 },
       {tipo: 'Condição', descricao:'Desgastado, Sujo', status:0 },
       {tipo: 'Condição', descricao:'Faltando Braço', status:0 },
       {tipo: 'Condição', descricao:'Faltando Rinheira', status:0 },
       {tipo: 'Condição', descricao:'Faltando Catraca', status:0 },
       {tipo: 'Condição', descricao:'Módulos Iguais', status:0 },
       {tipo: 'Condição', descricao:'Faltando Kit Ferragem', status:0 },
       {tipo: 'Avaria', descricao:'Falha Costuras', status:0 },
       {tipo: 'Avaria', descricao:'Tecido Rasgado', status:0 },
       {tipo: 'Avaria', descricao:'Ralado de Quina', status:0 },
       {tipo: 'Avaria', descricao:'Tecido Manchado', status:0 },
       {tipo: 'Avaria', descricao:'Mancha de Cola', status:0 },
       {tipo: 'Avaria', descricao:'Tecido Frouxo', status:0 },
       {tipo: 'Avaria', descricao:'Madeira Quebrada', status:0 },
       {tipo: 'Avaria', descricao:'Aspecto Murcho', status:0 },
       {tipo: 'Avaria', descricao:'Vazando Fibras', status:0 },
       {tipo: 'Avaria', descricao:'Mofado', status:0 },

   ])
           
            
}