import React from "react";

const LeftView = () => {
  return (
    <>
      <section
        className="border border-dark bg-body-tertiary position-fixed"
        style={{
          width: "100%",
          maxWidth: "275px", // Limits the width on larger screens
          height: "calc(100vh - 60px)",
          top: "60px",
          left: 0,
        }}
      >
        <div
          className="d-flex flex-column align-items-center justify-content-between p-3"
          style={{ height: "100%" }}
        >
          <ul className="nav flex-column w-100">
            <li className="nav-item fs-5">
              <a
                href="#"
                className="nav-link d-flex align-items-center text-dark"
              >
                <i className="bi bi-house-door-fill me-2"></i>
                <span className="d-none d-sm-inline">Home</span>
              </a>
            </li>
            <li className="nav-item fs-5">
              <a
                href="#"
                className="nav-link d-flex align-items-center text-dark"
              >
                <i className="bi bi-compass-fill me-2"></i>
                <span className="d-none d-sm-inline">Explore</span>
              </a>
            </li>
            <li className="nav-item fs-5">
              <a
                href="#"
                className="nav-link d-flex align-items-center text-dark"
              >
                <i className="bi bi-bookmark-fill me-2"></i>
                <span className="d-none d-sm-inline">Bookmarks</span>
              </a>
            </li>
            <li className="nav-item fs-5">
              <a
                href="#"
                className="nav-link d-flex align-items-center text-dark"
              >
                <i className="bi bi-heart-fill me-2"></i>
                <span className="d-none d-sm-inline">Liked Posts</span>
              </a>
            </li>
            <li className="nav-item">
              <button className="btn btn-dark w-100 mt-3">Post</button>
            </li>
          </ul>
          <div className="d-flex align-items-center p-2 w-100 mt-auto">
            <div className="me-3">
              <img
                style={{ width: "50px" }}
                className="img-fluid"
                src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=1024x1024&w=is&k=20&c=6XEZlH2FjqdpXUqjUK4y0LlWF6yViZVWn9HZJ-IR8gU="
                alt="avatar"
              />
            </div>
            <div className="flex-grow-1">
              <div className="fw-bold">John Doe</div>
              <div className="text-muted">@JohnDoe</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LeftView;
