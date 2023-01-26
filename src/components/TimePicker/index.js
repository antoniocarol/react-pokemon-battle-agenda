import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  gridFirst: {
    background: "linear-gradient(90deg, #fc466ae8 0%, #3f5efbdb 100%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    width: 300,
    height: 100,
    position: "absolute",
    top: "50%",
    left: "50%",
    msTransform: "translate(-50%, -50%)",
    transform: "translate(-50%, -50%);",
    padding: "0 30px",
  },
});

function ChooseTime() {
  const location = useLocation();
  const navigate = useNavigate();
  const classes = useStyles();

  const [selectedTime, setSelectedTime] = useState(new Date());

  function handleTimeChange(date) {
    setSelectedTime(date);
  }

  const storagedTime = () => {
    navigate("/resume", {
      state: {
        id: 1,
        date: location.state.date,
        time: { selectedTime },
        p1Name: location.state.p1Name,
        p1Image: location.state.p1Image,
        p2Name: location.state.p2Name,
        p2Image: location.state.p2Image,
      },
    });
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container alignContent="space-around" className={classes.gridFirst}>
        <TimePicker
          disableToolbar
          format="HH:mm a"
          margin="normal"
          id="time-picker"
          label="Escolha a Hora"
          value={selectedTime}
          onChange={(value) => handleTimeChange(value)}
        ></TimePicker>
      </Grid>
      <button
        className="confirmButton"
        onClick={() => {
          storagedTime();
        }}
      >
        CONFIRM
      </button>
    </MuiPickersUtilsProvider>
  );
}

export default ChooseTime;
