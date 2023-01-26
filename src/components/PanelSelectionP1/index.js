import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RightArrow from "../../assets/rightarrow.png";
import LeftArrow from "../../assets/leftarrow.png";
import "./styles.css";

export default function PanelSelectionP1(props) {
  const navigate = useNavigate(); // FUNCOES QUE SERÃO USADAS POSTERIORMENTE

  const [page, setPage] = useState(0);
  const [offsetQuery, setOffsetQuery] = useState(0);
  const [pokemonImageP1, setPokemonImageP1] = useState(""); // ARMAZEM DE VARIAVEIS DA PAGINA
  const [pokemonNameP1, setPokemonNameP1] = useState("");

  useEffect(() => getPokemon(), []); //CHAMARA A FUNCAO APOS O LOADING DA PAGINA

  // AREA ABAIXO É PARA O FUNCIONAMENTO DE TRANSICAO DE VARIAVEIS PARA OUTRAS PAGINAS
  const storagedPokemonP1 = () => {
    navigate("/p2selection", {
      state: { id: 1, p1Name: { pokemonNameP1 }, p1Image: { pokemonImageP1 } },
    });
  };

  //CHAMANDO API
  const getPokemon = (next, search, value) => {
    if (search) {
      let url = `https://pokeapi.co/api/v2/pokemon/${value}`;
      axios
        .get(url)
        .then((response) => {
          let pokemonNameP1 = response.data.name;
          setPokemonNameP1(pokemonNameP1);
          let imgSrc = response.data.sprites.front_default;
          setPokemonImageP1(imgSrc);
        })
        .catch((error) => console.log(error));
      return;
    }
    if (!next && !search && !value) {
      let url = `https://pokeapi.co/api/v2/pokemon/`;
      axios
        .get(url)
        .then((response) => {
          let pokemonNameP1 = response.data.results[page].name;
          setPokemonNameP1(pokemonNameP1);
          axios
            .get(`https://pokeapi.co/api/v2/pokemon/${pokemonNameP1}`)
            .then((response2) => {
              let imgSrc = response2.data.sprites.front_default;
              setPokemonImageP1(imgSrc);
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
          pokemonNameP1 = response.data.results[page].name;
          setPokemonNameP1(pokemonNameP1);
          axios
            .get(`https://pokeapi.co/api/v2/pokemon/${pokemonNameP1}`)
            .then((response2) => {
              let imgSrc = response2.data.sprites.front_default;
              setPokemonImageP1(imgSrc);
            })
            .catch((error) => console.log(error));
          return;
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
            {pokemonImageP1 ? (
              <img
                className="pokemonImage"
                alt="pokemonImage"
                src={pokemonImageP1}
              />
            ) : (
              ""
            )}
          </div>
          <span className="pokemonName">{pokemonNameP1}</span>
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
          storagedPokemonP1();
        }}
      >
        CONFIRM
      </button>
    </div>
  );
}
