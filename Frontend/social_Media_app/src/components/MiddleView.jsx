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
      <section style={{ marginTop: "100px", height: "100vh" }}>
        <CreatePost />

        <PostCard data={data} refetch={refetch} />
      </section>
    </>
  );
};

export default MiddleView;
