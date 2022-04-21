import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/style.css";
import axios from "axios";
import Navbar from "../components/Navbar";
import SpotifyWebApi from "spotify-web-api-js";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const spotifyApi = new SpotifyWebApi();

function AlbumMusics(props) {
  const { id } = useParams();
  const [counter, setCounter] = useState();

  const [state, setState] = useState({});
  const [tracksIds, setTracksIds] = useState([]);
  const [stateTracks, setStateTracks] = useState([]);
  const [albumCover, setAlbumCover] = useState("");
  const [artistName, setArtistName] = useState("");
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    spotifyApi
      .getAlbum(id)
      .then(function (data) {
        console.log("primeiro DATA", data);
        setState({ ...data });
        return data.tracks.items.map(function (t) {
          return t.id;
        });
      })
      .then(function (trackIds) {
        setTracksIds(trackIds);
        return spotifyApi.getTracks(trackIds);
      })
      .then(function (tracksInfo) {
        console.log("depois tracksInfo", tracksInfo);
        setStateTracks(tracksInfo.tracks);
        console.log("por ultimo statetracks", stateTracks);
        setAlbumCover(tracksInfo.tracks[0].album.images[0].url);
        setArtistName(tracksInfo.tracks[0].artists[0].name);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [props.token, id]);

  function addSong(event) {
    //capturar o id que está no search
    // newList ser vinculada com o state do com ponente Playlist
    let index = event.currentTarget.value;
    console.log(index);
    const albumCover = stateTracks[index].album.images[0].url;
    const songName = stateTracks[index].name;
    const artistName = stateTracks[index].artists;
    const albumName = stateTracks[index].album.name;
    const musicPreview = stateTracks[index].preview_url;
    const musicId = stateTracks[index].id;

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
        console.log("!!!!!!", response.data); //NOTIFICAÇÃO
        axios
          .get("https://ironrest.herokuapp.com/musicxpand/")
          .then((response) => {
            const onlyMusics = response.data.filter(
              (element) => element.coverUser === ""
            );
            setCounter(onlyMusics.length);
            console.log(counter);
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

      <h1 className="result d-flex flex-row">{artistName}</h1>
      
        <div className="main-wrapper m-5">
          <img src={albumCover} alt="" className="img-fluid cover-name" />

          <div className="tracks">
            <h2 className="result">{state.name}</h2>
          </div>
        </div>

        <div className="main-wrapper m-5">
          {stateTracks.map((current, index) => {
            console.log("current do map", current);
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
                            <h5 className="mb-0 opacity-75">
                              {currentArtist.name}
                            </h5>
                          );
                        })}
                      </div>
                      <div className="col-md-2 col-sm-12 opacity-75 align-self-center text-sm-center m-2 details-xs">
                        <h5 className="album-name mb-0">{current.name}</h5>
                      </div>

                      <div className="col-md-3 col-sm-12 align-self-center text-sm-center m-2 details-xs">
                        <button
                          type="button"
                          className="btn btn-block btn-listen m-1"
                          value={current._id}
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
  );
}

export default AlbumMusics;
