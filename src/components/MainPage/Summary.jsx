import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import axios from "axios";

const useStyle = makeStyles((theme) => ({
  table: {
    marginBottom: "auto",
  },
  submit_btn: {
    marginLeft: "auto",
    marginTop: theme.spacing(1),
  },
}));

const Summary = ({ answers, Auth, Questions }) => {
  const classes = useStyle();
  const onSubmitClickHandler = () => {
    //send data to db
    axios.post("https://sheltered-island-41076.herokuapp.com/answers/save", {
      userName: Auth.user.userName,
      answers: answers,
    });
  };
  return (
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
          {Questions.all.map((q) => (
            <TableRow key={q.id}>
              <TableCell component="th" scope="row">
                {q.id + 1}
              </TableCell>
              <TableCell>{q.q}</TableCell>
              <TableCell>{q.type}</TableCell>
              <TableCell align="right">
                {Array.isArray(answers[q.id].selectedOptions) === true
                  ? answers[q.id].selectedOptions.map((i) => <div>{i}</div>)
                  : answers[q.id].selectedOptions}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button
        style={{ marginLeft: "auto" }}
        variant="contained"
        color="secondary"
        onClick={onSubmitClickHandler}
        className={classes.submit_btn}
      >
        Submit
      </Button>
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
export default connect(mapStateToProps)(Summary);
