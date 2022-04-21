import { Link } from "react-router-dom";
import "../styles/style.css";
import logo1 from "../images/logo1.png";

function Navbar(props) {
  const contador = props.counter;
  console.log(props);

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
          {/* <div class="container"> */}
          {/* <div className="navbar-brand float-md-start ">
            <img
              src={logo1}
              alt="icon-logo-Mono"
              width="50"
              height="50"
              className="m-2 mb-0 img-fluid align-self"
            />
                     <img
              src={logo1}
              alt="icon-logo-Mono"
              width="50"
              height="50"
              className="m-2 mb-0 img-fluid align-self"
            />
            <img
              src={logo3}
              alt="icon-logo-Mono"
              width="30"
              height="30"
              className="m-2 mb-0 img-fluid"
            />
            <img
              src={logo4}
              alt="icon-logo-Mono"
              width="30"
              height="30"
              className="m-2 mb-0 img-fluid"
            /> */}
          <h3 className="float-md-start">MusicXpand</h3>
          {/* </div> */}
          {/* </div> */}
          {/* <div>
            <h3 className="float-md-start mb-0">MusicXpand</h3>
            <img src={logo1} alt="icon-logo-Mono" width="100" height="100" />
            <img src={logo3} alt="icon-logo-Mono" width="100" height="100" />
            <img src={logo4} alt="icon-logo-Mono" width="100" height="100" /> */}

          <nav className="nav nav-masthead justify-content-center float-md-end">
            {/* <img
              src={logo1}
              alt="icon-logo-Mono"
              width="30"
              height="30"
              className="m-2 mb-0 img-fluid text-center"
            /> */}
            <Link className="nav-link" aria-current="page" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/playlist">
              {/* <span className="badge bg-primary rounded-pill">{}</span> */}
              Playlists <span className="badge badge-pill">{contador}</span>
            </Link>
            <Link className="nav-link" to="/aboutus">
              About Us
            </Link>
          </nav>
          {/* </div> */}
        </header>
      </div>
    </div>
  );
}
export default Navbar;
