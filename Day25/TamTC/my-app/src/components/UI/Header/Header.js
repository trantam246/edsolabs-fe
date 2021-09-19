import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
// import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"

const drawerWidth = '20rem'
const useStyles = makeStyles((theme) => ({
    // root: {
    //     display: "flex",
    //     width: drawerWidth,
    //     textAlign: "center"
    // },
    appBar: {
        width: `calc(100% - ${drawerWidth})`,
        marginLeft: drawerWidth,
        backgroundColor: '#fff',
    },
    toolbar: {
        justifyContent: 'space-between'
    }
}))

export default function Header(props) {
    const classes = useStyles()
    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                {/* <Typography variant="h6" noWrap>
                    What are you working on?
                </Typography> */}
                {props.children}
            </Toolbar>
        </AppBar>)
}