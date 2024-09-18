import React, { useEffect, useState } from "react";
import { editPostRemoveMedia, commitPostChanges } from "../features/posts";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap";

const EditPost = ({ postId }) => {
  const dispatch = useDispatch();

  // Get the post from Redux using useSelector
  const post = useSelector((state) =>
    state.posts.posts.find((p) => p.postId === postId)
  );

  // Local state to manage post text and image
  const [postText, setPostText] = useState(post?.userContent?.text || "");
  const [localImage, setLocalImage] = useState(post?.userContent?.image || "");

  console.log(post);

  // Update postText and localImage when post prop changes
  useEffect(() => {
    setPostText(post?.userContent?.text || "");
    setLocalImage(post?.userContent?.image || "");
  }, [post]);

  // Handler to update the postText state
  const textAreaHandler = (e) => {
    setPostText(e.target.value);
  };

  const removeMedia = () => {
    console.log(post);
    // Update only the local state, not the Redux state
    setLocalImage("");
  };

  const saveChanges = () => {
    // Here you can dispatch an action to update the Redux state with new text and image
    dispatch(
      commitPostChanges({
        postId: post.postId,
        text: postText,
        image: localImage,
      })
    );
    // Close the modal using Bootstrap JavaScript API
    // const modalElement = document.getElementById("editModal");

    // const modalInstance = Modal.getInstance(modalElement);
    // if (modalInstance) {
    //   modalInstance.hide();
    // } else {
    //   new Modal(modalElement).hide(); // Create a new instance if not found
    // }
  };

  return (
    <>
      <div
        className="modal fade"
        id="editModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Update
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="d-flex align-items-start border-bottom pb-2 mb-3">
                <img
                  style={{ width: "50px" }}
                  className="img-fluid"
                  src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=1024x1024&w=is&k=20&c=6XEZlH2FjqdpXUqjUK4y0LlWF6yViZVWn9HZJ-IR8gU="
                  alt="avatar"
                />
                <div className="ms-3 flex-grow-1">
                  <textarea
                    value={postText}
                    onChange={textAreaHandler}
                    className="form-control border-0"
                    placeholder="What's on your mind?"
                    id="floatingTextarea"
                    style={{
                      width: "100%",
                      outline: "none",
                      resize: "none",
                      boxShadow: "none",
                    }}
                  ></textarea>
                </div>
              </div>
              <div>
                {localImage && (
                  <span className="badge rounded-pill text-bg-dark">
                    Media <i onClick={removeMedia} className="bi bi-x"></i>
                  </span>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={saveChanges}
                data-bs-dismiss="modal"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPost;
