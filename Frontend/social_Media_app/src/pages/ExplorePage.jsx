import React from "react";
import Header from "../components/Header";
import LeftView from "../components/LeftView";
import RightView from "../components/RightView";
import PostCard from "../components/PostCard";
import { useGetAllUsersQuery } from "../features/apiSlice";

const ExplorePage = () => {
  const { data, refetch } = useGetAllUsersQuery();

  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <LeftView />
          </div>
          <div className="col-md-6" style={{ marginTop: "100px" }}>
            <div className="">
              {data?.users.map((user) => (
                <div key={user._id}>
                  <PostCard data={{ user }} refetch={refetch} />
                </div>
              ))}
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

export default ExplorePage;
