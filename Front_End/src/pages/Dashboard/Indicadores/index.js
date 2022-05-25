import React from "react";
import { Outlet } from "react-router-dom";


const Indicadores = () => {
    return(
        <>
            <div className="menuDashboard">
               <h3>Coluna com Indicadores ou ícones. </h3> 
            </div>
            <div>
                <h3>Indicadores</h3>
                <div>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default Indicadores