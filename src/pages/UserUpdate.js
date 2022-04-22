import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/style.css";
import axios from "axios";
import Navbar from "../components/Navbar";
import logo1 from "../images/logo1.png";

function UserUpdate() {
  const [musicXpandListApi, setMusicXpandListApi] = useState([
    {
      albumCover: "",
      songName: "",
      artistName: [{ name: "" }],
      albumName: "",
      musicPreview: "",
      musicId: "",
      coverUser: "",
      namePlaylistUser: "",
    },
  ]);

  const [playlistCoverInfo, setPlaylistCoverInfo] = useState({
    albumCover: "",
    songName: "",
    artistName: [],
    albumName: "",
    musicPreview: "",
    musicId: "",
    coverUser: "",
    namePlaylistUser: "",
  });

  const [counter, setCounter] = useState();

  const [hasPlaylist, setHasPlaylist] = useState(false);

  useEffect(() => {
    axios
      .get("https://ironrest.herokuapp.com/musicxpand/")
      .then((response) => {
        const onlyMusics = response.data.filter(
          (element) => element.coverUser === ""
        );
        const coverInfo = response.data.filter(
          (element) => element.coverUser !== ""
        );
        if (!!coverInfo.length) {
          setPlaylistCoverInfo(...coverInfo);
          setHasPlaylist(true);
        }
        // setMusicXpandListApi(response.data);
        setMusicXpandListApi([...onlyMusics]);
        setCounter(onlyMusics.length);
      })
      .catch((err) => console.error(err));
  }, []);

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

  const { id } = useParams();

  useEffect(() => {
    async function fetchInfo() {
      try {
        const response = await axios.get(
          `https://ironrest.herokuapp.com/musicxpand/${id}`
        );
        setUserUpdateInfo({ ...response.data });
      } catch (err) {
        console.error(err);
      }
    }
    fetchInfo();
  }, [id]);

  const handleChange = (event) => {
    setUserUpdateInfo({
      ...userUpdateInfo,
      [event.target.name]: event.target.value,
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const data = { ...userUpdateInfo };
    delete data._id;

    try {
      const response = await axios.put(
        `https://ironrest.herokuapp.com/musicxpand/${id}`,
        data
      );
      navigate("/playlist/");
    } catch (err) {}
  }

  return (
    <div className="bg-dark">
      <Navbar counter={counter} />
      <div className="main-wrapper m-4">
        <div className="container main-container">
          <div className=" row ">
            <div className="col-12 align-center">
              <div className="row justify-content-sm-between text-sm-center">
                <div className="align-middle align-self-center text-sm-center">
                  <form onSubmit={handleSubmit} className="m-5">
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

                    <div className="mt-3 ">
                      <input
                        placeholder="My Playlist's name"
                        id="userCreateName"
                        name="namePlaylistUser"
                        value={userUpdateInfo.namePlaylistUser}
                        onChange={handleChange}
                        type="text"
                      />
                      <div className="mt-3">
                        <button
                          className="btn btn-outline-secondary mt-3 mb-5"
                          type="submit"
                          id="button"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </form>
                  <img
                    src={logo1}
                    alt="icon-logo-Mono"
                    width="30"
                    height="30"
                    className=" img-fluid details-about-us mt-5 margin-specified"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserUpdate;
