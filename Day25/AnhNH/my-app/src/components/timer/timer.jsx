import React, { useEffect, useState } from 'react'
import HeaderTimer from './header/HeaderTimer';
import DateFilter from './datefilter/DateFilter';
import ListDay from './listday/ListDay';
import Today from './today/Today';
import DataSearch from './datefilter/dataSearch';


export default function Timer() {
    document.title = 'Timer';
    const [tags, settags] = useState([])
    const [today, settoday] = useState([])
    const [dataListDay, setdataListDay] = useState([])
    const [takeDataFilter, settakeDataFilter] = useState("")
    const [keyDelete, setkeyDelete] = useState({})
    const [tasksNew, settasksNew] = useState({
        description: "",
        start_time: "",
        end_time: "",
        time_spent: "",
        tags: [],
        status: ""
    })
    const [statusLockUp, setstatusLockUp] = useState(true)
    useEffect(() => {
        //lấy dữ liệu thẻ tag
        fetch(`${process.env.REACT_APP_URL}tags`)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                settags(res)
            })
        // lấy dữ liệu today
        fetch(`${process.env.REACT_APP_URL}tasks`)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                settoday(res.reverse())
            })
    }, [])
    useEffect(() => {
        fetch(`${process.env.REACT_APP_URL}tasks`)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                const processDayGroup = (input) => {
                    const output = [];
                    input.forEach((item) => {
                        const index = output.findIndex((_item) => {
                            return (
                                new Date(_item.date).toDateString() ===
                                new Date(item.start_time).toDateString()
                            );
                        });
                        if (index === -1) {
                            const newItem = {
                                date: item.start_time,
                                tasks: [],
                            };
                            output.push(newItem);
                            output[output.length - 1].tasks.push(item);
                        } else {
                            output[index].tasks.push(item);
                        }
                    });
                    return output.reverse()
                };
                setdataListDay(processDayGroup(res))
            })
    }, [today])
    //lọc data theo lịch datefilter
    const dataFilter = (value) => {
        settakeDataFilter(value)
    }
    //lấy ra data của ô input
    const takeDateHeaderInput = (value) => {
        settasksNew({ ...tasksNew, description: value })
    }
    //lấy ra data của thẻ tag
    const takeDateHeaderTag = (valueTag) => {
        const value = valueTag
        const idTag = []
        tags.map(el => value.map(e => {
            if (e === el.name) {
                idTag.push(el.id)
            }
        }))
        settasksNew({ ...tasksNew, tags: idTag })
    }
    //lấy start time 
    const takeStartTime = (startTime, valueStatus) => {
        const addTask = `${process.env.REACT_APP_URL}tasks`;
        fetch(addTask,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({ ...tasksNew, start_time: startTime, status: valueStatus ? Number("1") : Number("0") })
            })
            .then((res) => {
                return res.json()
            })
            .then((ress) => {
                setkeyDelete(ress);
                settoday([...today, ress].reverse())
            })
    }
    //lấy end time
    const takeEndTime = (endTime, valueStatus, mins) => {
        const addTask = `${process.env.REACT_APP_URL}tasks/${keyDelete.id}`;
        fetch(addTask,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "PUT",
                body: JSON.stringify({ description: keyDelete.description, start_time: keyDelete.start_time, tags: keyDelete.tags, end_time: endTime, status: valueStatus ? "1" : "0", time_spent: (mins / 60).toFixed(0) + " mins" })
            })
            .then((res) => res.json())
            .then((ress) => { })
        setTimeout(() => {
            fetch(`${process.env.REACT_APP_URL}tasks`)
                .then((res) => res.json())
                .then((ress) => { settoday(ress.reverse()); })
        }, 1)
        settasksNew({
            description: "",
            start_time: "",
            end_time: "",
            time_spent: "",
            tags: [],
            status: ""
        })
    }
    //xóa today
    const deleteTaskToday = (id) => {
        fetch(`${process.env.REACT_APP_URL}tasks/` + id, {
            method: 'DELETE',
        })
        setTimeout(() => {
            fetch("http://localhost:4000/tasks")
                .then((res) => res.json())
                .then((ress) => settoday(ress.reverse()))
        }, 100)
    }
    //trạng thái khóa xóa và start
    const lockUp = (el) => {
        setstatusLockUp(el)
    }
    return (
        <>
            <HeaderTimer
                tags={tags}
                takeDateHeaderInput={takeDateHeaderInput}
                takeDateHeaderTag={takeDateHeaderTag}
                takeStartTime={takeStartTime}
                takeEndTime={takeEndTime}
                lockUp={lockUp}
            >
            </HeaderTimer>
            <DateFilter
                dataFilter={dataFilter}
            ></DateFilter>
            {takeDataFilter === "" ? <>
                <Today
                    today={today}
                    tags={tags}
                    deleteTaskToday={deleteTaskToday}
                    statusLockUp={statusLockUp}
                ></Today>
                <ListDay
                    dataListDay={dataListDay}
                    tags={tags}
                    deleteTaskToday={deleteTaskToday}
                    statusLockUp={statusLockUp}
                ></ListDay>
            </>
                :
                <DataSearch
                    tags={tags}
                    today={today}
                    takeDataFilter={takeDataFilter}
                    dataFilter={dataFilter}
                    statusLockUp={statusLockUp}
                    deleteTaskToday={deleteTaskToday}
                />
            }
        </>
    )
}
