import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  header: {
    borderBottom: '4px solid #333',
    display: 'flex',
    justifyContent: 'space-between',
    height: 100,
  },
  timer: {
    padding: '0px',
    fontFamily: 'Glory',
  },
  options: {
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Glory',
  },
  inputDate: {
    border: '1px solid #333',
    borderRadius: 4,
    margin: '0 20px 0 20px',
  },
  iconCalen: {
    fontSize: 30,
    marginTop: 4,
  },
  icon: {
    margin: '0 20px 0 40px',
    '& svg': {
      width: '38px',
      height: '38px',
    },
  },
  time: {
    fontSize: 26,
    fontWeight: 600,
  },
  menu: {
    marginTop: 55,
    '& .MuiMenuItem-root': {
      padding: 18,
      fontSize: 15,
      fontWeight: 600,
      '& :hover': {
        backgroundColor: '#333',
      },
    },
  },
  subtitle: {
    display: 'flex',
    margin: '20px 0 80px 0',
  },
  boxBody: {
    padding: '28px',
  },
  datefilter: {
    fontWeight: 600,
    lineHeight: '56px',
    width: '84px',
    marginRight: '20px',
  },
  listoption: {
    fontFamily: 'Glory',
    textAlign: 'center',
    padding: '0 !important',
  },
  boxTimer: {
    display: 'flex',
    marginRight: 30,
    '& button': {
      backgroundColor: '#fff',
      fontSize: 38,
    },
  },
  countTime: {
    width: 150,
  },
  element_task: {
    fontFamily: 'Glory',
    height: 70,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #E0E0E0',
    '&:last-child': {
      borderBottom: 'none',
      padding: '10px 0 0 0 ',
    },
  },
  optionsTask: {
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Glory',
  },
  box__task: {
    border: '1px solid #E0E0E0',
    borderRadius: 4,
    padding: 10,
  },
  iconTask: {
    fontSize: 20,
  },
  taskPick: {
    display: 'flex',
    fontSize: 17,
    fontWeight: 600,
    margin: '0 20px 0 10px',
  },
  timeCount: {
    fontSize: 14,
    fontWeight: 600,
    margin: '2px 20px 0 0',
  },
  totalTime: {
    fontSize: 18,
    fontWeight: 600,
  },
  dayTasks: {
    fontSize: 20,
    margin: '20px 0 20px 0',
    fontWeight: 600,
  },
  nameDes: {
    fontSize: 20,
  },
  btn: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 30,
  },
  backtoTask: {
    backgroundColor: '#333',
    padding: '3px 20px',
    fontFamily: 'Glory',
    fontWeight: 600,
    fontSize: 20,
    border: '1px solid #333',
    color: '#fff',
    '&:hover': {
      color: '#333',
    },
  },
  btnLoad: {
    backgroundColor: '#333',
    padding: '3px 20px',
    fontFamily: 'Glory',
    fontWeight: 600,
    fontSize: 20,
    border: '1px solid #333',
    color: '#fff',
    '&:hover': {
      color: '#333',
    },
    textAlign: 'center',
  },
  tagspick: {
    padding: 20,
    transition: 'linear .3s',
    '&:hover': {
      backgroundColor: '#333 !important',
      color: '#fff',
    },
  },
  tagspickbox: {
    width: '100%',
  },
}));
export default useStyles;
