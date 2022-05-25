import React from "react";
import Cabecalho from "../../Components/Cabecalho";
import { Link } from "react-router-dom";
import { useParams, useNavigate} from "react-router-dom";
import { Breadcrumb, Button } from "reactstrap";

const Contato = () => {
  
    const { parametro } = useParams();
    let p = ()=>{return('agora sim'+{ parametro })}
    let navigate = useNavigate();
  return(
      <>
          
          
          <div className='col-md-12'>
            <Cabecalho title='Contatos' />
            <Breadcrumb>{p()}</Breadcrumb>
            <hr className='my-3'/>
             Pagina em produção ...
            <hr className='my-3'/>
            <Link to='/login'>Login</Link>
            <Button onClick={()=>navigate('/dashboard')}>Dashboard</Button>




        </div>
      </>
  )
}

export default Contato








// Standard Avatar
