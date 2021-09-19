import { Grid, Card, CardHeader, Avatar, CardContent, MenuList, MenuItem, ListItemIcon, ListItemText } from "@material-ui/core";
import ScheduleIcon from '@material-ui/icons/Schedule';
import BarChartIcon from '@mui/icons-material/BarChart';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Sidebar() {
    return (
        <>
            <Grid item >
                <CardHeader
                    avatar={
                        <Avatar>R</Avatar>
                    }
                    title="Ngô Chung Á Âu"
                />
                <CardContent style={{ padding: '0px' }}>
                    <MenuList>
                        <MenuItem>
                            <ListItemIcon>
                                <ScheduleIcon />
                            </ListItemIcon>
                            <ListItemText>Timer</ListItemText>
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <BarChartIcon />
                            </ListItemIcon>
                            <ListItemText>Report</ListItemText>
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText>Logout</ListItemText>
                        </MenuItem>
                    </MenuList>
                </CardContent>
            </Grid>
        </>
    )
}
