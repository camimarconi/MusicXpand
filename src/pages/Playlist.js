import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/playlistStyle.css";
import axios from "axios";
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
  console.log("Array de musicas", musicXpandListApi);

  const contador = props.counter;
  const setContador = props.setCounter;

  useEffect(() => {
    axios
      .get("https://ironrest.herokuapp.com/musicxpand/")
      .then((response) => {
        setMusicXpandListApi(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  function deleteSong(event) {
    let id = event.currentTarget.value;
    // const found = musicXpandListApi.find(element => element._id === id);

    const areYouSure = window.confirm(
      "Você tem certeza que deseja deletar esta música?"
    );
    if (areYouSure) {
      return axios
        .delete(`https://ironrest.herokuapp.com/musicxpand/${id}`)
        .then((response) => {
          window.location.reload();
          axios
            .get("https://ironrest.herokuapp.com/musicxpand/")
            .then((response) => {
              setContador(response.data.length);
              console.log(contador);
            })
            .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));
    }
  }

  const [coverUser, setCoverUser] = useState("");
  const [namePlaylistUser, setNamePlaylistUser] = useState("");

  function CreateCover(event) {
    setCoverUser(event.currentTarget.value);
  }

  function CreatePlaylistName(event) {
    setNamePlaylistUser(event.currentTarget.value);
  }

  function PostInApi(event) {
    axios
      .post("https://ironrest.herokuapp.com/musicxpand", {
        albumCover: "",
        songName: "",
        artistName: "",
        albumName: "",
        musicPreview: "",
        coverUser: coverUser,
        namePlaylistUser: namePlaylistUser,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  const isMusic = [];
  const isPlaylist = [];

  function filterByType(object) {
    if (
      ("coverUser" in object && isNaN(object.coverUser)) ||
      ("namePlaylistUser" in object && isNaN(object.namePlaylistUser))
    ) {
      isPlaylist.push(object);
    } else {
      isMusic.push(object);
    }
  }

  musicXpandListApi.filter(filterByType);
  console.log("!!!!!!!! is music", isMusic);
  console.log("!!!!!!!! is playlist", isPlaylist);

  return (
    <div>
      <div className="bg-dark">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="custom-file">
              <input
                id="userCreateCover"
                name="coverUser"
                value={coverUser}
                onChange={CreateCover}
                type="file"
              />
            </div>

            <div className="mb-3">
              <input
                placeholder="My Playlist's name"
                id="userCreateName"
                name="namePlaylistUser"
                value={namePlaylistUser}
                onChange={CreatePlaylistName}
                type="text"
              />
              <div>
                <button
                  className="btn btn-outline-secondary mb-3"
                  type="submit"
                  id="button"
                  onClick={PostInApi}
                >
                  Button
                </button>
              </div>
              <h2 className="result d-flex flex-row">Playlist</h2>
            </div>
          </form>
          <div className="main-wrapper">
            {isMusic.map((current) => {
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

                        <div className="col-md-2 col-sm-12 align-self-center text-sm-center m-2 details-xs">
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
  );
}

export default Playlist;
