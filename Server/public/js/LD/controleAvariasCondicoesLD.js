async function buscarAvariasCondicoesLD(busca){
    let dados
    
    console.log('busca antes: ', busca)
    
   if(busca/1 || busca==0 && !busca.match(/^(\s)+$/) && busca !=''){
       console.log('Busca por código')
       busca = busca
   }else{
   
        if(busca == '' || busca == undefined ||busca.match(/^(\s)+$/)){
            busca = 'Todos'
        }
    }
    console.log('busca?depois> ', busca)
    
        dados = await axios.get(`http://${host}/LD/AvariasCondicoes/api/${busca}`)
        .then(response => {
           
            return response.data
        })
        .catch(error => {
            console.log(error)
            return error            
        })
    
        return dados
}
async function buscarLocalLD(busca){
    let dados
    
    console.log('busca antes: ', busca)
    
   if(busca/1 || busca==0 && !busca.match(/^(\s)+$/) && busca !=''){
       console.log('Busca por código')
       busca = busca
   }else{
   
        if(busca == '' || busca == undefined ||busca.match(/^(\s)+$/)){
            busca = 'Todos'
        }
    }
    console.log('busca?depois> ', busca)
    
        dados = await axios.get(`http://${host}/LD/LocalAvaria/Todos`)
        .then(response => {
           
            return response.data
        })
        .catch(error => {
            console.log(error)
            return error            
        })
        console.log('dados em busca Local: ', dados)
        return dados
}

async function preencherTabelaAvaria(busca){console.log('Busca: ', busca)
    const tabelaAvaria = document.getElementById('tabelaAvaria')
    const corpoTabela = document.getElementById('corpoTabela')
    let dados = await buscarAvariasCondicoesLD(busca,'avaria')
    console.log('dados: ',dados);
    sairPainelAvaria()

   await dados.forEach(avaria => {
        const tr = document.createElement(`tr`)
        tr.setAttribute('id',avaria.id)
        tr.innerHTML = `<td>${avaria.id}</td>
                        <td>${avaria.descricao}</td>
                         <td >
                            <a onclick="setarAvariaAlterar(${avaria.id}, '${avaria.descricao}')" data-toggle="modal" data-target="#modalAlterarAvaria">
                                <i class="material-icons prefix">edit</i> 
                            </a>
                        </td>
                        <td><a onclick="deletarAvaria(${avaria.id})"><i class="material-icons prefix">delete</i></a></td>`
                    
        corpoTabela.appendChild(tr)
        
    })
    tabelaAvaria.style.display = 'block'
}


function setarAlteracaoLocal(){
    let descricaoAlteracaoLocal = document.getElementById('descricaoAlteracaoLocal')
    descricaoAlteracaoLocal.value = ''
    let o = document.getElementById('selectLocal')
    descricaoAlteracaoLocal.value =  o.options[o.selectedIndex].innerHTML 
}

function limpartabela(){
    let tbody = document.getElementById('corpoTabela')
    while (tbody.childElementCount >0) {
        tbody.removeChild(tbody.children[0])
    }
   
}

document.getElementById("pesquisaAvariaCondicoes").addEventListener("input", ()=>{
    limpartabela()
    preencherTabelaAvaria(document.getElementById("pesquisaAvariaCondicoes").value)
});



let gravar = document.getElementById('gravar')

gravar.addEventListener('click',async(event)=>{
    event.preventDefault()
    let descricao   = document.getElementById('descricao').value
   
    let divMsg  = document.getElementById('divMsg')

    let retorno


    descricao = descricao.trim()


    if(descricao != '' && descricao != undefined ){

                //document.getElementById('formstatus').submit()
                retorno = await axios.post(`http://${host}/LD/Status/Incluir`,{descricao})
                console.log('retorno: ', retorno.data)
                if(retorno.data!='Duplicado'){
                    M.toast({html: `<span class='blue red-4' >Registro ${retorno.data[0]} incluído com sucesso</span>`, classes: 'rounded'});
                    limpartabela()
                    preencherTabelaStatus(retorno.data[0])
                   
                    $('#modalIncluir').modal('hide')
                }else{
                    divMsg.innerText=`Base de dados já possui o status: ${descricao}.`
                    M.toast({html: `<span class='blue red-dark-4' >Base de dados já possui o status: ${descricao}.</span>`, classes: 'rounded'});
                }
        }else{
            divMsg.innerText='Descrição deve ser informado.'
        }
    
})



//Alimenta o Select com dados da tabela local_avarias_laudo_ld com valor do id e descrição
async function preencherSelectLocal(){
    let dados = await buscarLocalLD()
    document.getElementById('descricao').value = ''
    
    let select = document.getElementById('selectLocal')

    while (select.childElementCount >1) {
        select.removeChild(select.children[1])
    }
   // const option = document.createElement(`selectLocal`)

    for (let index = 0; index < dados.length; index++) {
        const option = document.createElement(`option`)
        
        const op = dados[index];
        option.setAttribute('value',op.id)
        option.innerHTML = `${op.descricao_local}` 
        select.appendChild(option)
    }
        

}

function limparFormulario(){
    let divMsg  = document.getElementById('divMsg')
    divMsg.innerText=""
    document.getElementById('formLocalAvaria').reset() 
}

async function deletarLocal(){
    let id = document.getElementById('selectLocal').value;
    if(id!=0){
        let retorno = await axios.delete(`http://${host}/LD/LocalAvaria/Delete/${id}`)
            .then(response => response.data)
            .catch((error) => {
            throw error.response.data
            })
            console.log('retorno deletar: ', retorno)
            if(retorno==1){
                M.toast({html: `<span class='blue red-4' >Registro ${id} deletado com sucesso</span>`, classes: 'rounded'});
                limpartabela()
                preencherSelectLocal()
            }else{
                M.toast({html: `<span class='blue red-4' >${retorno}</span>`, classes: 'rounded'});
            }
    }else{
        M.toast({html: `<span class='blue red-4' >Selecione Local Válido</span>`, classes: 'rounded'});
    }
    
    
}


async function AlteracaoLocal(){
    
    let descricao = document.getElementById('descricaoAlteracaoLocal').value
    let idlocal = document.getElementById('selectLocal').value
    
    let dados ={
        id: idlocal,
        descricao_local: descricao
    }
    console.table(dados)
    if(idlocal > 0){
        let retorno = await axios.post(`http://${host}/LD/Local/Alterar`, dados)
        .then(response => response.data)
        .catch((error) => {
        throw error.response.data
        })
        
        if(retorno==1){
            $('#modalAlterar').modal('hide')
            M.toast({html: `<span class='blue red-4' >Registro ${idlocal} Alterado com sucesso</span>`, classes: 'rounded'});
            limpartabela()
            preencherSelectLocal()
        
        }else{
            M.toast({html: `<span class='red dark-4 text-blue text-blue-dark-4' >Erro ao Alterar o Registro ${idlocal}. Verifique </span>`, classes: 'rounded'});
        
        }
    }else{
        M.toast({html: `<span class='red dark-4 text-blue text-blue-dark-4' >Selecione um Local válido para ser alterado </span>`, classes: 'rounded'});
    
    }
}


function sairPainelStatus(){
    let conteudoStatus = document.getElementById('conteudoAvaria')
    let tabelaStatus =document.getElementById('tabelaAvaria2') 

    conteudoStatus.style.display = 'none'
    tabelaStatus.style.display = 'none'
}


