
import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import {AuthContext} from '../auth'
import { Button } from "react-bootstrap";





const Logout = () => {
    let navigate = useNavigate();
    const auth = useContext(AuthContext)

 
    const sair=()=>{
        auth.logout();
        console.log('Limpar localstorage')
        localStorage.clear();
    
        navigate('/login')
    }


    return (
        <>
            <Button onClick={()=>{sair()}} >Lougout</Button>
        </>
    )
}

export default Logout