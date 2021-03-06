import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Cabecalho from "./Cabecalho";
import { Alert } from 'reactstrap'
import { useNavigate } from 'react-router-dom';


const Login = () => {
  //const handleSubmit = values => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const [user, setUser]         = useState(null)
  // const [logado, setLogado]     = useState(null)
  const [message, setMessage]   = useState(' ')
    useEffect(() => {
             

    }, []);
  const navigate = useNavigate();  
  async function acessar(){


    let dadosLogin = await axios.post('http://localhost:5412/api/auth',{
      username: username,
      password: password
    })

    

    if(dadosLogin.data.acesso){
      console.log('dados para login data: ', dadosLogin.data)
        localStorage.setItem('acesso',dadosLogin.data.acesso);
        localStorage.setItem('token', dadosLogin.data.token);
        localStorage.setItem('user', username)
        navigate('/dashboard');
    }else{
      setMessage(dadosLogin.data.menssagem)
    }
  }


  return(
      <>
          
          
          <div className='col-md-12'>
            <Cabecalho title='Login' />
          
            <hr className='my-3'/>

          {/* <form class="Form" action="http://localhost:5412/API/login" method="Post"> */}
              <div className="Form-Group">
                <div className='row'>
                    <div className="input-field col-md-6">
                      <span className='LBFormLogin' >USUÁRIO:</span>
                    </div>
                    <div className="input-field col-md-6">
                      <input className='LBFormLogin validate' id="username" name="username" type="text"  placeholder='Informe o Usuário' onChange={e => setUsername(e.target.value)}/>
                    </div>
                </div>
                <div className='row'>
                   <div className="input-field col-md-3">
                      <span className='LBFormLogin'>SENHA:</span>
                    </div>
                    <div className="input-field col-md-3">
                      <input id="password" name="password" type="password" className='validate LBFormLogin' onChange={e => setPassword(e.target.value)}/>
                   </div>
                </div>
                
               
                 

              </div>
              
              <button className="btn btn-primary col-md-12" type="button" onClick={acessar}>Acessar</button>
              

              <hr className='my-3'/>

              <Alert color='danger' className='text-center'>{message}</Alert>
          {/* </form> */}


        </div>
      </>
  )
}

export default Login








// Standard Avatar
