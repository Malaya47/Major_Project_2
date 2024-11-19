import React, { useState, useEffect } from "react";
import {
  useEditPostMutation,
  useGetProfileUserQuery,
} from "../features/apiSlice";
import { Modal } from "bootstrap";

const EditPost = ({ editPost }) => {
  console.log(editPost);
  const [editFn, { isSuccess }] = useEditPostMutation();
  const { refetch } = useGetProfileUserQuery(localStorage.getItem("userId"));

  const [postText, setPostText] = useState(editPost.postTextContent);

  useEffect(() => {
    setPostText(editPost.postTextContent);
  }, [editPost.postTextContent]);

  const textAreaHandler = (e) => {
    setPostText(e.target.value);
  };

  const removeMedia = () => {
    console.log("remove media");
  };

  const saveChanges = async () => {
    try {
      const response = await editFn({ ...editPost, postTextContent: postText });

      if (response?.data) {
        await refetch();
      }
    } catch (error) {
      console.error("Error editing post: ", error);
    }
  };

  const closeModalHandler = () => {
    setPostText(editPost.postTextContent);
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
                Edit post details
              </h1>
              <button
                onClick={closeModalHandler}
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
                {"" && (
                  <span className="badge rounded-pill text-bg-dark">
                    Media <i onClick={removeMedia} className="bi bi-x"></i>
                  </span>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button
                onClick={closeModalHandler}
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
