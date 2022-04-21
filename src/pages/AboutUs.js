import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/style.css";
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
      <div className="container align-self-center text-sm-center">
        <div className="row-md-2 row-sm-12 align-self-center text-sm-center">
          <img
            src={logoMono}
            alt="Logo-Mono"
            className=""
            width="310"
            height="400"
          />
          <h2 className="details-about-us mt-0 align-self-center text-sm-center">
            <a
              href="https://github.com/camimarconi"
              className="a-link about-name-details fw-light"
            >
              Camila Marconi
            </a>{" "}
            <div>
              <a
                href="https://github.com/natriuge"
                className="a-link about-name-details fw-light"
              >
                Natalia Rudiger Gelinski
              </a>
            </div>
          </h2>
          <h3 className="ironhack-about-us mt-5 margin-specified align-self-center text-sm-center fw-light">
            Ironhack WDPT 2022
          </h3>
          <img
            src={logo1}
            alt="icon-logo-Mono"
            width="30"
            height="30"
            className=" img-fluid details-about-us mt-5 margin-specified"
          />
          <h5 className="align-self-center text-sm-center m-4">Sources</h5>
          <p className="ul-details align-self-center text-sm-center">
            <a
              className="ul-details align-self-center text-sm-center a-link"
              href="https://developer.spotify.com/"
            >
              Spotify for Developers
            </a>
          </p>

          <p className="ul-details align-self-center text-sm-center">
            <a
              className="ul-details align-self-center text-sm-center a-link"
              href="https://developer.spotify.com/documentation/web-api/"
            >
              Spotify Web Api Documentation
            </a>
          </p>

          <p className="ul-details align-self-center text-sm-center">
            <a
              className="ul-details align-self-center text-sm-center a-link"
              href="https://github.com/JMPerez/spotify-web-api-js/"
            >
              JMPerez/Wrapper
            </a>
          </p>

          <p className="ul-details align-self-center text-sm-center">
            Logo by:{" "}
            <a
              className="ul-details align-self-center text-sm-center a-link"
              href="https://www.instagram.com/julislr.m/"
            >
              @julislr.m
            </a>
          </p>
          <p className="ul-details align-self-center text-sm-center">
            Cover template for{" "}
            <a
              href="https://getbootstrap.com/"
              className="ul-details align-self-center text-sm-center a-link"
            >
              Bootstrap{" "}
            </a>
            by{" "}
            <a
              href="https://twitter.com/mdo"
              className="ul-details align-self-center text-sm-center a-link"
            >
              @mdo{" "}
            </a>
          </p>

          <p className="details-about-us mt-5 align-self-center text-sm-center a-link">
            .
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
