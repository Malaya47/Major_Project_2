import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  useGetAllUsersQuery,
  useGetBookmarkedPostsQuery,
  useGetProfileUserQuery,
} from "../features/apiSlice";

const LeftView = () => {
  const { refetch: refetchUsers } = useGetAllUsersQuery();
  const { refetch: refetchBookmarks } = useGetBookmarkedPostsQuery();
  const { status, data, refetch } = useGetProfileUserQuery();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/explore") {
      refetchUsers();
    } else if (location.pathname === "/bookmark") {
      refetchBookmarks();
    }
  }, [location, refetchUsers, refetchBookmarks]);

  const handleRefetch = () => {
    refetch();
  };

  return (
    <>
      <section
        className="border border-info-subtle border-top-0 position-fixed w-100 left-view"
        style={{
          backgroundColor: "#16181c",
          maxWidth: "275px",
          height: "calc(100vh - 60px)",
          top: "60px",
          left: 0,
        }}
      >
        <div className="d-flex flex-column align-items-center justify-content-between p-3 h-100 text-light">
          <ul className="nav flex-column w-100">
            <li className="nav-item fs-5">
              <Link
                className="nav-link d-flex align-items-center text-dark"
                to="/"
              >
                <i className="bi bi-house-door-fill me-2 text-light"></i>
                <span
                  onClick={handleRefetch}
                  className="d-none d-sm-inline text-light"
                >
                  Home
                </span>
              </Link>
            </li>
            <li className="nav-item fs-5">
              <Link
                className="nav-link d-flex align-items-center text-dark"
                to="/explore"
              >
                <i className="bi bi-compass-fill me-2 text-light"></i>
                <span className="d-none d-sm-inline text-light">Explore</span>
              </Link>
            </li>
            <li className="nav-item fs-5">
              <Link
                className="nav-link d-flex align-items-center text-dark"
                to="/bookmark"
              >
                <i className="bi bi-bookmark-fill me-2 text-light"></i>
                <span className="d-none d-sm-inline text-light">Bookmarks</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/"} className="btn btn-primary w-100 mt-3">
                Post
              </Link>
            </li>
          </ul>

          {/* <div className="d-flex align-items-center p-2 w-100 mt-auto">
            <div className="me-3">
              <img
                className="img-fluid rounded-circle"
                style={{ width: "50px" }}
                src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=1024x1024&w=is&k=20&c=6XEZlH2FjqdpXUqjUK4y0LlWF6yViZVWn9HZJ-IR8gU="
                alt="avatar"
              />
            </div>
            <div className="flex-grow-1">
              <div className="fw-bold">John Doe</div>
              <div className="text-light">@JohnDoe</div>
            </div>
          </div> */}
        </div>
      </section>
    </>
  );
};

export default LeftView;
