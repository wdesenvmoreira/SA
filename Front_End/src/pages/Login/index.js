import React, { useState, useContext } from 'react'
import Cabecalho from "../../Components/Cabecalho";
import { Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth';


const Login = () => {
  //const handleSubmit = values => {
  const auth = useContext(AuthContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage]   = useState(' ')

  const navigate = useNavigate(); 

  async function  acessar(){
    
        const dados = await auth.login(username, password)
        console.log('dados: ', dados)
        if(dados.acesso){
            navigate('/')
        }else{
            setMessage(dados.menssagem)
        }

  }


  return(
      <>
          
          
          <div className='col-md-12'>
            <Cabecalho title='Login' />
          
            <hr className='my-3'/>
  
              <div className="">
                <div className='row '>
         
                  <div className='col-md-4 container'>
                      <div className='row'> 
                        <div class="d-flex flex-row">
                            <div class="p-2 col-md-2">USUÁRIO:</div>
                            <div class="p-2 col-md-6"><input className='LBFormLogin validate' id="username" name="username" type="text"  placeholder='Informe o Usuário' onChange={e => setUsername(e.target.value)}/></div>
                            
                        </div>
                        <div class="d-flex flex-row">
                              <div class="p-2 col-md-2">SENHA:</div>
                              <div class="p-2 col-md-6">
                                <input id="password" name="password" type="password" className='validate LBFormLogin' onChange={e => setPassword(e.target.value)}/>
                              </div>
                        </div>
                      

                      </div>
                  </div>
                 
                    
                </div>
                <div className='row '>
         
                    <div className='col-md-4 container'>
                      <button className="btn btn-primary col-md-4" type="button" onClick={acessar}>Acessar</button>
                    </div>
                </div>

              </div>
<hr className='my-3'/>

              <Alert color='danger' className='text-center'>{message}</Alert>
          


        </div>
      </>
  )
}

export default Login








// Standard Avatar
