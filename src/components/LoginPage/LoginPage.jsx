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
import { login, removeSignUpStatus } from "../../actions/auth.actions";
import { useEffect } from "react";
import * as yup from "yup";
import { Alert } from "@material-ui/lab";
import { useFormik } from "formik";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(8, 4),
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
const signInSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(5, "Password should be minimum 5 character")
    .required("Password is required"),
});
const LoginPage = ({ login, Auth, removeSignUpStatus }) => {
  const classes = useStyles();
  let history = useHistory();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInSchema,
    onSubmit: (values) => {
      login(values.email, values.password);
    },
  });
  const registerClickHandler = () => {
    history.push("/register");
  };

  useEffect(() => {
    removeSignUpStatus();
    Auth.loggedIn && history.push("/");
  }, [Auth.loggedIn, history]);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={2} className={classes.paper}>
        <Avatar sizes="4x" className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
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
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            value={formik.values.password}
            onChange={formik.handleChange}
            autoComplete="password"
          />
          {Auth.status === "Login failed" ? (
            <Alert severity="error">Something went wrong!</Alert>
          ) : null}
          <Button
            className={classes.submit}
            type="submit"
            fullWidth
            variant="outlined"
            color="primary"
            type="submit"
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
    removeSignUpStatus: () => {
      dispatch(removeSignUpStatus());
    },
  };
};
const mapStateToProps = (state) => {
  return {
    Auth: state.Auth,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
