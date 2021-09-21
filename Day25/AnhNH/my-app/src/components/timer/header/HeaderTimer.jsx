import React, { useRef, useState } from 'react'
import { Col, Form, Input, Row } from 'reactstrap'
import CheckBox from './checkbox/CheckBox'
import Play from './play/Play'
import Stopwatch from './stopwatch/Stopwatch'

export default function HeaderTimer(props) {
    const onChange = (e) => {
        props.takeDateHeaderInput(e.target.value)
    }
    const [timer, setTimer] = useState(0)
    const countRef = useRef(null)
    const handleStart = () => {
        countRef.current = setInterval(() => {
            setTimer((timer) => timer + 1)
        }, 1000)
    }
    const handleStop = () => {
        clearInterval(countRef.current)
        setTimer(0)
    }

    return (
        <>
            <Row className="border-bottom p-5 align-items-center">
                    <Col className=" col-lg-6 col-xs-12">
                        <Input type="text" id="examplePassword" className="border-0 shadow-none fs-1" defaultValue="What are you working on ?" onChange={onChange} />
                    </Col>
                    <Col className="col-lg-6 col-xs-12 justify-content-end d-flex align-items-center">
                        <span>
                            <CheckBox tags={props.tags} takeDateHeaderTag={props.takeDateHeaderTag}></CheckBox>
                        </span>
                        <span className="fs-1 ps-4 pe-4"><Stopwatch timer={timer}></Stopwatch></span>
                        <Play takeStartTime={props.takeStartTime}
                            takeEndTime={props.takeEndTime}
                            handleStart={handleStart}
                            handleStop={handleStop}
                            timer={timer}
                            lockUp={props.lockUp}
                        ></Play>
                    </Col>

            </Row>
        </>
    )
}
