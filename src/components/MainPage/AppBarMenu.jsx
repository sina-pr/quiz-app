import IconButton from "@material-ui/core/IconButton";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { logout } from "../../actions/auth.actions";
import { connect } from "react-redux";
import ExitToApp from "@material-ui/icons/ExitToApp";

const useStyle = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(0.25, 0, 0.25, 1),
  },
}));
const AppBarMenu = ({ logout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const classes = useStyle();
  const handleMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <IconButton
        onClick={handleMenu}
        color="inherit"
        className={classes.avatar}
      >
        <AccountCircleIcon fontSize="large" />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        keepMounte
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={open}
        onClose={handleClose}
        getContentAnchorEl={null}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            handleLogout();
          }}
        >
          Logout
          <ExitToApp style={{ margin: "0 10px 0 30px" }} />
        </MenuItem>
      </Menu>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};
export default connect(null, mapDispatchToProps)(AppBarMenu);
