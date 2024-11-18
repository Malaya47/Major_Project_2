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
  const { refetch: refetchMainUser } = useGetProfileUserQuery();
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
    <>
      {usersToDisplay?.map((user) => (
        <div
          key={user._id}
          className="d-flex align-items-center p-2 border rounded bg-light mb-2"
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
              <div className="fw-bold text-dark">{user.name}</div>
              <div className="text-muted">@{user.userName}</div>
            </div>
          </Link>
          <div>
            <button
              onClick={() => followHandler(user)}
              className="btn btn-dark btn-sm"
            >
              {user.followers.includes("670cbe08cb809542b91cf1c0")
                ? "unfollow"
                : "follow"}
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default SuggestionListCard;
