import React, { useState } from 'react'
import { Dados } from './Dados'
import style from 'styled-components'
import { IconContext } from 'react-icons/lib'
import { FiMinus, FiPlus } from 'react-icons/fi'



const AccordionSection = style.div`
display: flex;
flex-direction: colum;
align-items:center;
justify-content: center;
position:realtive;
height:100vh;
background:#fff;
`;
const Container = style.div`
position:absolute;
top:30%;
box-shadow: 2px 10px 35px 1px rgba(153, 153, 153, 0.3);
background:#fff;
`;
const Wrap = style.div`
background:#000;
color: #fff;
display: felx;
justify-content: sapce-between;
align-items: center;
width:100%;
text-align:center;
cursor: pointer;
h1{
    padding:2rem;
    font-size:2rem;
}
span{
    margin-right: 1.5rem;
}
`;


const Dropdown = style.div`
background: #1c1c1c;
color: #00ffb9;
width: 100%;
height:100px;
display: flex;
flex-direction: colum;
justify-content:center;
align-items:center;
border-bottom: 1px solid #00ffb9;
border-top: 1px solid #00ffb9;

p{
    font-size:2rem;

}
`;
 


const Accordion = () => {
    const[clicked, setClicked]= useState(false)
     
    const toggle = index =>{
        if(clicked === index){
            return setClicked(null)
        }
        setClicked(index)
    }
  return( 
      <IconContext.Provider value={{color:'#0FFB9', size:'25px'}}>
        <AccordionSection>
            <Container>
               {
                   Dados.map((item, index)=>{
                       return(
                           <>
                            <Wrap onClick={()=>toggle(index)} key={index}>
                                <h1>{item.question}</h1>
                                <span>{clicked === index ? <FiMinus />: <FiPlus/>}</span>
                            </Wrap>
                            {clicked === index ? ( 
                                <Dropdown>
                                    <p>{item.answer}</p>
                                </Dropdown>):null}                         
                           </>
                       )
                   })
               } 
            </Container>
        </AccordionSection>
      </IconContext.Provider>
  )
}

export default Accordion