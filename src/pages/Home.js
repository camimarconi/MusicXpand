import "../styles/style.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function Home() {
  const [discover, setDiscover] = useState("");

  function handleDiscover(event) {
    setDiscover(event.target.value);
  }

  return (
    <div>
      <div className="d-flex h-100 text-center text-white bg-dark banana">
        <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
          <main className="px-3">
            <h1>Discover New Music</h1>
            <p className="lead main-text">
              Look up for words to find new artists, genres, melodies, songs
              based on what you searched.
            </p>
            <p className="lead main-text">
              You can add your favorite songs to a personal playlist.
            </p>
            <p className="lead main-text">Let's go?</p>
            <form>
              <div>
                <input
                  className="mt-5"
                  type="text"
                  name="discover"
                  onChange={handleDiscover}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="btn btn-lg btn-secondary fw-bold border-white bg-white mt-3"
                >
                  Discover
                </button>
              </div>
            </form>
          </main>

          <footer className="mt-auto text-white-50">
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
