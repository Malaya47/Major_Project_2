import React, { useEffect, useState } from "react";

const EditPost = ({ post }) => {
  const [postText, setPostText] = useState(post?.userContent?.text || "");
  console.log(post);

  // Update postText when post prop changes
  useEffect(() => {
    setPostText(post?.userContent?.text || "");
  }, [post]);

  // Handler to update the postText state
  const textAreaHandler = (e) => {
    setPostText(e.target.value);
  };

  const removeMedia = (post) => {
    console.log(post);
  };

  return (
    <>
      <div
        className="modal fade"
        id="editModal"
        tabindex="-1"
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
                {post?.userContent?.image && (
                  <span className="badge rounded-pill text-bg-dark">
                    {post?.userContent?.image ? "Media" : ""}{" "}
                    <i
                      onClick={() => removeMedia(post)}
                      className="bi bi-x"
                    ></i>
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
              <button type="button" className="btn btn-primary">
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
