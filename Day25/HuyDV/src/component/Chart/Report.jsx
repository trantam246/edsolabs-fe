import React, { useEffect, useState } from 'react'
import { Wrap, ActionTasked, Content, Flex, Item } from './style';
import PieChart from '../PieChart/PieChart';
import ColumnChart from '../ColumnChart/ColumnChart';
import SelectList from '../SelectListGetWeek/SelectList';
import { GET_CURRENT_WEEK, GET_LAST_MONTH, GET_LAST_WEEK, GET_THIS_MONTH, GET_TODAY, GET_YESTERDAY } from './momentTimer';


const Report = ({ LsTask, LsTag }) => {
    const arrList = ['Today', 'Yesterday', 'This week', 'Last week', 'This month', 'Last month', 'Date range']

    const [sumTimer, setSumTimer] = useState(0);
    const [timerTag, setTimerTag] = useState([]);
    const [isReset, setIsReset] = useState(false);
    const [listSelect, setListSelect] = useState('Today')
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);

    const handleChangeDateRange = async (value) => {
        await setState(value);
        await setListSelect('Date range');
        await setIsReset(!isReset)
    }

    const handleChangeSelecter = (value) => {
        setListSelect(value)
        setIsReset(!isReset)
    }

    useEffect(() => {
        if (listSelect === 'Today') {
            setSumTimer(formatTime(getTotalTimer(GET_TODAY)))
            setTimerTag(getTimerTag(GET_TODAY))
        } else if (listSelect === 'Yesterday') {
            setSumTimer(formatTime(getTotalTimer(GET_YESTERDAY)))
            setTimerTag(getTimerTag(GET_YESTERDAY))
        } else if (listSelect === 'This week') {
            setSumTimer(formatTime(getTotalTimer(GET_CURRENT_WEEK)))
            setTimerTag(getTimerTag(GET_CURRENT_WEEK))
        }
        else if (listSelect === 'Last week') {
            setSumTimer(formatTime(getTotalTimer(GET_LAST_WEEK)))
            setTimerTag(getTimerTag(GET_LAST_WEEK))
        }
        else if (listSelect === 'This month') {
            setSumTimer(formatTime(getTotalTimer(GET_THIS_MONTH)))
            setTimerTag(getTimerTag(GET_THIS_MONTH))
        }
        else if (listSelect === 'Last month') {
            setSumTimer(formatTime(getTotalTimer(GET_LAST_MONTH)))
            setTimerTag(getTimerTag(GET_LAST_MONTH))
        }
        else if (listSelect === 'Date range') {
            state.map((item) => {
                let dateStart = new Date(item.startDate).getDate();
                let dateEnd = new Date(item.endDate).getDate();
                let monthStart = new Date(item.startDate).getMonth() + 1;
                let monthEnd = new Date(item.endDate).getMonth() + 1;
                let sum = 0;
                const percentTag = { online: 0, meeting: 0, training: 0, coding: 0 };
                LsTask.map((task) => {
                    let dateTask = new Date(task.start_time).getDate();
                    let monthTask = new Date(task.start_time).getMonth() + 1;
                    if (
                        dateStart <= dateTask &&
                        dateEnd >= dateTask &&
                        monthStart <= monthTask &&
                        monthEnd >= monthTask
                    ) {
                        sum += Number(task.time_spent);
                        const getTime = changeTimer(task.time_spent);
                        if (task.tags.length !== 0) {
                            const getSecond = Number(getTime / task.tags.length);
                            task.tags.forEach((x) => {
                                if (x === 1) {
                                    percentTag.online += getSecond;
                                }
                                if (x === 2) {
                                    percentTag.meeting += getSecond;
                                }
                                if (x === 3) {
                                    percentTag.training += getSecond;
                                }
                                if (x === 4) {
                                    percentTag.coding += getSecond;
                                }
                            });
                        }
                    }
                });
                const sumTagMinute =
                    percentTag.online +
                    percentTag.meeting +
                    percentTag.training +
                    percentTag.coding;
                const percentTags = [
                    { id: 1, name: 'Online', time: (percentTag.online / sumTagMinute) * 100 },
                    { id: 2, name: 'Meeting', time: (percentTag.meeting / sumTagMinute) * 100 },
                    { id: 3, name: 'Training', time: (percentTag.training / sumTagMinute) * 100 },
                    { id: 4, name: 'Coding', time: (percentTag.coding / sumTagMinute) * 100 },
                ];
                setTimerTag(percentTags);
                setSumTimer(formatTime(sumTagMinute));
            });
        }
    }, [isReset])


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
        return output;
    };

    const formatTime = (value) => {
        const formatValue = Math.floor(value)
        const getSeconds = `0${(formatValue % 60)}`.slice(-2)
        const minutes = `${Math.floor(formatValue / 60)}`
        const getMinutes = `0${minutes % 60}`.slice(-2)
        const getHours = `${Math.floor(formatValue / 3600)}`.slice(-2)

        return `${Number(getHours) > 0 ? getHours + ' giờ :' : ''}  ${Number(getMinutes) > 0 ? getMinutes + ' phút :' : ''}  ${getSeconds} giây`
    }

    const changeTimer = (value) => {
        if (value) {
            value = value.trim();
            const checkHour = value.includes('giờ');
            const checkMinute = value.includes('phút');
            const checkSecond = value.includes('giây');
            if (checkHour) {
                const getHour = Number(value.split('giờ')[0])
                const hourToSecond = getHour * 3600;
                if (checkMinute) {
                    const getMinu = Number(value.split('phút')[0].split('giờ')[1])
                    const minuToSecond = getMinu * 60;
                    if (checkSecond) {
                        const getSecond = Number(value.split('giây')[0].split('phút')[1])
                        const minus = getSecond;
                        return hourToSecond + minuToSecond + minus
                    }
                    else {
                        return hourToSecond + minuToSecond
                    }
                }
                else {
                    if (checkSecond) {
                        const getSecond = Number(value.split('giây')[0].split('phút')[1])
                        const minus = getSecond;
                        return hourToSecond + minus
                    }
                    else {
                        return hourToSecond
                    }
                }
            } else {
                if (checkMinute) {
                    const getMinu = Number(value.split('phút')[0])
                    const minuToSecond = getMinu * 60;
                    if (checkSecond) {
                        const getSecond = Number(value.split('giây')[0].split('phút')[1])
                        const minus = getSecond;
                        return minuToSecond + minus
                    }
                    else {
                        return minuToSecond
                    }
                }
                else {
                    if (checkSecond) {
                        const getSecond = Number(value.split('giây')[0])
                        return getSecond
                    }
                    else {
                        return 0
                    }
                }
            }
        } else {
            return 0
        }
    }

    const getTotalTimer = (listDate) => {
        const listTasks = processDayGroup(LsTask);
        return listDate().reduce((listTotal, dateTimer) => {
            return listTotal = listTotal + listTasks.reduce((total, item) => {
                const date = item.date.split(' ')[0];
                if (date === dateTimer) {
                    return total = total + item.tasks.reduce((sum, item) => {
                        return sum = sum + changeTimer(item.time_spent)
                    }, 0)
                }
                else {
                    return total = total + 0
                }
            }, 0)
        }, 0)
    }

    const getTimerTag = (listDate) => {
        const arr = []
        if (LsTask.length > 0) {
            const listTasks = processDayGroup(LsTask);
            listDate().forEach((item) => {
                listTasks.forEach((task) => {
                    const date = task.date.split(' ')[0];
                    if (date === item) {
                        task.tasks.forEach((tasks) => {
                            const listTag = []
                            tasks.tags.forEach((e) => {
                                LsTag.forEach((tags) => {
                                    if (e === tags.id) {
                                        listTag.push({
                                            id: e,
                                            name: tags.name
                                        })
                                    }
                                })
                            })
                            if (listTag.length > 0) {
                                listTag.forEach((e) => {
                                    if (arr.length > 0) {
                                        arr.forEach((i) => {
                                            const finder = arr.find((item) => {
                                                return item.id === e.id
                                            })
                                            const isArr = arr.includes((finder))
                                            if (isArr) {
                                                if (i.id === e.id) {
                                                    i.time = (i.time + changeTimer(tasks.time_spent) / listTag.length)
                                                }
                                            }
                                            else {
                                                arr.push(
                                                    {
                                                        id: e.id,
                                                        name: e.name,
                                                        time: changeTimer(tasks.time_spent) / listTag.length
                                                    }
                                                )
                                            }
                                        })
                                    }
                                    else {
                                        arr.push({
                                            id: e.id,
                                            name: e.name,
                                            time: changeTimer(tasks.time_spent) / listTag.length
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            })
        }

        return arr;
    }



    return (
        <Wrap>
            <ActionTasked>
                <h2>Productivity report</h2>
            </ActionTasked>
            <Content>
                <Flex>
                    <h3>This week: {sumTimer}</h3>
                    <Flex>
                        <SelectList
                            handleChangeDateRange={handleChangeDateRange}
                            state={state}
                            sumTimer={sumTimer}
                            handleChangeSelecter={handleChangeSelecter}
                            listSelect={listSelect}
                            arrList={arrList}
                        />
                    </Flex>
                </Flex>
                <Flex>
                    <Item col={40}>
                        <PieChart timerTag={timerTag} />
                    </Item>
                    <Item col={60}>
                        <ColumnChart timerTag={timerTag} />
                    </Item>
                </Flex>
            </Content>
        </Wrap>
    )
}

export default Report
