import React from "react";
import { Chart } from "react-google-charts";

const IndLinha = ({data}) => {
       
                  const options = {
                chart: {
                    title: "Faturamento nos Ultimos 30 dias ",
                    subtitle: "Faturamento 30 dias",
                },
                };
    return(
        <>
            <div className="menuDashboard">
            
                    <Chart
                    chartType="Line"
                    width="100%"
                    height="400px"
                    data={data}
                    options={options}
                    />
       
            </div>
        </>
    )
}

export default IndLinha