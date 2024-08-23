import React from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";

const PostCard = () => {
  const post = useSelector((state) => state);
  console.log(post.posts.posts[0]);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body className="bg-dark rounded text-center">
        <span
          className="popover-item border-bottom pb-2"
          style={{ cursor: "pointer", display: "block", color: "white" }}
        >
          Edit
        </span>
        <span
          className="popover-item pt-2"
          style={{ cursor: "pointer", display: "block", color: "white" }}
        >
          Delete
        </span>
      </Popover.Body>
    </Popover>
  );

  return (
    <section className="container-fluid p-3">
      {post.posts.posts.map((post, index) => (
        <div className="row justify-content-center mb-4" key={index}>
          <div className="col-12 col-md-10 col-lg-10 border border-dark rounded py-3 px-4">
            <div className="d-flex align-items-start justify-content-between pb-2">
              <div className="d-flex align-items-start">
                <img
                  style={{ width: "50px" }}
                  className="img-fluid rounded-circle"
                  src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=1024x1024&w=is&k=20&c=6XEZlH2FjqdpXUqjUK4y0LlWF6yViZVWn9HZJ-IR8gU="
                  alt="avatar"
                />
                <div className="ms-3" style={{ flexGrow: 1 }}>
                  <p className="mb-1">
                    <span className="fs-5 fw-semibold">Malaya Tiwari</span>{" "}
                    <span className="text-muted">@Malaya13</span>{" "}
                    <span className="text-muted mx-1">
                      <i className="bi bi-dot"></i>
                    </span>
                    <span className="text-muted">{post.date}</span>
                  </p>
                  <p className="mb-2">{post.userContent.text}</p>
                  {post.userContent.image && (
                    <img
                      className="img-fluid rounded"
                      src={post.userContent.image}
                      alt="post content"
                    />
                  )}
                </div>
              </div>
              <OverlayTrigger
                trigger="click"
                placement="bottom"
                overlay={popover}
              >
                <i
                  className="bi bi-three-dots"
                  style={{ cursor: "pointer" }}
                ></i>
              </OverlayTrigger>
            </div>
            <div className="d-flex justify-content-between mt-2">
              <div>
                <i className="bi bi-heart me-1"></i> <span>2</span>
              </div>
              <i className="bi bi-bookmark me-3"></i>
              <div>
                <i className="bi bi-chat me-1"></i> <span>4</span>
              </div>
              <i className="bi bi-share"></i>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default PostCard;
