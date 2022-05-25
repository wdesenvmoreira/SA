
const consultaBD = require('../controllerFirebird')

const consultar = (tipo, dados)=>{
    let data = consultaBD.consultar(`
    select
    docfat.codigo_docfat as PEDIDOS ,
    docfat.cliente_docfat as CLIENTE,
    docfat.tipo_docfat as TIPO_PEDIDO,
    docfat.dtsaida_docfat as SAIDA,
    docfat.vlrbruto_docfat as VLR_BRUTO,
    docfat.vlrliquido_docfat as VLR_LIQUIDO,
    docfat.empresa_docfat as EMPRESA
    from documento_fatura docfat
    where docfat.dtsaida_docfat between '04/15/2022' and  '05/16/2022'
    order by docfat.empresa_docfat, docfat.cliente_docfat`)
    return data
}

//module.exports = consultar
module.exports = { consultar }

