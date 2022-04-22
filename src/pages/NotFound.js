import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/style.css";
import axios from "axios";
import logoMono from "../images/logoMono.png";

function NotFound() {
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
  // const [albumDataFromSpotifyApi, setAlbumDataFromSpotifyApi] = useState([]);
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

  const [counter, setCounter] = useState();

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

  return (
    <div className="bg-dark">
      <Navbar counter={counter} />
      <div className="container mt-5">
        <div className="row-md-2 row-sm-12 align-self-center text-sm-center">
          <h1 className="ironhack-about-us mb-4">404 - Ops... Not Found!</h1>
          <p className="ironhack-about-us">This page does not exist.</p>
          <img
            src={logoMono}
            alt="Logo-Mono"
            className="mt-5 mb-5"
            width="310"
            height="400"
          />
          <p className="ironhack-about-us mb-5">.</p>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
