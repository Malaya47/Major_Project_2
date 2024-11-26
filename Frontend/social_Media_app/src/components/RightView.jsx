import React, { useState } from "react";
import SuggestionListCard from "./SuggestionListCard";
import ProfilePage from "../pages/ProfilePage";
import { useLocation } from "react-router-dom";
import { getTreandingOrLatestPosts } from "../features/userSlice";
import { useDispatch } from "react-redux";

const RightView = () => {
  const dispatch = useDispatch(); 
  const location = useLocation();
  const path = location.pathname;

  const [searchName, setSearchName] = useState("");

  const searchHandler = (e) => {
    setSearchName(e.target.value);
  };

  const trendingPostsHandler = (e) => {
    if(e.target.name === "trending" || e.target.name === "latest"){
      dispatch(getTreandingOrLatestPosts(e.target.name));  
    }
  }

  return (
    <>
      <section
        className="d-none d-lg-block border border-info-subtle border-top-0 p-3 position-fixed right-view"
        style={{
          backgroundColor: "#16181c",
          width: "275px",
          height: "calc(100vh - 60px)", // Adjusts height to accommodate fixed position
          top: "60px", // Adjust this to match your header height
          right: "0", // Stick to the right
        }}
      >
        {path === "/" && <div className="d-flex justify-content-evenly">
          <button onClick={trendingPostsHandler} name="trending" className="btn btn-primary mb-2 px-4">
            <i className="bi bi-fire"></i> Trending
          </button>
          <button onClick={trendingPostsHandler} name="latest" className="btn btn-primary mb-2 px-4">Latest</button>
        </div>}
        
        <div className="d-flex">
          <input
            onChange={searchHandler}
            className="form-control mb-3 mt-3"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchName}
          />
        </div>
        <div>
          <p className="fw-bold">Suggestions for you</p>

          <SuggestionListCard searchName={searchName} />
        </div>
      </section>
    </>
  );
};

export default RightView;
