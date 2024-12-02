import { NavLink } from "react-router-dom";
import { useGetProfileUserQuery } from "../features/apiSlice";

const Header = () => {
  const { data, isLoading, isError, error, refetch } = useGetProfileUserQuery(
    localStorage.getItem("userId")
  );

  const { user } = data || {};

  return (
    <header>
      <nav
        style={{ height: "60px", backgroundColor: "#16181c" }}
        className="navbar navbar-expand-lg navbar-light border-info-subtle border-bottom fixed-top"
      >
        <div className="container-fluid">
          <NavLink to="/" className="navbar-brand text-light">
            Quantum Verse
          </NavLink>
          {/* <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button> */}
          <div className="" id="navbarNav">
            <ul className="navbar-nav ms-auto d-flex align-items-center">
              <li className="nav-item ms-3">
                <NavLink className="nav-link text-light" to="/mainProfile">
                  <img
                    style={{ width: "40px", height: "40px", objectFit: "cover" }}
                    className="img-fluid rounded-circle"
                    src={user?.profileImage}
                    alt="profile-picture"
                  />
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
