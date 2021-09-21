import { makeStyles } from "@mui/styles";
export const useStyles = makeStyles((theme) => ({
  sidebar: {
    marginTop: "16px",
    display: "flex",
    flexDirection: "column",
    marginLeft: "24px",
  },
  avt: {
    marginRight: "8px",
  },
  info: {
    display: "flex",
    alignItems: "center",
    marginbottom: "12px",
    flexWrap: "wrap",
  },
  sidebarItem: {
    margin: "16px 0",
    display: "flex",
  },
  sidebarIcon: {
    marginRight: "6px",
  },
  logoutBtn: {
    cursor: "pointer",
  },
}));
