import { IconButton } from '@material-ui/core'
import PlayCircleOutline from '@mui/icons-material/PlayCircleOutline';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { ItemContext } from '../Context/ItemContext';
import moment from 'moment';
import { postItem, updateItem } from '../../service/Task';

export default function Timer(props) {

    const { item, getReload, running, setRunning, setTagsItem } = useContext(ItemContext);

    //set ID cho setInterval
    const timerRef = useRef(null)

    //check validate
    const checkValidate = () => {
        if (item.description == "") {
            alert("Description can't be empty !!!");
            return false;
        }
        else if (item.tags.length == 0) {
            alert("Please choose at least a tag !!!");
            return false
        }
        return true;
    }

    useEffect(() => {

        //lấy DOM
        var hours = document.getElementsByClassName('hours')[0];
        var minutes = document.getElementsByClassName('minutes')[0];
        var seconds = document.getElementsByClassName('seconds')[0];

        if (running === true) {
            //post
            postItem(item, (data) => item.id = data.id);
            //Chạy đồng hồ
            let sec = 0;
            timerRef.current = setInterval(function () {
                sec++;
                seconds.textContent = (`0${sec % 60}`).substr(-2);
                minutes.textContent = (`0${(parseInt(sec / 60)) % 60}`).substr(-2);
                hours.textContent = (`0${parseInt(sec / 3600)}`).substr(-2);
            }, 1000);
        }

        if(running === false && item.id != null) {
            //update
            updateItem(item.id, item);
            //set tagsItem
            setTagsItem([]);
            //Dừng đồng hồ
            clearInterval(timerRef.current)

            seconds.textContent = '00';
            minutes.textContent = '00';
            hours.textContent = '00';
        }
        //set reload state
        getReload();
    }, [running])

    //bấm chạy
    const clickPlay = () => {
        if (checkValidate() == true) {
            //reset
            item.id = null
            item.end_time = null;
            item.time_spent = null;
            item.status = 0;
            //Lấy thời gian start
            item.start_time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
            setRunning(!running);
        }
    }

    //Bấm dừng
    const clickStop = () => {
        if (checkValidate() == true) {
            //Lấy thời gian end
            item.end_time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
            //Tính khoảng thời gian
            var diffTime = moment(item.end_time).diff(item.start_time)
            item.time_spent = moment.utc(diffTime).format("HH:mm:ss");
            item.status = 1;
            setRunning(!running);
        }
    }

    return (
        <>
            <div style={{ marginLeft: '5%', marginRight: '5%' }}>
                <h3>
                    <span className="hours">00</span>:<span className="minutes">00</span>:<span className="seconds">00</span>
                </h3>
            </div>

            {!running &&
                <IconButton component="span" className="buttonHeader" onClick={clickPlay}>
                    <PlayCircleOutline color="primary" fontSize="large" />
                </IconButton>
            }

            {running &&
                <IconButton component="span" className="buttonHeader" onClick={clickStop}>
                    <StopCircleIcon color="error" fontSize="large" />
                </IconButton>
            }
        </>
    )
}
