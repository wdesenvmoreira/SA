const { database } = require('../../config/conexao')
const knex = require('../../database/connection') // Onde connection é o arquivo de conexão dentro da pasta database
const firebird = require('../controllerFirebird')

const consultaBanco = async (codigo,carga, grupoP)=>{
    let dados = []
    console.log('carga em controller: ', carga)
    let sql = (`select
                    pe.pessoa_pessoa_end as pessoa,
                    pe.cep_pessoa_end as cep,
                    case pe.tipoendereco_pessoa_end
                        when 1 then 'Padrao'
                        when 2 then 'Entrega'
                        when 3 then 'Cobranca'
                    else 'Outros'
                    end as Tipo
                from pessoa_endereco pe
                    left join pessoa p on (p.codigo_pessoa = pe.pessoa_pessoa_end)
                where pe.pessoa_pessoa_end in (${codigo})  and p.${grupoP} = 'S'`)

    if(carga == 'true'){
        sql = (`select
                    pe.pessoa_pessoa_end as pessoa,
                    pe.cep_pessoa_end as cep,
                    case pe.tipoendereco_pessoa_end
                        when 1 then 'Padrao'
                        when 2 then 'Entrega'
                        when 3 then 'Cobranca'
                    else 'Outros'
                    end as Tipo
                from pessoa_endereco pe
                    left join pessoa p on (p.codigo_pessoa = pe.pessoa_pessoa_end)
                where pe.pessoa_pessoa_end in (select distinct docfat.cliente_docfat from carga_documentos cardoc
                    left join documento_fatura docfat on (docfat.codigo_docfat = cardoc.documento_cardoc)
                 where cardoc.carga_cardoc = ${codigo})`)
    }

    if(codigo == 'todos'){
        sql = (`select
                    pe.pessoa_pessoa_end as pessoa,
                    pe.cep_pessoa_end as cep,
                    case pe.tipoendereco_pessoa_end
                        when 1 then 'Padrao'
                        when 2 then 'Entrega'
                        when 3 then 'Cobranca'
                    else 'Outros'
                    end as Tipo
                from pessoa_endereco pe
                    left join pessoa p on (p.codigo_pessoa = pe.pessoa_pessoa_end)
                where p.${grupoP} = 'S'`)
                }
    console.log('SQL controllerProcessos: ', sql)
   
    try {
        dados = await firebird.consultar(sql)
        return dados
    } catch (error) {
        console.log('Erro na consulta firebird: ', error)
        return error
    }
    

}

module.exports = {consultaBanco}