
const consultaBD = require('../controllerFirebird')

const consultar = (tipo, dados)=>{
    let data = consultaBD.consultar(`select docfat.codigo_docfat, docfat.cliente_docfat, docfat.vlrbruto_docfat,
    docfat.vlrliquido_docfat, docfat.empresa_docfat from documento_fatura docfat
    where docfat.dtsaida_docfat > '01/01/2022' and docfat.dtsaida_docfat <  '04/30/2022'
    order by docfat.empresa_docfat, docfat.cliente_docfat`)
    return data
}

//module.exports = consultar
module.exports = { consultar }

