import { useEffect, useState } from "react";
import CreatePost from "./CreatePost";
import PostCard from "./PostCard";
import { useGetProfileUserQuery } from "../features/apiSlice";

const MiddleView = () => {
  const { status, data, refetch } = useGetProfileUserQuery(
    localStorage.getItem("userId")
  );

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

        <PostCard data={data} refetch={refetch} />
      </section>
    </>
  );
};

export default MiddleView;
