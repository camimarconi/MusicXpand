import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/playlistStyle.css";
import axios from "axios";
import Navbar from "../components/Navbar";

// import SpotifyWebApi from "spotify-web-api-js";
// import CreatePlaylistCoverName

// const spotifyApi = new SpotifyWebApi();

function Playlist(props) {
  const [musicXpandListApi, setMusicXpandListApi] = useState([
    {
      albumCover: "",
      songName: "",
      artistName: [{ name: "" }],
      albumName: "",
      musicPreview: "",
      musicId: "",
      _id: "",
      coverUser: "",
      namePlaylistUser: "",
    },
  ]);
  // const [albumDataFromSpotifyApi, setAlbumDataFromSpotifyApi] = useState([]);
  const [playlistCoverInfo, setPlaylistCoverInfo] = useState({
    albumCover: "",
    songName: "",
    artistName: [],
    albumName: "",
    musicPreview: "",
    musicId: "",
    _id: "",
    coverUser: "",
    namePlaylistUser: "",
  });

  const navigate = useNavigate();

  const [counter, setCounter] = useState();

  const [showForm, setShowForm] = useState(true);

  const [hasPlaylist, setHasPlaylist] = useState(false);

  useEffect(() => {
    axios
      .get("https://ironrest.herokuapp.com/musicxpand/")
      .then((response) => {
        const onlyMusics = response.data.filter(
          (element) => element.coverUser === ""
        );
        const coverInfo = response.data.filter(
          (element) => element.coverUser !== ""
        );
        if (!!coverInfo.length) {
          console.log("!!coverInfo.length", !!coverInfo.length);
          setPlaylistCoverInfo(...coverInfo);
          setHasPlaylist(true);
        }
        // setMusicXpandListApi(response.data);
        setMusicXpandListApi([...onlyMusics]);
        console.log(onlyMusics.length);
        console.log("coverInfo DENTRO DO USE EFFECT", coverInfo);
        setCounter(onlyMusics.length);
      })
      .catch((err) => console.error(err));
  }, []);

  console.log(counter);
  console.log("hasPlaylist", hasPlaylist);

  console.log("Array de musicas", musicXpandListApi); // Flá => console.log tem que ser depois do useEffect, se não a Array de musicas ainda é vazia.
  console.log("cover info", playlistCoverInfo); // Flá => console.log tem que ser depois do useEffect, se não a Array  ainda é vazia.

  function deleteSong(event) {
    let id = event.currentTarget.value;

    const areYouSure = window.confirm(
      "Você tem certeza que deseja deletar esta música?"
    );
    if (areYouSure) {
      return axios
        .delete(`https://ironrest.herokuapp.com/musicxpand/${id}`)
        .then((response) => {
          window.location.reload();
          // axios
          //   .get("https://ironrest.herokuapp.com/musicxpand/")
          //   .then((response) => {
          //     setContador(response.data.length);
          //     console.log(contador);
          //   })
          //   .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));
    }
  }

  // const [coverUser, setCoverUser] = useState("");
  // const [namePlaylistUser, setNamePlaylistUser] = useState("");

  // function CreateCover(event) {
  //   setCoverUser(event.currentTarget.value);
  // }

  // function CreatePlaylistName(event) {
  //   setNamePlaylistUser(event.currentTarget.value);
  // }

  const handleFormChange = (event) => {
    setPlaylistCoverInfo({
      ...playlistCoverInfo,
      [event.target.name]: event.target.value,
    });
  };

  function PostInApi(event) {
    axios
      .post("https://ironrest.herokuapp.com/musicxpand", playlistCoverInfo)
      .then((response) => {
        console.log(response.data);
        setShowForm(false);
        // if (showResults === false) {
        window.location.reload();
        // }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleSubmit(event) {
    event.preventDefault();
    PostInApi();
  }

  // const isMusic = [];
  // const isPlaylist = [];

  // function filterByType(object) {
  //   if (
  //     ("coverUser" in object && isNaN(object.coverUser)) ||
  //     ("namePlaylistUser" in object && isNaN(object.namePlaylistUser))
  //   ) {
  //     isPlaylist.push(object);
  //   } else {
  //     isMusic.push(object);
  //   }
  // }

  // musicXpandListApi.filter(filterByType);

  // const hasPlaylist = !!(isPlaylist[0]||{}).coverUser

  // console.log('hasplaylist', hasPlaylist)

  console.log("showForm", showForm);

  return (
    <div>
      <Navbar counter={counter} />
      <div className="bg-dark">
        <h2 className="result d-flex flex-row">Playlist</h2>
        <div className="container">
          {/* { showResults && hasPlaylist ? null : ( */}
          {showForm && !hasPlaylist ? (
            <form onSubmit={handleSubmit}>
              <div className="custom-file">
                <input
                  placeholder="My Playlist's photo"
                  id="userCreateCover"
                  name="coverUser"
                  value={playlistCoverInfo.coverUser}
                  onChange={handleFormChange}
                  type="text"
                />
              </div>

              <div className="mb-3">
                <input
                  placeholder="My Playlist's name"
                  id="userCreateName"
                  name="namePlaylistUser"
                  value={playlistCoverInfo.namePlaylistUser}
                  onChange={handleFormChange}
                  type="text"
                />
                <div>
                  <button
                    className="btn btn-outline-secondary mb-3"
                    type="submit"
                    id="button"
                    // onClick={PostInApi}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          ) : null}
          <div className="container m-5">
            {hasPlaylist ? (
              <div>
                <div className="d-flex flex-row playlist-layout container main-container">
                  <img
                    src={playlistCoverInfo.coverUser}
                    alt="twbs"
                    width="100"
                    height="100"
                    className="rounded-circle flex-shrink-0"
                  />
                  <div className="col-md-2 col-sm-12 align-self-center text-sm-center m-2 details-xs">
                    <h2 className="playlist-name m-3 text-sm-center">
                      {playlistCoverInfo.namePlaylistUser}
                    </h2>
                  </div>
                  <div className="col-md-2 col-sm-12 align-self-center text-sm-center details-xs">
                    <button
                      type="button"
                      className="btn btn-block btn-delete justify-content-start"
                      value=""
                      onClick=""
                    >
                      <i className="bi bi-pen-fill"></i>
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
            {/* <h2 className="result d-flex flex-row">Playlist</h2> */}
            <div className="main-wrapper m-4">
              {musicXpandListApi.map((current) => {
                console.log("current do map", current);
                return (
                  <div className="container main-container" key={current._id}>
                    <div className="row main-row">
                      <div className="col-12 align-center">
                        <div className="row p-2 justify-content-sm-between text-sm-center details-xs">
                          <div className="col-md-2 align-middle align-self-center image-cover text-sm-center details-xs">
                            <img
                              src={current.albumCover}
                              alt="twbs"
                              width="80"
                              height="80"
                              className="rounded-circle flex-shrink-0 "
                            />
                          </div>
                          <div className="col-md-2 col-sm-12 align-self-center text-sm-center m-2 details-xs">
                            <h5 className="mb-0">{current.songName}</h5>
                          </div>
                          <div className="col-md-2 col-sm-12 align-self-center text-sm-center m-2 details-xs">
                            {current.artistName.map((currentArtist) => {
                              return (
                                <h5 className="mb-0 opacity-75">
                                  {currentArtist.name}
                                </h5>
                              );
                            })}
                          </div>
                          <div className="col-md-2 col-sm-12 opacity-75 align-self-center text-sm-center m-2 details-xs">
                            <h5 className="album-name mb-0">
                              {current.albumName}
                            </h5>
                          </div>

                          <div className="col-md-3 col-sm-12 align-self-center text-sm-center m-2 details-xs">
                            <button
                              type="button"
                              className="btn btn-block btn-listen m-1"
                              value={current._id}
                              onClick={() => {
                                window.open(
                                  `https://open.spotify.com/track/${current.musicId}`
                                );
                              }}
                            >
                              <i className="bi bi-play-circle-fill"></i>
                            </button>
                            <button
                              className="btn btn-block btn-details m-1"
                              onClick={() =>
                                navigate(`/details/${current.artistName[0].id}`)
                              }
                            >
                              <i className="bi bi-search-heart-fill"></i>
                            </button>
                            <button
                              type="button"
                              className="btn btn-block btn-delete m-1"
                              value={current._id}
                              onClick={deleteSong}
                            >
                              <i className="bi bi-trash3-fill"></i>
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
        </div>
      </div>
    </div>
  );
}

export default Playlist;
