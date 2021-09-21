import React from 'react'
import Day52 from './Day5_2'
export default function Day5(props) {
  return (
    <>
      <>
        <p className="mt-3 mb-0"><b>{props.dateDay.split(" ")[0]}</b></p>
        {props.lisTasksDay.map(item => {
          return <Day52
            key={item.id}
            id={item.id}
            description={item.description}
            tagss={item.tags}
            tags={props.tags}
            start_time={item.start_time}
            end_time={item.end_time}
            time_spent={item.time_spent}
            setiddelete={props.setiddelete}
            statusLockUp={props.statusLockUp}
            deleteTaskToday={props.deleteTaskToday}
          ></Day52>
        })}
      </>
    </>
  )
}
