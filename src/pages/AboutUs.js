import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/playlistStyle.css";
import axios from "axios";
import logoMono from "../images/logoMono.png";
import logo1 from "../images/logo1.png";

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
            src={logoMono}
            alt="Logo-Mono"
            className=""
            width="310"
            height="400"
          />
          <h2 className="details-about-us m-5 mt-0">
            Camila Marconi && Natalia Rudiger
          </h2>
          <h3 className="details-about-us mt-5 margin-specified">
            Ironhack WDPT 2022
          </h3>
          <img
            src={logo1}
            alt="icon-logo-Mono"
            width="30"
            height="30"
            className=" img-fluid details-about-us mt-5 margin-specified"
          />
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
