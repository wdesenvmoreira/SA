import React, { Component } from 'react';
import { Chart } from 'react-google-charts'

export default class Instructions extends Component {

  render(props) {
    return(
            <div>
                <Chart
                    width={400} 
                    height={300}
                    chartType="LineChart"
                    loader={<div>Loading Chart</div>}
                    data= {this.props.dados}
                    options={{
                    intervals: { style: 'sticks' },
                    legend: 'none',
                    }}
                />
            </div>
    )
  }
}


