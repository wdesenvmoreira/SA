import React, { useState, useEffect, useRef } from 'react'
import { Button } from 'react-bootstrap';
import IndLinha from '../Indicadores/IndLinha'
import axios from 'axios';

export default function CardGaleria(id) {
const [idmostrar, setIdMostrar] = useState(null)
const [ocultar, setOcultar] = useState(true)
const [dadosInd, setDadosInd] = useState([])

const ind = useRef(null);

  let dados = async()=>{
    await axios.get(`http://192.168.1.14:5412/api/consultar/dadosindicador/${id.idMostrar}`)
    .then((response)=>{setDadosInd(response.data); return response.data})
    .catch(error=>{console.error(error)})
    
  }

useEffect(() => {

  setIdMostrar(id.idMostrar)
  dados()
}, [id])

console.log('dados Indicador: ',Object(dadosInd[0]))


const mostrar=()=> {

  setOcultar(false)
}

  const data = [
    [
        "Day",
        "Guardians of ",
        "The Avengers",
        "Transformers: ",
        "Ultimato"
    ],
    [1, 37.8, 80.8, 41.8,50],
    [2, 30.9, 69.5, 32.4,55],
    [3, 25.4, 57, 25.7,60],
    [4, 11.7, 18.8, 10.5,60],
    [5, 11.9, 17.6, 10.4,60],
    [6, 8.8, 13.6, 7.7,65],
    [7, 7.6, 12.3, 9.6,70],
    [8, 12.3, 29.2, 10.6,80],
    [9, 16.9, 42.9, 14.8,85],
    [10, 12.8, 30.9, 11.6,90],
    [11, 5.3, 7.9, 4.7,95],
    [12, 6.6, 8.4, 5.2,100],
    [13, 4.8, 6.3, 3.6,50],
    [14, 4.2, 6.2, 3.4,-2],
    ];


  return (
    <div id={id.id}   style={{display:ocultar ? 'block' : 'none'}} ref={ind} className='col-sm-4'>
        <div class="card border-success mb-3" >{idmostrar}
            <div class="card-header bg-transparent border-success">
              <IndLinha data={data}/>
            </div>
            <div class="card-body">
           </div>
            <div class="card-footer bg-transparent border-success">
              <div className='border-dark'>outro estilo</div>
              <input type="text" />
              <button type='button' onClick={()=>{mostrar()}}>Fechar</button>
              <div onClick={()=>{mostrar()}} className="button">
                       Fechar
                      </div> 
            </div>
            <Button onClick={()=>{console.log('Ocultar')}}>click</Button>
        </div>
        
  </div>
  )
}
