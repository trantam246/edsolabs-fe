import React, { useState, useEffect } from 'react';
import Header from "../UI/Header"
import BarChart from "./BarChart"
import DoughnutChart from "./DoughnutChart"
import Main from '../UI/Main'
import { makeStyles } from "@material-ui/core/styles"
import taskApi from "../../apis/taskApi"
import dayjs from "dayjs"
import FilterOptions from './FilterOptions';
import FilterOptions from './FilterOptions';

const useStyles = makeStyles(() => ({
  main__header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}))
const ReportPage = (props) => {
  const classes = useStyles()
  const [data, setData] = useState([])
  const fetchTask = () => {
    try {
      taskApi.getTask().then((res) => {
        setData(res)
      })
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    fetchTask()
  }, [])

  const timerTask =
    data.map((o) => {
      const spentTime = Date.parse(o.end_time) - Date.parse(o.start_time)
      return {
        id: o.id,
        start_time: o.start_time,
        total_time: data.reduce(
          (pre, cur) =>
            pre + (Date.parse(cur.end_time) - Date.parse(cur.start_time)),
          0
        ),
        online: o.tags.includes(1) ? spentTime / o.tags.length : 0,
        meeting: o.tags.includes(2) ? spentTime / o.tags.length : 0,
        training: o.tags.includes(3) ? spentTime / o.tags.length : 0,
        coding: o.tags.includes(4) ? spentTime / o.tags.length : 0,
      }
    })
  const filterToday = timerTask.filter(t => dayjs(t.start_time).format("DD/MM/YYYY") === dayjs()
    .format("DD/MM/YYYY"))
  const valueFilterToday = filterToday.map(o => ({
    totalTime: o.total_time,
    online: filterToday.reduce((pre, cur) => (pre + cur.online), 0),
    meeting: filterToday.reduce((pre, cur) => pre + cur.meeting, 0),
    training: filterToday.reduce((pre, cur) => pre + cur.training, 0),
    coding: filterToday.reduce((pre, cur) => pre + cur.coding, 0),
  }))[0]

  return (
    <>
      <Header>Productivity report</Header>
      <Main className={classes.main__header}>
        <DoughnutChart today={valueFilterToday} />
        <BarChart today={valueFilterToday} />
        <FilterOptions />
      </Main>
    </>
  )
}

export default ReportPage
