import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../features/apiSlice";
import { useDispatch } from "react-redux";
import { getLoggedInUser } from "../features/userSlice";

const LogInForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginFn, { data }] = useLoginUserMutation();
  console.log(data);

  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setUserDetails((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }));
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    const response = await loginFn(userDetails);

    if (response?.data?.token) {
      localStorage.setItem("loginToken", response.data.token);
      localStorage.setItem("userId", response.data.user._id);
      navigate("/");
    }

    setUserDetails({
      email: "",
      password: "",
    });
  };

  return (
    <div className="min-vh-100 d-flex align-items-center" style={{ backgroundColor: "#16181c" }}>
      <div className="container">
        <div className="card border-0 shadow-lg" style={{ backgroundColor: "#1e2126" }}>
          <div className="row g-0">
            <div className="col-12 col-md-6">
              <div className="d-flex flex-column align-items-center justify-content-center h-100 p-5 text-light">
                <h1 className="display-4 fw-bold mb-3 text-primary">Quantum Verse</h1>
                <p className="text-muted mb-4">Step into Quantum Verse</p>
                <div className="text-center">
                  <h3 className="fw-light mb-3 text-light">Discover <span style={{fontSize: "12px"}} className="text-uppercase">People around the world</span></h3>
                  <h3 className="fw-light mb-3 text-light">Share <span style={{fontSize: "12px"}} className="text-uppercase">what you thinking</span></h3>
                  <h3 className="fw-light mb-3 text-light">Connect <span style={{fontSize: "12px"}} className="text-uppercase">with your friends</span></h3>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6" style={{ backgroundColor: "#242731" }}>
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <h2 className="h3 text-light mb-0">Welcome Back</h2>
                  <p className="text-muted">Sign in to continue</p>
                </div>
                <form onSubmit={loginHandler}>
                  <div className="row gy-3 overflow-hidden">
                    <div className="col-12">
                        <label htmlFor="email" className="text-light mb-3">Email<span className="text-danger">*</span></label>
                      <div className="form-floating mb-3">
                        <input
                        onChange={changeHandler}
                          type="email"
                          name="email"
                          className="form-control bg-dark text-light border-dark"
                          id="email"
                          value={userDetails.email}
                          placeholder="name@example.com"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-12">
                        <label htmlFor="password" className="text-light mb-3">Password<span className="text-danger">*</span></label>
                      <div className="form-floating mb-3">
                        <input
                          onChange={changeHandler}
                          type="password"
                          name="password"
                          className="form-control bg-dark text-light border-dark"
                          id="password"
                          value={userDetails.password}
                          placeholder="Password"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-grid">
                        <button
                          className="btn btn-primary btn-lg text-white fw-medium"
                          type="submit"
                        >
                          Log In
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="text-center mt-4">
                  <p className="text-light mb-0">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-primary text-decoration-none">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogInForm;
