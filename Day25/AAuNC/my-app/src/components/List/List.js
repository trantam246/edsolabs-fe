import { Button, Container, Grid } from "@material-ui/core";
import { TextField } from "@mui/material";
import { useState, useEffect, useContext } from 'react'
import { getAllList } from "../../service/Task";
import { ItemContext } from '../Context/ItemContext';
import ListDate from "./ListDate";
import moment from "moment";


export default function List() {

    const [list, setList] = useState([]);
    const { reload } = useContext(ItemContext);

    useEffect(() => {
        getAllList(data => {
            setList([...data.sort((a, b) => a.start_time < b.start_time)]);
        });
    }, [reload]);

    //list ngày
    let listDay = [...new Set(
        list.map(o => moment(o.start_time).format('DD-MM-YYYY'))
    )];
    
    //get item by date
    const listByDate = (date) => {
        return [...list.filter(o => moment(o.start_time).format('DD-MM-YYYY') == date)].reverse();
    }

    return (
        <>
            <Container>
                <Grid item container justifyContent="flex-start" alignItems="center" style={{ marginBottom: '1%', marginTop: '2%' }}>
                    <div>Date fillter: </div>
                    <TextField type="date" variant="outlined" style={{marginLeft: '15px'}}/>
                </Grid>

                <Grid container direction="column" justifyContent="flex-start">
                {
                    
                    listDay.map((day, index) => {
                        return <ListDate key={index} list={listByDate(day)} day={day}/>
                    })
                }
                </Grid>

                <Grid item container justifyContent="center" style={{marginTop:'5%', marginBottom: '2%'}}>
                    <Button style={{border: '2px solid black'}}>Load more</Button>
                </Grid>
            </Container>
        </>
    )
}
