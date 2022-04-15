import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/playlistStyle.css";
import axios from "axios";
import SpotifyWebApi from "spotify-web-api-js";
// import CreatePlaylistCoverName

const spotifyApi = new SpotifyWebApi();

function Playlist(props) {
  const [musicXpandListApi, setMusicXpandListApi] = useState([]);
  const [albumDataFromSpotifyApi, setAlbumDataFromSpotifyApi] = useState([]);

  useEffect(() => {
    axios
      .get("https://ironrest.herokuapp.com/musicxpand/")
      .then((response) => {
        setMusicXpandListApi(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // console.log(musicXpandListApi);
  // console.log(musicXpandListApi.plusSongId);

  useEffect(() => {
    spotifyApi
      .getAlbums([
        musicXpandListApi.map((current) => {
          return current.plusSongId;
        }),
      ])
      .then((response) => {
        console.log("response:", response);
        setAlbumDataFromSpotifyApi(response);
      })
      .catch((err) => console.error(err));
  }, [props.token, musicXpandListApi]);

  console.log("AQUIIII", albumDataFromSpotifyApi);

  return (
    <div className="container">
      {/* <CreatePlaylistCoverName /> */}
      <div className="list-group">
        <li
          className="list-group-item list-group-item-action d-flex gap-3 py-3"
          aria-current="true"
        >
          <img
            src="https://github.com/twbs.png"
            alt="twbs"
            width="50"
            height="50"
            className="rounded-circle flex-shrink-0"
          />
          <div className="d-flex gap-2 w-100 justify-content-evenly align-items-center align-self-center">
            <h5 className="mb-0 fw-bold">Song Name</h5>
            <h5 className="mb-0 opacity-75">Artist Name</h5>
            <h5 className="mb-0 opacity-50 fw-light">Album Name</h5>
            <h4 className="opacity-50 text-nowrap">audio PREVIEW?</h4>
            <h4>DELETE</h4>
          </div>
        </li>
        <li
          className="list-group-item list-group-item-action d-flex gap-3 py-3"
          aria-current="true"
        >
          <img
            src="https://github.com/twbs.png"
            alt="twbs"
            width="32"
            height="32"
            className="rounded-circle flex-shrink-0"
          />
          <div className="d-flex gap-2 w-100 justify-content-between">
            <div>
              <h5 className="mb-0 fw-bold"> Nome Música</h5>
              <h6 className="mb-0 opacity-75">Artist Name</h6>
              <p className="mb-0 opacity-50 fw-light">Album Name</p>
            </div>
            <small className="opacity-50 text-nowrap">audio PREVIEW?</small>
          </div>
        </li>
        <li
          className="list-group-item list-group-item-action d-flex gap-3 py-3"
          aria-current="true"
        >
          <img
            src="https://github.com/twbs.png"
            alt="twbs"
            width="32"
            height="32"
            className="rounded-circle flex-shrink-0"
          />
          <div className="d-flex gap-2 w-100 justify-content-between">
            <div>
              <h5 className="mb-0 fw-bold">Song Name</h5>
              <h6 className="mb-0 opacity-75">Artist Name</h6>
              <p className="mb-0 opacity-50 fw-light">Album Name</p>
            </div>
            <small className="opacity-50 text-nowrap">audio PREVIEW?</small>
          </div>
        </li>
      </div>
    </div>
  );
}

export default Playlist;
