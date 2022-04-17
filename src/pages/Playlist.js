import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/playlistStyle.css";
import axios from "axios";
import CreatePlaylistCoverName from "../components/CreatePlaylistCoverName";

// const spotifyApi = new SpotifyWebApi();

function Playlist() {
  const [musicXpandListApi, setMusicXpandListApi] = useState([
    {
      albumCover: "",
      songName: "",
      artistName: [{ name: "" }],
      albumName: "",
      musicPreview: "",
      _id: "",
    },
  ]);
  // const [albumDataFromSpotifyApi, setAlbumDataFromSpotifyApi] = useState([]);

  // const [onlyMusicMXApi, setOnlyMusicMXApi] = useState([]);

  // let coverInfo;
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // function getOnlyMusic(arr) {
  //   let onlyMusicList = [];

  //   for (let i = 0; i < arr.length; i++) {
  //     if (arr[i].albumCover !== undefined) {
  //       onlyMusicList.push(arr[i]);
  //     } else {
  //       coverInfo = arr[i];
  //     }
  //   }
  //   return onlyMusicList;
  // }
  // console.log("Cover Info", coverInfo);

  // // function getOnlyMusic(arr) {
  // //   const onlyMusic = arr.filter(
  // //     (element) => (element || {}).albumCover !== undefined
  // //   ); //não deixa quebrar (element||{}) pq ele pega um obj vazio e não deixa quebrar
  // // }

  // useEffect(() => {
  //   axios
  //     .get("https://ironrest.herokuapp.com/musicxpand/")
  //     .then((response) => {
  //       setMusicXpandListApi(response.data);
  //     })
  //     .catch((err) => console.error(err));
  // }, []);

  // useEffect(() => {
  //   let response = getOnlyMusic(musicXpandListApi);
  //   setOnlyMusicMXApi(response);
  // }, [getOnlyMusic, musicXpandListApi]);
  // console.log(musicXpandListApi);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function deleteSong(event) {
    let index = event.target.value;
    const idDeleteSong = musicXpandListApi[index]._id;

    // Antes de prosseguir com a deleção, pedimos a confirmação do usuário
    const areYouSure = window.confirm(
      "Você tem certeza que deseja deletar esta música?"
    );
    if (areYouSure) {
      return axios
        .delete(`https://ironrest.herokuapp.com/musicxpand/${idDeleteSong}`)
        .then((response) => {
          window.location.reload();
        })
        .catch((err) => console.error(err));
    }
  }
  console.log(musicXpandListApi);

  return (
    <div>
      <div className="bg-dark">
        <div className="container">
          <CreatePlaylistCoverName />
        </div>
        <div className="container">
          <div className="main-wrapper">
            {musicXpandListApi.map((current, index) => {
              return (
                <div key={index} className="container main-container">
                  <div className="row main-row">
                    <div className="col-12 align-center">
                      <div className="row p-2">
                        <div className="col-2 align-middle align-self-center image-cover">
                          <img
                            src={current.albumCover}
                            alt="twbs"
                            width="80"
                            height="80"
                            className="rounded-circle flex-shrink-0 "
                          />
                        </div>
                        <div className="col-2 align-self-center">
                          <h5 className="mb-0 song-name">{current.songName}</h5>
                        </div>
                        <div className="col-2 align-self-center">
                          {current.artistName.map((currentName) => {
                            return (
                              <h5 className="mb-0 opacity-75">
                                {currentName.name}
                              </h5>
                            );
                          })}
                        </div>
                        <div className="col-2 opacity-75 align-self-center">
                          <h5 className="album-name mb-0">
                            {current.albumName}
                          </h5>
                        </div>

                        <div className="col-2 align-self-center">
                          <audio
                            className="player opacity-50 text-nowrap"
                            controls
                            src={current.musicPreview}
                          ></audio>
                        </div>

                        <div className="col-2 align-self-center">
                          <button
                            type="button"
                            className="btn btn-block btn-delete"
                            value={index}
                            onClick={deleteSong}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Playlist;
