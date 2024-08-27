import React, { useEffect, useState } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";
import { likeCount, likedPost, bookmarkPost } from "../features/posts";
import EditPost from "../components/EditPost";

const PostCard = () => {
  const dispatch = useDispatch();
  const [editPostData, setEditPostData] = useState("");
  const post = useSelector((state) => state);
  // console.log(post.posts.posts[0].likeCounter);

  const editPostHandler = (post) => {
    setEditPostData(post);
    console.log("clicked on edit", post);
  };

  const popover = (post) => (
    <Popover id="popover-basic">
      <Popover.Body className="bg-dark rounded text-center">
        <span
          onClick={() => editPostHandler(post)}
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#editModal"
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

  //  Like Handler
  const likeHandler = (post) => {
    dispatch(likeCount(post));
    dispatch(likedPost(post));
  };

  // bookmark Handler
  const bookmarkHandler = (post) => {
    dispatch(bookmarkPost(post));
  };

  useEffect(() => {
    // Initialize liked posts and bookmarked posts once when component mounts
    post.posts.posts.forEach((p) => {
      dispatch(likedPost(p));
      dispatch(bookmarkPost(p));
    });
    // Only run once on mount
  }, []); // Empty dependency array

  return (
    <section className="container-fluid p-3">
      {post.posts.posts.map((post) => (
        <div className="row justify-content-center mb-4" key={post.postId}>
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
                overlay={popover(post)}
              >
                <i
                  className="bi bi-three-dots"
                  style={{ cursor: "pointer" }}
                ></i>
              </OverlayTrigger>
            </div>
            <div className="d-flex justify-content-between mt-2">
              <div onClick={() => likeHandler(post)}>
                <i
                  className={
                    post.like?.liked
                      ? "bi bi-heart-fill me-1"
                      : "bi bi-heart me-1"
                  }
                ></i>{" "}
                <span>{post.like?.counter}</span>
              </div>
              <div onClick={() => bookmarkHandler(post)}>
                <i
                  className={
                    post.bookmarked
                      ? "bi bi-bookmark-fill me-3"
                      : "bi bi-bookmark me-3"
                  }
                ></i>
              </div>
              <div>
                <i className="bi bi-chat me-1"></i> <span>{post.comment}</span>
              </div>
              <i className="bi bi-share"></i>
            </div>
          </div>
        </div>
      ))}

      {/* Edit Modal */}
      <EditPost post={editPostData} />
    </section>
  );
};

export default PostCard;
