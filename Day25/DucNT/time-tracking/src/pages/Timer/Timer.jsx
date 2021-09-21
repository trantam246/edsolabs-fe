import React, { useEffect, useState, useRef } from 'react'
import Tasks from './Tasks'
import {
  TIME_DAY,
  handleClickTimeFormat,
  chooseTag
} from '../../js/FormatFunction'
import Sidebar from '../../components/Sidebar/Sidebar'
import { getTasks, getTags, updateTasks } from '../../api/api'
import '../../style/timer.scss'
import Swal from 'sweetalert2'
import axios from 'axios'
function Timer (props) {
  const [time, setTime] = useState(0)
  const [timeOn, setTimeOn] = useState(false)
  const [online, setOnline] = useState(false)
  const [meeting, setMeeting] = useState(false)
  const [training, setTraining] = useState(false)
  const [coding, setCoding] = useState(false)
  const [mytags, setTags] = useState('')
  const [mytask, setTasks] = useState('')
  const [myjob, setJobs] = useState('')
  const ref = useRef()
  // Làm đồng hồ bấm thời gian start-stop
  // DucNT 17.9.2021
  useEffect(() => {
    let interval = null
    if (timeOn) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1000)
      }, 1000)
    } else {
      clearInterval(interval)
    }

    return () => {
      setTime(0)
      clearInterval(interval)
    }
  }, [timeOn])

  // Gọi axios API render dữ liệu lần đầu với tags
  // DucNT 17.9.2021
  useEffect(() => {
    getTags()
      .then(e => e.data)
      .then(data => setTags(data))
      .catch(err => err)
      .finally(done => done)
  }, [])
  // Gọi axios API render dữ liệu lần đầu với tasks
  // DucNT 17.9.2021
  useEffect(() => {
    getTasks()
      .then(e => e.data)
      .then(data => {
        return setTasks(data)
      })
      .catch(err => err)
      .finally(done => done)

    return getTasks
  }, [])

  return (
    <div className='timers'>
      <aside>
        <Sidebar />
      </aside>
      <div className='content-right'>
        <header>
          <div className='header-right'>
            <div className='header-right--text'>
              <input
                type='text'
                placeholder='What are you working on ?'
                className='header-right--input'
                ref={ref}
                value={myjob}
                onChange={e => setJobs(e.target.value)}
              />
            </div>
            <div className='header-right--clock'>
              <nav>
                <ul>
                  <li>
                    <a href='#'>
                      <i className='fas fa-tags header-right--clock---start'></i>
                    </a>
                    {typeof mytags === 'object' && (
                      <ul className='dropdowm-menu'>
                        <li
                          onClick={() => setOnline(!online)}
                          className='dropdown-item'
                        >
                          {online && <i className='fas fa-check'></i>}
                          {mytags[0].name}
                        </li>
                        <li
                          onClick={() => setMeeting(!meeting)}
                          className='dropdown-item'
                        >
                          {meeting && <i className='fas fa-check'></i>}
                          {mytags[1].name}
                        </li>
                        <li
                          onClick={() => setTraining(!training)}
                          className='dropdown-item'
                        >
                          {training && <i className='fas fa-check'></i>}
                          {mytags[2].name}
                        </li>
                        <li
                          onClick={() => setCoding(!coding)}
                          className='dropdown-item'
                        >
                          {coding && <i className='fas fa-check'></i>}
                          {mytags[3].name}
                        </li>
                      </ul>
                    )}
                  </li>
                </ul>
              </nav>
              <h1>
                <span>
                  {('0' + Math.floor((time / 3600000) % 60)).slice(-2)}:
                </span>
              </h1>
              <h1>
                <span>
                  {('0' + Math.floor((time / 60000) % 60)).slice(-2)}:
                </span>
              </h1>
              <h1>
                <span>{('0' + Math.floor((time / 1000) % 60)).slice(-2)}</span>
              </h1>
              {!timeOn ? (
                <i
                  type='button'
                  className='fas fa-play-circle header-right--clock---start-1'
                  // Nếu không chọn tag nào sẽ cảnh báo
                  // DucNT 18.9.2021
                  onClick={() => {
                    if (!online && !meeting && !training && !coding) {
                      Swal.fire(
                        'Check!',
                        'You must choose at least one tag !',
                        'warning'
                      )
                      return
                    } else if (ref.current.value.trim() === '') {
                      Swal.fire(
                        'Check!',
                        'You must entered your working day !',
                        'warning'
                      )
                      return
                    }

                    // Sau khi chọn xong sẽ reset lại để chọn task tiếp theo
                    // DucNT 18.9.2021
                    setOnline(false)
                    setMeeting(false)
                    setTraining(false)
                    setCoding(false)
                    axios({
                      method: 'post',
                      url: `${process.env.REACT_APP_TASKS}`,
                      data: {
                        description: myjob,
                        start_time: handleClickTimeFormat(),
                        end_time: null,
                        time_spent: null,
                        tags: chooseTag(online, meeting, training, coding),
                        status: 0
                      }
                    })
                      .then(() => {
                        getTasks()
                          .then(e => e.data)
                          .then(data => {
                            return setTasks(data)
                          })
                      })
                      .catch(error => console.error(error))
                    setTimeOn(true)
                    setJobs('')
                  }}
                ></i>
              ) : (
                <i
                  className='fas fa-stop-circle header-right--clock---stop'
                  onClick={() => {
                    updateTasks(mytask.length, {
                      end_time: handleClickTimeFormat(),
                      time_spent: `${Math.floor((time / 60000) * 100) /
                        100} mins`,
                      status: 1
                    })
                      .then(() => {
                        getTasks()
                          .then(e => e.data)
                          .then(data => {
                            return setTasks(data)
                          })
                      })
                      .catch(error => console.error(error))
                    setTimeOn(false)
                  }}
                ></i>
              )}
            </div>
          </div>
        </header>
        <section className='main-content'>
          {typeof mytask === 'object' && (
            <Tasks task={TIME_DAY(mytask).reverse()} className='task-content' />
          )}
        </section>
      </div>
    </div>
  )
}

export default Timer
