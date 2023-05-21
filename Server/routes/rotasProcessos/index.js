const jwt = require('jsonwebtoken')
const fetch = require('node-fetch')
//const jwtSecret = 'secreta'
const jwtSecret = require('../../config/config.json').secret
const controllerProcessos = require('../../controller/controllerProcessos/controllerProcessos')


const rotaProcessos = (app) =>{
    app.use(async(req, res, next)=>{

        const token = req.session.token;

        if(token){
            try {
                const payload = jwt.verify(token, jwtSecret)
                if(payload.edicao = 1){
                  next();  
                }else{
                    console.log('Não possui permissão para acessar esta pagina. Retornando para : ',req.headers.host+'\\'+req.path)
                   res.redirect(req.headers.host+'\\'+req.path);
                }
                
            } catch (error) {
                res.render('login',{message: 'Erro ao acessar. Acesse novamente.'});
            }
        }else{
           
            res.render('login',{message: 'Realize o login.'})
        }
    });

  app.get('/Processos/',(req, res) => {
        res.render('Processos/',)
    }) 
  app.get('/Processos/PessoaCEP/:pessoa&:grupoP&:carga',async(req, res) => {
      
        let ceps = await controllerProcessos.consultaBanco(req.params.pessoa,req.params.carga, req.params.grupoP)

        console.log('retorno da busca: ', ceps)
        // await ceps.forEach(async (cep) => {
        //     console.log('dentro da rota. cep.cep:', cep.cep)
        //     try {
             
        //         // const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        //          const targetUrl = `https://viacep.com.br/ws/${cep}/json/`;
        //          //const response = await fetch(proxyUrl + targetUrl);
        //          const response = await fetch(targetUrl);
        //          const data = await response.json();
        //          console.log('dadosCep: ', data);
        //          ceps.d = data;
        //      } catch (error) {
        //          console.log('Erro verificação do cep: ',error);
        //          return true;
        //      }
        // })
       
       
        
        // console.log('ceps após verificação no viacep: ', ceps)



        res.json(ceps)
    }) 
}
module.exports = rotaProcessos