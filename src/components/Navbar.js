import { Link } from "react-router-dom";
import "../styles/style.css";
import logo1 from "../images/logo1.png";

function Navbar(props) {
  const contador = props.counter;

  return (
    <div className="d-flex h-100 text-center text-white bg-dark">
      <div className="d-flex w-100 h-100 p-3 mx-auto flex-column">
        <header className="mb-auto">
          <img
            src={logo1}
            alt="icon-logo-Mono"
            width="30"
            height="30"
            className="img-fluid float-md-start text-center me-2"
          />
          <h3 className="float-md-start">MusicXpand</h3>
          <nav className="nav nav-masthead justify-content-center float-md-end">
            <Link className="nav-link" aria-current="page" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/playlist">
              Playlists <span className="badge badge-pill">{contador}</span>
            </Link>
            <Link className="nav-link" to="/aboutus">
              About Us
            </Link>
          </nav>
        </header>
      </div>
    </div>
  );
}
export default Navbar;
