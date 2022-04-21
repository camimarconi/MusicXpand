import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/playlistStyle.css";
import axios from "axios";


const Mono = "../images/logo-Mono.png";

function AboutUs() {
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

  return (
    <div className="bg-dark">
      <Navbar counter={counter} />
      <div className="container">
        <div className="m-5 row-md-2 row-sm-12 align-self-center text-sm-center">
          <img
            src={Mono}
            alt="Logo-Mono"
            className="img-fluid img-thumbnail"
            width="200"
            height="200"
          />
          <h2 className="details-about-us m-5">
            Camila Marconi & Natalia Rudigir
          </h2>
          <h3 className="details-about-us m-5 mb-5">Ironhack WDPT 2022</h3>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;