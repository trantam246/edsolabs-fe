import { Container, Grid, FormControl, Select } from "@material-ui/core";
import { useEffect, useState } from "react";
import BarChart from "../Chart/BarChart";
import PieChart from "../Chart/PieChart";
import SelectDate from "../SelectDate/SelectDate";
import { getAllList } from "../../service/Task";
import moment from "moment";

export default function Report() {

    const [list, setList] = useState([]);

    useEffect(() => {
        getAllList(data => {
            setList([...data]);
        });
    }, []);

    const [select, setSelect] = useState("Today")
    const getSelect = (value) => setSelect(value);

    const listTime = () => {    
        if(select === 'Today') {
            let date = moment().format("DD-MM-YYYY");
            return list.filter(o => moment(o.start_time).format("DD-MM-YYYY") === date)
        }
        else if(select === 'Yesterday') {
            let date = moment().subtract(1, 'day').format("DD-MM-YYYY");
            return list.filter(o => moment(o.start_time).format("DD-MM-YYYY") === date)
        }
    }

    const totalTime = (list) => {
        let time = list.reduce((sum, o) => sum + moment.duration(o.time_spent).asSeconds(), 0)
        return Number((time / 3600).toFixed(3));
    }
    
    return (
        <>
            <Grid item alignItems="center" container style={{ height: '100px', borderBottom: '2px solid black' }}>
                <Container component="h2">Productivity report</Container>
            </Grid>
            <Grid item>
                <Grid component={Container} >
                    <Grid item container alignItems="center" justifyContent="space-between" style={{ height: '100px'}}>
                        <h3>{select}: {totalTime(listTime())} hours</h3>
                        <div>
                            <SelectDate getSelect={getSelect}/>
                        </div>
                    </Grid>
                    <Grid item alignItems="center" justifyContent="space-between" container lg md style={{ marginTop: '5%' }}>
                        <Grid item lg={4} md={6} >
                            <PieChart list={listTime()} />
                        </Grid>
                        <Grid item lg={6} md={6} >
                            <BarChart list={listTime()} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}
