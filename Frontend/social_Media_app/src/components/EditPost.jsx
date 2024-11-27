import React, { useState, useEffect } from "react";
import {
  useEditPostMutation,
  useGetProfileUserQuery,
} from "../features/apiSlice";
import { Modal } from "bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide } from "react-toastify";

const EditPost = ({ editPost }) => {
  const [editFn, { isSuccess }] = useEditPostMutation();
  const { data, refetch } = useGetProfileUserQuery(
    localStorage.getItem("userId")
  );

  const { user } = data || {};

  const [postText, setPostText] = useState(editPost?.postTextContent || "");
  const [postImage, setPostImage] = useState(editPost?.postImage || "");
  const [imagePublicId, setImagePublicId] = useState(
    editPost?.imagePublicId || ""
  );

  useEffect(() => {
    setPostText(editPost?.postTextContent || "");
    setPostImage(editPost?.postImage || "");
    setImagePublicId(editPost?.imagePublicId || "");
  }, [editPost]);

  const textAreaHandler = (e) => {
    setPostText(e.target.value);
  };

  const removeMedia = () => {
    setPostImage("");
    setImagePublicId("");
  };

  const saveChanges = async () => {
    toast.success("Post updated successfully!", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Slide,
    });
    try {
      const response = await editFn({
        ...editPost,
        postTextContent: postText,
        postImage: postImage,
        imagePublicId: imagePublicId,
      });

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
          <div style={{ backgroundColor: "#16181c" }} className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit post details
              </h1>
              <button
                onClick={closeModalHandler}
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="d-flex align-items-start border-bottom pb-2 mb-3">
                <img
                  style={{ width: "50px" }}
                  className="img-fluid rounded-circle"
                  src={user?.profileImage}
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
                      color: "white",
                      width: "100%",
                      outline: "none",
                      resize: "none",
                      boxShadow: "none",
                      backgroundColor: "#16181c",
                    }}
                  ></textarea>
                </div>
              </div>
              <div>
                {postImage && (
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
