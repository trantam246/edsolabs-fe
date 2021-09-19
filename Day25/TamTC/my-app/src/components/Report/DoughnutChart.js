import { Doughnut } from "react-chartjs-2"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(() => ({
    doughnut__chart: {
        width: '20%',
    },
    total__week: {
        fontSize: '2rem'
    }
}))
const DoughnutChart = () => {
    const classes = useStyles()

    return (
        <div className={classes.doughnut__chart}>
            <h3 className={classes.total__week}>This week: 30 hours</h3>
            <div >
                <Doughnut
                    data={{
                        labels: ["Online", "Meeting", "Training", "Coding"],
                        datasets: [{
                            label: 'Time',
                            data: [10, 20, 30, 40],
                            backgroundColor: [
                                'rgb(255, 99, 132)',
                                'rgb(54, 162, 235)',
                                'rgb(255, 205, 86)',
                                "rgba(75, 192, 192)",

                            ],
                            hoverOffset: 4
                        }]
                    }}
                />
            </div>
        </div>
    )
}
export default DoughnutChart
