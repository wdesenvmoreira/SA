require('dotenv').config();
const { App } = require('@slack/bolt');
const { WebClient } = require('@slack/web-api');
var cron = require('node-cron');

const controllerDPRH = require('../../controller/DPRH/controllerDPRH')

const signingSecret = process.env['SLACK_SIGNING_SECRET']
const botToken = process.env['SLACK_BOT_TOKEN']
const appToken = process.env['SLACK_APP_TOKEN']

let dhoje = new Date();
let dia  = dhoje.getDate().toString().padStart(2, '0');
let mes  = (dhoje.getMonth()+1).toString().padStart(2, '0');
let ano  = dhoje.getFullYear();
let hoje = dia + "/" + mes + "/" + ano;

let datafim = new Date();
datafim.setDate(datafim.getDate() + 3);
let diafim  = datafim.getDate().toString().padStart(2, '0');
let mesfim  = (datafim.getMonth()+1).toString().padStart(2, '0');
let anofim  = datafim.getFullYear();
let datafinal = diafim + "/" + mesfim + "/" + anofim;
let diasemana = dhoje.getDay()






cron.schedule('* * * * *', ()=>{
  executarAgendamento()
});

 async function executarAgendamento (){
  try {
   let m = await dadosExperiencias()  
    if (m.length != 0 || m.length != undefined)  //Verifica se o valor da busca na base de dados possui resultado 
      {//Execução do agendamento. 
        verificarHoraAtual(10,2,m, canalRHDP)
        verificarHoraAtual(7,30, 'Show esta um pouco mais dinanmico. '+m, canalTI)
      }
  } catch (error) {
    console.log('Erro ao Executar agendamento.')
  }
 
}
  async function verificarHoraAtual(horaAgenda, minutoAgenda, msg, canal) {
    const dataAtual = new Date();
    const horaAtual = dataAtual.getHours();
    const minutoAtual = dataAtual.getMinutes();
    


    if (horaAtual === horaAgenda && minutoAtual === minutoAgenda) {
      console.log('A hora atual é igual à hora da agenda.');
      if((diasemana != 0) && (diasemana != 7))
       { 
        menssagem(msg, canal)
       }
    } else {
      //console.log('A hora atual não é igual à hora da agenda.', horaAtual, ':', minutoAtual);
    }
  }
const app = new App({
   signingSecret: signingSecret,
   socketMode: true,
   token: botToken,
   appToken: process.env.SLACK_APP_TOKEN
 
  });

const web = new WebClient(botToken);

app.start();
app.client.conversations.open
  app.message('hello', async ({ message, say }) => {

    // say() sends a message to the channel where the event was triggered
    console.log('Retorno de hello.. Mensage=> ',message)
    //console.log('app: ', app)
    await say(`Hey there <@${message.user}>!`);
  });
  app.message('knock knock', async ({ message, say }) => {
    await say(`_Who's there?_`);
  });

  // app.client.chat.postMessage({
  //   channel: canalTI,
  //   text: 'Envio pelo client.chat.postMessage'
  // })

  const canalRHDP = 'C05BVH73JDQ'
  const canalTI  = 'D043YLUHPGW'// 'U044V0SP40Y'

 async function menssagem (message, id){

        (async () => {
        
          
       
          
        // Post a message to the channel, and await the result.
        // Find more arguments and details of the response: https://api.slack.com/methods/chat.postMessage
        const result = await web.chat.postMessage({
            text: message,
            channel: id,
        });
    })();
  }


async function dadosExperiencias(){
  let inf = await controllerDPRH.tempoExperiencia(hoje, datafinal)
  let diainicial = formatDate(dhoje,'dd/mm/aaaa')
  let diafinal = formatDate(datafim,'dd/mm/aaaa')
  let texto = `PERIODO ANALISADO: DE ${diainicial} A ${diafinal} \n \n` 
  
  if(inf.length != 0 && inf.length != undefined){

      inf.forEach(element => {
    
        let experiencia = formatDate(element.experiencia, 'dd/mm/aaaa')
        let admissao = formatDate(element.admissao, 'dd/mm/aaaa')
        let prorrogacao = ''
        if(element.prorrogacao != null){
          prorrogacao = formatDate(element.prorrogacao, 'dd/mm/aaaa')
        }
        
        //console.log('prorrogação: ',element.prorrogacao)
    
        texto += '--------------------------------------------------------------------------------------------\n'
        texto += 'ESTABELECIMENTO: ' + element.codigo_estabelecimento + '\n';
        texto += 'REGISTRO:        ' + element.registro + '\n'
        texto += 'FUNCIONARIO:     ' + element.funcionario + '\n '
        texto += 'NOME:            ' + element.nome_funcionario + '\n '
        texto += 'ADMISSAO:        ' + admissao + '\n '
        texto += 'FIM EXPERIÊNCIA: ' + experiencia + '\n '
        texto += 'FIM PRORROGAÇÃO: ' + prorrogacao + '\n';
        texto += '-------------------------------------------------------------------------------------------\n'
        texto += '\n'
        
      });
  }else {
    texto += '--------------------------------------------------------------------------------------------\n'
    texto += 'Não encontrado nenhum registro no período.  ' + '\n';
    texto += '--------------------------------------------------------------------------------------------\n'
    texto += '\n'
  }


 // console.log('dados texto: ',inf)
  return texto
}
function formatDate(date, format) {
  const map = {
      mm: date.getMonth() + 1,
      dd: date.getDate(),
      aa: date.getFullYear().toString().slice(-2),
      aaaa: date.getFullYear()
  }

  return format.replace(/dd|mm|aaaa/gi, matched => map[matched])
}

async function publishMessage(text) {
  try {
    // Call the chat.postMessage method using the built-in WebClient
    const result = await app.client.chat.postMessage({
      channel: canalTI,
      text: text
      // You could also use a blocks[] array to send richer content
    });

    // Print result, which includes information about the message (like TS)
    console.log(result);
    app.postMessage()
  }
  catch (error) {
    console.error(error);
  }
}

publishMessage(canalTI, "Hello world :tada:");

  module.exports = {app, executarAgendamento}