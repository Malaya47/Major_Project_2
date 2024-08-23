import React from "react";

const RightView = () => {
  return (
    <>
      <section
        className="d-none d-lg-block border border-dark bg-body-tertiary p-3 position-fixed"
        style={{
          width: "275px",
          height: "calc(100vh - 60px)", // Adjusts height to accommodate fixed position
          top: "60px", // Adjust this to match your header height
          right: "0", // Stick to the right
        }}
      >
        <div className="d-flex justify-content-evenly">
          <button className="btn btn-dark mb-2 px-4">Trending</button>
          <button className="btn btn-dark mb-2 px-4">Latest</button>
        </div>

        <p className="fw-bold">Suggestions for you</p>
        <div className="d-flex align-items-center p-2 border rounded bg-light mb-2">
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
          <div>
            <button className="btn btn-dark btn-sm">Follow</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default RightView;
