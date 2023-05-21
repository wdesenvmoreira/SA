const jwt = require('jsonwebtoken')
//const jwtSecret = 'secreta'
const jwtSecret = require('../../config/config.json').secret
const ctrlSaldoItensLD = require('../../controller/LD/controllerRecolhimentoLD')
const ctrlLaudoLD = require('../../controller/ld/controllerLaudoLD')
const rotaLaudoLD = (app) =>{
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

    app.get('/LD/Laudo',(req, res) => {
        res.render('LD/laudoLD')
    }) 
    app.get('/LD/Laudo/Avarias',(req, res) => {
        res.render('LD/avarias_laudo')
    })
    app.get('/LD/Laudo/Condicoes',(req, res) => {
        res.render('LD/condicoes_laudo')
    })  

    app.get('/LD/Laudo/api/dados/:codControle',async(req, res)=>{

        let totais = []
        let retorno 

        let dados  = await ctrlLaudoLD.BuscarDados(req.params.codControle)
        console.log('dados na rota: ', dados)

        for (let index = 0; index < dados.length; index++) {
            const element = dados[index].cod_analitico;
            retorno = await ctrlSaldoItensLD.SaldoItem(element)
            totais.push(retorno)
        }

       
        res.json(dados)

}) 

app.get('/LD/Saldo/api/ItemSaldo/:cod_analitico&:status',async(req, res)=>{
    console.log(req.params.cod_analitico, req.params.status)
    let dados  = await ctrlSaldoItensLD.SaldoItem(req.params.cod_analitico, req.params.status)
    console.log('dados na rota: ', dados)

    res.json(dados)

})

app.post('/LD/Saldo/api/ItemSaldo/Sair',async(req, res)=>{
    console.log('req.body: ',req.body.dados.quantidade)
    let cod_analitico = req.body.dados.cod_analitico
    let quantidade = req.body.dados.quantidade
    console.log('quantidade a ser estornada: ', quantidade)
    let retorno  = await ctrlSaldoItensLD.SaidaItem(cod_analitico, quantidade)
    console.log('Retorno da saída do item ', retorno)

    res.json(retorno)

}) 

app.get('/LD/LocalAvaria/Todos',async(req, res)=>{
    console.log("Acessando rota: /LD/LocalAvaria/Todos")
    let dados  = await ctrlLaudoLD.findAllLocal()
    console.log('dados na rota: ', dados)  
    res.json(dados)

}) 
          
app.post('/LD/LocalAvaria/Incluir', async(req, res) => {
    console.log('chegou na roda de inclusao: ', req.body)
    const dado = { ...req.body}
    const incluir = await ctrlLaudoLD.createLocal(dado)
        res.json(incluir)
    
    
})

app.post('/LD/Local/Alterar', async(req, res)=>{
    console.log('Rota alterando Local: ', req.body)
    let alterar = await ctrlLaudoLD.updateLocal(req.body.id, req.body)
    if(alterar){
        res.json(alterar)
    }else{
        res.send('Registro não alterado. ')
    }
})

app.delete('/LD/LocalAvaria/delete/:id',async(req, res) => {
    const deletar = await ctrlStatusLD.deletar(req.params.id)
    if(deletar==1){          
       res.json(deletar) 
    }else{
        res.json(deletar.msg)
    }
    
})


 

}

module.exports = rotaLaudoLD