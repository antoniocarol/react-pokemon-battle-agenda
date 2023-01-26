import { Link, useLocation } from "react-router-dom";
import { Grid, Avatar, Typography } from "@material-ui/core";
import { format } from "date-fns";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  gridPrincipal: {
    display: "flex",
    flexDirection: "column",
    background: "linear-gradient(90deg, #fc466ae8 0%, #3f5efbdb 100%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    width: 900,
    height: 500,
    position: "absolute",
    top: "50%",
    left: "50%",
    msTransform: "translate(-50%, -50%)",
    transform: "translate(-50%, -50%);",
    alignItems: "center",
    justifyContent: "center",
  },
  gridSecond: {
    display: "flex",
    marginTop: "40px",
    gap: "390px",
  },
  gridThird: {
    display: "flex",
  },
  avatarP1: {
    position: "relative",
    width: "300px",
    height: "300px",
  },
  avatarP2: {
    position: "relative",
    width: "300px",
    height: "300px",
    marginLeft: "199px",
  },
  textPlayer: {
    fontSize: "20px",
    fontFamily: `"Seymour One", sans-serif`,
  },
  timeDate: {
    fontSize: "20px",
    fontFamily: `"Seymour One", sans-serif`,
  },
});

export default function PanelList() {
  const classes = useStyles();
  const location = useLocation();

  let battleDate = format(location.state.date.selectedDate, "MM/dd/yyyy");
  let battleTime = format(location.state.time.selectedTime, "HH:mm a");

  return (
    <div>
      <Grid className={classes.gridPrincipal}>
        <Grid className={classes.gridSecond}>
          <Typography component="h1" className={classes.textPlayer}>
            Player 1
          </Typography>
          <Typography component="h1" className={classes.textPlayer}>
            Player 2
          </Typography>
        </Grid>
        <Grid className={classes.gridThird}>
          <Avatar
            className={classes.avatarP1}
            alt="Player-1 Pokemon"
            src={location.state.p1Image.pokemonImageP1}
          />
          <Avatar
            className={classes.avatarP2}
            alt="Player-2 Pokemon"
            src={location.state.p2Image.pokemonImageP2}
          />
        </Grid>
        <Typography component="h1" className={classes.timeDate}>
          {battleDate}
        </Typography>
        <Typography component="h1" className={classes.timeDate}>
          {battleTime}
        </Typography>
      </Grid>
      <Link to="/">
        <button className="confirmButton">Do it again</button>
      </Link>
    </div>
  );
}
