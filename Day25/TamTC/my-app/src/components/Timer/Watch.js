/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import { makeStyles } from "@material-ui/core/styles"
import moment from 'moment'
import taskApi from '../../apis/taskApi'
const useStyles = makeStyles(() => ({
    icon: {
        color: 'black',
        width: '20rem',
        fontSize: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative'
    },
    svg: {
        fontSize: '4rem'
    }
}))
const Watch = (props) => {
    const classes = useStyles()
    const [playIcon, setPlayIcon] = useState(true)
    const [time, setTime] = useState({ s: 0, m: 0, h: 0 })
    const [inter, setInter] = useState();
    const [post, setPost] = useState(props.newTask)
    const [id, setId] = useState(0)
    const postTask = async (a) => {
        try {
            await taskApi.addTask(a)
        } catch (error) {
            throw (error)
        }
    }
    const fetchTask = () => {
        try {
            taskApi.getTask().then((res) => {
                setId(res.length)
            })
        } catch (error) {
            throw error
        }
    }
    const updateTask = async (task, id) => {
        try {
            await taskApi.updateTask(task, id)
        } catch (error) {
            throw error
        }
    }
    const start = () => {
        if (props.newTask.description?.trim().length === 0 || props.newTask.tags.length === 0) {
            alert("Điền vào 'What are you working on?' và Chọn ít nhất 1 tag")
            setPlayIcon(playIcon)
        } else {
            playIcon && run();
            const startRun = moment().format('YYYY-MM-DD HH:mm:s')
            const newTask = {
                ...props.newTask,
                start_time: startRun,
                end_time: null,
                time_spent: null,
                status: 0
            }
            setInter(setInterval(run, 1000));
            setPost(newTask)
            postTask(newTask).then(() => props.onLoadTask(newTask)).then(() => fetchTask())
        }

    };

    let updatedS = time.s, updatedM = time.m, updatedH = time.h;
    const run = () => {
        if (updatedM === 60) {
            updatedH++;
            updatedM = 0;
        }
        if (updatedS === 60) {
            updatedM++;
            updatedS = 0;
        }
        updatedS++;
        return setTime({ s: updatedS, m: updatedM, h: updatedH });
    };

    const stop = () => {
        const stopRun = moment().format('YYYY-MM-DD HH:mm:s')
        const spent = `${updatedH}h${updatedM}m${updatedS}s`
        const doneTask = { ...post, id: id, end_time: stopRun, time_spent: spent, status: 1 }
        clearInterval(inter);
        time.s = 0
        time.m = 0
        time.h = 0
        updateTask(doneTask, id).then(() => props.onLoadTask({ ...post, ...doneTask }))

    };
    const handlePlayIcon = () => {
        setPlayIcon(!playIcon)
        playIcon ? start() : stop()
    }
    return (
        <>
            <div>
                <span>{time.h >= 10 ? time.h : "0" + time.h}:</span>
                <span>{time.m >= 10 ? time.m : "0" + time.m}:</span>
                <span>{time.s >= 10 ? time.s : "0" + time.s}</span>
            </div>
            {playIcon ? <PlayCircleFilledIcon className={classes.svg} onClick={handlePlayIcon} /> : <PauseCircleFilledIcon className={classes.svg} onClick={handlePlayIcon} />}
        </>
    )
}
export default Watch
