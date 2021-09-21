import React, { useState } from 'react'
import PropTypes from 'prop-types'
import '../../style/tasks.scss'
import Swal from 'sweetalert2'
import Search from './Search'
import {
  formatDay,
  formatTime,
  formatTimeSpent,
  renderTags,
  handleClickTimeFormat
} from '../../js/FormatFunction'
import { addTasks, removeTasks, updateTasks } from '../../api/api'
import moment from 'moment'
Tasks.propTypes = {
  task: PropTypes.array.isRequired
}

function Tasks (props) {
  const { task } = props
  const [filterDay, setFilterDay] = useState(null)
  return (
    <>
      <div className='search-date'>
        <h5>Date Filter</h5>

        <Search filterDay={e => setFilterDay(e)} />
      </div>
      {!filterDay
        ? task.map((item, index) => {
            return (
              <div key={index} className='task-control'>
                <p className='format-date'>{formatDay(item.date)}</p>
                <ul className='list-group'>
                  {item.tasks.map((e, index, arr) => {
                    return (
                      <li key={index} className='task-control--box'>
                        <div className='my-task-inside'>
                          <div className='description'>
                            {arr[index].description}
                          </div>

                          <div>
                            <i className='fas fa-tags me-2'></i>
                            {renderTags(arr[index])}
                          </div>
                          <div>
                            {formatTime(arr[index].start_time)}-
                            {arr[index].end_time
                              ? formatTime(arr[index].end_time)
                              : ' loading'}
                          </div>
                          <div>
                            {arr[index].time_spent
                              ? arr[index].time_spent
                              : ' loading '}
                          </div>
                          <div className='dropdown'>
                            <i className='fas fa-ellipsis-v'></i>
                            {/* Start ul */}
                            <ul className='dropdown-menu'>
                              <li className='dropdown-item'>
                                {arr[index].end_time ? (
                                  <p
                                    className='drop-item'
                                    onClick={() => {
                                      addTasks({
                                        description: arr[index].description,
                                        start_time: handleClickTimeFormat(),
                                        end_time: null,
                                        time_spent: null,
                                        tags: arr[index].tags,
                                        status: 0
                                      })
                                    }}
                                  >
                                    Start
                                  </p>
                                ) : (
                                  <p
                                    className='drop-item'
                                    onClick={() => {
                                      let now = moment(arr[index].start_time)
                                      let end = moment(new Date())
                                      let duration = moment.duration(
                                        end.diff(now)
                                      )
                                      let days = duration.asDays()
                                      let mins = days * 1440
                                      updateTasks(arr[index].id, {
                                        end_time: moment(
                                          new Date(),
                                          'MM-DD-YYYY HH:mm:ss',
                                          true
                                        ).format('YYYY-MM-DD HH:mm:ss'),
                                        time_spent: formatTimeSpent(mins),
                                        status: 1
                                      })
                                    }}
                                  >
                                    Stop
                                  </p>
                                )}
                              </li>{' '}
                              <li
                                className='drop-item'
                                onClick={() => {
                                  const quest = Swal.fire({
                                    title: 'Do you want delete this task?',
                                    showDenyButton: true,
                                    showCancelButton: true,
                                    confirmButtonText: `Yes`,
                                    denyButtonText: `No`
                                  }).then(result => {
                                    if (result.isConfirmed) {
                                      Swal.fire(
                                        'You have deleted this task' +
                                          ' ' +
                                          arr[index].description +
                                          '',
                                        '',
                                        'success'
                                      )
                                      quest && removeTasks(arr[index].id)
                                    } else if (result.isDenied) {
                                      Swal.fire(
                                        'You have not delete task',
                                        '',
                                        'info'
                                      )
                                    }
                                  })
                                }}
                              >
                                <p className='dropdown-item'>Delete</p>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })
        : task.map((item, id) => {
            if (formatDay(item.date) === filterDay) {
              return (
                <div key={id} className='task-control'>
                  <p className='format-date'>{filterDay}</p>
                  <ul className='list-group'>
                    {item.tasks.map((e, index, arr) => {
                      return (
                        <li key={index} className='task-control--box'>
                          <div className='my-task-inside'>
                            <div className='description'>
                              {arr[index].description}
                            </div>

                            <div>
                              <i className='fas fa-tags me-2'></i>
                              {renderTags(arr[index])}
                            </div>
                            <div>
                              {formatTime(arr[index].start_time)}-
                              {arr[index].end_time
                                ? formatTime(arr[index].end_time)
                                : ' loading'}
                            </div>
                            <div>
                              {arr[index].time_spent
                                ? arr[index].time_spent
                                : ' loading '}
                            </div>
                            <div className='dropdown'>
                              <i className='fas fa-ellipsis-v'></i>
                              {/* Start ul */}
                              <ul className='dropdown-menu'>
                                <li className='dropdown-item'>
                                  {arr[index].end_time ? (
                                    <p
                                      className='drop-item'
                                      onClick={() => {
                                        addTasks({
                                          description: arr[index].description,
                                          start_time: handleClickTimeFormat(),
                                          end_time: null,
                                          time_spent: null,
                                          tags: arr[index].tags,
                                          status: 0
                                        })
                                      }}
                                    >
                                      Start
                                    </p>
                                  ) : (
                                    <p
                                      className='drop-item'
                                      onClick={() => {
                                        let now = moment(arr[index].start_time)
                                        let end = moment(new Date())
                                        let duration = moment.duration(
                                          end.diff(now)
                                        )
                                        let days = duration.asDays()
                                        let mins = days * 1440
                                        updateTasks(arr[index].id, {
                                          end_time: moment(
                                            new Date(),
                                            'MM-DD-YYYY HH:mm:ss',
                                            true
                                          ).format('YYYY-MM-DD HH:mm:ss'),
                                          time_spent: formatTimeSpent(mins),
                                          status: 1
                                        })
                                      }}
                                    >
                                      Stop
                                    </p>
                                  )}
                                </li>{' '}
                                <li
                                  className='drop-item'
                                  onClick={() => {
                                    const quest = Swal.fire({
                                      title: 'Do you want delete this task?',
                                      showDenyButton: true,
                                      showCancelButton: true,
                                      confirmButtonText: `Yes`,
                                      denyButtonText: `No`
                                    }).then(result => {
                                      if (result.isConfirmed) {
                                        Swal.fire(
                                          'You have deleted this task' +
                                            ' ' +
                                            arr[index].description +
                                            '',
                                          '',
                                          'success'
                                        )
                                        quest && removeTasks(arr[index].id)
                                      } else if (result.isDenied) {
                                        Swal.fire(
                                          'You have not delete task',
                                          '',
                                          'info'
                                        )
                                      }
                                    })
                                  }}
                                >
                                  <p className='dropdown-item'>Delete</p>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            }
          })}
    </>
  )
}

export default Tasks
