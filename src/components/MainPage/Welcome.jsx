import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  root: {
    alignSelf: "center",
    padding: theme.spacing(3, 1),
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  site_name: {
    backgroundColor: theme.palette.primary.dark,
    color: "white",
    padding: theme.spacing(0.6, 1.4),
    borderRadius: 5,
  },
}));

const Welcome = () => {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <Typography style={{ padding: 8 }} variant="h5">
        Welcome to <span className={classes.site_name}>Quiz App</span>
      </Typography>
      <Typography style={{ padding: 8 }}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus,
        dolore ullam esse voluptates iure deserunt atque tenetur dicta, dolorum
        debitis porro sapiente odit, natus a consectetur minima iusto similique
        harum.Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Temporibus, dolore ullam esse voluptates iure deserunt atque tenetur
        dicta, dolorum debitis porro sapiente odit, natus a consectetur minima
        iusto similique
      </Typography>
      <Typography variant="h6" style={{ padding: 8 }}>
        Login to continue...
      </Typography>
    </div>
  );
};

export default Welcome;
