import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import { AiOutlineBarChart } from 'react-icons/ai';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { WiTime9 } from 'react-icons/wi';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import Info from '../info/Info';
import Report from '../report/Report';
import Timer from '../timer/Timer';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 400,
    width: '100%',
    margin: ' 0 auto',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width: 250,
  },
  panel: {
    width: '100%',
    '& .MuiBox-root': {
      padding: '0',
    },
  },
  btn: {
    display: 'flex',
    justifyContent: 'center',
    padding: '28px 10px 28px 10px',
    fontSize: 22,
    fontWeight: 600,
  },
  btnIcon: {
    margin: '0 12px 0',
    fontSize: 28,
  },
}));

export default function NavBar() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  let location = useLocation();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('fullname');
    alert('Logout Success');
  };
  return (
    <div>
      <div className={classes.root}>
        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          <Link to="/info">
            <div className={classes.btn}>
              <img
                style={{
                  borderRadius: '50%',
                  width: '35px',
                  height: '35px',
                  transform: 'translateY(-5px)',
                  marginRight: '20px',
                }}
                src={localStorage.getItem('accessToken')}
                alt="avatar"
              />
              <div>{localStorage.getItem('fullname')}</div>
            </div>
          </Link>
          <Link to="/timer">
            <div className={classes.btn}>
              <WiTime9 className={classes.btnIcon} />
              <div>Timer</div>
            </div>
          </Link>
          <Link to="/report">
            <div className={classes.btn}>
              <AiOutlineBarChart className={classes.btnIcon} />
              <div>Report</div>
            </div>
          </Link>
          <Link to="/">
            <div className={classes.btn}>
              <RiLogoutBoxRLine className={classes.btnIcon} />
              <div onClick={logout}>LOGOUT</div>
            </div>
          </Link>
        </Tabs>
        <TabPanel className={classes.panel} value={value} index={0}>
          {location.pathname === '/info' && <Info />}
          {location.pathname === '/timer' && <Timer />}
          {location.pathname === '/report' && <Report />}
        </TabPanel>
      </div>
    </div>
  );
}
