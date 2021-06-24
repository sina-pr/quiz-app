import { useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { useHistory } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import { useState } from "react";
import StepLabel from "@material-ui/core/StepLabel";

//import questions from "../../questions/questions";

import ExitToApp from "@material-ui/icons/ExitToApp";
import { connect } from "react-redux";
import { logout } from "../../actions/auth.actions";
import { addAnswer, removeAnswer } from "../../actions/answer.actions";
import Summary from "./Summary";
import Welcome from "./Welcome";
import Questions from "./Questions";
import axios from "axios";
const useStyle = makeStyles((theme) => ({
  root: {
    flex: 1,
  },
  title: {
    flexGrow: 1,
  },
  avatar: {
    backgroundColor: theme.palette.secondary,
  },
  btns: {
    marginLeft: theme.spacing(2),
  },
  container: {
    marginTop: theme.spacing(4),
  },
  paper: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2, 4),
  },
  paper_question: {
    padding: theme.spacing(2, 2),
    minHeight: theme.spacing(35),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  radioBtn_wrapper: {
    justifyContent: "space-around",
  },
  btn_wrapper: {
    justifyContent: "center",
    marginTop: theme.spacing(1),
    flex: 1,
  },
  type: {
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(-1),
  },
  checkBox_wrapper: {
    justifyContent: "space-around",
  },
  table: {
    marginBottom: "auto",
  },
  submit_btn: {
    marginLeft: "auto",
    marginTop: theme.spacing(1),
  },
  stepper: {
    justifyContent: "center",
    padding: theme.spacing(2, 0),
  },
  grid_item: {
    textAlign: "center",
  },
}));

const MainPage = ({ Auth, logout, addAnswer, removeAnswer, answers }) => {
  const classes = useStyle();
  let history = useHistory();
  const loginClickHanlder = () => {
    history.push("/login");
  };
  const registerClickHandler = () => {
    history.push("/register");
  };
  const [activeStep, setActiveStep] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [submited, setSubmited] = useState(false);

  useEffect(() => {
    Auth.loggedIn ? setActiveStep(1) : setActiveStep(0);
    submited && Auth.loggedIn && setActiveStep(2);
  }, [Auth.loggedIn, submited]);
  useEffect(() => {
    axios.get("http://localhost:5000/questions/all").then((res) => {
      console.log(res.data);
      setQuestions(res.data);
    });
  });
  return (
    <div>
      <AppBar color="default" className={classes.root} position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6">
            Question & Answer
          </Typography>
          {Auth.loggedIn ? (
            <>
              <IconButton className={classes.avatar}>
                <Avatar>{Auth.user.userName[0].toUpperCase()}</Avatar>
              </IconButton>
              <IconButton
                onClick={() => {
                  logout();
                }}
                color="inherit"
              >
                <ExitToApp />
              </IconButton>
            </>
          ) : (
            <>
              <Button
                className={classes.btns}
                color="inherit"
                onClick={registerClickHandler}
              >
                Register
              </Button>
              <Button
                className={classes.btns}
                color="inherit"
                onClick={loginClickHanlder}
              >
                Login
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" className={classes.container}>
        <Paper className={classes.paper}>
          <Stepper
            activeStep={activeStep}
            className={classes.stepper}
            alternativeLabel
          >
            <Step>
              <StepLabel>Login</StepLabel>
            </Step>
            <Step>
              <StepLabel>Answer</StepLabel>
            </Step>
            <Step>
              <StepLabel>Summary</StepLabel>
            </Step>
          </Stepper>
        </Paper>
        <Paper className={classes.paper_question}>
          {Auth.loggedIn ? (
            submited ? (
              <Summary questions={questions} />
            ) : (
              <Questions questions={questions} setSubmited={setSubmited} />
            )
          ) : (
            <Welcome />
          )}
        </Paper>
      </Container>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    Auth: state.Auth,
    answers: state.Answers,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    addAnswer: (questionId, selectedOption) =>
      dispatch(addAnswer(questionId, selectedOption)),
    removeAnswer: () => dispatch(removeAnswer()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
