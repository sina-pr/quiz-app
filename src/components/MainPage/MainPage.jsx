import { useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import { useState } from "react";
import StepLabel from "@material-ui/core/StepLabel";

import { connect } from "react-redux";
import { getAllQuestions } from "../../actions/question.action";
import {
  addAnswer,
  removeAnswer,
  removeAllAnswers,
} from "../../actions/answer.actions";
import Summary from "./Summary";
import Welcome from "./Welcome";
import Question from "./Question";
import AppBarMenu from "./AppBarMenu";
const useStyle = makeStyles((theme) => ({
  root: {
    flex: 1,
  },
  title: {
    flexGrow: 1,
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
  stepper: {
    justifyContent: "center",
    padding: theme.spacing(2, 0),
  },
}));

const MainPage = ({ Auth, getAllQuestions, removeAllAnswers }) => {
  const classes = useStyle();
  let history = useHistory();
  const loginClickHanlder = () => {
    history.push("/login");
  };
  const registerClickHandler = () => {
    history.push("/register");
  };
  const [activeStep, setActiveStep] = useState(0);
  const [submited, setSubmited] = useState(false);

  useEffect(() => {
    Auth.loggedIn ? setActiveStep(1) : setActiveStep(0);
    submited && Auth.loggedIn && setActiveStep(2);
  }, [Auth.loggedIn, submited]);
  useEffect(() => {
    getAllQuestions();
  }, [getAllQuestions]);
  return (
    <div>
      <AppBar color="primary" className={classes.root} position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6">
            Question & Answer
          </Typography>
          {Auth.loggedIn ? (
            <>
              <Typography>{Auth.user.email}</Typography>
              <AppBarMenu />
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
              <Summary />
            ) : (
              <Question setSubmited={setSubmited} />
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
    Questions: state.Questions,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addAnswer: (questionId, selectedOption) =>
      dispatch(addAnswer(questionId, selectedOption)),
    removeAnswer: () => dispatch(removeAnswer()),
    getAllQuestions: () => dispatch(getAllQuestions()),
    removeAllAnswers: () => dispatch(removeAllAnswers()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
