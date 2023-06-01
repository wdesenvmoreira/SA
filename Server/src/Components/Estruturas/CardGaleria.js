import React, { useState, useEffect, useRef } from 'react'
import IndLinha from '../Indicadores/IndLinha'
import Indicadores from '../Estruturas/Indicadores';

import axios from 'axios';


export default function CardGaleria(id) {
const [idmostrar, setIdMostrar] = useState(null)
const [ocultar, setOcultar] = useState(true)
const [dadosInd, setDadosInd] = useState([])
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


const mostrar=()=> {

  setOcultar(false)
}

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


  // const data = [
  //   [
  //       "Day", "Guardians of ", "The Avengers", "Transformers: ", "Ultimato"
  //   ],
  //   [1, 37.8, 80.8, 41.8,50],
  //   [2, 30.9, 69.5, 32.4,55],
  //   [3, 25.4, 57, 25.7,60],
  //   [4, 11.7, 18.8, 10.5,60],
  //   [5, 11.9, 17.6, 10.4,60],
  //   [6, 8.8, 13.6, 7.7,65],
  //   [7, 7.6, 12.3, 9.6,70],
  //   [8, 12.3, 29.2, 10.6,80],
  //   [9, 16.9, 42.9, 14.8,85],
  //   [10, 12.8, 30.9, 11.6,90],
  //   [11, 5.3, 7.9, 4.7,95],
  //   [12, 6.6, 8.4, 5.2,100],
  //   [13, 4.8, 6.3, 3.6,50],
  //   [14, 4.2, 6.2, 3.4,-2],
  //   ];
  const mostra = (id)=>{
    console.log('mostrar entro do Silder id = ',id)
    
}

  return (
    <div id={id.id}   style={{display:ocultar ? 'block' : 'none'}} ref={ind} className='col-sm-4'>
        <div className="card border-success mb-3" >{idmostrar}
            <div className="card-header bg-transparent border-success">
              {/* <IndLinha key={0} data={data}/>  */}
              {/* <Indicadores key={0} data={data}/> */}
            </div>
            <div className="card-body">
           </div>
            <div className="card-footer bg-transparent border-success">
            <button key={1} onClick={()=>{mostrar(1)}} className="container link">Pizza   </button> 
                           <button onClick={()=>{console.log('Clicou kkk')}} className="container link">KKK   </button> 
            </div>
            
        </div>
        
  </div>
  )
}
