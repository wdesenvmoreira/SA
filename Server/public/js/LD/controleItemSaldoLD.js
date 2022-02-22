async function buscarIDitemSaldoLD(busca){
    let dados
    
   if(busca/1 || busca==0 && !busca.match(/^(\s)+$/) && busca !=''){

       busca = busca
   }else{
   
        if(busca == '' || busca == undefined ||busca.match(/^(\s)+$/)){
            busca = 'V'
        }
    }


        dados = await axios.get(`http://localhost:5412/LD/Saldo/api/Itens/${busca}`)
        .then(response => {
           
            return response.data
        })
        .catch(error => {
            console.log(error)
            return error            
        })
    
        return dados
}

async function buscarSaldoItem(cod_analitico, status){
    if(cod_analitico/1 || cod_analitico==0 && !cod_analitico.match(/^(\s)+$/) && cod_analitico !=''){

        cod_analitico = cod_analitico
    }else{
    
         if(cod_analitico == '' || cod_analitico == undefined ||cod_analitico.match(/^(\s)+$/)){
            cod_analitico = 'V'
         }
     }
 
    dados = await axios.get(`http://localhost:5412/LD/Saldo/api/ItemSaldo/${cod_analitico}&${status}`)
    .then(response => {

        return response.data
    })
    .catch(error => {
        console.log(error)
        return error            
    })

    return dados

}



async function preencherTabelaItensRecolhidos(busca){
    const tabelaItem = document.getElementById('tabelaItem')
    const corpoTabela = document.getElementById('corpoTabela')
    let itensSaldo = await buscarIDitemSaldoLD(busca)//Carrega com todos os itens da busca

    document.getElementById('captionTabela').innerHTML = ''
  
    if(itensSaldo.length > 0){

        for (let index = 0; index < itensSaldo.length; index++) {
            const item = itensSaldo[index];
            
      

            // let coraguardo      = 'grey-text text-lighten-2'
            // let corestoque      = 'grey-text text-lighten-2'
            // let corconcertando  = 'grey-text text-lighten-2'
            // let cordescarte     = 'grey-text text-lighten-2'


            let saldoAguardando  
            let saldoConcertando 
            let saldoEmEstoque   
            let saldoDescartado  
            let saldoItemTotal  

             saldoAguardando  = await buscarSaldoItem(item.cod_analitico, 1) //Pega cada item da busca e busca o saldo do item. 
             saldoConcertando = await buscarSaldoItem(item.cod_analitico, 2)
             saldoEmEstoque   = await buscarSaldoItem(item.cod_analitico, 3)
             saldoDescartado  = await buscarSaldoItem(item.cod_analitico, 4)
             saldoItemTotal   = await buscarSaldoItem(item.cod_analitico, 0)

            if(!saldoAguardando[0].saldo){
                  saldoAguardando[0].saldo  = 0
            }
              

            if(!saldoConcertando[0].saldo){
                saldoConcertando[0].saldo = 0
            }
                
            
            if(!saldoEmEstoque[0].saldo){
                saldoEmEstoque[0].saldo   = 0
            }
                

            if(!saldoDescartado[0].saldo){
                saldoDescartado[0].saldo  = 0
            }
                

            if(!saldoItemTotal[0].saldo){
                saldoItemTotal[0].saldo   = 0
            }
                



            // if(item.status == 1){
            //             coraguardo      = 'yellow-text text-lighten-3'
            //         }
            //         if(item.status == 2){
            //             corconcertando  = 'green-text text-accent-3'
            //         }
            //         if(item.status == 3){
            //             corestoque      = 'brown-text text-lighten-2'
                        
            //         }
            //         if(item.status == 4){
            //             cordescarte      = 'orange-text  text-darken-1'
                        
            //         }

                   
                    const tr = document.createElement(`tr`)
                    tr.setAttribute('id',item.pedido)
                    tr.innerHTML = `
                                    <td nowrap="true">${item.cod_analitico}</td>
                                    <td nowrap="true">${item.desc_item}</td>
                                    <td nowrap="true">${item.desc_variacao}</td>
                                    <td nowrap="true">${item.desc_acabamento}</td>
                                    <td nowrap="true" class=" yellow-text text-lighten-3">${saldoAguardando[0].saldo}</td>
                                    <td nowrap="true" class=" green-text text-accent-3">${saldoConcertando[0].saldo}</td>
                                    <td nowrap="true" class=" brown-text text-lighten-2">${saldoEmEstoque[0].saldo}</td>
                                    <td nowrap="true">${saldoItemTotal[0].saldo}</td>
                                    `
                                
                    corpoTabela.appendChild(tr)
           
        }
        
        tabelaItem.style.display = 'block'
    }
    if(dados.length == 0){

        document.getElementById('tabelaItem').style.display = "none"
        M.toast({html: `<span class='blue red-dark-4' >item: ${busca} não localizado.</span>`, classes: 'rounded'});
    }
   
}

function pesquisarItensRecolhimento (){
    limpartabela()
    let codProduto   = document.getElementById('codProduto').value
    preencherTabelaItensRecolhidos(codProduto)
   
}

function limpartabela(){
    let tbody = document.getElementById('corpoTabela')
    while (tbody.childElementCount >0) {
        tbody.removeChild(tbody.children[0])
    }
   
}

