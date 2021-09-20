import React, { useEffect, useState } from 'react'
import { Col, Row } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { MenuItem, Select } from '@material-ui/core'
import { FormControl } from '@material-ui/core';
import Chartpie from './Chartpie';
import ChartBar from './ChartBar';
import moment from 'moment';
moment().format();
export default function Report(props) {
    document.title = 'Report';
    //modal
    const { className } = props;
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    //select
    const [age, setAge] = useState('');
    //render lên biểu đồ
    const [dataRender, setdataRender] = useState([])
    //api hôm nay
    const [dataSum, setdataSum] = useState([])
    const [hoursSum, sethoursSum] = useState(0)
    const [tag, settag] = useState([])
    const [timeStartEnd, settimeStartEnd] = useState({
        start: "",
        end: ""
    })
    useEffect(() => {
        //lấy api tổng
        fetch(`${process.env.REACT_APP_URL}tasks`)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                setdataSum(res)
            })
        // lấy api thẻ tag
        fetch(`${process.env.REACT_APP_URL}tags`)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                settag(res)
            })
    }, [])
    // xử lý ngày
    const handleday = (dateValue) => {
        const arrToDay = []
        //xử lý lấy ngày theo yêu cầu
        dataSum.map(e => {
            if (e.start_time.split(" ")[0] === dateValue) {
                arrToDay.push(e)
            }
        })
        //sử lý lấy tag + h của tag
        const arrrrr = []
        arrToDay.map(e => {
            e.tags.map(el => {
                arrrrr.push({ tags: el, time: Number(e.time_spent.split(" ")[0]) / e.tags.length })
            })
        })
        //tổng thời gian theo yêu cầu
        let sum = arrrrr.reduce((previousValue, currentValue) => previousValue + currentValue.time, 0)
        sethoursSum(sum)
        //gộp time cảu tag
        //lấy ra dộ số tags
        const arrayTagsTeam = []
        arrrrr.map(e => arrayTagsTeam.push(e.tags))
        const countArrayTagsTeam = [...new Set(arrayTagsTeam)]
        //gộp cái tag giống nhau vào 1
        let newArr = [];
        for (let i = 1; i <= countArrayTagsTeam.length; i++) {
            let subArr = [];
            arrrrr.forEach(item => {
                if (item.tags === i) {
                    subArr.push(item);
                }
            })
            newArr.push(subArr);
        }
        //tạo id và tính tổng của từng tags
        const outPutDataRender = newArr.map((e) => ({
            idTagsName: e[0].tags,
            sumTimeEnd: e.reduce((previousValue, currentValue) => previousValue + currentValue.time, 0)
        }))
        setdataRender(outPutDataRender)
    }
    // xử lý list ngày
    const handlelistDay = (listdateValue) => {
        const arrToDay = []
        //xử lý lấy ngày theo yêu cầu
        dataSum.map(e => {
            return listdateValue.map(el => {
                if (e.start_time.split(" ")[0] === el) {
                    arrToDay.push(e)
                }
            })
        })
        //sử lý lấy tag + h của tag
        const arrrrr = []
        arrToDay.map(e => {
            e.tags.map(el => {
                arrrrr.push({ tags: el, time: Number(e.time_spent.split(" ")[0]) / e.tags.length })
            })
        })
        //tổng thời gian theo yêu cầu
        let sum = arrrrr.reduce((previousValue, currentValue) => previousValue + currentValue.time, 0)
        sethoursSum(sum)
        //gộp time cảu tag
        //lấy ra dộ số tags
        const arrayTagsTeam = []
        arrrrr.map(e => arrayTagsTeam.push(e.tags))
        const countArrayTagsTeam = [...new Set(arrayTagsTeam)]
        //gộp cái tag giống nhau vào 1
        let newArr = [];
        for (let i = 1; i <= countArrayTagsTeam.length; i++) {
            let subArr = [];
            arrrrr.forEach(item => {
                if (item.tags === i) {
                    subArr.push(item);
                }
            })
            newArr.push(subArr);
        }
        //tạo id và tính tổng của từng tags
        const outPutDataRender = newArr.map((e) => ({
            idTagsName: e[0].tags,
            sumTimeEnd: e.reduce((previousValue, currentValue) => previousValue + currentValue.time, 0)
        }))
        setdataRender(outPutDataRender)
    }
    const takeListDayThisWeek = () => {
        var weekStart = moment(moment().startOf('isoweek')).format('YYYY-MM-DD');
        var days = [];
        for (var i = 0; i <= 6; i++) {
            days.push(moment(weekStart).add(i, 'days').format('YYYY-MM-DD'));
        }
        return days;
    };

    const takeListDayLastWeek = () => {
        var lastWeekStart = moment(
            moment().startOf('isoweek').subtract(1, 'weeks'),
          ).format('YYYY-MM-DD');
          var days = [];
        
          for (var i = 0; i <= 6; i++) {
            days.push(moment(lastWeekStart).add(i, 'days').format('YYYY-MM-DD'));
          }
        
          return days;
    };
    const onchangeStartEndTime = (time) => {
        let name = time.target.name
        let value = time.target.value
        settimeStartEnd({ ...timeStartEnd, [name]: value })
    }
    //xử lý date range 
    const handleRange = () => {
        const arrToDay = []
        //xử lý lấy ngày theo yêu cầu
        dataSum.map(e => {
            if (new Date(e.start_time.split(" ")[0]).getTime() <= new Date(timeStartEnd.end).getTime() && new Date(e.start_time.split(" ")[0]).getTime() >= new Date(timeStartEnd.start).getTime()) {
                arrToDay.push(e)
            }
        })
        //sử lý lấy tag + h của tag
        const arrrrr = []
        arrToDay.map(e => {
            e.tags.map(el => {
                arrrrr.push({ tags: el, time: Number(e.time_spent.split(" ")[0]) / e.tags.length })
            })
        })
        //tổng thời gian theo yêu cầu
        let sum = arrrrr.reduce((previousValue, currentValue) => previousValue + currentValue.time, 0)
        sethoursSum(sum)
        //gộp time cảu tag
        //lấy ra dộ số tags
        const arrayTagsTeam = []
        arrrrr.map(e => arrayTagsTeam.push(e.tags))
        const countArrayTagsTeam = [...new Set(arrayTagsTeam)]
        //gộp cái tag giống nhau vào 1
        let newArr = [];
        for (let i = 1; i <= countArrayTagsTeam.length; i++) {
            let subArr = [];
            arrrrr.forEach(item => {
                if (item.tags === i) {
                    subArr.push(item);
                }
            })
            newArr.push(subArr);
        }
        //tạo id và tính tổng của từng tags
        const outPutDataRender = newArr.map((e) => ({
            idTagsName: e[0].tags,
            sumTimeEnd: e.reduce((previousValue, currentValue) => previousValue + currentValue.time, 0)
        }))
        setdataRender(outPutDataRender)
    }
    //on change 
    const handleChange = (event) => {
        setAge(event.target.value);
        if (event.target.value === 'ToDay') {
            var today = new Date();
            var mon = (today.getMonth() + 1) >= 10 ? (today.getMonth() + 1) : "0" + (today.getMonth() + 1)
            var day = (today.getDate()) >= 10 ? today.getDate() : "0" + today.getDate()
            const dateToday = today.getFullYear() + '-' + mon + '-' + day;
            // handleToday()
            handleday(dateToday)
        }
        else if (event.target.value === 'Yesterday') {
            var todays = new Date();
            var mons = (todays.getMonth() + 1) >= 10 ? (todays.getMonth() + 1) : "0" + (todays.getMonth() + 1)
            var days = (todays.getDate() - 1) >= 10 ? todays.getDate() - 1 : "0" + todays.getDate()
            const Yesterday = todays.getFullYear() + '-' + mons + '-' + days;
            handleday(Yesterday)
        }
        else if (event.target.value === 'Thisweek') {
            handlelistDay(takeListDayThisWeek())
        }
        else if (event.target.value === 'Lastweek') {
            handlelistDay(takeListDayLastWeek())
        }
        else if (event.target.value === 'Thismonth') {
            var Thismonth = new Date();
            var ThisMonth = (Thismonth.getMonth() + 1) >= 10 ? (Thismonth.getMonth() + 1) : "0" + (Thismonth.getMonth() + 1)
            const arrayDataThisMonth = []
            for (let index = 1; index <= 31; index++) {
                // arrayDataThisMonth.push(Thismonth.getFullYear() + '-' + ThisMonth + '-' + index)
                arrayDataThisMonth.push(Thismonth.getFullYear() + '-' + ThisMonth + '-' + (index<10?'0'+index:index))
            }
            handlelistDay(arrayDataThisMonth)
        }
        else if (event.target.value === 'lastmonth') {
            var Thismonths = new Date();
            var ThisMonths = (Thismonths.getMonth()) >= 10 ? (Thismonths.getMonth()) : "0" + (Thismonths.getMonth())
            const arrayDataLastMonth = []
            for (let index = 1; index <= 31; index++) {
                arrayDataLastMonth.push(Thismonths.getFullYear() + '-' + ThisMonths + '-' + (index<10?'0'+index:index))
            }
            handlelistDay(arrayDataLastMonth)
        }
        else {
            sethoursSum(0)
            setdataRender([])
        }
    };

    return (
        <>
            <Row className="border-bottom p-5 align-items-center">
                <Col className="">
                    <h1>Productivity report</h1>
                </Col>
            </Row>
            <Row className="p-5 align-items-center justify-content-lg-between">
                <Col className="col-6 fs-1">
                    {age} : {(hoursSum / 60).toFixed(2)}Hours
                </Col>
                <Col className="col-2">
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <Select
                            variant="outlined"
                            value={age}
                            onChange={handleChange}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value="ToDay" selected>ToDay</MenuItem>
                            <MenuItem value="Yesterday">Yesterday</MenuItem>
                            <MenuItem value="Thisweek">This week</MenuItem>
                            <MenuItem value="Lastweek">Last week</MenuItem>
                            <MenuItem value="Thismonth">This month</MenuItem>
                            <MenuItem value="lastmonth">last month</MenuItem>
                            <MenuItem value="daterange" onClick={toggle}>Date range</MenuItem>
                        </Select>
                    </FormControl>
                </Col>
            </Row>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>nhập khoảng thời gian bạn muốn</ModalHeader>
                <ModalBody>
                    <Col className="d-flex justify-content-between">
                        <span>
                            <p>nhập thời gian bắt đầu</p>
                            <input type="date" name="start" id="" onChange={onchangeStartEndTime} />
                        </span>
                        <span>
                            <p>nhập thời gian kết thúc</p>
                            <input type="date" name="end" id="" onChange={onchangeStartEndTime} />
                        </span>
                    </Col>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => { toggle(); handleRange() }}>Lọc</Button>
                </ModalFooter>
            </Modal>
            <Row className="mt-5 mb-5 p-3 justify-content-around">
                <Col lg="3" className="pb-5">
                    <Chartpie dataRender={dataRender} tag={tag}></Chartpie>
                </Col>
                <Col lg="5" className="pb-5">
                    <ChartBar dataRender={dataRender} tag={tag}></ChartBar>
                </Col>
            </Row>
        </>
    )
}
