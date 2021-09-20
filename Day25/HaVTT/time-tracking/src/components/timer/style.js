import { makeStyles } from "@mui/styles";
export const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    marginTop: "15px",
    flexWrap: "wrap",
  },
  text: {
    marginTop: "15px",
    marginRight: "15px",
  },
  textField: {
    width: 180,
  },
  input: {
    margin: "24px",
    flex: 1,
    minWidth: 400,
  },
  header: {
    display: "flex",
    borderBottom: "2px solid",
  },
  countTimer: {
    display: "flex",
    alignItems: "center",
  },
  formatTime: {
    margin: "0 16px",
    lineHeight: "100%",
  },
  tasks: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: "16px",
    padding: "8px",
    textAlign: "center",
    borderBottom: "1px solid",
  },
  tasksInfo: {
    display: "flex",
    alignItems: "center",
    lineHeight: "28px",
  },
  timeSpent: {
    width: "80px",
  },
  menu: {
    width: "150px",
  },
  endTime: {
    width: "80px",
  },
  startTime: {
    width: "80px",
  },
  tags: {
    marginRight: "10px",
  },
  border: {
    borderRight: "3px solid",
  },
  main: {
    marginLeft: "10px",
    marginTop: "10px",
  },
  dayGroup: {
    border: "1px solid",
    backgroundColor: "rgba(51, 51, 51, 0.2)",
  },
  loadmore: {
    marginTop: "40px",
    textAlign: "center",
  },
}));