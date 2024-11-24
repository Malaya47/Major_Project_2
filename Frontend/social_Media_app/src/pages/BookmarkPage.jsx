import React from "react";
import Header from "../components/Header";
import LeftView from "../components/LeftView";
import RightView from "../components/RightView";
import { useGetBookmarkedPostsQuery } from "../features/apiSlice";
import PostCard from "../components/PostCard";
import Footer from "../components/Footer";

const BookmarkPage = () => {
  const { data, refetch } = useGetBookmarkedPostsQuery();

  return (
    <>
    <section
      style={{ backgroundColor: "#16181c", height: "100vh" }}
      className="text-light"
    >
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <LeftView />
          </div>
          <div className="col-md-6" style={{ marginTop: "100px" }}>
            <div className="">
              {data?.bookmarks.map((post) => (
                <div key={post._id}>
                  <PostCard
                    data={{
                      user: {
                        name: post.userId?.name,
                        userName: post.userId?.userName,
                        profileImage: post.userId?.profileImage,
                        posts: [post], // Wrap the single post in an array to match structure
                      },
                    }}
                    refetch={refetch}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-3">
            <RightView />
          </div>
        </div>
      </div>
       
    </section>
    <Footer /> 
    </>
  );
};

export default BookmarkPage;
