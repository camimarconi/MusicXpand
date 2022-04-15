import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/playlistStyle.css";
import axios from "axios";
// import SpotifyWebApi from "spotify-web-api-js";
// import CreatePlaylistCoverName

// const spotifyApi = new SpotifyWebApi();

function Playlist() {
  const [musicXpandListApi, setMusicXpandListApi] = useState([
    {
      albumCover: "",
      songName: "",
      artistName: [{ name: "" }],
      albumName: "",
      musicPreview: "",
    },
  ]);
  // const [albumDataFromSpotifyApi, setAlbumDataFromSpotifyApi] = useState([]);

  useEffect(() => {
    axios
      .get("https://ironrest.herokuapp.com/musicxpand/")
      .then((response) => {
        setMusicXpandListApi(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  console.log("TÁ CHEGANU?", musicXpandListApi);
  console.log("AQUIIIIIIIIIIII", musicXpandListApi.albumName);

  return (
    <div className="container">
      {/* <CreatePlaylistCoverName /> */}
      {musicXpandListApi.map((current) => {
        return (
          <div className="list-group">
            <li
              className="list-group-item list-group-item-action d-flex gap-3 py-3"
              aria-current="true"
            >
              <img
                src={musicXpandListApi.albumCover}
                alt="twbs"
                width="50"
                height="50"
                className="rounded-circle flex-shrink-0"
              />
              <div className="d-flex gap-2 w-100 justify-content-evenly align-items-center align-self-center">
                <h5 className="mb-0 fw-bold">{musicXpandListApi.songName}</h5>
                {/* <h5 className="mb-0 opacity-75">
                  {musicXpandListApi.artistName.map((current) => {
                    return current.name;
                  })}
                </h5> */}
                <h5 className="mb-0 opacity-50 fw-light">
                  {musicXpandListApi.albumName}
                </h5>
                <audio
                  className="opacity-50 text-nowrap"
                  controls
                  src={musicXpandListApi.preview_url}
                ></audio>
                <h4>DELETE</h4>
              </div>
            </li>
          </div>
        );
      })}
    </div>
  );
}

export default Playlist;
