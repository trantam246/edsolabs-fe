import React, { useState } from "react";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ModalAuthor from "./ModalAuthor";

const useStyles = makeStyles((theme) => ({
  favoriteIcon: {
    transform: "translateY(30%)",
  },
  link: {
    cursor: "pointer",
    color: "#fff",
    fontWeight: "bold",
    textDecoration: "underline",
    fontSize: "1.6rem",
    [`&:hover`]: {
      color: " #64eb5f",
    },
  },
  footer: {
    margin: "4rem 0",
    [`& p`]: {
      fontSize: "1.6rem",
    },
  },
}));
const Footer = () => {
  const classes = useStyles();
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = (c) => {
    setShow(c);
  };
  return (
    <>
      <Box mt={2} className={classes.footer}>
        <Typography align="center">
          {"© " + new Date().getFullYear() + " by FE class. Made with "}
          <FavoriteIcon className={classes.favoriteIcon} /> {"by "}
          <Link className={classes.link} onClick={handleShow}>
            Tran Tam
          </Link>
        </Typography>
      </Box>
      {show && <ModalAuthor onOpen={show} onClose={(c) => handleClose(c)} />}
    </>
  );
};

export default Footer;
