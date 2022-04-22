import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-js";
import "../styles/style.css";
import axios from "axios";
import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";

const spotifyApi = new SpotifyWebApi();

function Search(props) {
  const { keyword } = useParams();

  const [search, setSearch] = useState([]);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [counter, setCounter] = useState();

  useEffect(() => {
    setLoading(true);

    spotifyApi.searchTracks(keyword).then(
      function (data) {
        setSearch([...data.tracks.items]);
      },
      function (err) {
        console.error(err);
      }
    );
  }, [props.token, keyword]);

  function addSong(event) {
    let index = event.currentTarget.value;
    const albumCover = search[index].album.images[0].url;
    const songName = search[index].name;
    const artistName = search[index].artists;
    const albumName = search[index].album.name;
    const musicPreview = search[index].preview_url;
    const musicId = search[index].id;

    axios
      .post("https://ironrest.herokuapp.com/musicxpand", {
        albumCover: albumCover,
        songName: songName,
        artistName: artistName,
        albumName: albumName,
        musicPreview: musicPreview,
        musicId: musicId,
        coverUser: "",
        namePlaylistUser: "",
      })
      .then((response) => {
        axios
          .get("https://ironrest.herokuapp.com/musicxpand/")
          .then((response) => {
            const onlyMusics = response.data.filter(
              (element) => element.coverUser === ""
            );
            setCounter(onlyMusics.length);
          })
          .catch((err) => console.error(err));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    axios
      .get("https://ironrest.herokuapp.com/musicxpand/")
      .then((response) => {
        const onlyMusics = response.data.filter(
          (element) => element.coverUser === ""
        );
        setCounter(onlyMusics.length);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-dark">
      <Navbar counter={counter} />
      {!loading && <LoadingSpinner />}

      <h2 className="result d-flex flex-row">
        Results containing... <i> {keyword}</i>
      </h2>
      <div className="d-flex flex-wrap justify-content-around align-items-end">
        {search.map((current, index) => {
          return (
            <div
              key={index}
              className="card mt-5 d-flex flex-colmb-4 text-center"
              style={{ width: "21rem" }}
            >
              <div className="card-body col align-self-center">
                <img
                  src={current.album.images[0].url}
                  className="card-img-top"
                  alt="..."
                />
                <h5 className="mt-3 fs-4 col">{current.artists[0].name}</h5>
                <h4 className="mt-3 fs-5 col">{current.name}</h4>
                <h6 className="mt-3 card-subtitle mb-2 text-muted col align-self-center">
                  {current.album.name}
                </h6>
                <div className="align-self-end text-center">
                  <audio
                    className="audio-layout"
                    controls
                    src={current.preview_url}
                  ></audio>
                  <button
                    className="btn btn-discovery col text-center"
                    value={index}
                    onClick={addSong}
                  >
                    <i className="bi bi-heart-fill"></i>
                  </button>
                  <button
                    className="btn btn-details col"
                    onClick={() =>
                      navigate(`/details/${current.artists[0].id}`)
                    }
                  >
                    <i className="bi bi-search-heart-fill"></i>
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
