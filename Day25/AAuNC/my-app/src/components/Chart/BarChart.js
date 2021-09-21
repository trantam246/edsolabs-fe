import { Bar } from 'react-chartjs-2';
import moment from 'moment';

export default function BarChart(props) {
    const { list } = props;

    const tagTime = (type, list) => {
        let id = 4;
        if(type.toUpperCase() === 'ONLINE') id = 1;
        else if(type.toUpperCase() === 'MEETING') id = 2;
        else if(type.toUpperCase() === 'TRAINING') id = 3;

        let listTime = list.filter(o => {
            for (const i of o.tags) {
                if(i === id) return true;
            }
        });

        let time = listTime.reduce((sum, o) => sum + moment.duration(o.time_spent).asSeconds(), 0)
        return Number((time/3600).toFixed(3));
    }

    let onlineTime = tagTime('Online', list),
        meetingTime = tagTime('Meeting', list),
        trainingTime = tagTime('Training', list),
        codingTime = tagTime('Coding', list);

    const data = {
        labels: ['Online', 'Meeting', 'Training', 'Coding'],
        datasets: [
            {
                data: [onlineTime, meetingTime, trainingTime, codingTime],

                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)'
                ],

                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],

                borderWidth: 1,
                hoverOffset: 4
            },
        ],
    };

    const options = {
        indexAxis: 'y',
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
    };

    return (
        <Bar data={data} options={options} />
    )
}
