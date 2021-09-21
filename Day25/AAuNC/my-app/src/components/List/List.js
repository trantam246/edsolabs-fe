import { Button, Container, Grid } from "@material-ui/core";
import { TextField } from "@mui/material";
import { useState, useEffect, useContext } from 'react'
import { getAllList } from "../../service/Task";
import { ItemContext } from '../Context/ItemContext';
import ListDate from "./ListDate";
import moment, { min } from "moment";


export default function List() {

    //List item
    const [list, setList] = useState([]);
    //state reload list
    const { reload } = useContext(ItemContext);
    //date fillter
    const [dateFilter, setDateFilter] = useState(null);

    const handleChangeDate = (e) => {
        setDateFilter(e.target.value);
    }

    //load more
    const [loadDay, setLoadDay] = useState(moment().subtract(5, 'day').format("DD-MM-YYYY"));
    const clickLoadByDay = () => setLoadDay(prev => 
        moment(prev, "DD-MM-YYYY").subtract(5, 'day').format("DD-MM-YYYY")
    );

    //use effect
    useEffect(() => {
        setDateFilter(null);
        getAllList(data => {
            setList([...data.sort(
                (a, b) => moment(b.start_time) - moment(a.start_time))
            ]);
        });
    }, [reload]);

    const listLoad = [...list.filter(o => moment(o.start_time).format("DD-MM-YYYY") >= (loadDay))];

    // danh sách ngày cần lấy dữ liệu
    let listDay = [];
    if(dateFilter !== null) {
        listDay = [moment(dateFilter).format('DD-MM-YYYY')];
    }
    else {
        listDay = [...new Set(
            listLoad.map(o => moment(o.start_time).format('DD-MM-YYYY'))
        )];
    }

    //lọc dữ liệu theo list ngày
    const listByDate = (date) => {
        if(dateFilter !== null)
        {
            return [...list.filter(o => moment(o.start_time).format('DD-MM-YYYY') == date)].sort(
                (a, b) => moment(b.start_time) - moment(a.start_time)
            );
        }
        else {
            return [...listLoad.filter(o => moment(o.start_time).format('DD-MM-YYYY') == date)].sort(
                (a, b) => moment(b.start_time) - moment(a.start_time)
            );
        }
    }

    return (
        <>
            <Container>
                <Grid item container justifyContent="flex-start" alignItems="center" style={{ marginBottom: '1%', marginTop: '2%' }}>
                    <div>Date fillter: </div>
                    <TextField
                        type="date"
                        value={dateFilter}
                        onChange={handleChangeDate}
                        variant="outlined"
                        style={{ marginLeft: '15px' }} />
                </Grid>

                <Grid container direction="column" justifyContent="flex-start">
                    {

                        listDay.map((day, index) => {
                            return <ListDate key={index} list={listByDate(day)} day={day} />
                        })
                    }
                </Grid>

                <Grid item container justifyContent="center" style={{ marginTop: '5%', marginBottom: '2%' }}>
                    <Button style={{ border: '2px solid black' }} onClick={clickLoadByDay}>Load more</Button>
                </Grid>
            </Container>
        </>
    )
}
