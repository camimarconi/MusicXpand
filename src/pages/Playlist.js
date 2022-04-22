import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/style.css";
import axios from "axios";
import Navbar from "../components/Navbar";

function Playlist(props) {
  const [musicXpandListApi, setMusicXpandListApi] = useState([
    {
      albumCover: "",
      songName: "",
      artistName: [{ name: "" }],
      albumName: "",
      musicPreview: "",
      musicId: "",
      coverUser: "",
      namePlaylistUser: "",
    },
  ]);

  const [playlistCoverInfo, setPlaylistCoverInfo] = useState({
    albumCover: "",
    songName: "",
    artistName: [],
    albumName: "",
    musicPreview: "",
    musicId: "",
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
          setPlaylistCoverInfo(...coverInfo);
          setHasPlaylist(true);
        }
        setMusicXpandListApi([...onlyMusics]);
        setCounter(onlyMusics.length);
      })
      .catch((err) => console.error(err));
  }, []);

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
        })
        .catch((err) => console.error(err));
    }
  }

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
        setShowForm(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleSubmit(event) {
    event.preventDefault();
    PostInApi();
  }

  return (
    <div className="bg-dark">
      <Navbar counter={counter} />
      <div className="container">
        {showForm && !hasPlaylist ? (
          <form onSubmit={handleSubmit} className="m-5">
            <div className="custom-file mt-3">
              <input
                placeholder="My Playlist's photo"
                id="userCreateCover"
                name="coverUser"
                value={playlistCoverInfo.coverUser}
                onChange={handleFormChange}
                type="text"
              />
            </div>

            <div className="mt-3">
              <input
                placeholder="My Playlist's name"
                id="userCreateName"
                name="namePlaylistUser"
                value={playlistCoverInfo.namePlaylistUser}
                onChange={handleFormChange}
                type="text"
              />
              <div className="mt-3">
                <button
                  className="btn btn-outline-secondary mt-3"
                  type="submit"
                  id="button"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        ) : null}
        <div className="main-wrapper">
          {hasPlaylist ? (
            <div className="container main-container">
              <div className="row">
                <div className="col-12 align-items-start m-3 ">
                  <img
                    src={playlistCoverInfo.coverUser}
                    alt="my cover choice"
                    width="300"
                    height="300"
                    className="img-fluid img-thumbnail rounded mb-2"
                  />
                </div>
                <div className="d-inline align-self-center">
                  <div className="d-inline m-2 mb-4">
                    <h1 className="d-inline playlist-name m-1">
                      {playlistCoverInfo.namePlaylistUser}
                    </h1>
                    <div className="d-inline m-3 align-text-bottom">
                      <Link
                        className="btn btn-delete"
                        to={`/userUpdate/${playlistCoverInfo._id}`}
                      >
                        <i className="bi bi-pen-fill"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          <div className="main-wrapper m-4">
            {musicXpandListApi.map((current) => {
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
                              <h5
                                className="mb-0 opacity-75"
                                key={currentArtist.id}
                              >
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
                            className="btn btn-block btn-details m-1"
                            onClick={() =>
                              navigate(`/details/${current.artistName[0].id}`)
                            }
                          >
                            <i className="bi bi-search-heart-fill"></i>
                          </button>
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
      <p className="details-about-us mt-5 align-self-center text-sm-center">
        .
      </p>
    </div>
  );
}

export default Playlist;
