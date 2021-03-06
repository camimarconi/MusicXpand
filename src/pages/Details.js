import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-js";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../styles/style.css";

const spotifyApi = new SpotifyWebApi();

function Details(props) {
  const { id } = useParams();
  const [state, setState] = useState([]);
  const [artist, setArtist] = useState({
    id: "",
    images: [
      {
        url: "",
      },
    ],
  });
  const [topTracks, setTopTracks] = useState([]);

  const [counter, setCounter] = useState();

  useEffect(() => {
    spotifyApi.getArtistAlbums(id).then(
      function (data) {
        setState([...data.items]);
      },
      function (err) {
        console.error(err);
      }
    );
    spotifyApi.getArtist(id).then(
      function (data) {
        setArtist({ ...data });
      },
      function (err) {
        console.error(err);
      }
    );
    spotifyApi.getArtistTopTracks(id, "US").then(
      function (data) {
        setTopTracks([...data.tracks]);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  }, [props.token, id]);

  function addSong(event) {
    let index = event.currentTarget.value;
    const albumCover = topTracks[index].album.images[0].url;
    const songName = topTracks[index].name;
    const artistName = topTracks[index].artists;
    const albumName = topTracks[index].album.name;
    const musicPreview = topTracks[index].preview_url;
    const musicId = topTracks[index].id;

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
      <h1 className="result d-flex flex-row">{artist.name}</h1>
      <div className="main-wrapper m-5">
        <img src={artist.images[0].url} className="img-fluid" alt="" />

        <div className="main-wrapper m-5">
          <h2 className="tracks">Top Tracks</h2>
        </div>
        <div className="container">
          <div className="main-wrapper m-4">
            {topTracks.map((current, index) => {
              return (
                <div className="container main-container" key={index}>
                  <div className="row main-row">
                    <div className="col-12 align-center">
                      <div className="row p-2 justify-content-sm-between text-sm-center details-xs">
                        <div className="col-md-2 align-middle align-self-center image-cover text-sm-center details-xs">
                          <img
                            src={current.album.images[0].url}
                            alt="twbs"
                            width="80"
                            height="80"
                            className="rounded-circle flex-shrink-0 "
                          />
                        </div>
                        <div className="col-md-2 col-sm-12 align-self-center text-sm-center m-2 details-xs">
                          <h5 className="mb-0">{current.name}</h5>
                        </div>
                        <div className="col-md-2 col-sm-12 align-self-center text-sm-center m-2 details-xs">
                          {current.artists.map((currentArtist) => {
                            return (
                              <h5
                                key={currentArtist.name}
                                className="mb-0 opacity-75"
                              >
                                {currentArtist.name}
                              </h5>
                            );
                          })}
                        </div>
                        <div className="col-md-2 col-sm-12 opacity-75 align-self-center text-sm-center m-2 details-xs">
                          <h5 className="album-name mb-0">
                            {current.album.name}
                          </h5>
                        </div>

                        <div className="col-md-2 col-sm-12 align-self-center text-sm-center m-2 details-xs">
                          <button
                            type="button"
                            className="btn btn-block btn-listen m-1"
                            value={current.id}
                            onClick={() => {
                              window.open(
                                `https://open.spotify.com/track/${current.id}`
                              );
                            }}
                          >
                            <i className="bi bi-play-circle-fill"></i>
                          </button>
                          <button
                            className="btn btn-discovery col text-center"
                            value={index}
                            onClick={addSong}
                          >
                            <i className="bi bi-heart-fill"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <h2 className="albums mt-5">Albums</h2>
        <div className="d-flex flex-wrap justify-content-around">
          {state.map((current) => {
            return (
              <Link
                key={current.id}
                className="text-decoration-none"
                to={`/albumMusics/${current.id}`}
              >
                <div
                  className="card mt-5 d-flex flex-col mb-4 text-wrap"
                  style={{ width: "21rem" }}
                >
                  <div className="card-body col align-self-center text-wrap">
                    <img
                      src={current.images[0].url}
                      className="card-img-top align-self-end"
                      alt="..."
                    />
                    <h5 className="mt-3 fs-3 col text-wrap">{current.name}</h5>
                    <h4 className="mt-3 fs-5 col text-wrap nameClass">
                      {current.artists[0].name}
                    </h4>
                    <h4 className="mt-3 fs-5 col text-wrap color-cards">
                      {current.release_date.slice(0, 4)}
                    </h4>
                  </div>
                </div>
              </Link>
            );
          })}
          ;
        </div>
      </div>
      <p className="details-about-us mt-5 align-self-center text-sm-center">
        .
      </p>
    </div>
  );
}

export default Details;
