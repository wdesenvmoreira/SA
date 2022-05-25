import React, { createContext, useEffect, useState } from "react";
import useApi from "./hooks/useApi";


export const AuthContext = createContext();

export const AuthProvider = ({ children })=>{
    const [user, setUser] = useState(null)
    const api = useApi();

    useEffect(()=>{
        const validateToken = async()=>{
            const token = localStorage.getItem('token');
            if(token){
                const dados = await api.validateToken(token)
                console.log('retorno da validação, dados: ',dados.data.user)
                if(dados.data.user){
                    setUser(dados.data.user);
                }
            }
        }
        validateToken();
    },[api]);
  
    const setToken=(token)=>{
        localStorage.setItem('token', token)
    }

     const login = async(username, password) =>{
         const dados = await api.login(username, password)
        
         if(dados.data.acesso && dados.data.token){
             setUser(username)
             setToken(dados.data.token)
             
         }
         return dados.data;

     }

    const logout = async() =>{
        await api.logout();
        setUser(null);
        setToken('')
    }

    return(
        <AuthContext.Provider
            value={{user, login, logout}}
        >
             { children }
        </AuthContext.Provider>
    )
}