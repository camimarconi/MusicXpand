import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

// R do CRUD: Read (GET), buscar detalhes de um livro específico
function CoverNamePlaylistDone() {
  const [state, setState] = useState({
    coverUser: "",
    namePlaylistUser: "",
  });

  console.log(useParams());

  // 1. Receber o parâmetro de rota (da URL do navegador)
  const { id } = useParams();

  // 2. Dentro do useEffect,

  useEffect(() => {
    async function fetchData() {
      try {
        // 3. Buscar os detalhes do livro específico que o usuário clicou
        // 4. Solicitar detalhes do livro pelo Axios
        const response = await axios.get(
          `https://ironrest.herokuapp.com/musicxpand${id}`
        );

        // 5. Atualizar o state
        setState({ ...response.data });
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [id]);

  // 6. Usa o state para renderizar o HTML
  return (
    <div className="mt-5">
      <img
        className="img-fluid"
        src={state.coverUser}
        alt={`Cover chosen by you!`}
      />
      <div class="input-group mb-3">
        <h2>{state.namePlaylistUser}</h2>

        <button
          class="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
        >
          Button
        </button>
      </div>
    </div>
  );
}

export default CoverNamePlaylistDone;
