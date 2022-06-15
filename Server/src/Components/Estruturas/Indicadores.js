
import React from "react";
import { Chart } from 'react-google-charts'


export default function Indicadores ({data, Children}){
  const mostrar = (id)=>{
    console.log('mostrar entro do Silder id = ',id)
    
}
const options = {
  chart: {
      title: "Faturamento nos Ultimos 30 dias ",
      subtitle: "Faturamento 30 dias",
  },
  };
  
  return(
      <div className="container siderbarcss">
        <div>
        <Chart
                    chartType="Line"
                    width="100%"
                    height="400px"
                    data={data}
                    options={options}
                    />
        </div>
               {/* <button onClick={()=>{mostrar(1)}} className="container link">KKK   </button>  */}
        
              <main>{}</main>
      </div>        
     
  )
};

