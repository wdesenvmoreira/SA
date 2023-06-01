import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext();

export const AuthProvider = ({ children })=>{
    const [acesso, setAcesso] = useState(null);
    const [user, setUser] = useState(null)

    const navigate = useNavigate();

     const login = () =>{
        setAcesso(localStorage.getItem('acesso'))
        
        setUser(localStorage.getItem('user'))
        
        console.log('Na autenticação acessar recebeu: ', acesso, 'user: ', user)
     }

    const logout = () =>{
        console.log('Limpar localstorage')
        localStorage.clear();
        // navigate('/login')
    }
    if(!acesso){
        navigate('/login')
    }

    return(
        <AuthContext.Provider
            value={{authenticated: !!acesso, user, login, logout}}
        >
             { children }
        </AuthContext.Provider>
    )
}