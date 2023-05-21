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
  
    const setDados=(dados)=>{
        localStorage.setItem('token', dados.data.token)
        localStorage.setItem('usuario', dados.data.user)
    }

     const login = async(username, password) =>{
         const dados = await api.login(username, password)
        console.log('dados em login no auth: ',dados)
         if(dados.data.acesso && dados.data.token){
             setUser(username)
             setDados(dados)
             
         }
         return dados.data;

     }

    const logout = async() =>{
        await api.logout();
        setUser(null);
        let dados = {data:{token:'',usuario:''}}
        setDados(dados)
    }

    const validar = async()=>{
        const token = localStorage.getItem('token');
        if(token){
            const dados = await api.validateToken(token)
            console.log('Validando, dados: ',dados.data.user)
            if(dados.data.user){
                setUser(dados.data.user);
                return true
            }
        }
        return false
    }

    return(
        <AuthContext.Provider
            value={{user, login, logout, validar}}
        >
             { children }
        </AuthContext.Provider>
    )
}