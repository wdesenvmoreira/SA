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
    limpartabela('corpoTabela')
   await dados.forEach(async (cep) => {
       
       
        const cepvalido = await verificandoCEP(cep.CEP)

        console.log('cepvalido[0]: ', cepvalido)

        let statusCep = 'Inválido'

        if(cepvalido.cep){
            statusCep = 'Válido'
        }else{
            statusCep = 'Inválido'
        } 
        
        async function verificandoCEP(cep){
            const data = await validarCEP(cep)
            return data
        } 

        if(!cepvalido.cep){
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
 

    dados = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response => {
       
        return response.data
    })
    .catch(error => {
        console.log('Erro, busca na base de dados: ',error)
        return false            
    })
    console.log('dados:', dados)
    return dados
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

function limpartabela(nomeTabela){
    let tbody = document.getElementById(nomeTabela)
    while (tbody.childElementCount >0) {
        tbody.removeChild(tbody.children[0])
    }
   
}


// ChatGPt
// Define a função que ordena a tabela
function ordenarTabelaPorColuna() {
    // Seleciona o cabeçalho da tabela
    const tableHeader = document.querySelector('#cabecalhotb');
  
    // Adiciona um evento de clique para cada coluna
    tableHeader.querySelectorAll('th').forEach((headerCell) => {
      headerCell.addEventListener('click', () => {
        const tableRows = Array.from(document.querySelectorAll('#corpoTabela tr'));
  
        // Obtém o índice da coluna clicada
        const headerIndex = Array.from(headerCell.parentNode.children).indexOf(headerCell);
  
        // Classifica os dados na tabela com base na coluna clicada
        const isAscending = headerCell.classList.contains('ascending');
        tableRows.sort((a, b) => {
          const aColText = a.querySelector(`td:nth-child(${headerIndex + 1})`).textContent.trim();
          const bColText = b.querySelector(`td:nth-child(${headerIndex + 1})`).textContent.trim();
          return aColText.localeCompare(bColText, undefined, { numeric: true });
        });
        if (!isAscending) {
          tableRows.reverse();
          headerCell.classList.add('ascending');
        } else {
          headerCell.classList.remove('ascending');
        }
  
        // Atualiza a tabela com os dados classificados
        tableRows.forEach((row) => {
          document.querySelector('#corpoTabela').appendChild(row);
        });
      });
    });
  }
