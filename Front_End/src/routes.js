import React from "react";
import {  Route, Routes  } from "react-router-dom"
// import Login from './Components/Login'
import Login from './pages/Login'
import Dashboard from "./pages/Dashboard";
import Contatos from './pages/Contatos'
import SemPagina from "./pages/SemPagina";
import Indicadores from "./pages/Dashboard/Indicadores";
import IndBarra from "./Components/Indicadores/IndBarra";
import IndPizza from "./Components/Indicadores/indPizza";


import { AuthProvider } from "./auth";
import { RequireAuth } from "./Components/Auth/RequireAuth";
import Sobre from "./pages/Sobre";

export default function Rotas (){
    
    return(
 <AuthProvider>
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Login />} />
       
            <Route  path="/" element={<RequireAuth><Dashboard /> </RequireAuth>}/>
            

            <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>}>
                    <Route path="indicadores" element={<Indicadores />} >
                        <Route path="indbarra" element={<IndBarra />} />
                        <Route path="indPizza" element={<IndPizza />} />
                    </ Route>
            </Route >

            <Route path="/contatos/:parametro" element={<RequireAuth><Contatos /></RequireAuth>} />

            <Route path="/sobre" element={<Sobre />} />

            <Route path="/indicadores" element={<Indicadores />} />

            <Route path="*" element={<SemPagina />} />
            
        
    </Routes>
    </AuthProvider>
    )
}

