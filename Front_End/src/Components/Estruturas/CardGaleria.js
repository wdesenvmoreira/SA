import React, { useState, useEffect, useRef } from 'react'
import IndLinha from '../Indicadores/IndLinha'
// import Indicadores from '../Estruturas/Indicadores';
import Indicadores from '../../pages/Dashboard/Indicadores';

import axios from 'axios';


export default function CardGaleria(id) {
const [idmostrar, setIdMostrar] = useState(null)
const [ocultar, setOcultar] = useState(true)
const [dadosInd, setDadosInd] = useState([])
const [mostrarInd, setMostrarInd] = useState(false)
let campos = []

const ind = useRef(null);


useEffect(() => {

  setIdMostrar(id.idMostrar)

  let exc = async()=>{
    await axios.get(`http://192.168.1.14:5412/api/consultar/dadosindicador/${id.idMostrar}`)
    .then((response)=>{setDadosInd(Object(response.data));})
    .catch(error=>{console.error(error)})
    
  }
  exc()
}, [id])

let c = Object(dadosInd[0])
console.log('Objectdados: ',dadosInd[0] )
campos = Object.keys(c)
console.log('campos:', campos)




const data = [

]
data.push(campos)
console.log('data: ', data)
dadosInd.map((item)=>{
  let newItem = []
  for(var key in item){
    newItem.push(item[key])
  }
  data.push(newItem)
  return newItem
})

  return (<> {ocultar && 
    <div id={id.id}   ref={ind} className='col-sm-10'>
      <div className="card border-success mb-3" >{idmostrar}
            <div className="card-header bg-transparent border-success">
              {mostrarInd  &&  <IndLinha key={0} data={data}/> }
              <Indicadores key={0} />
            </div>
            <div className="card-body">
           </div>
            <div className="card-footer bg-transparent border-success">
            <button key={1} onClick={()=>{ setOcultar(false)}} className="container link">Fechar   </button> 
                          
            </div>
            
        </div>
       
  </div> }
  </>
  )
}
