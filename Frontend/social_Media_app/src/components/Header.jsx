import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav
        style={{ height: "60px" }}
        className="navbar navbar-expand-lg navbar-light bg-dark fixed-top"
      >
        <div className="container-fluid">
          <NavLink to="/" className="navbar-brand text-light">
            NEXUS
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-between"
            id="navbarNav"
          >
            <div className="d-flex justify-content-center w-100">
              <div
                className="d-flex"
                style={{ maxWidth: "600px", width: "100%" }}
              >
                <input
                  // onChange={}
                  className="form-control"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
              </div>
            </div>
            <ul className="navbar-nav ms-auto d-flex align-items-center">
              <li className="nav-item">
                <NavLink
                  to={"/"}
                  className="btn btn-secondary"
                  aria-current="page"
                >
                  Login
                </NavLink>
              </li>
              <li className="nav-item ms-3">
                <NavLink className="nav-link text-light" to="/">
                  Wishlist
                </NavLink>
              </li>
              <li className="nav-item ms-3">
                <NavLink className="nav-link text-light" to="/">
                  Avatar
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
