
import React from "react";
import { Label } from "reactstrap";

const Cabecalho = ({title, usuario}) =>(
 
  <header>
    <h1 className='text-center'>{title}</h1>
    <Label>Usuarios: {usuario}</Label>
    
  </header>
);

export default Cabecalho
