require('dotenv').config();
const { App } = require('@slack/bolt');
const { WebClient } = require('@slack/web-api');

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
    console.log('entrou na mensagem.. Mensage=> ',message)
    //console.log('app: ', app)
    await say(`Hey there <@${message.user}>!`);
  });
  app.message('knock knock', async ({ message, say }) => {
    await say(`_Who's there?_`);
  });


  const canalRHDP = 'C05BVH73JDQ'

 async function menssagem (message, id){

        (async () => {
        
     
       // console.log('message: ',message)
        // Post a message to the channel, and await the result.
        // Find more arguments and details of the response: https://api.slack.com/methods/chat.postMessage
        const result = await web.chat.postMessage({
            text: message,
            channel: id,
        });
    })();
  }


//menssagem('Ok, Deu certo',canalRHDP)


  async function agendamento(id, hora, minuto) {
    var agora = new Date();
    var horaAtual = agora.getHours();
    var minutoAtual = agora.getMinutes();
  
    if (horaAtual > hora || (horaAtual == hora && minutoAtual >= minuto)) {
      hora += 24;
    }
  
    var horasRestantes = hora - horaAtual;
    var minutosRestantes = minuto - minutoAtual;
  
    if (minutosRestantes < 0) {
      minutosRestantes += 60;
      horasRestantes--;
    }
  
    let m = await dadosExperiencias()  
    var tempoRestante = (horasRestantes * 60 + minutosRestantes) * 60 * 1000;
    //console.log('tempoRestante: ', tempoRestante)
    //console.log('mensagem m : ', m)
    setTimeout(function() {
      // Aqui você pode colocar o código que deseja executar no horário desejado
       menssagem(m, id )
    }, tempoRestante);
  }


async function dadosExperiencias(){
  let inf = await controllerDPRH.tempoExperiencia(hoje, datafinal)
  let texto = ''
  inf.forEach(element => {

    let experiencia = formatDate(element.experiencia, 'dd/mm/aaaa')
    let admissao = formatDate(element.admissao, 'dd/mm/aaaa')
    let prorrogacao = ''
    if(element.prorrogacao != null){
      prorrogacao = formatDate(element.prorrogacao, 'dd/mm/aaaa')
    }
    
    console.log('prorrogação: ',element.prorrogacao)

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

  return format.replace(/dd|mm|aa|aaaa/gi, matched => map[matched])
}
  
// Agendamento para mostrar mensagem no canal ou usuario. 
//   Parametros: 1ª parametro menssagem -> Função que executará a mensagem para o findUsuario, Deve-se informar no primeiro paramentro a mensagem no segundo o id do canal ou Pessoa 
//              2ª parametro hora a ser executado 
//              3º parametro minuto a ser executado

  agendamento(canalRHDP, 8, 0); 

  module.exports = {app}