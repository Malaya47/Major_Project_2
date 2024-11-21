import React from "react";
import LeftView from "../components/LeftView";
import RightView from "../components/RightView";
import Header from "../components/Header";
import {
  useGetUserProfileQuery,
  useGetProfileUserQuery,
  useGetAllUsersQuery,
  useFollowUserMutation,
} from "../features/apiSlice";
import { useParams } from "react-router-dom";
import PostCard from "../components/PostCard";

const ProfilePage = () => {
  const { name } = useParams();
  const { refetch: refetchAll } = useGetAllUsersQuery();
  const { data, isLoading, isError, error, refetch } =
    useGetUserProfileQuery(name);
  const { data: profileUser, refetch: refetchMainUser } =
    useGetProfileUserQuery(localStorage.getItem('userId'));
  const [followFn] = useFollowUserMutation();

  const { user } = data || {};

  const followHandler = async (user) => {
    try {
      // Follow or unfollow the user
      await followFn(user).unwrap();
      refetchAll(); // Refetch all users to update suggestions
      refetchMainUser(); // Refetch current user profile to update follow status
      refetch(); // Refetch the specific profile being viewed
    } catch (error) {
      console.error("Error in follow/unfollow operation:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <LeftView />
          </div>
          <div className="col-md-6" style={{ marginTop: "100px" }}>
            <div className="d-flex justify-content-between align-items-center">
              <img
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
                className="img-fluid rounded-circle"
                src="https://res.cloudinary.com/darwtgzlk/image/upload/w_400,f_auto,q_auto/v1686251365/socialMedia/profilePictures/user10_dmlsg2.jpg"
                alt="profile"
              />
              <button
                onClick={() => followHandler(user)}
                className="btn btn-dark rounded-pill px-3 py-2"
              >
                {user?.followers.includes(profileUser?.user._id)
                  ? "Unfollow"
                  : "Follow"}
              </button>
            </div>
            <div className="mt-4">
              <span className="fs-3 fw-bolder">{user?.name}</span>
              <p>{user?.userName}</p>
              <p>{user?.bio}</p>
              <p>https://google.com</p>
              <div className="d-flex">
                <p className="me-3">{user?.posts.length} Posts</p>
                <p className="me-3">{user?.following.length} Following</p>
                <p className="me-3">{user?.followers.length} Followers</p>
              </div>
            </div>
            <div className="mt-4">
              <PostCard data={data} refetch={refetch} />
            </div>
          </div>
          <div className="col-md-3">
            <RightView />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
