import "../styles/style.css";
import FormControl from "../components/FormControl";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";


function Home() {
  const [state, setState] = useState("");
  const navigate = useNavigate();

  function handleDiscover(event) {
    setState(event.target.value);
  }

  console.log(state)

  function handleSubmit(event) {
      event.preventDefault();
    };


  return (
    <div>
      <div className="d-flex h-100 text-center text-white bg-dark">
        <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
          <main>
            <h1 className="m-5 display-1">Discover New Music</h1>
            <div className="p-layout">
            <p className="fs-5">
              Look up for words to find new artists,
            </p>
            </div>
            <div className="p-layout">
            <p className="fs-5">
            musical genres and songs based on what you've searched.
            </p>
            </div>
            <div className="p-layout">
            <p className="fs-5">
              You can add your favorite songs to a personalized playlist.
            </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div>
                <FormControl
                  onChange={handleDiscover}
                  value={state}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="btn btn-lg btn-secondary fw-bold border-white bg-white mt-5"
                  onClick={() => navigate(`/search/${state}`)}
                >
                  Discover
                </button>
              </div>
            </form>
          </main>

          <footer className="mt-5 text-white-50">
            <p>
              Cover template for{" "}
              <Link to="https://getbootstrap.com/" className="text-white">
                Bootstrap
              </Link>
              , by{" "}
              <Link to="https://twitter.com/mdo" className="text-white">
                @mdo
              </Link>
              .
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default Home;
