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
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { ButtonGroup } from "@material-ui/core";
import questions from "./../questions/questions";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ExitToApp from "@material-ui/icons/ExitToApp";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import axios from "axios";
import { connect } from "react-redux";
import { logout } from "../actions/auth.actions";
import { addAnswer, removeAnswer } from "./../actions/answer.actions";
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
  const [activeQ, setActiveQ] = useState(0);
  const [submited, setSubmited] = useState(false);
  let [selectedOption, setSelectedOption] = useState([]);

  const onSubmitClickHandler = () => {
    //send data to db
    axios.post("http://localhost:3005/answers/save", {
      userName: Auth.user.userName,
      answers: answers,
    });
  };
  const onNextClickHandler = (myOptions) => {
    addAnswer(activeQ, myOptions);
    setSelectedOption([]);

    /* {
      setAnswer([(answers[index].selectedOptions = selectedOption)]);
    }*/
    if (activeQ + 1 < questions.length) {
      setActiveQ(activeQ + 1);
    }
    if (activeQ + 1 === questions.length) {
      setSubmited(true);
    }
  };
  const onBeforClickHandler = () => {
    if (activeQ > 0) {
      setActiveQ(activeQ - 1);
    }
    removeAnswer();
  };
  const onChangeRadio = (e) => {
    setSelectedOption(e.target.value);
  };
  const onChangeCheckbox = (e) => {
    if (e.target.checked) {
      //add option to selectedOption
      setSelectedOption([...selectedOption, e.target.value]);
    } else {
      //remove option from selectedOption
      setSelectedOption(selectedOption.filter((o) => o !== e.target.value));
      // let index = selectedOption.indexOf(e.target.value);
      // setSelectedOption(selectedOption.filter(o=>o)
    }
  };
  useEffect(() => {
    Auth.loggedIn ? setActiveStep(1) : setActiveStep(0);
    submited && Auth.loggedIn && setActiveStep(2);
  }, [Auth.loggedIn, submited]);
  return (
    <div>
      {console.log(selectedOption)}
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
          <Stepper activeStep={activeStep} alternativeLabel>
            <Step>
              <StepLabel>Login/Register </StepLabel>
            </Step>
            <Step>
              <StepLabel>Answer Questions</StepLabel>
            </Step>
            <Step>
              <StepLabel>Summary</StepLabel>
            </Step>
          </Stepper>
        </Paper>
        <Paper className={classes.paper_question}>
          {submited ? (
            <>
              <Typography variant="h6" gutterBottom>
                Summry
              </Typography>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>No</TableCell>
                    <TableCell>Question</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell align="right">Answers</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {questions.map((q) => (
                    <TableRow key={q.id}>
                      <TableCell component="th" scope="row">
                        {q.id + 1}
                      </TableCell>
                      <TableCell>{q.q}</TableCell>
                      <TableCell>{q.type}</TableCell>
                      <TableCell align="right">
                        {answers[q.id].selectedOptions.length === 0
                          ? "Blank"
                          : answers[q.id].selectedOptions}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {Auth.loggedIn ? (
                <Button
                  style={{ marginLeft: "auto" }}
                  variant="contained"
                  color="secondary"
                  onClick={onSubmitClickHandler}
                  className={classes.submit_btn}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  style={{ marginLeft: "auto" }}
                  variant="contained"
                  color="secondary"
                  disabled
                  className={classes.submit_btn}
                >
                  Submit
                </Button>
              )}
            </>
          ) : (
            <>
              <Typography variant="h6">
                <span>{activeQ + 1}-</span>
                {questions[activeQ].q}
              </Typography>
              <Typography className={classes.type} variant="body1">
                <span>Type:</span>
                {questions[activeQ].type}
              </Typography>

              {questions[activeQ].type === "single-choice" ? (
                <RadioGroup
                  row
                  className={classes.radioBtn_wrapper}
                  onChange={onChangeRadio}
                >
                  {questions[activeQ].options.map((o) => (
                    <FormControlLabel value={o} control={<Radio />} label={o} />
                  ))}
                </RadioGroup>
              ) : (
                <FormGroup
                  onChange={onChangeCheckbox}
                  row
                  className={classes.checkBox_wrapper}
                >
                  {questions[activeQ].options.map((o) => (
                    <FormControlLabel
                      control={<Checkbox />}
                      value={o}
                      label={o}
                    />
                  ))}
                </FormGroup>
              )}

              <Grid container>
                <ButtonGroup color="primary" className={classes.btn_wrapper}>
                  {activeQ > 0 ? (
                    <Button onClick={onBeforClickHandler}>Prev</Button>
                  ) : (
                    <Button disabled>Prev</Button>
                  )}
                  {activeQ !== 4 ? (
                    Auth.loggedIn ? (
                      <Button
                        onClick={() => onNextClickHandler(selectedOption)}
                      >
                        Next
                      </Button>
                    ) : (
                      <Button disabled>Next</Button>
                    )
                  ) : selectedOption !== [] || "" ? (
                    <Button
                      onClick={() => onNextClickHandler(selectedOption)}
                      variant="contained"
                      color="secondary"
                    >
                      Summary
                    </Button>
                  ) : (
                    <Button disabled variant="contained" color="secondary">
                      Summary
                    </Button>
                  )}
                </ButtonGroup>
              </Grid>
            </>
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
