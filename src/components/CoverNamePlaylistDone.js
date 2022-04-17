import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// R do CRUD: Read (GET), buscar detalhes de um livro específico
function CoverNamePlaylistDone() {
  const [state, setState] = useState({
    coverUser: "",
    namePlaylistUser: "",
  });

  console.log(useParams());

  // 1. Receber o parâmetro de rota (da URL do navegador)
  const { _id } = useParams();

  // 2. Dentro do useEffect,

  useEffect(() => {
    axios
      .get(`https://ironrest.herokuapp.com/musicxpand${_id}`)
      .then((response) => {
        setState({ ...response.data });
      })
      .catch((err) => console.error(err));
  }, [_id]);

  // 6. Usa o state para renderizar o HTML
  return (
    <div className="mt-5">
      <div className="mb-3">
        <img
          className="img-fluid img-thumbnail details"
          src={state.coverUser}
          alt={`Cover chosen by you!`}
        />
      </div>

      <div className="mb-3">
        <h2>{state.namePlaylistUser}</h2>
      </div>
    </div>
  );
}

export default CoverNamePlaylistDone;
