import React, {useEffect, useState} from "react";
import { Outlet } from "react-router-dom";
import { Chart } from "react-google-charts";
import Table from 'react-bootstrap/Table'
import axios from "axios";


const Indicadores = () => {

    const [idmostrar, setIdMostrar] = useState(null)
    const [ocultar, setOcultar] = useState(true)
    const [dadosInd, setDadosInd] = useState([])
    const [tipo, setTipo] = useState('linha')
    const [tbl1, setTbl1] = useState(false)
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
            },
            chartArea:{
                backgroundColor: '#fcfcfc'
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
              tipo == 'linha' ? setTipo('barra') : setTipo('linha') 
          }

          function ocultarTbl1(){
            tbl1  ? setTbl1(false) : setTbl1(true)
           }
           

  

    useEffect(() => {

       setIdMostrar(1)
      
        let exc = async()=>{
          await axios.get(`http://192.168.1.14:5412/api/consultar/dadosindicador/${idmostrar}`)
          .then((response)=>{setDadosInd(Object(response.data));})
          .catch(error=>{console.error(error)})
          
        }
        exc()
      }, [idmostrar])

          let c = Object(dadosInd[0])
    console.log('Objectdados: ',dadosInd[0] )
    campos = Object.keys(c)
    console.log('campos:', campos)

      const dados = []
      dados.push(campos)
        console.log('data: ', dados)
        dadosInd.map((item)=>{
        let newItem = []
        for(var key in item){
            newItem.push(item[key])
        }
        dados.push(newItem)
        return newItem
        })


     function mostrar(params) {
         console.log(params)
     }


    return(
        <>
            <div className="menuDashboard">
               <h3>Indicadores</h3> 
            </div>
            <div>
                <h3>Faturamento nos Ultimos 30 dias</h3>
                <div>
                <div className="menuDashboard" bg='dark'>
                        
                       Onde é isso?

                </div>
                <div className="card border-success mb-3 "  > 
                    <div className="card-header bg-transparent border-success">
                        Indicador:  {idmostrar}
                    </div>
                    <div className="card-body"> 
                        <div className="row">
                          {tipo == 'linha' ?  
                            <div className="col-12">
                                    <Chart
                                        chartType="Line"
                                        width="100%"
                                        height="400px"
                                        data={dados}
                                        options={options}
                                    />
                                </div>:
                                <div className="col-12">
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
                            <div className="col"><button key={1} onClick={()=>{alterarTipo()}} className="container link">Exibição   </button></div>
                            <div className="col"> <button onClick={()=>{ocultarTbl1()}} className="container link">Detalhamento   </button> </div>
                            

                        </div>
                    
                                
                    </div>
            
                </div>
                    <Outlet />
                </div>
                {tbl1 ? 
                <div className="card border-success mb-3 "  >
                    <div className="card-header bg-transparent border-success">
                        Detalhamento:  {idmostrar}
                    </div>
                    <div className="card-body"> 
                        <div className="row">
                            <Table striped bordered hover variant="dark">
                                {/* <thead>
                                    <tr>
                                        {campos.map((item,index)=>(
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
                </div>:<></>
                }
            </div>
        </>
    )
}

export default Indicadores