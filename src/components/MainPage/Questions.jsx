import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { ButtonGroup } from "@material-ui/core";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { addAnswer, removeAnswer } from "./../../actions/answer.actions";
import { connect } from "react-redux";

const useStyle = makeStyles((theme) => ({
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

  submit_btn: {
    marginLeft: "auto",
    marginTop: theme.spacing(1),
  },

  grid_item: {
    textAlign: "center",
  },
}));
const Questions = ({ addAnswer, removeAnswer, questions, setSubmited }) => {
  const [activeQ, setActiveQ] = useState(0);
  let [selectedOption, setSelectedOption] = useState([]);

  const onNextClickHandler = (myOptions) => {
    addAnswer(activeQ, myOptions);
    setSelectedOption([]);

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
  const classes = useStyle();
  return (
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
            <Grid item xs={6} className={classes.grid_item}>
              <FormControlLabel value={o} control={<Radio />} label={o} />
            </Grid>
          ))}
        </RadioGroup>
      ) : (
        <FormGroup
          onChange={onChangeCheckbox}
          row
          className={classes.checkBox_wrapper}
        >
          {questions[activeQ].options.map((o) => (
            <Grid item xs={6} className={classes.grid_item}>
              <FormControlLabel control={<Checkbox />} value={o} label={o} />
            </Grid>
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
            <Button onClick={() => onNextClickHandler(selectedOption)}>
              Next
            </Button>
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
    addAnswer: (questionId, selectedOption) =>
      dispatch(addAnswer(questionId, selectedOption)),
    removeAnswer: () => dispatch(removeAnswer()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Questions);
