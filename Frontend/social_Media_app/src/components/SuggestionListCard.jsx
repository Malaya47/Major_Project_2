import React, { useState } from "react";
import {
  useGetAllUsersQuery,
  useFollowUserMutation,
  useGetUserProfileQuery,
  useGetProfileUserQuery,
  useSearchUserQuery,
} from "../features/apiSlice";
import { Link } from "react-router-dom";

const SuggestionListCard = ({ searchName }) => {
  console.log(searchName);
  const { data, refetch } = useGetAllUsersQuery();
  const { refetch: refetchMainUser } = useGetProfileUserQuery(
    localStorage.getItem("userId")
  );
  const [followFn] = useFollowUserMutation();
  const { data: user } = useSearchUserQuery(searchName || "", {
    skip: false, // Always fetch since backend will handle empty search cases
  });

  const [selectedUserName, setSelectedUserName] = useState(null);

  // Dynamically fetch the selected user profile based on selectedUserName
  const { refetch: refetchUserProfile } = useGetUserProfileQuery(
    selectedUserName,
    {
      skip: !selectedUserName, // Skip until selectedUserName is set
    }
  );

  const followHandler = async (user) => {
    try {
      setSelectedUserName(user.name);
      await followFn(user).unwrap();
      await refetch(); // Refetch all users after updating follow status
      await refetchMainUser();

      // Set the selected user's name to trigger refetch for their profile
      refetchUserProfile();
    } catch (error) {
      console.error("Error in follow/unfollow operation:", error);
    }
  };

  const usersToDisplay = searchName ? user?.findUsers : data?.users.slice(1);

  return (
    <section className="">
      {usersToDisplay ? (
        usersToDisplay?.map((user) => (
          <div
            key={user._id}
            className="d-flex align-items-center p-2 border border-info-subtle rounded   mb-2"
          >
            <Link
              to={`/profile/${user.name}`}
              className="d-flex align-items-center flex-grow-1"
              style={{ textDecoration: "none" }}
            >
              <div className="me-3">
                <img
                  style={{ width: "50px" }}
                  className="img-fluid"
                  src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=1024x1024&w=is&k=20&c=6XEZlH2FjqdpXUqjUK4y0LlWF6yViZVWn9HZJ-IR8gU="
                  alt="avatar"
                />
              </div>
              <div className="flex-grow-1">
                <div className="fw-bold text-light">{user.name}</div>
                <div className="text-light">@{user.userName}</div>
              </div>
            </Link>
            <div>
              <button
                onClick={() => followHandler(user)}
                className="btn btn-primary btn-sm"
              >
                {user.followers.includes(`${localStorage.getItem("userId")}`)
                  ? "unfollow"
                  : "follow"}
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center mt-5">
          <div className="spinner-border" role="status"></div>
        </div>
      )}
    </section>
  );
};

export default SuggestionListCard;
