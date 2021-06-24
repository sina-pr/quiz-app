import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { ButtonGroup, CircularProgress } from "@material-ui/core";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { addAnswer, removeAnswer } from "../../actions/answer.actions";
import { connect } from "react-redux";

const useStyle = makeStyles((theme) => ({
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
  loading_wrapper: {
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: "auto",
  },
}));
const Question = ({ addAnswer, removeAnswer, Questions, setSubmited }) => {
  const [activeQ, setActiveQ] = useState(0);
  let [selectedOption, setSelectedOption] = useState([]);

  const onNextClickHandler = (myOptions) => {
    addAnswer(activeQ, myOptions);
    setSelectedOption([]);

    if (activeQ + 1 < Questions.all.length) {
      setActiveQ(activeQ + 1);
    }
    if (activeQ + 1 === Questions.all.length) {
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
      {Questions.loading === true ? (
        <div className={classes.loading_wrapper}>
          <CircularProgress size={60} />
        </div>
      ) : (
        <>
          <Typography variant="h6">
            <span>{activeQ + 1}-</span>
            {Questions.all[activeQ].q}
          </Typography>
          <Typography className={classes.type} variant="body1">
            <span>Type:</span>
            {Questions.all[activeQ].type}
          </Typography>
          {Questions.all[activeQ].type === "single-choice" ? (
            <RadioGroup
              row
              className={classes.radioBtn_wrapper}
              onChange={onChangeRadio}
            >
              {Questions.all[activeQ].options.map((o) => (
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
              {Questions.all[activeQ].options.map((o) => (
                <Grid item xs={6} className={classes.grid_item}>
                  <FormControlLabel
                    control={<Checkbox />}
                    value={o}
                    label={o}
                  />
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
      )}
    </>
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Question);
