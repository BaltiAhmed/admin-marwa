import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { Authcontext } from "../context/auth-context";
import { Link } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function SimpleMenu() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const auth = useContext(Authcontext);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div style={{ marginLeft: "85%" }}>
      {/* <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <div className={classes.root}>
          <Avatar alt="Remy Sharp" src={`http://localhost:5000/${auth.user.photo}`} />
        </div>
      </IconButton> */}
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
      >
        <Link
          to="/update-profile"
          style={{ textDecoration: "none", color: "black" }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
        </Link>

        <MenuItem
          onClick={() => {
            auth.logout();
            window.location.href = "http://localhost:3000";
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
