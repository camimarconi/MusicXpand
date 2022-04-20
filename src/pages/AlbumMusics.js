// import "bootstrap/dist/css/bootstrap.min.css";
// import "../styles/playlistStyle.css";
// import "../styles/style.css";
// import axios from "axios";
// import Navbar from "../components/Navbar";
// import SpotifyWebApi from "spotify-web-api-js";
// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";

// const spotifyApi = new SpotifyWebApi();

// function AlbumMusics(props) {
//   const { id } = useParams();
//   const [counter, setCounter] = useState();

//   const [state, setState] = useState({});
//   const [tracksIds, setTracksIds] = useState([]);
//   const [stateTracks, setStateTracks] = useState([]);

//   useEffect(() => {
//     spotifyApi
//       .getAlbum(id)
//       .then(function (data) {
//         setState({ ...data });
//         console.log("DATA", data);

//         return state.tracks.map(function (t) {
//           return t.id;
//         });
//       })
//       .then(function (trackIds) {
//         setTracksIds(trackIds);
//         return spotifyApi.getTracks(trackIds);
//       })
//       .then(function (tracksInfo) {
//         console.log(tracksInfo);
//         setStateTracks([...tracksInfo]);
//       })
//       .catch(function (error) {
//         console.error(error);
//       });
//   }, [props.token, id]);

//   //   return (
//   //     <div className="bg-dark">
//   //       <Navbar counter={counter} />
//   //       <div className="container">
//   //             <div className="container details-layout">
//   //               <div className=" flex-row col-md-4 col-sm-12">
//   //                 <img
//   //                   src={state.img}
//   //                   alt="twbs"
//   //                   className="img-fluid img-thumbnail rounded col-sm-12"
//   //                 />
//   //                 <div className=" flex-row details-xs col-md-2 col-sm-12">
//   //                   <h2 className="playlist-name text-sm-center">
//   //                     {state.name}
//   //                   </h2>
//   //                 </div>
//   //               </div>
//   //             </div>

//   //           <div className="main-wrapper m-4">
//   //             {musicXpandListApi.map((current) => {
//   //               console.log("current do map", current);
//   //               return (
//   //                 <div className="container main-container" key={current._id}>
//   //                   <div className="row main-row">
//   //                     <div className="col-12 align-center">
//   //                       <div className="row p-2 justify-content-sm-between text-sm-center details-xs">
//   //                         <div className="col-md-2 align-middle align-self-center image-cover text-sm-center details-xs">
//   //                           <img
//   //                             src={current.albumCover}
//   //                             alt="twbs"
//   //                             width="80"
//   //                             height="80"
//   //                             className="rounded-circle flex-shrink-0 "
//   //                           />
//   //                         </div>
//   //                         <div className="col-md-2 col-sm-12 align-self-center text-sm-center m-2 details-xs">
//   //                           <h5 className="mb-0">{current.songName}</h5>
//   //                         </div>
//   //                         <div className="col-md-2 col-sm-12 align-self-center text-sm-center m-2 details-xs">
//   //                           {current.artistName.map((currentArtist) => {
//   //                             return (
//   //                               <h5 className="mb-0 opacity-75">
//   //                                 {currentArtist.name}
//   //                               </h5>
//   //                             );
//   //                           })}
//   //                         </div>
//   //                         <div className="col-md-2 col-sm-12 opacity-75 align-self-center text-sm-center m-2 details-xs">
//   //                           <h5 className="album-name mb-0">
//   //                             {current.albumName}
//   //                           </h5>
//   //                         </div>

//   //                         <div className="col-md-3 col-sm-12 align-self-center text-sm-center m-2 details-xs">
//   //                           <button
//   //                             className="btn btn-block btn-details m-1"
//   //                             onClick={() =>
//   //                               navigate(`/details/${current.artistName[0].id}`)
//   //                             }
//   //                           >
//   //                             <i className="bi bi-search-heart-fill"></i>
//   //                           </button>
//   //                           <button
//   //                             type="button"
//   //                             className="btn btn-block btn-listen m-1"
//   //                             value={current._id}
//   //                             onClick={() => {
//   //                               window.open(
//   //                                 `https://open.spotify.com/track/${current.musicId}`
//   //                               );
//   //                             }}
//   //                           >
//   //                             <i className="bi bi-play-circle-fill"></i>
//   //                           </button>
//   //                           <button
//   //                             type="button"
//   //                             className="btn btn-block btn-delete m-1"
//   //                             value={current._id}
//   //                             onClick={deleteSong}
//   //                           >
//   //                             <i className="bi bi-trash3-fill"></i>
//   //                           </button>
//   //                         </div>
//   //                       </div>
//   //                     </div>
//   //                   </div>
//   //                 </div>
//   //               );
//   //             })}
//   //           </div>
//   //         </div>
//   //       </div>
//   //     </div>
//   //   );
// }

// export default AlbumMusics;
