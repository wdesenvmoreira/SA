
import React, { useState, useEffect } from "react";
import { FaBars} from 'react-icons/fa'
import { Accordion } from "react-bootstrap";
import axios from "axios";


const Sidebar = ({Children, mostrarDiv}) =>{
const [dadosUser, setDadosUser]= useState([])
const [isOpen, setIsOpen] = useState(false);
let menuItem = []
let modulo, newmodulo =[] 

const toggle = () => setIsOpen(!isOpen);  


useEffect(() => {
    axios.get(`http://192.168.1.14:5412/api/consultaWBIUser`,{params:{user:localStorage.getItem('usuario')}})
    .then((response)=>{setDadosUser(response.data)})
    .catch(error=>{console.error(error)})
   
}, [])


  const mostrar = (id)=>{
    console.log('mostrar entro do Silder id = ',id)
    mostrarDiv(id)
}


//Configurando dados para mostrar no Menu
dadosUser.map((i,idx)=>{
      newmodulo.push(i.modulo);
      menuItem.push(i);
      return true
}) 


modulo=[...new Set(newmodulo)]

 console.log('modulos: ',modulo)
  
  return(
      <div className="container siderbarcss">
         
          <div style={{width:isOpen ? "350px" : "350px"}} className="sidebar">
              <div className="top_section">
                  <h1 style={{display:isOpen ? "block" : "none"}} className="logo">Logo</h1>
                  <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="'bars">
                      <FaBars onClick={toggle} />
                  </div>
                
              </div>
              {
              modulo.map((modulo,index)=>(
              <Accordion key={index} defaultActiveKey={index}alwaysOpen>
                <Accordion.Item >
                  <Accordion.Header>{modulo}</Accordion.Header>
                  <Accordion.Body>
                  {/* {menuItem.map((ii,ix)=>(<a className={ix}>{ii.nome}<h1>{ii.modulo}</h1></a>))} */}
                  {
                    menuItem.map((item,index)=>(
                      item.modulo === modulo &&
                      <button key={item.id.indicador} onClick={()=>{mostrar(item.id_indicador)}} className="btn container link">
                        <div className="icon">{item.icon}{item.id_indicador}</div>
                        <div className="link_text">{item.nome}</div>
                      </button> 
                     ))
                  }
                  </Accordion.Body>
                </Accordion.Item>
          
              </Accordion>
              ))
             }
          
         
          </div>
              <main>{Children}</main>
              
      </div>
  )
};

export default Sidebar
