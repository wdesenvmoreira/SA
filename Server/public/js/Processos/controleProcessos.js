async function consultaPessoaCEP(){
    let dados
    let busca = document.getElementById('pessoaCEP').value 
    let grupoP = document.getElementById('grupoP').value
    let carga = document.getElementById('cargaCEP').checked
    console.log('busca antes: ', busca, 'grupoP antes: ', grupoP, 'carga: ', carga)
    
   if(busca/1 || busca==0 && !busca.match(/^(\s)+$/) && busca !=''){
       console.log('é número')
       busca = busca
   }else{
   
        if(busca == '' || busca == undefined ||busca.match(/^(\s)+$/)){
            busca = 'todos'
        }
    }
    console.log('texto busca:  ', `http://${host}/Processos/PessoaCEP/${busca}&${grupoP}&${carga}`)
    
        dados = await axios.get(`http://${host}/Processos/PessoaCEP/${busca}&${grupoP}&${carga}`)
        .then(response => {
           
            return response.data
        })
        .catch(error => {
            console.log('Erro, busca na base de dados: ',error)
            return false            
        })
        console.log('dados:', dados)
        //return dados
        preencherTabelaPessoaCEP(dados)
}

async function preencherTabelaPessoaCEP(dados){
    const tabelaPessoaCEP = document.getElementById('tabelaPessoaCEP')
    const corpoTabela = document.getElementById('corpoTabela')
   // let dados = await buscarUsuarios(busca)
   // console.log('dados na tabela: ',dados);
    //sairPainelUW()

   await dados.forEach(async (cep) => {
       
       
        const cepvalido = await verificandoCEP(cep.CEP)

        console.log('cepvalido[0]: ', cepvalido)

        let statusCep = 'Inválido'

        if(cepvalido[0].cep){
            statusCep = 'Válido'
        }else{
            statusCep = 'Inválido'
        } 
        
        async function verificandoCEP(cep){
            const data = await validarCEP(cep)
            return data
        } 

        if(cepvalido[0].cep){
        const tr = document.createElement(`tr`)
        tr.setAttribute('pessoa',cep.PESSOA)
        tr.innerHTML = `<td>${cep.PESSOA}</td>
                        <td>${cep.CEP}</td>
                        <td>${cep.TIPO}</td>
                        <td>${statusCep}</td>
                       `
                    
        corpoTabela.appendChild(tr)
        }
    })
    tabelaPessoaCEP.style.display = 'block'
}




async function validarCEP(cep) {
    const options = {
        method: "GET",
        mode: "cors",
        headers: {
            'content-type': 'application/json;charset=utf-8',
        }
    }
    // try {
     
    //    // const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    //     const targetUrl = `https://viacep.com.br/ws/${cep}/json/`;
    //     //const response = await fetch(proxyUrl + targetUrl);
    //     const response = await fetch(targetUrl, options);
    //     const data = await response.json();
    //     console.log('dadosCep: ', data);
    //     return [data];
    // } catch (error) {
    //     console.log('Erro verificação do cep: ',error);
    //     return true;
    // }

    dados = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response => {
       
        return response.data
    })
    .catch(error => {
        console.log('Erro, busca na base de dados: ',error)
        return false            
    })
    console.log('dados:', dados)
}

let carga = document.getElementById('cargaCEP')

carga.addEventListener('change',(event)=>{
    //event.preventDefault()
    if(event.target.checked){
        document.getElementById('lbPessoa').style.display = 'none'
        document.getElementById('grupoP').style.display = 'none'
    }else{
        document.getElementById('lbPessoa').style.display = 'block'
        document.getElementById('grupoP').style.display = 'block'
    }
})
