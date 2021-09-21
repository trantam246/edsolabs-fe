import React from 'react'
import './style.css';
import DataSearch2 from './DataSearch2';

export default function DataSearch(props) {
    const onlick = () => {
    const el = ""
    props.dataFilter(el)
  }
  const dateSearch = props.takeDataFilter
  return (
    <>
      {props.today.map((item, index) => {
        if (item.start_time.split(" ")[0] === dateSearch) {
          return <DataSearch2 key={index}
            id={item.id}
            tagss={props.tags}
            tags={item.tags}
            description={item.description}
            start_time={item.start_time}
            time_spent={item.time_spent}
            end_time={item.end_time}
            dateSearch={dateSearch}
            statusLockUp={props.statusLockUp}
            deleteTaskToday={props.deleteTaskToday}
          ></DataSearch2>
        }
      })
      }
      <button type="button" className="btn btn-primary mt-5" onClick={onlick}>back</button>
    </>
  )
}
