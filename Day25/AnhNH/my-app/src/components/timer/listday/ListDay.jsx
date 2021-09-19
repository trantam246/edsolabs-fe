import React, { useState } from 'react'
import './style.css';
import Day5 from './Day5';
import { Col } from 'reactstrap';

export default function ListDay(props) {
    var today = new Date();
    var mon = (today.getMonth() + 1) >= 10 ? (today.getMonth() + 1) : "0" + (today.getMonth() + 1)
    var day = (today.getDate() + 1) >= 10 ? today.getDate() : "0" + today.getDate()
    const dateToday = today.getFullYear() + '-' + mon + '-' + day;
    const [trangthai, settrangthai] = useState(true)
    const arr=[...props.dataListDay]
    return (
        <>
            {trangthai?
                arr.splice(0,6).map((item,index) => {
                    if (item.date.split(" ")[0] !== dateToday) {
                        return <Day5 key={index}
                            dateDay={item.date}
                            lisTasksDay={item.tasks}
                            tags={props.tags}
                            statusLockUp={props.statusLockUp}
                            deleteTaskToday={props.deleteTaskToday}
                        ></Day5>
                    }
                }):props.dataListDay.map((item,index) => {
                    if (item.date.split(" ")[0] !== dateToday) {
                        return <Day5 key={index}
                            dateDay={item.date}
                            lisTasksDay={item.tasks}
                            tags={props.tags}
                            statusLockUp={props.statusLockUp}
                            deleteTaskToday={props.deleteTaskToday}
                        ></Day5>
                    }
                })
            }
            {
            trangthai?<Col className=" col-12 text-center mb-5 mt-3">
                <button onClick={() => { settrangthai(false) }}>load more</button>
            </Col>:""
            }


        </>
    )
}