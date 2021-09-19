import { Container, Grid } from "@material-ui/core";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header"
import List from "../components/List/List";
import ItemContextProvider from "../components/Context/ItemContext";
import './TimerPage.css'

export default function TimerPage() {
    return (
        <Grid container xl className="TimerPage">
            <Sidebar />
            <Grid item xs style={{borderLeft: '2px solid black'}}>
                <ItemContextProvider>
                    <Header />
                    <List />
                </ItemContextProvider>

            </Grid>
        </Grid>
    )
}
