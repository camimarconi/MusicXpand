import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import Navbar from "./Navbar";
import Home from "../pages/Home";
import { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import axios from "axios";
import qs from "qs";
import Search from "../pages/Search";
import Playlist from "../pages/Playlist";
import Details from "../pages/Details";
import "bootstrap-icons/font/bootstrap-icons.css";
import UserUpdate from "../pages/UserUpdate";

const spotifyApi = new SpotifyWebApi();

function App() {
  const [state, setState] = useState("");
  // const [counter, setCounter] =  useState(0)

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
    axios
      .get("https://ironrest.herokuapp.com/musicxpand/")
      .then((response) => {
        console.log(response.data);
        // setCounter(response.data.length);
        // console.log(counter)
      })
      .catch((err) => console.error(err));
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
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:keyword" element={<Search token={state} />} />
          <Route path="/playlist/" element={<Playlist token={state} />} />
          <Route path="/userUpdate/:id" element={<UserUpdate />} />
          <Route path="/details/:id" element={<Details token={state} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
