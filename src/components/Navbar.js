import { Link, useParams } from "react-router-dom";
import "../styles/style.css";

function Navbar(props) {
  const contador = props.counter;
  console.log(contador);

  return (
    <div className="d-flex h-100 text-center text-white bg-dark">
      <div className="d-flex w-100 h-100 p-3 mx-auto flex-column">
        <header className="mb-auto">
          <div>
            <h3 className="float-md-start mb-0">MusicXpand</h3>
            <nav className="nav nav-masthead justify-content-center float-md-end">
              <Link className="nav-link" aria-current="page" to="/">
                Home
              </Link>
              <Link className="nav-link" to="/playlist">
                {/* <span className="badge bg-primary rounded-pill">{}</span> */}
                Playlists <span className="badge badge-pill">{contador}</span>
              </Link>
              <Link className="nav-link" to="#">
                About Us
              </Link>
            </nav>
          </div>
        </header>
      </div>
    </div>
  );
}
export default Navbar;
