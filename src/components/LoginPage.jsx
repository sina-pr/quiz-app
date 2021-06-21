import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "./../actions/auth.actions";
import { useEffect } from "react";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(10, 5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    marginBottom: theme.spacing(3),
    backgroundColor: theme.palette.secondary.main,
    height: theme.spacing(10),
    width: theme.spacing(10),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LoginPage = ({ login, user }) => {
  const classes = useStyles();
  let history = useHistory();
  const [userName, setUserName] = useState("");
  const [password, setpassword] = useState("");

  const registerClickHandler = () => {
    history.push("/register");
  };
  const loginClickHandler = (e) => {
    e.preventDefault();
    login(userName, password);
  };
  const onChangeHandler = (e) => {
    switch (e.target.id) {
      case "userName":
        setUserName(e.target.value);
        break;
      case "password":
        setpassword(e.target.value);
        break;
      default:
        return;
    }
  };
  useEffect(() => {
    user.loggedIn && history.push("/");
  }, [user.loggedIn]);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={2} className={classes.paper}>
        <Avatar sizes="4x" className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="userName"
            label="User Name"
            name="username"
            autoComplete="username"
            value={userName}
            onChange={onChangeHandler}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={onChangeHandler}
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="outlined"
            color="primary"
            className={classes.submit}
            onClick={loginClickHandler}
          >
            Sign In
          </Button>
          <Button
            onClick={registerClickHandler}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Register
          </Button>
        </form>
      </Paper>
    </Container>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    login: (userName, password) => dispatch(login(userName, password)),
  };
};
const mapStateToProps = (state) => {
  return {
    user: state.Auth,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
