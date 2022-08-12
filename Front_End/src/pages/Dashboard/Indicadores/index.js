import React, {useEffect, useState} from "react";
import { Outlet } from "react-router-dom";
import { Chart } from "react-google-charts";
import Table from 'react-bootstrap/Table'
import axios from "axios";
import { FaRegBell } from "react-icons/fa";


const Indicadores = () => {

    const [idmostrar, setIdMostrar] = useState(null)
    const [dadosInd, setDadosInd] = useState([])
    const [tipo, setTipo] = useState('valor')
    const [tblDetalhe, setTblDetalhe] = useState(false)
    const [tblClientePedidos, setTblClientePedidos] = useState(false)    
    const [tbl1, setTbl1] = useState(false)
    const [dadosClientes, setDadosClientes] = useState([])
    const [dadosCliente, setDadosCliente] = useState([])
    const [retornoCliente, setRetornoCliente] = useState([])
    const [dadosPedidoCliente, setDadosPedidoCliente] = useState([])
    const [clienteDetalhe, setClienteDetalhe] = useState([])
    const [cliente, setCliente] = useState([])
    const [tblPedido, setTblPedidos] = useState(false)
    const [pedidoCliente, setPedidoCliente] = useState(null)
    const [camposDetPedidos, setcamposDetPedidos] = useState([])

    let campos = []
   
    const options = {
        chart: {
            title: "Faturamento nos Ultimos 30 dias ",
            subtitle: "Faturamento 30 dias",
        },
        chartArea: {
            backgroundColor: {
            fill: '#212529',
            fillOpacity: 0.1
            },
        }
    };

    var optionsBars = {
    chart: {
        title: 'Company Performance',
        subtitle: 'Sales, Expenses, and Profit: 2014-2017',
    },
    bars: 'vertical' // Required for Material Bar Charts.
    };

    function alterarTipo(newTipo){
              tipo === 'linha' ? setTipo('barra') : setTipo('linha') 
              switch (newTipo) {
                case 'linha':
                    setTipo('linha') 
                    break;
                case 'barra':
                    setTipo('barra') 
                    break;

                case 'valor':
                    setTipo('valor') 
                    break;

              
                default:
                    break;
              }
          }

    function ocultarTblClientes(){
            tblDetalhe  ? setTblDetalhe(false) : setTblDetalhe(true)
           }

    function detalharPedidoCliente(pedido){
        setPedidoCliente(pedido)

        setTblPedidos(true)


    }

        

    useEffect(()=>{
        console.debug('clienteDetalhe: ', clienteDetalhe[0])
        pedidosCliente(clienteDetalhe[0])
        console.log("Texto de procura: ",`http://192.168.1.14:5412/api/consultar/detalhamentoindicador/cliente/${clienteDetalhe[0]}`)

        async function x (){

        // if(clienteDetalhe[0].length > 0){
            try {
                await axios.get(`http://192.168.1.14:5412/api/consultar/detalhamentoindicador/cliente/${clienteDetalhe[0]}`)
                    .then((response)=>{return response.data})
                    .catch(error=>{console.error(error)}) 
                    console.log('Em detalharCliente dados cliente:',dadosPedidoCliente)
                console.debug('clienteDetalhe.length: ', clienteDetalhe.length)
                if(clienteDetalhe.length > 0){
                    setTblClientePedidos(true)
                }
            } catch (error) {
                console.debug('Erro no useEfect para criar aa tabela: ', error)
            }
        // }
    }
    //setDadosPedidoCliente(Object(x()))
     console.debug('d: ', Object(x()))   

       

    },[clienteDetalhe])

    async function pedidosCliente(cliente){
        await axios.get(`http://192.168.1.14:5412/api/consultar/detalhamentoindicador/cliente/${cliente}`)
        .then(response=>{setDadosPedidoCliente(response.data);})
        .catch(error=>{console.error(error)})         
    }
  

    useEffect(() => {

       setIdMostrar(1)
      
        
        let exc = async()=>{
            if(idmostrar){
                await axios.get(`http://192.168.1.14:5412/api/consultar/dadosindicador/${idmostrar}`)
                .then((response)=>{setDadosInd(Object(response.data));})
                .catch(error=>{console.error(error)})
            }
           
            await axios.get(`http://192.168.1.14:5412/api/consultar/detalhamentoindicador/clientes`)
          .then((response)=>{setDadosClientes(response.data);})
          .catch(error=>{console.error(error)}) 

        }
        exc()
    }, [idmostrar])

    let c = Object(dadosInd[0])
    campos = Object.keys(c)
    const dados = []
    dados.push(campos)

    let clientesKey = Object(dadosClientes[0])
    let camposClientes = [] = Object.keys(clientesKey)
    const dadosCamposClientes  = []
    dadosCamposClientes.push(camposClientes)
    
   
    dadosInd.map((item)=>{
        let newItem = []
        for(var key in item){
            newItem.push(item[key])
        }

        dados.push(newItem)
        return newItem
    })

    // Relação no periodo de faturamento de cada cliente 
    let clientes = dadosClientes.map((obj)=>{
        return Object.keys(obj).map((key)=>{
            return obj[key]
        })
    })


    function setarCliente (codigo , razao){
        setClienteDetalhe([codigo,razao])
    }

            
        // let camposPedido = dadosCliente.map((obj)=>{return Object.keys(obj).map((key)=>{return obj[key]})})
        // console.log('camposPedido: ', camposPedido)
        // setcamposDetPedidos(camposPedido)
     
const indValor = {
    color: 'white',
    background: "linear-gradient(#090979, #2195db)",
    height: "200px",
    width:"300px",
    fontSize:"30px",
    // textAlign:"center",
    paddingTop:"75px",
    paddingLeft:"20px"   
}

const componente2  = {
      position: 'fixed',
      left: '30px',
      top: '40px',
      backgroundImage: `linear-gradient(to right, rgba(0, 224, 255, 0.5), rgba(0, 133, 255, 0.5))`, 
      boxshadow:'rgba(44, 39, 39, 0.5)',
      opacity: '0.95',
      height: '500px',
      zIndex: '2'
  };
const StPedidoCliente  = {
    position: 'fixed',
    left: '130px',
    top: '50px',
    backgroundImage: `linear-gradient(to right, rgba(0, 124, 155, 0.9), rgba(0, 133, 255, 0.9))`, 
    boxshadow:'rgba(44, 39, 39, 0.5)',
    opacity: '0.95',
    height: '500px',
    zIndex: '2'
};


    return(
        <>
            <div className="menuDashboard">
               <h3>Indicadores</h3> 
            </div>
            <div>
                <h3>Faturamento nos Ultimos 30 dias</h3>
                <div>
                <div className="card border-success mb-3 "  > 
                    <div className="card-header bg-transparent border-success">
                        Indicador:  {idmostrar}
                    </div>
                    <div className="card-body"> 
                        <div className="row">
                        {
                            tipo === 'valor' && <div className="col-12">
                               <div style={indValor} src="" alt="..." className="container fluid text-white rounded-circle" >
                                    <div className="container fluid">R$2.143.572,65</div>
                                </div>
                            </div> 
                        }
                        {
                            tipo === 'linha' && <div className="col-12">
                                <Chart
                                    chartType="Line"
                                    width="100%"
                                    height="400px"
                                    data={dados}
                                    options={options}
                                />
                            </div> 
                        }   
                        {
                            tipo === 'barra' && <div className="col-12">
                                <Chart
                                    chartType="Bar"
                                    width="100%"
                                    height="400px"
                                    data={dados}
                                    options={optionsBars}
                                />
                            </div> 
                        }          
                            
                      
                        </div>
                     </div>
                    <div className="card-footer bg-transparent border-success">
                        <div className="row">
                            <div className="col"><button key={1} onClick={()=>{alterarTipo('valor')}} className="container link">Valor   </button></div>
                            <div className="col"><button key={1} onClick={()=>{alterarTipo('linha')}} className="container link">Linha   </button></div>
                            <div className="col"><button key={1} onClick={()=>{alterarTipo('barra')}} className="container link">Barra   </button></div>
                            <div className="col"> <button onClick={()=>{ocultarTblClientes()}} className="container link">Detalhamento   </button> </div>
                        </div>
                    
                                
                    </div>
            
                </div>
                    <Outlet />
                </div>
                {tbl1 && 
                <div className="card border-success mb-3 "  >
                    <div className="card-header bg-transparent border-success">
                        Detalhamento:  {idmostrar}
                    </div>
                    <div className="card-body"> 
                        <div className="row">
                            <Table striped bordered hover variant="dark">
                                {/* <thead>
                                    <tr>
                                        {dadosCamposClientes.map((item,index)=>(
                                             <th key={index}>{item}</th>
                                        ))}
                                    </tr>
                                </thead> */}
                                <tbody>
                                   
                                    {dados.map((item,index)=>(
                                             <tr key={{index}}> 
                                                 {
                                                    item.map((element, ix) => (
                                                        <td key={{ix}} onClick={()=>{console.log('dia',item[0],'campo',campos[ix])}}>{element}</td>                                               
                                                    ))
                                                    
                                                 }
                                             </tr>
                                        ))}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
                }
                {tblDetalhe && 
                <div className="card border-success mb-3 "  >
                    <div className="card-header bg-transparent border-success">
                        Detalhamento:  {idmostrar}
                    </div>
                    <div className="card-body"> 
                        <div className="row">
                            <Table striped bordered hover variant="dark">
                                <thead variant="dark">
                                    
                                     { dadosCamposClientes[0].map((camposcli, ix)=>(<td className="text-dark" key={ix}>{camposcli}</td>)) } 
                    
                                  
                                </thead>
                                <tbody>
                                    {clientes.map((item,index)=>(
                                             <tr key={{index}} onClick={() =>{setarCliente(item[0],item[1])}} > 
                                                 {
                                                    item.map((element, ix) => (
                                                        <td key={{ix}} >{element}</td>                                               
                                                    ))
                                                    
                                                 }
                                             </tr>
                                        ))}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
                }
                 {tblClientePedidos && 
                <div className="card border-success mb-3 "  style={componente2} >
                    <div className="card-header bg-transparent border-success">
                        Pedidos do Cliente:  {clienteDetalhe[0]} - {clienteDetalhe[1]}
                    </div>
                    <div className="card-body"> 
                        <div className="row">{camposDetPedidos}
                            <Table striped bordered hover variant="dark">
                                {/* <thead variant="dark">
                                   {
                                    camposDetPedidos.map((col,index)=>(
                                        <th>
                                            <td key={index}>{col}</td>
                                        </th>
                                    ))
                                   }
                                            
        
                                  
                                </thead> */}
                                <tbody>
                                    {
                                      dadosPedidoCliente.map((col, index)=>(
                                            <tr onClick={()=>{detalharPedidoCliente(col.PEDIDO)}}>
                                                <td key={index}>{col.PEDIDO}</td>
                                            </tr>
                                        
                                            )
                                        )
                                    }
   
                                </tbody>
                            </Table>
                        </div>
                    </div>
                    <div className="card-footer">
                        <button onClick={()=>{ setTblClientePedidos(false)}}>Fechar</button>
                    </div>
                </div>
                }
                {tblPedido && 
                    <div className="card border-success mb-3 "  style={StPedidoCliente} >
                        <div className="card-header bg-transparent border-success">
                            Pedidos do Cliente:  {clienteDetalhe[0]} - {clienteDetalhe[1]} 
                            <div>Pedido: {pedidoCliente}</div>
                        </div>
                        <div className="card-body"> 
                            <div className="row">
                                <Table striped bordered hover variant="dark">
                                    <thead variant="dark">
                                        <td>coluna 1</td>
                                        <td>coluna 2</td>
                                        <td>coluna 3</td>
                                        
                                    
                                    </thead>
                                    <tbody>
                                    <tr onClick={()=>{detalharPedidoCliente(1)}}><td>1</td><td>2</td><td>3</td></tr>
                                    <tr onClick={()=>{detalharPedidoCliente(2)}}><td>4</td><td>5</td><td>6</td></tr>
                                    <tr onClick={()=>{detalharPedidoCliente(3)}}><td>7</td><td>8</td><td>9</td></tr>
                                            
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button onClick={()=>{ setTblPedidos(false)}}>Fechar</button>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}


export default Indicadores