import { useState } from "react";
import { createPost } from "../features/posts";
import { useDispatch } from "react-redux";

const CreatePost = () => {
  const dispatch = useDispatch();
  const [post, setPost] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const uploadHandler = (e) => {
    const file = e.target.files[0];
    console.log(file.name);
    setImgUrl(URL.createObjectURL(file));
  };

  const textAreaHandler = (e) => {
    setPost(e.target.value);
  };

  // For date formatting
  const formatDate = (date) => {
    const options = { month: "short", day: "numeric", year: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const currentDate = new Date();
  const formattedDate = formatDate(currentDate);

  const postObject = {
    name: "Malaya",
    userName: "Malaya13",
    date: formattedDate,
    userContent: {
      text: post,
      image: imgUrl,
    },
    likeCounter: 1,
    comment: 1,
  };

  const postHandler = (e) => {
    if (postObject.userContent.text || postObject.userContent.image) {
      console.log(postObject);
      dispatch(createPost(postObject));
      setPost("");
      setImgUrl("");
    } else {
      return;
    }
  };

  return (
    <>
      <section className="container-fluid p-3">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-10 border p-3 rounded">
            <div className="d-flex align-items-start border-bottom pb-2 mb-3">
              <img
                style={{ width: "50px" }}
                className="img-fluid"
                src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=1024x1024&w=is&k=20&c=6XEZlH2FjqdpXUqjUK4y0LlWF6yViZVWn9HZJ-IR8gU="
                alt="avatar"
              />
              <div className="ms-3 flex-grow-1">
                <textarea
                  value={post}
                  onChange={textAreaHandler}
                  className="form-control border-0"
                  placeholder="What's on your mind?"
                  id="floatingTextarea"
                  style={{ width: "100%", outline: "none", resize: "none" }}
                ></textarea>
              </div>
            </div>
            {/* Image preview */}
            {imgUrl && (
              <div className="mb-3">
                <img
                  src={imgUrl}
                  alt="Selected"
                  className="img-fluid rounded"
                />
              </div>
            )}
            {/* Image upload */}
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <label htmlFor="file-upload" className="btn btn-light">
                  <i className="bi bi-image"></i>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  style={{ display: "none" }}
                  accept="image/*"
                  capture="camera"
                  onChange={uploadHandler}
                />
              </div>
              {/* Post button */}
              <button
                onClick={postHandler}
                className="btn btn-sm btn-dark px-3"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CreatePost;
