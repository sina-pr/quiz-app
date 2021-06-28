import React, { useEffect } from "react";
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
import { register } from "../../actions/auth.actions";
import { connect } from "react-redux";
import { Alert } from "@material-ui/lab";
import { useFormik } from "formik";
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(6, 4),
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
    margin: theme.spacing(2, 0, 1),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
  confirmPass: {
    marginBottom: theme.spacing(2),
  },
  alert: {
    margin: theme.spacing(0, 0),
  },
}));

const signUpSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(5, "Password should be minimum 5 character")
    .required("Password is required"),
  phoneNumber: yup
    .string("Enter your phone number")
    .length(11, "Enter valid phone number"),
});

const RegisterPage = ({ register, Auth }) => {
  const classes = useStyles();
  let history = useHistory();
  const formik = useFormik({
    initialValues: {
      email: "",
      phoneNumber: "",
      password: "",
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      register(values.email, values.phoneNumber, values.password);
    },
  });

  const loginClickHandler = () => {
    history.push("/login");
  };
  useEffect(() => {
    Auth.status === "Register success" && history.push("/login");
    Auth.loggedIn && history.push("/");
  }, [Auth.loggedIn, Auth.status, history]);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={2} className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                onChange={formik.handleChange}
                autoComplete="email"
                variant="outlined"
                name="email"
                required
                fullWidth
                id="email"
                label="Email"
                value={formik.values.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={formik.handleChange}
                variant="outlined"
                fullWidth
                id="phoneNumber"
                label="Phone Number"
                name="phoneNumber"
                error={
                  formik.touched.phoneNumber &&
                  Boolean(formik.errors.phoneNumber)
                }
                helperText={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                }
                value={formik.values.phoneNumber}
                autoComplete="phoneNumber"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={formik.handleChange}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                value={formik.values.password}
                autoComplete="current-password"
              />
            </Grid>
            {/*<Grid item xs={12}>
              <TextField
                className={classes.confirmPass}
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
            </Grid>*/}
          </Grid>
          {Auth.status === "Register failed" ? (
            <Alert className={classes.alert} severity="error">
              Something went wrong!
            </Alert>
          ) : null}
          <Button
            variant="contained"
            fullWidth
            color="primary"
            className={classes.submit}
            type="submit"
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
    register: (email, phoneNumber, password) =>
      dispatch(register(email, phoneNumber, password)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
