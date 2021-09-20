import { Grid } from "@material-ui/core";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header"
import List from "../../components/List/List";
import ItemContextProvider from "../../components/Context/ItemContext.js"
import { ItemContext } from "../../components/Context/ItemContext.js";
import './TimerPage.css'
import { useContext } from "react";

export default function TimerPage() {

    // const {reload, running} = useContext(ItemContext);
    // console.log( reload);
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
