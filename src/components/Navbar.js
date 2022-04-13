import { Link } from "react-router-dom";
import "../styles/style.css";

function Navbar() {
  return (
    <div className="d-flex h-100 text-center text-white bg-dark banana">
      <div className="d-flex w-100 h-100 p-3 mx-auto flex-column">
        <header className="mb-auto">
          <div>
            <h3 className="float-md-start mb-0">MusicXpand</h3>
            <nav className="nav nav-masthead justify-content-center float-md-end">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
              <Link className="nav-link" to="/playlist">
                {/* <span className="badge bg-primary rounded-pill">{}</span> */}
                Playlists
              </Link>
              <Link className="nav-link" to="#">
                Favorites.
              </Link>
            </nav>
          </div>
        </header>
      </div>
    </div>
  );
}
export default Navbar;
