import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

function Details(props) {
  const { id } = useParams();
  const [state, setState] = useState([]);
  const [artist, setArtist] = useState([]);
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    spotifyApi.getArtistAlbums(id).then(
      function (data) {
        console.log("Artist albums", data);
        setState([...data.items]);
      },
      function (err) {
        console.error(err);
      }
    );
  }, [props.token, id]);

  useEffect(() => {
    spotifyApi.getArtist(id).then(
      function (data) {
        console.log("Artist information", data);
        setArtist([ ...data.images]);
        
      },
      function (err) {
        console.error(err);
      }
    );
  }, [props.token, id]);

  useEffect(() => {
    spotifyApi.getArtistTopTracks(id, "US").then(
      function (data) {
        console.log("GHDSDFGS", data.tracks[0]);
        setTopTracks([ ...data.tracks]);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  }, [props.token, id]);

  

  return (
    <div className="bg-dark">
    <img src={artist[0].url} className="img-fluid" alt=""/>
      <div className="tracks">
        <img src="" className="img-fluid" alt="" />
        <div className="container">
          <div className="mt-5">
            <img
              src="https://github.com/twbs.png"
              alt="twbs"
              width="90"
              height="90"
            />
            <h2 className="result d-flex flex-row">Top Tracks</h2>
          </div>
          {topTracks.map((current) => {
            return (
              <div className="list-grou m-1">
                <li
                  className="list-group-item list-group-item-action d-flex flex-row"
                  aria-current="true"
                >
                  <img
                    src={current.album.images[0].url}
                    alt="twbs"
                    width="50"
                    height="50"
                    className="rounded-circle flex-shrink-0"
                  />
                  <div className="d-flex gap-2 w-100 justify-content-between align-items-center align-self-center">
                    <h5 className="mb-0 fw-bold"></h5>
                    <h5 className="mb-0 opacity-75">
                      {current.artists[0].name}
                    </h5>
                    <h5 className="mb-0 opacity-50 fw-light">{current.name}</h5>
                    <h4 className="opacity-50 text-nowrap">audio PREVIEW?</h4>
                    <h4 className="">DELETE</h4>
                  </div>
                </li>
              </div>
            );
          })}
        </div>
      </div>
      <h2 className="result d-flex flex-row">Albums</h2>
      <div className="d-flex flex-wrap justify-content-around">
        {state.map((current) => {
          return (
            <div
              className="card mt-5 d-flex flex-col mb-4"
              style={{ width: "21rem" }}
            >
              <div className="card-body col align-self-center">
                <img
                  src={current.images[0].url}
                  className="card-img-top"
                  alt="..."
                />
                <h5 className="mt-3 fs-3 col">{current.name}</h5>
                <h4 className="mt-3 fs-5 col">{current.artists[0].name}</h4>

                <div className="align-self-end"></div>
              </div>
            </div>
          );
        })}
        ;
      </div>
    </div>
  );
}

export default Details;
