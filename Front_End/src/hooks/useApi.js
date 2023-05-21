import axios from "axios";

// const api = axios.create({
//     baseURL: process.env.REACT_APP_API
// });

const useApi =() =>({
    validateToken: async(token)=>{
        let dadosValidate = await axios.post('http://localhost:5412/api/validate',{
            token: token
          })
        
        return dadosValidate
    },
    login: async(username, password)=>{
        let dadosLogin = await axios.post('http://localhost:5412/api/auth',{
            username: username,
            password: password
          })
        
        return dadosLogin
    },
    logout: async()=>{
        // const response = await api.post('/logout')
        let dadosLogout = await axios.post('http://localhost:5412/api/logout')
        console.log('response em logout', dadosLogout)
        return dadosLogout.data;
    },
    dadosIndicador: async(id, dados)=>{
        let dadosLogin = await axios.get(`http://localhost:5412/api/consulta/${id}`)
        
        return dadosLogin
    },
    dadosWbiUser: async()=>{
        let dados = await axios.get(`http://localhost:5412/api/consultaWBI/`,{
            user: localStorage.getItem('usuario')
        })
        .then((response)=>{return response})
        .catch((error=>{console.log('Erro na Busca de dados. UseApi.js',error)}))
        
      
        return dados
    }

})

export default useApi;