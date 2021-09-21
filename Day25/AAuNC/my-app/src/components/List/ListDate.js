import { Grid } from "@material-ui/core";
import ListItem from "./ListItem/ListItem.js";
import moment from "moment";

export default function ListDate(props) {

    const {list, day} = props
    //get today
    let today = moment(new Date()).format('DD-MM-YYYY');
    //tiêu đề ngày
    let dayTitle = day;
    if(day == today) dayTitle = 'Today';

    return (
        <>
            <Grid component="p" container justifyContent="flex-start" style={{marginTop: '5%'}}>{dayTitle}</Grid>
            {
                list.map((obj, index) => {
                    return <ListItem key={index} obj={obj} />
                })
            }
        </>
    )
}
