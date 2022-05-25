import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Cabecalho from "../../Components/Cabecalho";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { AuthContext } from '../../auth';
import Logout from "../../Components/Logout";


const Dashboard = () => {
    let navigate = useNavigate();
    const auth = useContext(AuthContext);
    return(
        <>
            <Cabecalho title={'Dashborad'} usuario={auth.user}/>
            <div className="container">
                <br/>
                <Outlet />
            </div>
            <div>
            <Button onClick={()=>navigate('/dashboard/indicadores/indbarra')}>Barra</Button>
            <Button onClick={()=>navigate('/dashboard/indicadores/indpizza')}>Pizza</Button>
            <br/>
            <Button onClick={()=>navigate('/logout')}>Sair</Button>
            <Logout />
            </div>
        </>
    )
}

export default Dashboard