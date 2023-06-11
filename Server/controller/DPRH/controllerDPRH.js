const { database } = require('../../config/conexao')
// const knex = require('../../database/connection') // Onde connection é o arquivo de conexão dentro da pasta database
const firebird = require('../controllerFirebird')

//Função comum . Pode ser utilizada em outros. 
// Transforma a data no formato dd/mm/aaaa para mm/dd/aaaa
// Utilizada para datas para firebird

function dataSQL(date){
    date = date.split("/");
    date = date[1] + "/" + date[0] + "/" + date[2];
    return date
}

const tempoExperiencia = async (inicio, fim)=>{

    inicio = dataSQL(inicio)
    fim = dataSQL(fim)
    
    sql = `select
    reg.estabelecimento_registro "codigo_estabelecimento",
    est.nome_est "estabelecimento",
    reg.autoinc_registro "registro",
    reg.funcionario_registro "funcionario",
    p.razaosocial_pessoa "nome_funcionario",
    reg.admissao_registro "admissao",
    reg.experiencia_registro "experiencia",
    reg.prorrogacaoexperi_registro "prorrogacao"
from dp_registro reg
    left join pessoa p on(p.codigo_pessoa = reg.funcionario_registro)
    left join estabelecimento est on (est.codigo_est = reg.estabelecimento_registro)
    where reg.experiencia_registro >= '${inicio}'
    and reg.experiencia_registro <= '${fim}'
 union
    select
    reg.estabelecimento_registro "codigo_estabelecimento",
    est.nome_est "estabelecimento",
    reg.autoinc_registro "registro",
    reg.funcionario_registro "funcionario",
    p.razaosocial_pessoa "nome_funcionario",
    reg.admissao_registro "admissao",
    reg.experiencia_registro "experiencia",
    reg.prorrogacaoexperi_registro "prorrogacao"
from dp_registro reg
    left join pessoa p on(p.codigo_pessoa = reg.funcionario_registro)
    left join estabelecimento est on (est.codigo_est = reg.estabelecimento_registro)
    where reg.prorrogacaoexperi_registro >= '${inicio}'
    and reg.prorrogacaoexperi_registro <= '${fim}'
`
    try {
        dados = await firebird.consultar(sql)
        return  dados
    } catch (error) {
        console.log('Erro na consulta firebird: ', error)
        return error
    
}

}


module.exports = { tempoExperiencia}