import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import { register } from "../actions/auth.actions";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    padding: theme.spacing(8, 5),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const RegisterPage = ({ register, Auth }) => {
  const classes = useStyles();
  let history = useHistory();

  const [userName, setUserName] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const signUpClickHanlder = (e) => {
    e.preventDefault();
    register(userName, phoneNumber, password);
  };
  const onChangeHandler = (e) => {
    switch (e.target.id) {
      case "userName":
        setUserName(e.target.value);
        break;
      case "password":
        setpassword(e.target.value);
        break;
      case "phoneNumber":
        setPhoneNumber(e.target.value);
        break;
      case "confirmPass":
        setConfirmPassword(e.target.value);
        break;
      default:
        return;
    }
  };
  const loginClickHandler = () => {
    history.push("/login");
  };
  useEffect(() => {
    Auth.signUpStatus === "success" && history.push("/login");
    Auth.loggedIn && history.push("/");
  }, [Auth.loggedIn, Auth.signUpStatus]);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={2} className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                onChange={onChangeHandler}
                autoComplete="userName"
                variant="outlined"
                name="userName"
                required
                fullWidth
                id="userName"
                label="User Name"
                value={userName}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={onChangeHandler}
                variant="outlined"
                fullWidth
                id="phoneNumber"
                label="Phone Number"
                name="phoneNumber"
                value={phoneNumber}
                autoComplete="phoneNumber"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={onChangeHandler}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={onChangeHandler}
                variant="outlined"
                required
                fullWidth
                type="password"
                id="confirmPass"
                label="Confirm Password"
                name="confirmPass"
                value={confirmPassword}
                autoComplete="confirmPass"
              />
            </Grid>
          </Grid>

          <Button
            onClick={signUpClickHanlder}
            variant="contained"
            fullWidth
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Button
            onClick={loginClickHandler}
            variant="outlined"
            fullWidth
            color="primary"
          >
            Log in
          </Button>
        </form>
      </Paper>
    </Container>
  );
};
const mapStateToProps = (state) => {
  return {
    Auth: state.Auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    register: (userName, phoneNumber, password) =>
      dispatch(register(userName, phoneNumber, password)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
