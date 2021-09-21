import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import '../../style/report.scss'
import { getTasks } from '../../api/api'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import {
  TIME_DAY,
  durationMins2Days,
  formatTimeSpent,
  formatNowDay,
  getThisWeek,
  getLastWeek,
  getThisMonth,
  getLastMonth
} from '../../js/FormatFunction'
import moment from 'moment'
import BarChart from '../../pages/Report/BarChart'
import PieChart from '../../pages/Report/PieChart'

function Report () {
  const [dateRange, setDateRange] = useState('Options')
  const [data, setData] = useState(false)

  const [totalTimer, setTotalTimer] = useState('Total time in a period')

  const [perO, setPerO] = useState()
  const [perM, setPerM] = useState()
  const [perT, setPerT] = useState()
  const [perC, setPerC] = useState()

  useEffect(() => {
    getTasks()
      .then(e => e.data)
      .then(data => setData(data))
      .catch(err => err)
  }, [])
  let timeO = 0
  let timeM = 0
  let timeT = 0
  let timeC = 0
  const totalTimerInRange = e => {
    setDateRange(e)
    if (
      data &&
      e === 'Today' &&
      formatNowDay(TIME_DAY(data).reverse()[0].date) ===
        formatNowDay(new Date())
    ) {
      let time0 = formatTimeSpent(
        Math.floor(
          TIME_DAY(data)
            .reverse()[0]
            .tasks.map(e => {
              let O = 0
              let M = 0
              let T = 0
              let C = 0
              if (!e.end_time) {
                alert('Exist not completed tasks')
              }
              let d = durationMins2Days(e.start_time, e.end_time)
              let arr = e.tags
              let equally = d / arr.length
              arr.forEach(e => {
                if (e === 1) {
                  O = equally
                  timeO += O
                }
                if (e === 2) {
                  M = equally
                  timeM += M
                }
                if (e === 3) {
                  T = equally
                  timeT += T
                }
                if (e === 4) {
                  C = equally
                  timeC += C
                }
              })
              return d
            })
            .reduce((pre, cur) => pre + cur)
        )
      )
      let sum = timeO + timeM + timeT + timeC
      let perO = timeO / sum
      let perM = timeM / sum
      let perT = timeT / sum
      let perC = timeC / sum
      setPerO(perO)
      setPerM(perM)
      setPerT(perT)
      setPerC(perC)
      setTotalTimer(time0)
    } else if (
      formatNowDay(TIME_DAY(data).reverse()[0].date) !==
      formatNowDay(new Date())
    ) {
      setTotalTimer(0)
      setPerO(0)
      setPerM(0)
      setPerT(0)
      setPerC(0)
    }
    if (data && e === 'Yesterday') {
      let check = TIME_DAY(data).filter(
        e => formatNowDay(e.date) === formatNowDay(moment().add(-1, 'days')._d)
      )
      if (check.length > 0) {
        let time1 = formatTimeSpent(
          Math.floor(
            check[0].tasks
              .map(e => {
                let O = 0
                let M = 0
                let T = 0
                let C = 0
                if (!e.end_time) {
                  alert('Exist not completed tasks')
                }
                let d = durationMins2Days(e.start_time, e.end_time)
                let arr = e.tags
                let equally = d / arr.length
                arr.forEach(e => {
                  if (e === 1) {
                    O = equally
                    timeO += O
                  }
                  if (e === 2) {
                    M = equally
                    timeM += M
                  }
                  if (e === 3) {
                    T = equally
                    timeT += T
                  }
                  if (e === 4) {
                    C = equally
                    timeC += C
                  }
                })
                return d
              })
              .reduce((pre, cur) => pre + cur)
          )
        )
        let sum = timeO + timeM + timeT + timeC
        let perO = timeO / sum
        let perM = timeM / sum
        let perT = timeT / sum
        let perC = timeC / sum
        setPerO(perO)
        setPerM(perM)
        setPerT(perT)
        setPerC(perC)
        setTotalTimer(time1)
      } else {
        setTotalTimer(0)
        setPerO(0)
        setPerM(0)
        setPerT(0)
        setPerC(0)
        return 0
      }
    }
    if (data && e === 'Last week') {
      let totalTimer = TIME_DAY(data)
        .reverse()
        .map(e => {
          let day = formatNowDay(e.date)
          let time0 = 0
          if (getLastWeek().includes(day)) {
            time0 = e.tasks
              .map(o => {
                let d = durationMins2Days(o.start_time, o.end_time)
                let O = 0
                let M = 0
                let T = 0
                let C = 0
                let arr = o.tags
                let equally = d / arr.length
                arr.forEach(u => {
                  if (u === 1) {
                    O = equally
                    timeO += O
                  }
                  if (u === 2) {
                    M = equally
                    timeM += M
                  }
                  if (u === 3) {
                    T = equally
                    timeT += T
                  }
                  if (u === 4) {
                    C = equally
                    timeC += C
                  }
                })
                return d
              })
              .reduce((pre, cur) => pre + cur)
          }
          return time0
        })
        .reduce((pre, cur) => pre + cur)
      let sum = timeO + timeM + timeT + timeC
      let perO = timeO / sum
      let perM = timeM / sum
      let perT = timeT / sum
      let perC = timeC / sum
      setPerO(perO)
      setPerM(perM)
      setPerT(perT)
      setPerC(perC)
      setTotalTimer(formatTimeSpent(Math.floor(totalTimer)))
    }
    if (data && e === 'This week') {
      let totalTimer = TIME_DAY(data)
        .reverse()
        .map(e => {
          let day = formatNowDay(e.date)
          let time0 = 0
          if (getThisWeek().includes(day)) {
            time0 = e.tasks
              .map(o => {
                let d = durationMins2Days(o.start_time, o.end_time)
                let O = 0
                let M = 0
                let T = 0
                let C = 0
                let arr = o.tags
                let equally = d / arr.length
                arr.forEach(u => {
                  if (u === 1) {
                    O = equally
                    timeO += O
                  }
                  if (u === 2) {
                    M = equally
                    timeM += M
                  }
                  if (u === 3) {
                    T = equally
                    timeT += T
                  }
                  if (u === 4) {
                    C = equally
                    timeC += C
                  }
                })
                return d
              })
              .reduce((pre, cur) => pre + cur)
          }
          return time0
        })
        .reduce((pre, cur) => pre + cur)
      let sum = timeO + timeM + timeT + timeC
      let perO = timeO / sum
      let perM = timeM / sum
      let perT = timeT / sum
      let perC = timeC / sum
      setPerO(perO)
      setPerM(perM)
      setPerT(perT)
      setPerC(perC)
      setTotalTimer(formatTimeSpent(Math.floor(totalTimer)))
    }
    if (data && e === 'This month') {
      let totalTimer = TIME_DAY(data)
        .reverse()
        .map(e => {
          let day = formatNowDay(e.date)
          let time0 = 0
          if (getThisMonth().includes(day)) {
            time0 = e.tasks
              .map(o => {
                let d = durationMins2Days(o.start_time, o.end_time)
                let O = 0
                let M = 0
                let T = 0
                let C = 0
                let arr = o.tags
                let equally = d / arr.length
                arr.forEach(u => {
                  if (u === 1) {
                    O = equally
                    timeO += O
                  }
                  if (u === 2) {
                    M = equally
                    timeM += M
                  }
                  if (u === 3) {
                    T = equally
                    timeT += T
                  }
                  if (u === 4) {
                    C = equally
                    timeC += C
                  }
                })
                return d
              })
              .reduce((pre, cur) => pre + cur)
          }
          return time0
        })
        .reduce((pre, cur) => pre + cur)
      let sum = timeO + timeM + timeT + timeC
      let perO = timeO / sum
      let perM = timeM / sum
      let perT = timeT / sum
      let perC = timeC / sum
      setPerO(perO)
      setPerM(perM)
      setPerT(perT)
      setPerC(perC)
      setTotalTimer(formatTimeSpent(Math.floor(totalTimer)))
    }
    if (data && e === 'Last month') {
      let totalTimer = TIME_DAY(data)
        .reverse()
        .map(e => {
          let day = formatNowDay(e.date)
          let time0 = 0
          if (getLastMonth().includes(day)) {
            time0 = e.tasks
              .map(o => {
                let d = durationMins2Days(o.start_time, o.end_time)
                let O = 0
                let M = 0
                let T = 0
                let C = 0
                let arr = o.tags
                let equally = d / arr.length
                arr.forEach(u => {
                  if (u === 1) {
                    O = equally
                    timeO += O
                  }
                  if (u === 2) {
                    M = equally
                    timeM += M
                  }
                  if (u === 3) {
                    T = equally
                    timeT += T
                  }
                  if (u === 4) {
                    C = equally
                    timeC += C
                  }
                })
                return d
              })
              .reduce((pre, cur) => pre + cur)
          }
          return time0
        })
        .reduce((pre, cur) => pre + cur)
      let sum = timeO + timeM + timeT + timeC
      let perO = timeO / sum
      let perM = timeM / sum
      let perT = timeT / sum
      let perC = timeC / sum
      setPerO(perO)
      setPerM(perM)
      setPerT(perT)
      setPerC(perC)
      setTotalTimer(formatTimeSpent(Math.floor(totalTimer)))
    }
  }
  return (
    <div className='report'>
      <Sidebar />
      <div className='content-right'>
        <div className='header-right'>
          <div className='header-right--text---h1'>
            <h1>Productivity Report</h1>
          </div>
        </div>
        <div className='main-content'>
          <section className='main-section'>
            <div>
              <h4>{`${dateRange}: ${totalTimer}`}</h4>
            </div>
            <div className='dropdown'>
              <button
                className='btn btn-secondary dropdown-toggle'
                type='button'
                id='dropdownMenuButton1'
              >
                {dateRange}
              </button>
              <ul
                className='dropdown-menu'
                aria-labelledby='dropdownMenuButton1'
              >
                <li
                  className='border-bottom dropdown-item'
                  onClick={() => totalTimerInRange('Today')}
                >
                  Today
                </li>
                <li
                  className='border-bottom dropdown-item'
                  onClick={() => totalTimerInRange('Yesterday')}
                >
                  Yesterday
                </li>
                <li
                  className='border-bottom dropdown-item'
                  onClick={() => totalTimerInRange('This week')}
                >
                  This week
                </li>
                <li
                  className='border-bottom dropdown-item'
                  onClick={() => totalTimerInRange('Last week')}
                >
                  Last week
                </li>
                <li
                  className='border-bottom dropdown-item'
                  onClick={() => totalTimerInRange('This month')}
                >
                  This month
                </li>
                <li
                  className='border-bottom dropdown-item'
                  onClick={() => totalTimerInRange('Last month')}
                >
                  Last month
                </li>
              </ul>
            </div>

            <div className='pie-chart'>
              <PieChart
                perO={perO}
                perM={perM}
                perT={perT}
                perC={perC}
                width={400}
                height={400}
              />
            </div>
            <div className='bar-chart'>
              <BarChart perO={perO} perM={perM} perT={perT} perC={perC} />
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Report
