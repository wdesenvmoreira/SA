function checarAvaria(elemento){
  let ck =  document.getElementById(elemento).innerText
  if(ck == 'check'){
    document.getElementById(elemento).innerText = 'check_box_outline_blank'
  }else{
    // document.getElementById(elemento).setAttribute('class','green-text text-accent-3')
    document.getElementById(elemento).innerText = 'check'
    
  }
}