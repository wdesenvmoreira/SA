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

        res.json(ceps)
    }) 
}
module.exports = rotaProcessos