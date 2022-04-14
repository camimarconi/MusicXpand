import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

function Details(props) {
  const { id } = useParams();
  const [state, setState] = useState([]);
  const [artist, setArtist] = useState({});

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
        setArtist({...data});
      },
      function (err) {
        console.error(err);
      }
    );
  }, [props.token, id]);

  console.log("!!!!!!", artist);

  return (
    <div>
      <img src='' className="img-fluid" alt=""/>
      {state.map((current) => {
        return (
          <div className="container">
            <div className="mt-5">
              <img
                src={current.images[0].url}
                alt="twbs"
                width="90"
                height="90"
              />
              <h2 className="mt-5 mb-3">My Playlist</h2>
            </div>
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
                  <small className="opacity-50 text-nowrap">
                    audio PREVIEW?
                  </small>
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
                  <small className="opacity-50 text-nowrap">
                    audio PREVIEW?
                  </small>
                </div>
              </li>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Details;
