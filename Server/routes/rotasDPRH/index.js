const jwt = require('jsonwebtoken')
const fetch = require('node-fetch')
//const jwtSecret = 'secreta'
const jwtSecret = require('../../config/config.json').secret
const controllerDPRH = require('../../controller/DPRH/controllerDPRH')


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

  app.get('/DPRH/',async(req, res) => {
        let dados = await controllerDPRH.tempoExperiencia('09/06/2023','16/07/2023')
        res.json(dados)
    }) 
 
}
module.exports = rotaProcessos