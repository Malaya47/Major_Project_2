import { useState } from "react";
import CreatePost from "./CreatePost";
import PostCard from "./PostCard";

const MiddleView = () => {
  return (
    <>
      <section style={{ marginTop: "100px" }}>
        <CreatePost />

        <PostCard />
      </section>
    </>
  );
};

export default MiddleView;
