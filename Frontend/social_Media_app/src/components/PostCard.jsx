import React, { useEffect, useState } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";
import {
  useGetProfileUserQuery,
  useDeletePostMutation,
  useLikePostMutation,
  useUnlikePostMutation,
  useBookmarkPostMutation,
  useRemoveFromBookmarkMutation,
} from "../features/apiSlice";
import EditPost from "../components/EditPost";

const PostCard = ({ data, refetch }) => {
  console.log(data);
  const [deleteFn, { isSuccess }] = useDeletePostMutation();
  const [likedFn] = useLikePostMutation();
  const [unlikedFn] = useUnlikePostMutation();
  const [bookmarkPostFn] = useBookmarkPostMutation();
  const [removeBookmarkFn] = useRemoveFromBookmarkMutation();
  const [editPost, setEditPost] = useState("");

  const editPostHandler = (post) => {
    setEditPost(post);
    // console.log("clicked on edit", post);
  };

  const deletePostHandler = async (post) => {
    try {
      const response = await deleteFn(post);
      if (response?.data) {
        refetch();
      }
    } catch (error) {
      console.error("Error deleting post: ", error);
    }
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
          onClick={() => deletePostHandler(post)}
          className="popover-item pt-2"
          style={{ cursor: "pointer", display: "block", color: "white" }}
        >
          Delete
        </span>
      </Popover.Body>
    </Popover>
  );

  //  Like Handler
  const likeHandler = async (post) => {
    console.log("Post liked");
    if (!post.liked) {
      await likedFn(post);
      refetch();
    } else {
      await unlikedFn(post);
      refetch();
    }
  };

  // bookmark Handler
  const bookmarkHandler = async (post) => {
    if (!post.bookmarked) {
      await bookmarkPostFn(post);
      refetch();
    } else {
      await removeBookmarkFn(post);
      refetch();
    }
  };

  return (
    <section className="container p-3">
      {data?.user?.posts?.map((post) => (
        <div className="row justify-content-center mb-4" key={post._id}>
          <div className="col-12 col-md-10 col-lg-12 border border-dark rounded py-3 px-4">
            <div className="d-flex align-items-start justify-content-between pb-2">
              <div className="d-flex align-items-start">
                <img
                  style={{ width: "50px", height: "50px" }}
                  className="img-fluid rounded-circle"
                  src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=1024x1024&w=is&k=20&c=6XEZlH2FjqdpXUqjUK4y0LlWF6yViZVWn9HZJ-IR8gU="
                  alt="avatar"
                />
                <div className="ms-3">
                  <p className="mb-1">
                    <span className="fs-5 fw-semibold">{data?.user?.name}</span>{" "}
                    <span className="text-muted">{data?.user?.userName}</span>{" "}
                    <span className="text-muted mx-1">
                      <i className="bi bi-dot"></i>
                    </span>
                    <span className="text-muted">{post.date}</span>
                  </p>
                  <p className="mb-2">{post?.postTextContent}</p>
                  {post?.postImage && (
                    <img
                      className="img-fluid rounded"
                      src={post?.postImage}
                      alt="post content"
                    />
                  )}
                </div>
              </div>
              {data?.user?.name && (
                <OverlayTrigger
                  trigger="click"
                  placement="bottom"
                  overlay={popover(post)}
                  rootClose
                >
                  <i
                    className="bi bi-three-dots"
                    style={{ cursor: "pointer" }}
                  ></i>
                </OverlayTrigger>
              )}
            </div>
            <div className="d-flex justify-content-between mt-2">
              <div onClick={() => likeHandler(post)}>
                <i
                  className={
                    post?.liked ? "bi bi-heart-fill me-1" : "bi bi-heart me-1"
                  }
                ></i>{" "}
                <span>{post?.likes}</span>
              </div>
              <div onClick={() => bookmarkHandler(post)}>
                <i
                  className={
                    post?.bookmarked
                      ? "bi bi-bookmark-fill me-3"
                      : "bi bi-bookmark me-3"
                  }
                ></i>
              </div>
              <div>
                <i className="bi bi-chat me-1"></i>{" "}
                <span>{post?.comments?.length}</span>
              </div>
              <i className="bi bi-share"></i>
            </div>
          </div>
        </div>
      ))}

      {/* Edit Modal */}
      <EditPost editPost={editPost} />
    </section>
  );
};

export default PostCard;
