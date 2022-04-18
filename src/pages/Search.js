import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-js";
import "../styles/style.css";
import axios from "axios";

const spotifyApi = new SpotifyWebApi();

function Search(props) {
  const { keyword } = useParams();

  console.log(keyword);

  const [search, setSearch] = useState([]);

  console.log(search);

  const navigate = useNavigate();

  useEffect(() => {
    spotifyApi.searchTracks(keyword).then(
      function (data) {
        console.log('Search by "Camila"', data);
        setSearch([...data.tracks.items]);
      },
      function (err) {
        console.error(err);
      }
    );
  }, [props.token, keyword]);

  function addSong(event) {
    //capturar o id que está no search
    // newList ser vinculada com o state do com ponente Playlist
    let index = event.target.value;
    console.log(search[index]);
    const albumCover = search[index].album.images[0].url;
    const songName = search[index].name;
    const artistName = search[index].artists;
    const albumName = search[index].album.name;
    const musicPreview = search[index].preview_url;

    axios
      .post("https://ironrest.herokuapp.com/musicxpand", {
        albumCover: albumCover,
        songName: songName,
        artistName: artistName,
        albumName: albumName,
        musicPreview: musicPreview,
        coverUser: "",
        namePlaylistUser: "",
      })
      .then((response) => {
        console.log(response.data); //NOTIFICAÇÃO
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="bg-dark">
      <h2 className="result d-flex flex-row">Results containing {keyword}</h2>
      <div className="d-flex flex-wrap justify-content-around">
        {search.map((current, index) => {
          return (
            <div
              key={index}
              className="card mt-5 d-flex flex-col mb-4"
              style={{ width: "21rem" }}
            >
              <div className="card-body col align-self-center">
                <img
                  src={current.album.images[0].url}
                  className="card-img-top"
                  alt="..."
                />
                <h5 className="mt-3 fs-3 col">{current.artists[0].name}</h5>
                <h4 className="mt-3 fs-5 col">{current.name}</h4>
                <h6 className="mt-3 card-subtitle mb-2 text-muted col align-self-center">
                  {current.album.name}
                </h6>
                {/* <p className="card-text">{current.artists[0].external_urls.spotify}</p> */}

                <div className="align-self-end">
                  <audio controls src={current.preview_url}></audio>
                  <button
                    className="btn btn-discovery col"
                    // value={current.album.id}
                    value={index}
                    onClick={addSong}
                  >
                    Add
                  </button>
                  <button
                    className="btn btn-details col"
                    onClick={() =>
                      navigate(`/details/${current.artists[0].id}`)
                    }
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        ;
      </div>
    </div>
  );
}

export default Search;
