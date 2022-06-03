import React, { useContext, useState, useRef, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Cabecalho from "../../Components/Cabecalho";
// import { useNavigate } from "react-router-dom";

import { AuthContext } from '../../auth';
import Logout from "../../Components/Logout";
import Sidebar from "../../Components/Estruturas/Sidebar";

import CardGaleria from "../../Components/Estruturas/CardGaleria";



const Dashboard = () => {
    // let navigate = useNavigate();
    const auth = useContext(AuthContext);
    const [idDiv, setIdDiv] = useState(null);
   



    function mostrarDiv(id) {
        console.log('mostrarDiv no Dashboard: id = ',id )
        setIdDiv(id)

    }

  
    return(
        <>
                      
            <div className="row header_dash">
                <div className="col-sm-10 bg-primary ">
                    <Cabecalho title={'Dashborad'} usuario={auth.user}/>
                </div>
                <div className="col-sm-2 bg-dark ">
                    <Logout />
                </div>

            </div>
            <div className="container-fluid body_dash  p-0">
                    <div className="row">
                        <div className="col-sm-2 p-3">
                        <Sidebar mostrarDiv={mostrarDiv} /> 
                        </div>
                        <div className="col-sm-10">

                     
                    <div className="row ">
                     {idDiv ? <CardGaleria id={idDiv} idMostrar = {idDiv}  />:null }        

                        <Outlet />
                    </div>
                    </div>
                    </div>             
            </div>
            <div className="container=fluid">
                <div className="row bg-dark">
                     Footer
                </div>
          
            <br/>
            
           
            </div>
        </>
    )
}

export default Dashboard