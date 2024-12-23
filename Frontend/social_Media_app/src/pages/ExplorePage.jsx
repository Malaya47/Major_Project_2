import React from "react";
import Header from "../components/Header";
import LeftView from "../components/LeftView";
import RightView from "../components/RightView";
import PostCard from "../components/PostCard";
import { useGetAllUsersQuery } from "../features/apiSlice";
import Footer from "../components/Footer";

const ExplorePage = () => {
  const { data, refetch } = useGetAllUsersQuery();

  return (
    <>
      <Header />
      <div
        style={{ backgroundColor: "#16181c" }}
        className="container text-light"
      >
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
      <Footer />
    </>
  );
};

export default ExplorePage;
