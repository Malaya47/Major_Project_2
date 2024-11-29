import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import LeftView from "../components/LeftView";
import RightView from "../components/RightView";
import { useGetProfileUserQuery, useEditUserMutation } from "../features/apiSlice";
import { useNavigate } from "react-router-dom";

import PostCard from "../components/PostCard";

const MainProfilePage = () => {
  const navigate = useNavigate(); 
  const { data, isLoading, isError, error, refetch } = useGetProfileUserQuery(
    localStorage.getItem("userId")
  );

  const [editUserFn, {isLoading: editUserLoading}] = useEditUserMutation();


  const avatarImages = [`https://res.cloudinary.com/dt01fsrbz/image/upload/cld-sample-3.jpg`, `https://res.cloudinary.com/dt01fsrbz/image/upload/samples/man-on-a-escalator.jpg`, `https://res.cloudinary.com/dt01fsrbz/image/upload/samples/smile.jpg`, `https://res.cloudinary.com/dt01fsrbz/image/upload/samples/man-on-a-street.jpg`, `https://res.cloudinary.com/dt01fsrbz/image/upload/samples/look-up.jpg`]
 

  const { user } = data || {};
   
 
 const [editUserDetails, setEditUserDetails] = useState(null)
 const [avatarImage, setAvatarImage] = useState('')


 const avatarImageHandler = (imageUrl) => {
  setAvatarImage(imageUrl)
 }
   

const editChangeHandler = (e) => {
  setEditUserDetails((prevValue) => ({
    ...prevValue,
    
    [e.target.name]: e.target.value,
  }));
}


 const editProfileSubmitHandler = (e) => {
  e.preventDefault();
  editUserFn({...editUserDetails, profileImage: avatarImage})
  refetch();
 }

 const logoutHandler = () => {
  localStorage.clear();
  navigate("/login")

 }

  

  useEffect(() => {
    if(user){
      setEditUserDetails({...user})
    }
    refetch(); // Refetch the data on component mount
  }, [refetch, user]);

 

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
          <div className="col-md-6" style={{ marginTop: "100px",  backgroundColor: "#16181c",
          minHeight: "100vh", }}>
            <div className="d-flex justify-content-between align-items-center">
              <img
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
                className="img-fluid rounded-circle"
                src={user?.profileImage}
                alt="profile"
              />
               
               <div>
                {/* Edit button and modal */}
                <button type="button" className="btn btn-primary rounded-pill px-3 py-2 me-3 ">
               <i className="bi bi-pencil-square px-3" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
               </button>
               <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div style={{ backgroundColor: "#16181c" }} className="modal-content ">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Profile</h1>
        <button type="button" className="btn-close btn btn-light" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form onSubmit={editProfileSubmitHandler}>
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
    <label htmlFor="avatar" className="form-label" style={{ flex: '1' }}>Avatar</label>
    <div>
       <img className="img-fluid rounded-circle" style={{width: "50px", height: "50px", objectFit: "cover", cursor: "pointer"}} src="https://res.cloudinary.com/darwtgzlk/image/upload/w_400,f_auto,q_auto/v1686251365/socialMedia/profilePictures/user10_dmlsg2.jpg" alt="" />
       {avatarImages.map((image, index) => (
          <img onClick={() =>avatarImageHandler(image)} style={{width: "50px", height: "50px", objectFit: "cover", cursor: "pointer"}} className="img-fluid rounded-circle" src={image} key={index} />
       ))}
    </div>
  </div>
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
    <label htmlFor="name" className="form-label" style={{ flex: '1' }}>Name</label>
    <input
      id="name"
      style={{
        flex: '2',
        backgroundColor: '#16181c',
        border: 'none',
        color: 'white',
        padding: '0.5rem',
      }}
      type="text"
      value={editUserDetails?.name}
      readOnly
    />
  </div>
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
    <label htmlFor="username" className="form-label" style={{ flex: '1' }}>Username</label>
    <input
      id="username"
      style={{
        flex: '2',
        backgroundColor: '#16181c',
        border: 'none',
        color: 'white',
        padding: '0.5rem',
      }}
      type="text"
      value={editUserDetails?.userName}
      readOnly
    />
  </div>
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
    <label htmlFor="bio" className="form-label" style={{ flex: '1' }}>Bio</label>
    <input
      onChange={editChangeHandler}
      id="bio"
      name="bio"
      style={{
        flex: '2',
        backgroundColor: '#16181c',
        border: '1px solid #6c757d',
        borderRadius: '5px',
        color: 'white',
        padding: '0.5rem',
      }}
      type="text"
      value={editUserDetails?.bio}
    />
  </div>
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
    <label htmlFor="website" className="form-label" style={{ flex: '1' }}>Website</label>
    <input
       onChange={editChangeHandler}
      id="website"
      name="profileLink"
      style={{
        flex: '2',
        backgroundColor: '#16181c',
        border: '1px solid #6c757d',
        borderRadius: '5px',
        color: 'white',
        padding: '0.5rem',
      }}
      type="text"
      value={editUserDetails?.profileLink}
    />
  </div>
  <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="Submit" data-bs-dismiss="modal" className="btn btn-primary">Update</button>
      </div>
</form>

      </div>
      
    </div>
  </div>
</div>
              <button onClick={logoutHandler} className="btn btn-primary rounded-pill px-3 py-2">
                Logout
              </button>
              </div>
            </div>
            <div className="mt-4">
              <span className="fs-3 fw-bolder">{user?.name}</span>
              <p>{user?.userName}</p>
              <p>{user?.bio}</p>
              <a href="https://malayatiwari.netlify.app/" target="_blank">{user?.profileLink}</a>
              <div className="d-flex justify-content-start gap-3 mt-3">
                <p className="fs-3">{user?.posts.length} Posts</p>
                <p className="fs-3">{user?.following.length} Following</p>
                <p className="fs-3">{user?.followers.length} Followers</p>
              </div>
            </div>

            <div style={{  backgroundColor: "#16181c",
          minHeight: "100vh",}} className="mt-4">
              <PostCard data={data} refetch={refetch} />
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

export default MainProfilePage;
