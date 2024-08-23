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
      <section>
        <div className="mx-5 px-5">
          <div className="d-flex align-items-start border-bottom">
            <img
              style={{ width: "50px" }}
              className="img-fluid"
              src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=1024x1024&w=is&k=20&c=6XEZlH2FjqdpXUqjUK4y0LlWF6yViZVWn9HZJ-IR8gU="
              alt="avatar"
            />
            <div className="ms-3" style={{ flexGrow: 1 }}>
              <textarea
                value={post}
                onChange={textAreaHandler}
                className="border-0"
                placeholder="Leave a comment here"
                id="floatingTextarea"
                style={{ width: "100%", outline: "none" }}
              ></textarea>
            </div>
          </div>
          {/* Image upload */}

          <div className="d-flex justify-content-between">
            <div>
              <label htmlFor="file-upload" className="">
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
            {/* Emoji Picker */}

            <button onClick={postHandler} className="btn btn-sm btn-dark px-3">
              Post
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default CreatePost;
