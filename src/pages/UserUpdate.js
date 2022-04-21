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
  // const [albumDataFromSpotifyApi, setAlbumDataFromSpotifyApi] = useState([]);
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
          console.log("!!coverInfo.length", !!coverInfo.length);
          setPlaylistCoverInfo(...coverInfo);
          setHasPlaylist(true);
        }
        // setMusicXpandListApi(response.data);
        setMusicXpandListApi([...onlyMusics]);
        console.log(onlyMusics.length);
        console.log("coverInfo DENTRO DO USE EFFECT", coverInfo);
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
  // const { _id } = useParams();

  console.log(id);

  useEffect(() => {
    async function fetchInfo() {
      try {
        const response = await axios.get(
          `https://ironrest.herokuapp.com/musicxpand/${id}`
        );
        setUserUpdateInfo({ ...response.data });
        console.log("o que eu tô pegando aqui", userUpdateInfo);
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

  console.log("APÓS APERTAR BTN", userUpdateInfo);

  async function handleSubmit(event) {
    event.preventDefault();
    const data = { ...userUpdateInfo };
    delete data._id;

    console.log(data);

    try {
      // PUT vs. PATCH: o PUT é a ação de substituição, enquanto o PATCH é a de atualização. O PUT tem potencial de destruir informação caso o objeto enviado na requisição PUT não contenha todos os campos que o objeto original contém
      const response = await axios.put(
        `https://ironrest.herokuapp.com/musicxpand/${id}`,
        data
      );
      console.log("BATATAAAAAAA ", response.data);
      navigate("/playlist/");
    } catch (err) {
      console.error("BANANAAAA", err);
    }
  }

  return (
    <div className="bg-dark">
      <Navbar counter={counter} />
      <div className="container m-5 row-md-2 row-sm-12 align-self-center text-sm-center">
        <form onSubmit={handleSubmit} className="m-5">
          <div className="custom-file mt-3">
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
  );
}

export default UserUpdate;
