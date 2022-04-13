import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

function Details(props) {

    const { id } = useParams();
    const [state, setState] = useState([])
    const [tracks, setTracks] = useState([])


    useEffect(() => {
    spotifyApi.getArtistAlbums(id).then(
      function (data) {
        console.log("Artist albums", data);
        setState([...data.items])
      },
      function (err) {
        console.error(err);
      }
    );
  }, [props.token, id]);


    return (
        <div>
        More about
        {tracks.map((current) => {
            return (
                <ol className="list-group list-group-numbered">
                  <li className="list-group-item d-flex justify-content-between align-items-start list-layout">
                    <div className="ms-2 me-auto">
                      <img
                      src={current.album.images[0].url}
                      className="card-img-top"
                      alt="..."
                      />
                      <div className="fw-bold">{current.name}</div>
                        <audio controls src={current.preview_url} className="audio-layout"></audio>
                      </div>
                      <span className="badge bg-primary rounded-pill">{current.popularity}</span>
                  </li>
                </ol>
            )
        })


        }
              {/* {state.map((current) => {
            return (
                <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
        
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img 
                            src={current.images[0].url}
                            className="d-block w-100"
                            alt="..."
                            />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>First slide label</h5>
                                <p>Some representative placeholder content for the first slide.</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img 
                            src={current.images[0].url} 
                            class="d-block w-100" 
                            alt="..."
                            />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Second slide label</h5>
                                <p>Some representative placeholder content for the second slide.</p>
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
                
                )
        })} */}
        </div>
        
    )
}

export default Details;