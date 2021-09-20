import { Grid } from "@material-ui/core";
import { height } from "@mui/system";
import Report from "../../components/Report/Report";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function ReportPage() {
    return (
        <Grid container xl style={{ height: '100vh', border: '2px solid black'}}>
            <Sidebar />
            <Grid item xs style={{borderLeft: '2px solid black'}}>
                <Report/>
            </Grid>
        </Grid>
    )
}