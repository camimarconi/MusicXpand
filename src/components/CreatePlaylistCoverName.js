import axios from "axios";
import { useState } from "react";
import FormMyPlaylist from "./FormMyPlayslit";
import CoverNamePlaylistDone from "./CoverNamePlaylistDone";

function CreatePlaylistCoverName() {
  const [userData, setuserData] = useState({
    coverUser: "",
    namePlaylistUser: "",
  });

  function handleChange(event) {
    setuserData({ ...userData, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("https://ironrest.herokuapp.com/musicxpand", userData)
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((err) => console.error(err));
  }
  console.log(userData.coverUser);

  // function showNotShow() {
  //   if ((<CreatePlaylistCoverName />))
  //     return (
  //       <CoverNamePlaylistDone /> &&
  //       CreatePlaylistCoverName.style.display === "none"
  //     );
  // }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="custom-file">
          <FormMyPlaylist
            id="userCreateCover"
            name="coverUser"
            onChange={handleChange}
            value={userData.coverUser}
            type="file"
          />
        </div>

        <div className="mb-3">
          <FormMyPlaylist
            placeholder="My Playlist's name"
            id="userCreateName"
            name="namePlaylistUser"
            onChange={handleChange}
            value={userData.namePlaylistUser}
            type="text"
          />
          <div>
            <button
              className="btn btn-outline-secondary mb-3"
              type="submit"
              id="button"
              // onClick={}
            >
              Button
            </button>
          </div>
        </div>
      </form>
      <CoverNamePlaylistDone />
    </div>
  );
}

export default CreatePlaylistCoverName;
