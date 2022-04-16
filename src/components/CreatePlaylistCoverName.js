import axios from "axios";
import { useState } from "react";
import FormMyPlaylist from "./FormMyPlayslit";

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
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="custom-file">
          <FormMyPlaylist
            label="My Playlist's Cover"
            htmlFor="inputGroupFile01"
            id="userCreateCover"
            name="coverUser"
            onChange={handleChange}
            value={userData.coverUser}
            type="file"
          />
        </div>

        <FormMyPlaylist
          label="My Playlist's Name"
          id="userCreateName"
          name="namePlaylistUser"
          onChange={handleChange}
          value={userData.namePlaylistUser}
          type="text"
        />
      </form>
    </div>
  );
}

export default CreatePlaylistCoverName;
