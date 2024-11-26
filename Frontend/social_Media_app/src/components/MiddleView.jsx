import { useEffect, useState } from "react";
import CreatePost from "./CreatePost";
import PostCard from "./PostCard";
import { useGetProfileUserQuery } from "../features/apiSlice";
import { useSelector } from "react-redux";

const MiddleView = () => {
  const latestOrTrending = useSelector((state) => state.user.trendingOrLatest);

  const {  data, refetch } = useGetProfileUserQuery(
    localStorage.getItem("userId")
  );

  const posts = latestOrTrending === "latest" ? data?.user?.posts: [...data.user.posts].sort((a, b) => b.likes - a.likes)
  console.log(posts)

  useEffect(() => {
         refetch();
  }, [latestOrTrending])

  return (
    <>
      <section
        style={{
          marginTop: "100px",
          backgroundColor: "#16181c",
          minHeight: "100vh",
        }}
      >
        <CreatePost />

        <PostCard data={{...data, user: {...data?.user, posts}}} refetch={refetch} />
      </section>
    </>
  );
};

export default MiddleView;
