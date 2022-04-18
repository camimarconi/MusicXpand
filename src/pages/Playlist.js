import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/playlistStyle.css";
import axios from "axios";

// const spotifyApi = new SpotifyWebApi();

function Playlist() {
  const [musicXpandListApi, setMusicXpandListApi] = useState([
    {
      albumCover: "",
      songName: "",
      artistName: [{ name: "" }],
      albumName: "",
      musicPreview: "",
      _id: "",
      coverUser: "",
      namePlaylistUser: "",
    },
  ]);

  const [coverUser, setCoverUser] = useState("");
  const [namePlaylistUser, setNamePlaylistUser] = useState("");

  useEffect(() => {
    axios
      .get("https://ironrest.herokuapp.com/musicxpand/")
      .then((response) => {
        setMusicXpandListApi(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function deleteSong(event) {
    let index = event.target.value;
    const idDeleteSong = musicXpandListApi[index]._id;

    // Antes de prosseguir com a deleção, pedimos a confirmação do usuário
    const areYouSure = window.confirm(
      "Você tem certeza que deseja deletar esta música?"
    );
    if (areYouSure) {
      return axios
        .delete(`https://ironrest.herokuapp.com/musicxpand/${idDeleteSong}`)
        .then((response) => {
          window.location.reload();
        })
        .catch((err) => console.error(err));
    }
  }

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

  console.log("COVER USER", coverUser);
  console.log("PLAYLIST NAME", namePlaylistUser);

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
            </div>
          </form>
        </div>
        <div className="container">
          <div className="main-wrapper">
            {musicXpandListApi.map((current, index) => {
              return (
                <div key={index} className="container main-container">
                  <div className="row main-row">
                    <div className="col-12 align-center">
                      <div className="row p-2">
                        <div className="col-2 align-middle align-self-center image-cover">
                          <img
                            src={current.albumCover}
                            alt="twbs"
                            width="80"
                            height="80"
                            className="rounded-circle flex-shrink-0 "
                          />
                        </div>
                        <div className="col-2 align-self-center">
                          <h5 className="mb-0 song-name">{current.songName}</h5>
                        </div>
                        <div className="col-2 align-self-center">
                          {current.artistName.map((currentName) => {
                            return (
                              <h5 className="mb-0 opacity-75">
                                {currentName.name}
                              </h5>
                            );
                          })}
                        </div>
                        <div className="col-2 opacity-75 align-self-center">
                          <h5 className="album-name mb-0">
                            {current.albumName}
                          </h5>
                        </div>

                        <div className="col-2 align-self-center">
                          <audio
                            className="player opacity-50 text-nowrap"
                            controls
                            src={current.musicPreview}
                          ></audio>
                        </div>

                        <div className="col-2 align-self-center">
                          <button
                            type="button"
                            className="btn btn-block btn-delete"
                            value={index}
                            onClick={deleteSong}
                          >
                            Delete
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
