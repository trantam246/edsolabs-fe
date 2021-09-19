import Header from "../UI/Header"
import BartChart from "./BarChart"
import DoughnutChart from "./DoughnutChart"
import Main from '../UI/Main'
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(() => ({
  main__header: {
    display: 'flex',
    justifyContent: 'space-between',
  }
}))
const ReportPage = (props) => {
  const classes = useStyles()
  return (

    <>
      <Header>Productivity report</Header>
      <Main className={classes.main__header}>
        <DoughnutChart />
        <BartChart />
      </Main>
    </>
  )
}

export default ReportPage
