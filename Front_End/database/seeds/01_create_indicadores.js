const Knex =  require('knex')

//Inserindo itens na tabela 
exports.seed = async function (knex) {
   return await knex('indicadores').insert([
	   {nome: 'Indicadores Usuario', titulo:'titulo Indicador', dados: 'select * from usuario', width:'400', height:'300', chartType:'LineChart', options:'{{intervals:{style:"sticks"}, legend:"none"}}', modulo:'Faturamento'},
      {nome: 'Faturamento Nos ultimos 30 Dias', titulo:'Faturamento Ultimos 30', dados:`select
      docfat.codigo_docfat as PEDIDOS ,
      docfat.cliente_docfat as CLIENTE,
      docfat.tipo_docfat as TIPO_PEDIDO,
      docfat.dtsaida_docfat as SAIDA,
      docfat.vlrbruto_docfat as VLR_BRUTO,
      docfat.vlrliquido_docfat as VLR_LIQUIDO,
      docfat.empresa_docfat as EMPRESA
      from documento_fatura docfat
      where docfat.dtsaida_docfat between '04/15/2022' and  '05/16/2022'
      order by docfat.empresa_docfat, docfat.cliente_docfat` , width:'400', height:'300', chartType:'LineChart', options:'{{intervals:{style:"sticks"}, legend:"none"}}', modulo:'Faturamento'},
      {nome: 'Contas a receber', titulo:'titulo Indicador', dados: 'select * from usuario', width:'400', height:'300', chartType:'LineChart', options:'{{intervals:{style:"sticks"}, legend:"none"}}', modulo:'Financeiro'},
      {nome: 'lotes', titulo:'titulo Indicador', dados: 'select * from usuario', width:'400', height:'300', chartType:'LineChart', options:'{{intervals:{style:"sticks"}, legend:"none"}}', modulo:'Estoque'},
      {nome: 'Finaceiro', titulo:'titulo Indicador', dados: 'select * from usuario', width:'400', height:'300', chartType:'LineChart', options:'{{intervals:{style:"sticks"}, legend:"none"}}', modulo:'Faturamento'},

      
   ])

           
            
}