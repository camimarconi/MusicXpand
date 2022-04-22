import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
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
import AlbumMusics from "../pages/AlbumMusics";
import AboutUs from "../pages/AboutUs";
import NotFound from "../pages/NotFound";

const spotifyApi = new SpotifyWebApi();

function App() {
  const [state, setState] = useState("");

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
      })
      .catch((err) => {
        console.error(err);
      });
    axios
      .get("https://ironrest.herokuapp.com/musicxpand/")
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:keyword" element={<Search token={state} />} />
          <Route path="/playlist/" element={<Playlist token={state} />} />
          <Route path="/userUpdate/:id" element={<UserUpdate />} />
          <Route path="/details/:id" element={<Details token={state} />} />
          <Route
            path="/albumMusics/:id"
            element={<AlbumMusics token={state} />}
          />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
