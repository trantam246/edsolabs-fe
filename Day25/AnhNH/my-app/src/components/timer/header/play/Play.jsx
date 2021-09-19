import React, { useState } from 'react'
import { FaStopCircle } from 'react-icons/fa'
import { GoPlay } from 'react-icons/go'

export default function Play(props) {
  const [statusPlay, setstatusPlay] = useState(true)
  const onClick = () => {
    if (statusPlay) {
      setstatusPlay(false)
      var today = new Date();
      var mon =(today.getMonth()+1)>=10?(today.getMonth()+1):"0"+(today.getMonth()+1)
      var day =(today.getDate()+1)>=10?today.getDate():"0"+today.getDate()
      var date = today.getFullYear()+'-'+mon+'-'+day;
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date+' '+time;
      props.takeStartTime(dateTime,false)
      props.handleStart()
      props.lockUp(false)
    }
    else {
      setstatusPlay(true)
      var todays = new Date();
      var mons =(todays.getMonth()+1)>=10?(todays.getMonth()+1):"0"+(todays.getMonth()+1)
      var days =(todays.getDate()+1)>=10?todays.getDate():"0"+todays.getDate()
      var dates = todays.getFullYear()+'-'+mons+'-'+days;
      var times = todays.getHours() + ":" + todays.getMinutes() + ":" + todays.getSeconds();
      var dateTimes = dates+' '+times;
      props.takeEndTime(dateTimes,true,props.timer)
      props.handleStop()
      props.lockUp(true)

    }
  }
  return (
    <>
      <span onClick={onClick} className="pe-auto" style={{"cursor":"pointer"}}>{statusPlay?<GoPlay size="36"></GoPlay>:<FaStopCircle size="36" color='red'></FaStopCircle>}</span>
    </>
  )
}
