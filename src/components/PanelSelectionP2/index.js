import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import RightArrow from "../../assets/rightarrow.png";
import LeftArrow from "../../assets/leftarrow.png";
import "./styles.css";

export default function PanelSelectionP2(props) {
  // FUNCOES QUE SERÃO USADAS POSTERIORMENTE
  const location = useLocation();
  const navigate = useNavigate();

  // ARMAZEM DE VARIAVEIS DA PAGINA
  const [pokemonImageP2, setPokemonImageP2] = useState("");
  const [pokemonNameP2, setPokemonNameP2] = useState("");
  const [page, setPage] = useState(0);
  const [offsetQuery, setOffsetQuery] = useState(0);

  useEffect(() => getPokemon(), []); //CHAMARA A FUNCAO APOS O LOADING DA PAGINA

  // AREA ABAIXO É PARA O FUNCIONAMENTO DE TRANSICAO DE VARIAVEIS PARA OUTRAS PAGINAS
  const storagedPokemonP2 = () => {
    navigate("/date", {
      state: {
        id: 1,
        p1Name: location.state.p1Name,
        p1Image: location.state.p1Image,
        p2Name: { pokemonNameP2 },
        p2Image: { pokemonImageP2 },
      },
    });
  };

  //CHAMANDO API
  const getPokemon = (next, search, value) => {
    if (search) {
      let url = `https://pokeapi.co/api/v2/pokemon/${value}`;
      axios
        .get(url)
        .then((response) => {
          let pokemonNameP2 = response.data.name;
          setPokemonNameP2(pokemonNameP2);
          let imgSrc = response.data.sprites.front_default;
          setPokemonImageP2(imgSrc);
        })
        .catch((error) => console.log(error));
      return;
    }
    if (!next && !search && !value) {
      let url = `https://pokeapi.co/api/v2/pokemon/`;
      axios
        .get(url)
        .then((response) => {
          let pokemonNameP2 = response.data.results[page].name;
          setPokemonNameP2(pokemonNameP2);
          axios
            .get(`https://pokeapi.co/api/v2/pokemon/${pokemonNameP2}`)
            .then((response2) => {
              let imgSrc = response2.data.sprites.front_default;
              setPokemonImageP2(imgSrc);
            })
            .catch((error) => console.log(error));
          return;
        })
        .catch((error) => console.log(error));
    } else {
      let url = `https://pokeapi.co/api/v2/pokemon/?offset=${offsetQuery}&limit=20`;
      axios
        .get(url)
        .then((response) => {
          pokemonNameP2 = response.data.results[page].name;
          setPokemonNameP2(pokemonNameP2);
          axios
            .get(`https://pokeapi.co/api/v2/pokemon/${pokemonNameP2}`)
            .then((response2) => {
              let imgSrc = response2.data.sprites.front_default;
              setPokemonImageP2(imgSrc);
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    }
  };

  //FUNCIONAMENTO DOS BOTOES LATERAIS
  const handleLeftArrow = () => {
    let tempPage = page;
    if (page === 0 && offsetQuery === 0) {
      return;
    }
    if (offsetQuery >= 20 && page !== 0) {
      getPokemon("next");
      setPage((tempPage -= 1));
      return;
    }
    if (page === 0) {
      setOffsetQuery((offsetQuery -= 20));
      if (offsetQuery === 0) {
        setPage(20);
      } else {
        setPage(19);
        getPokemon("next");
        return;
      }
    }
    getPokemon();
    setPage((tempPage -= 1));
  };
  const handleRightArrow = () => {
    let tempPage = page;
    if (page === 19) {
      setOffsetQuery((offsetQuery += 20));
      setPage(0);
    }
    if (offsetQuery >= 20) {
      getPokemon("next");
      setPage((tempPage += 1));
      return;
    }
    getPokemon();
    setPage((tempPage += 1));
  };

  //FUNCIONAMENTO DA BARRA DE PESQUISA
  const handleOnChangeInput = (e) => {
    e.preventDefault();
    if (e.target.value === "") {
      return getPokemon();
    } else {
      getPokemon("", "search", e.target.value);
    }
  };
  return (
    //RENDERIZACAO DO COMPONENTE
    <div>
      <div className="panelSelection">
        <img
          src={LeftArrow}
          className="leftArrow"
          alt="leftArrow"
          onClick={() => {
            handleLeftArrow();
          }}
        />
        <div className="pokemonMenu">
          <span className="player">{props.children}</span>
          <span className="textContainer">Escolha o Pokemon:</span>
          <div className="pokemonInfo">
            {pokemonImageP2 ? (
              <img
                className="pokemonImage"
                alt="pokemonImage"
                src={pokemonImageP2}
              />
            ) : (
              ""
            )}
          </div>
          <span className="pokemonName">{pokemonNameP2}</span>
          <input
            placeholder="Search name"
            className="pokemonInput"
            onChange={handleOnChangeInput}
          ></input>
        </div>
        <img
          src={RightArrow}
          className="rightArrow"
          alt="rightArrow"
          onClick={() => {
            handleRightArrow();
          }}
        />
      </div>
      <button
        className="confirmButton"
        onClick={() => {
          storagedPokemonP2();
        }}
      >
        CONFIRM
      </button>
    </div>
  );
}
