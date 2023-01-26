import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core/styles";

// AREA DE ESTILIZACAO DE COMPONENTES
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

export default function ChooseDate() {
  const location = useLocation();
  const navigate = useNavigate(); // FUNCOES QUE SERÃO USADAS POSTERIORMENTE
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = useState(new Date()); //ARMAZEM DA DATA DA PARTIDA

  function handleDateChange(date) {
    return setSelectedDate(date); //DEFINE A DATA
  }

  // AREA ABAIXO É PARA O FUNCIONAMENTO DE TRANSICAO DE VARIAVEIS PARA OUTRAS PAGINAS
  const storagedDate = () => {
    navigate("/time", {
      state: {
        id: 1,
        date: { selectedDate },
        p1Name: location.state.p1Name,
        p1Image: location.state.p1Image,
        p2Name: location.state.p2Name,
        p2Image: location.state.p2Image,
      },
    });
  };
  return (
    //RENDERIZACAO DA SELECAO DE DATA
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container alignContent="space-around" className={classes.gridFirst}>
        <DatePicker
          disableToolbar
          disablePast
          format="MM/dd/yyy"
          margin="normal"
          id="date-picker"
          label="Escolha a Data"
          value={selectedDate}
          onChange={(value) => handleDateChange(value)}
        ></DatePicker>
      </Grid>

      <button
        className="confirmButton"
        onClick={() => {
          storagedDate();
        }}
      >
        CONFIRM
      </button>
    </MuiPickersUtilsProvider>
  );
}
