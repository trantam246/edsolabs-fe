import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import {Link} from '@material-ui/core';
import dataFunction from '../func/dataFunction';
import { TimePageTask } from './timePageTask';
import moment from 'moment';
moment().format();
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  root: {
    flexGrow: 1,
    marginTop: 'calc(100% - 98%)'
  },
  paper: {
    padding: theme.spacing(2),
    color: '#ffffff',
    background: 'none',
    border: 'none',
    boxShadow: 'none',
  },
  modGrid: {
    backgroundColor: 'rgb(175 32 32 / 50%)',
    alignItems: 'center'
  },
  btn: {
    textAlign: 'center'
  },
  input: {
    color:'white'
  },
  gridTextEnd: {
    textAlign: 'end'
  },
  linkMod: {
    color: 'white'
  }
}));

const tags = [
  {
      "id": 1,
      "name": "Online"
  },
  {
      "id": 2,
      "name": "Meeting"
  },
  {
      "id": 3,
      "name": "Training"
  },
  {
      "id": 4,
      "name": "Coding"
  }
]
export const TimerPage = (props) => {
  const classes = useStyles();
  const [visible, setVisible] = useState(5);
  const [isLoad, setLoad] = useState(false);
  //Show data 
  const [data, setData] = useState([]);
  useEffect(() => {
    retrieveTutorials();
  });
  const retrieveTutorials = () => {
    dataFunction.getAll()
      .then(response => {
        setData(response.data.reverse());
        // console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  const showMore = () => {
    if(visible < data.length) {
      setVisible((value) => value + 5)
    }
    if(visible >= data.length){
      setLoad(true)
    }
  }
  const hideMore = () => {
    if(visible > data.length) {
      setLoad(false)
      setVisible(5)
    }
  }
  const splitTime =  (value) => {
    if(value != null) {
      const [d,t] = value.split(/ /g)
      return `${t}`
    } else {
      return ""
    }
  }
  const getTag = (valueTask,valueTag) => {
    const arr = []
    valueTask.tags.map(item => {
      valueTag.map((tag,index) => {
        if(tag.id === item) {
          arr.push(tag.name)
        }
      })
    })
    return arr.join()
  }
  const splitDay =  (value) => {
    if(value != null) {
      const [d,t] = value.split(/ /g)
      return `${d}`
    } else {
      return ""
    }
  }
  let group = data.reduce((r, a) => {
    r[splitDay(a.start_time)] = [...r[splitDay(a.start_time)] || [], a];
    return r;
  }, {});

  return (
    <React.Fragment>
      <CssBaseline />
        <form className={classes.container} noValidate>
          <TextField
            id="date"
            label="Date filter"
            type="date"
            defaultValue="2017-05-24"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            />
        </form>
        <div className={classes.root}>
          <Grid container spacing={4}>
            {Object.entries(group).slice(0, visible).map((item,index) =>(
              <Grid key={index} item xs={12}>
                <p>{item[0]}</p>
                {item[1].map((ele) => (
                  <div>
                    <Grid key={ele.id} className={classes.modGrid} container>
                      <Grid item xs={6}>
                        <Paper className={classes.paper}>{ele.description}</Paper>
                      </Grid>
                      <Grid item xs={6}>
                        <Paper className={classes.paper}>
                          <Grid container alignItems="center">
                            <Grid item xs>
                              <IconButton>
                                <LocalOfferIcon/>
                              </IconButton>                  
                            </Grid>
                            <Grid item xs>
                              <Link className={classes.linkMod}>{getTag(ele,tags)}</Link>
                            </Grid>
                            <Grid item xs>
                              <p>{splitTime(ele.start_time)} - {splitTime(ele.end_time)}</p>
                            </Grid>
                            <Grid item xs>
                              <p>{ele.time_spent} mins</p>
                            </Grid>
                            <Grid item xs>
                            <TimePageTask id={ele.id}
                              descrip={ele.description}
                              startT={moment().format('YYYY-MM-DD HH:mm:s')}
                              endT={null}
                              timeSpent={null}
                              tag={getTag(ele,tags)}
                              status={(0)}
                              getHide={props.getHide}
                            />
                            </Grid>
                          </Grid>                          
                        </Paper>
                      </Grid>
                    </Grid>
                    <Divider/>
                  </div>
                ))}
              </Grid>
            ))}
          </Grid>
          <Grid container spacing={10}>
            <Grid item xs={12} className={classes.btn}>
              {!isLoad && <Button variant="contained" color="secondary" onClick={showMore}>
                Load more
              </Button>}
              {isLoad && <Button variant="contained" color="secondary" onClick={hideMore}>
                Hide
              </Button>}
            </Grid>
          </Grid>
      </div>
    </React.Fragment>
  );
}
