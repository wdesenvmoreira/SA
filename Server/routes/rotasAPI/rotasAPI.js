const jwt = require('jsonwebtoken')
//const jwtSecret = 'secreta'
const jwtSecret = require('../../config/config.json').secret
const bcrypt = require('bcryptjs')
const crtlUsuario = require('../../controller/controllerUsuarios')
const rotasAuthAPI = require('../routerAuthAPI')
const ctrlUW = require('../../controller/controllerUsuarioWbi')


const rotasAPI= (app) => {

    app.get('/API/logout', async(req, res) =>{
        req.session.destroy(null);
        req.logout();
        res.json(true);
 
 })

    app.get('/api/usuarios',async(req, res)=>{
        let retorno = await ctrlUW.listaWbiUsuario(req.params.id)
        res.json(retorno)
    })


 app.get('/API/usuario/:id', async(req, res) =>{
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


    res.send('')
 })

 app.get('/API/uw/:id',async(req, res)=>{
    let retorno = await ctrlUW.listaWbiUsuario(req.params.id)
    res.json(retorno)
})

    
}



module.exports = rotasAPI;