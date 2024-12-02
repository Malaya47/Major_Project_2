import axios from "axios";
import { useState } from "react";
import {
  useCreatePostMutation,
  useGetProfileUserQuery,
} from "../features/apiSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

const CreatePost = () => {
  // const dispatch = useDispatch();
  const [createPostFn, { isLoading }] = useCreatePostMutation();
  const { data, refetch } = useGetProfileUserQuery(
    localStorage.getItem("userId")
  );

  const { user } = data || {};

  const [post, setPost] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [imgPublicId, setImgPublicId] = useState("");
  const [file, setFile] = useState(null);

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

  const createPost = {
    userId: localStorage.getItem("userId"),
    date: formattedDate,
    postTextContent: post,
    postImage: imgUrl,
    imagePublicId: imgPublicId,
  };

  const postHandler = async () => {
    try {
      // Upload the image if a file is selected
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post(`${API_URL}/api/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setImgUrl(response.data.imageUrl); // Update the imgUrl
        setImgPublicId(response.data.imagePublicId); // adding public_id
        createPost.postImage = response.data.imageUrl; // Add the image URL to the post
        createPost.imagePublicId = response.data.imagePublicId;
      }

      // Create the post
      const response = await createPostFn(createPost);
      if (response?.data) {
        refetch();
        toast.success("Posted successfully!", {
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
        setPost("");
        setImgUrl(""); // Reset image URL
        setImgPublicId("");
        setFile(null); // Clear the file state
      }
    } catch (error) {
      console.log("Error creating post", error);
    }
  };

  const fileChangeHandler = (e) => {
    setFile(e.target.files[0]);
  };

  const deleteFileHandler = () => {
    setFile(null);
  };

  return (
    <>
      <ToastContainer />
      <section className="container-fluid p-3">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-10 border border-info-subtle p-3 rounded">
            <div className="d-flex align-items-start border-bottom border-info-subtle pb-2 mb-3">
              <img
                style={{ width: "50px", height: "50px" }}
                className="img-fluid rounded-circle"
                src={user?.profileImage}
                alt="avatar"
              />
              <div className="ms-3 flex-grow-1">
                <textarea
                  autoFocus
                  value={post}
                  onChange={textAreaHandler}
                  className="form-control border-0 white-placeholder"
                  placeholder="What's on your mind?"
                  id="floatingTextarea"
                  style={{
                    width: "100%",
                    outline: "none",
                    resize: "none",
                    boxShadow: "none",
                    backgroundColor: "#16181c",
                    color: "white",
                  }}
                ></textarea>
              </div>
            </div>

            {/* Image upload */}
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <label htmlFor="file-upload" className="btn btn-primary">
                  <i className="bi bi-image"></i>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  style={{ display: "none" }}
                  accept="image/*"
                  capture="camera"
                  onChange={fileChangeHandler} // Store the file in state
                />
                {file && (
                  <p>
                    {file.name}
                    <i onClick={deleteFileHandler} className="bi bi-x"></i>
                  </p>
                )}
              </div>
              {/* Post button */}
              <button
                onClick={postHandler}
                className="btn btn-sm btn-primary px-3"
                disabled={isLoading} // Disable button while loading
              >
                {isLoading ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : (
                  "Post"
                )}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CreatePost;
