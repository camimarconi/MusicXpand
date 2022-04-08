import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";
import Home from "../pages/Home";
import { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import axios from "axios";
import qs from "qs";
import Search from "../pages/Search";


const spotifyApi = new SpotifyWebApi();

function App() {
  const [state, setState] = useState("");

  // Retrieve an access token
  useEffect(() => {
    axios
      .post(
        "https://accounts.spotify.com/api/token",
        qs.stringify({ grant_type: "client_credentials" }),
        {
          headers: {
            Authorization: `Basic ${window.btoa(
              `${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`
            )}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        spotifyApi.setAccessToken(response.data.access_token);
        setState(response.data.access_token);
        console.log(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // useEffect(() => {
  //   spotifyApi.getArtistAlbums("43ZHCT0cAZBISjO8DG9PnE").then(
  //     function (data) {
  //       console.log("Artist albums", data);
  //     },
  //     function (err) {
  //       console.error(err);
  //     }
  //   );
  // }, [state]);

  return (
    <div>
      <Navbar />

      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:keyword" element={<Search token={state} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
