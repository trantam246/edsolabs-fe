import { Bar } from "react-chartjs-2"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(() => ({
  bar__chart: {
    width: "50%",
    float: "right",
    marginTop: "10rem",
    },
    
}))

const BarChart = (props) => {
  const classes = useStyles()

  return (
    <div className={classes.bar__chart}>
      <Bar
        data={{
          labels: ["Online", "Meeting", "Training", "Coding"],
          datasets: [
            {
              label: "Seconds",
              axis: "y",
              data: [
                props.today?.online / 1000,
                props.today?.meeting / 1000,
                props.today?.training / 1000,
                props.today?.coding / 1000,
              ],
              fill: false,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
              ],
              borderWidth: 1,
            },
          ],
        }}
        // height={10}
        // width={50%}
        options={{
          indexAxis: "y",
          maintainAspectRatio: false,
        }}
      />
    </div>
  )
}
export default BarChart
