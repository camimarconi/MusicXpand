// import "bootstrap/dist/css/bootstrap.min.css";
// import "../styles/playlistStyle.css";
// import "../styles/style.css"
// import axios from "axios";
// import Navbar from "../components/Navbar";
// import SpotifyWebApi from "spotify-web-api-js";
// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";

// function AlbumMusics(props) {

//     const spotifyApi = new SpotifyWebApi();

//       const { id } = useParams();
//       const [state, setState] = useState([]);
//       const [artist, setArtist] = useState({
//         id: "",
//         images: [
//           {
//             url: "",
//           },
//         ],
//       });

//   return(

//         <div className="bg-dark">
//           <Navbar counter={counter} />
//           <div className="container">
//             {/* { showResults && hasPlaylist ? null : ( */}
//             {showForm && !hasPlaylist ? (
//               <form onSubmit={handleSubmit}>
//                 <div className="custom-file">
//                   <input
//                     placeholder="My Playlist's photo"
//                     id="userCreateCover"
//                     name="coverUser"
//                     value={playlistCoverInfo.coverUser}
//                     onChange={handleFormChange}
//                     type="text"
//                   />
//                 </div>

//                 <div className="mb-3">
//                   <input
//                     placeholder="My Playlist's name"
//                     id="userCreateName"
//                     name="namePlaylistUser"
//                     value={playlistCoverInfo.namePlaylistUser}
//                     onChange={handleFormChange}
//                     type="text"
//                   />
//                   <div>
//                     <button
//                       className="btn btn-outline-secondary mb-3"
//                       type="submit"
//                       id="button"
//                       // onClick={PostInApi}
//                     >
//                       Submit
//                     </button>
//                   </div>
//                 </div>
//               </form>
//             ) : null}
//             <div className="container">
//               {hasPlaylist ? (
//                 <div className="container details-layout">
//                   <div className=" flex-row col-md-4 col-sm-12">
//                     <img
//                       src={playlistCoverInfo.coverUser}
//                       alt="twbs"
//                       className="img-fluid img-thumbnail rounded col-sm-12"
//                       // className="rounded-circle flex-shrink-0"
//                     />
//                     <div className=" flex-row details-xs col-md-2 col-sm-12">
//                       <h2 className="playlist-name text-sm-center">
//                         {playlistCoverInfo.namePlaylistUser}
//                       </h2>

//                       <Link
//                         className="btn btn-block btn-delete justify-content-start"
//                         to={`/userUpdate/${playlistCoverInfo._id}`}
//                       >
//                         <i className="bi bi-pen-fill"></i>
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               ) : null}
//               {/* <h2 className="result d-flex flex-row">Playlist</h2> */}
//               <div className="main-wrapper m-4">
//                 {musicXpandListApi.map((current) => {
//                   console.log("current do map", current);
//                   return (
//                     <div className="container main-container" key={current._id}>
//                       <div className="row main-row">
//                         <div className="col-12 align-center">
//                           <div className="row p-2 justify-content-sm-between text-sm-center details-xs">
//                             <div className="col-md-2 align-middle align-self-center image-cover text-sm-center details-xs">
//                               <img
//                                 src={current.albumCover}
//                                 alt="twbs"
//                                 width="80"
//                                 height="80"
//                                 className="rounded-circle flex-shrink-0 "
//                               />
//                             </div>
//                             <div className="col-md-2 col-sm-12 align-self-center text-sm-center m-2 details-xs">
//                               <h5 className="mb-0">{current.songName}</h5>
//                             </div>
//                             <div className="col-md-2 col-sm-12 align-self-center text-sm-center m-2 details-xs">
//                               {current.artistName.map((currentArtist) => {
//                                 return (
//                                   <h5 className="mb-0 opacity-75">
//                                     {currentArtist.name}
//                                   </h5>
//                                 );
//                               })}
//                             </div>
//                             <div className="col-md-2 col-sm-12 opacity-75 align-self-center text-sm-center m-2 details-xs">
//                               <h5 className="album-name mb-0">
//                                 {current.albumName}
//                               </h5>
//                             </div>

//                             <div className="col-md-3 col-sm-12 align-self-center text-sm-center m-2 details-xs">
//                               <button
//                                 className="btn btn-block btn-details m-1"
//                                 onClick={() =>
//                                   navigate(`/details/${current.artistName[0].id}`)
//                                 }
//                               >
//                                 <i className="bi bi-search-heart-fill"></i>
//                               </button>
//                               <button
//                                 type="button"
//                                 className="btn btn-block btn-listen m-1"
//                                 value={current._id}
//                                 onClick={() => {
//                                   window.open(
//                                     `https://open.spotify.com/track/${current.musicId}`
//                                   );
//                                 }}
//                               >
//                                 <i className="bi bi-play-circle-fill"></i>
//                               </button>
//                               <button
//                                 type="button"
//                                 className="btn btn-block btn-delete m-1"
//                                 value={current._id}
//                                 onClick={deleteSong}
//                               >
//                                 <i className="bi bi-trash3-fill"></i>
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         </div>

//   )
// }

// export default AlbumMusics;
