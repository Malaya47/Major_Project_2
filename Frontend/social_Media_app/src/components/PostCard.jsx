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
    <section>
      {post.posts.posts.map((post, index) => (
        <div
          className="mx-5 px-5 border border-dark rounded mt-4 py-3"
          key={index}
        >
          <div className="d-flex align-items-start justify-content-between  pb-2">
            <div className="d-flex align-items-start">
              <img
                style={{ width: "50px" }}
                className="img-fluid"
                src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=1024x1024&w=is&k=20&c=6XEZlH2FjqdpXUqjUK4y0LlWF6yViZVWn9HZJ-IR8gU="
                alt="avatar"
              />
              <div className="ms-3" style={{ flexGrow: 1 }}>
                <p>
                  <span className="fs-5 fw-semibold">Malaya Tiwari</span>{" "}
                  <span className="ms-2">@Malaya13</span>{" "}
                  <span>
                    <i className="bi bi-dot"></i>
                  </span>
                  <span className="">{post.date}</span>
                </p>
                <p>{post.userContent.text}</p>
                {post.userContent.image && (
                  <img
                    className="img-fluid"
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
              <i className="bi bi-three-dots" style={{ cursor: "pointer" }}></i>
            </OverlayTrigger>
          </div>
          <div className="d-flex justify-content-between">
            <div>
              <i className="bi bi-heart"></i> <span>2</span>
            </div>
            <i className="bi bi-bookmark"></i>
            <div>
              <i className="bi bi-chat"></i> <span>4</span>
            </div>
            <i className="bi bi-share"></i>
          </div>
        </div>
      ))}
    </section>
  );
};

export default PostCard;
