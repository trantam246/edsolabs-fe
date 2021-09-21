import './style.css';
import React from 'react'
import { Row } from 'reactstrap';
import Day from './Day';

export default function Today(props) {

    var today = new Date();
    var mon = (today.getMonth() + 1) >= 10 ? (today.getMonth() + 1) : "0" + (today.getMonth() + 1)
    var day = (today.getDate() + 1) >= 10 ? today.getDate() : "0" + today.getDate()
    const dateToday = today.getFullYear() + '-' + mon + '-' + day;

    return (
        <>
            <p><b>Today</b></p>
            <Row className=" border pt-2 pb-2 ms-3 me-3 pe-4 ps-4">
                {props.today.map((item,index) => {
                    if (item.start_time.split(" ")[0] === dateToday) {
                        return <Day key={index}
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
                        ></Day>

                    }
                })}
            </Row>
        </>
    )
}
