import { Line } from 'react-chartjs-2';
import {defaults} from 'chart.js/auto'
defaults.responsive = true;
defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.color = "black";

const DefaultChart=()=> {

    const data = {
        labels:['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets:[
            {
                label:'data',
                data:[50,23,45,76,81,67,91,35,41,59,98,12],
                fill:false
            }
        ]
    }

    const options ={
        scales:{
            y:{
                beginAtZero:true
            }
        }
    }

    return (
        <>
            <Line options={options} data={data} />
        </>
    )
}

export default DefaultChart;