import "../styles/style.css";
import FormControl from "../components/FormControl";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Home() {
  const [state, setState] = useState("");
  const navigate = useNavigate();

  function handleDiscover(event) {
    setState(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  const [counter, setCounter] = useState();

  useEffect(() => {
    axios
      .get("https://ironrest.herokuapp.com/musicxpand/")
      .then((response) => {
        const onlyMusics = response.data.filter(
          (element) => element.coverUser === ""
        );
        setCounter(onlyMusics.length);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <Navbar counter={counter} />
      <div className="d-flex h-100 text-center text-white bg-dark">
        <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
          <main className="pt-5">
            <h1 className="pt-5 display-1">Discover New Music</h1>
            <div className="p-layout">
              <p className="home-text fw-light pt-5">
                Look up for words to find new artists,
              </p>
              <div className="p-layout">
                <p className="home-text fw-light">
                  musical genres and songs based on what you've searched.
                </p>
              </div>
              <div className="p-layout">
                <p className="home-text fw-light">
                  You can add your favorite songs to a personalized playlist.
                </p>
              </div>
            </div>
            <form onSubmit={handleSubmit} autocomplete="off">
              <div className="mt-4">
                <FormControl onChange={handleDiscover} value={state} />
              </div>
              <div>
                <button
                  type="submit"
                  className="btn btn-lg btn-secondary mt-5 margin-specified"
                  onClick={() => navigate(`/search/${state}`)}
                >
                  Discover
                </button>
              </div>
            </form>
          </main>

          <footer className="mt-5 text-white-50 m-5">
            <p>.</p>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default Home;
