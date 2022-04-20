import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/playlistStyle.css";
import axios from "axios";

function UserUpdate() {
  const [userUpdateInfo, setUserUpdateInfo] = useState({
    albumCover: "",
    songName: "",
    artistName: [],
    albumName: "",
    musicPreview: "",
    musicId: "",
    coverUser: "",
    namePlaylistUser: "",
  });

  const navigate = useNavigate();

  const { _id } = useParams();

  useEffect(() => {
    async function fectchInfo() {
      try {
        const response = await axios.get(
          `https://ironrest.herokuapp.com/musicxpand/${_id}`
        );
        setUserUpdateInfo(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    fectchInfo();
  }, [_id]);

  const handleChange = (event) => {
    setUserUpdateInfo({
      ...userUpdateInfo,
      [event.target.name]: event.target.value,
    });
  };

  console.log("APÓS APERTAR BTN", userUpdateInfo);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      // PUT vs. PATCH: o PUT é a ação de substituição, enquanto o PATCH é a de atualização. O PUT tem potencial de destruir informação caso o objeto enviado na requisição PUT não contenha todos os campos que o objeto original contém
      const response = await axios.put(
        `https://ironrest.herokuapp.com/musicxpand/${_id}`,
        userUpdateInfo
      );
      console.log("BATATAAAAAAA ", response.data);
      navigate("/playlist/");
    } catch (err) {
      console.error("BANANAAAA", err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="custom-file">
        <input
          placeholder="My Playlist's photo"
          id="userCreateCover"
          name="coverUser"
          value={userUpdateInfo.coverUser}
          onChange={handleChange}
          type="text"
        />
      </div>

      <div className="mb-3">
        <input
          placeholder="My Playlist's name"
          id="userCreateName"
          name="namePlaylistUser"
          value={userUpdateInfo.namePlaylistUser}
          onChange={handleChange}
          type="text"
        />
        <div>
          <button
            className="btn btn-outline-secondary mb-3"
            type="submit"
            id="button"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}

export default UserUpdate;
