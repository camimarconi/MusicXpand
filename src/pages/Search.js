import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-js";
import "../styles/style.css";

const spotifyApi = new SpotifyWebApi();

function Search(props) {

    const { keyword } = useParams()

    console.log(keyword)

    const [state, setState] = useState([]);
    const [banana, setBanana] = useState([])
    

    console.log(banana)
  

    const navigate = useNavigate();

    useEffect(() => {
        spotifyApi.getArtistAlbums(
            "43ZHCT0cAZBISjO8DG9PnE").then(
            function (data) {
                setState([...data.items])
            },
            function (err) {
                console.error(err);
            }
            );
        }, []);


    useEffect(() => {

        spotifyApi.searchTracks(keyword)
        .then(function(data) {
            console.log('Search by "Banana"', data);
            setBanana([...data.tracks.items])
        }, function(err) {
            console.error(err);
        });
        }, [props.token, keyword]);

        
        
    // useEffect(() => {   
    //     spotifyApi.getAudioFeaturesForTrack('6PGoSes0D9eUDeeAafB2As')
    //     .then(function(data) {
    //         // setBanana(data.track_href)
    //         console.log('audio features:', data);
    //     }, function(err) {
    //         console.log(err);
    //     });
    //     }, [props.token]);

   

//     return (
//         <div className="bg-dark">
//             <h2 className="result d-flex flex-row">Results</h2>
//                 <div className="d-flex flex-wrap justify-content-around">
//                         {state.map((current) => {
//                             return (
//                                 <div className="card mt-5 d-flex flex-col mb-4" style={{'width': '18rem'}}>
//                                     <div className="card-body col justify-content-between">
//                                         <img src={current.images[0].url} className="card-img-top" alt="..."/>
//                                         <h5 className="mt-3 fs-3 col">{current.artists[0].name}</h5>
//                                         <h6 className="mt-3 card-subtitle mb-2 text-muted col align-self-center">{current.name}</h6>
//                                         {/* <p className="card-text">{current.artists[0].external_urls.spotify}</p> */}
//                                         <button
//                                             className="btn btn-discovery col"
//                                             onClick={() => navigate(`/playlist/Add`)}
//                                         >
//                                         Add
//                                         </button>
//                                         <button
//                                             className="btn btn-details col"
//                                             onClick={() => navigate(`/playlist/Details`)}
//                                         >
//                                         Details
//                                         </button>
//                                     </div>
//                                 </div>
//                             )
//                         })};
//                 </div> 
//         </div>

//     )
// }
return (
    <div className="bg-dark">
        <h2 className="result d-flex flex-row">Results containing {keyword}</h2>
            <div className="d-flex flex-wrap justify-content-around">
                    {banana.map((current) => {
                        return (
                            <div className="card mt-5 d-flex flex-col mb-4" style={{'width': '21rem'}}>
                                <div className="card-body col">
                                    <img src={current.album.images[0].url} className="card-img-top" alt="..."/>
                                    <h5 className="mt-3 fs-3 col">{current.artists[0].name}</h5>
                                    <h4 className="mt-3 fs-5 col">{current.name}</h4>
                                    <h6 className="mt-3 card-subtitle mb-2 text-muted col align-self-center">{current.album.name}</h6>
                                    <audio className="player-layout"controls src={current.preview_url}></audio>
                                    <button
                                        className="btn btn-discovery col"
                                        onClick={() => navigate(`/playlist/add`)}
                                    >
                                    Add
                                    </button>
                                    <button
                                        className="btn btn-details col"
                                        onClick={() => navigate(`/playlist/details`)}
                                    >
                                    Details
                                    </button>
                                    </div>
                                </div>
                            
                        )
                    })};
            </div> 
    </div>

)
}

export default Search;