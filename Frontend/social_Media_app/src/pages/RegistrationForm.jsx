import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRegisterUserMutation } from "../features/apiSlice";

const RegistrationForm = () => {
  const [registerFn] = useRegisterUserMutation();

  const [userDetails, setUserDetails] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setUserDetails((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }));
  };

  const registerHandler = (e) => {
    e.preventDefault();
    registerFn(userDetails);
    setUserDetails({
      name: "",
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <section style={{backgroundColor: "#16181c"}} className="p-3 p-md-4 p-xl-5">
      <div className="container">
        <div className="card border-dark shadow-sm">
          <div className="row g-0">
            <div style={{ backgroundColor: "#1e2126" }} className="col-12 col-md-6">
              <div className="d-flex align-items-center justify-content-center h-100">
              <div className="d-flex flex-column align-items-center justify-content-center h-100 p-5 text-light">
                <h1 className="display-4 fw-bold mb-3 text-primary">Quantum Verse</h1>
                <p className="text-primary mb-4">Step into Quantum Verse</p>
                <div className="text-center">
                  <h3 className="fw-light mb-3 text-light">Discover <span style={{fontSize: "12px"}} className="text-uppercase">People around the world</span></h3>
                  <h3 className="fw-light mb-3 text-light">Share <span style={{fontSize: "12px"}} className="text-uppercase">what you thinking</span></h3>
                  <h3 className="fw-light mb-3 text-light">Connect <span style={{fontSize: "12px"}} className="text-uppercase">with your friends</span></h3>
                </div>
              </div>
              </div>
            </div>
            <div style={{ backgroundColor: "#242731" }} className="col-12 col-md-6">
              <div className="card-body p-3 p-md-4 p-xl-5">
                <div className="row">
                  <div className="col-12">
                    <div className="mb-5">
                      <h3 className="text-light text-center">Register</h3>
                    </div>
                  </div>
                </div>
                <form onSubmit={registerHandler}>
                  <div className="row gy-3 gy-md-4 overflow-hidden">
                    <div className="col-12">
                      <label htmlFor="email" className="form-label text-light">
                        Name<span className="text-danger">*</span>
                      </label>
                      <input
                        onChange={changeHandler}
                        type="text"
                        className="form-control bg-dark text-light border-dark"
                        name="name"
                        placeholder="Enter your name"
                        value={userDetails.name}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="email" className="form-label text-light">
                        Username<span className="text-danger">*</span>
                      </label>
                      <input
                        onChange={changeHandler}
                        type="text"
                        className="form-control bg-dark text-light border-dark"
                        name="username"
                        placeholder="create your username"
                        value={userDetails.username}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="email" className="form-label text-light">
                        Email<span className="text-danger">*</span>
                      </label>
                      <input
                        onChange={changeHandler}
                        type="email"
                        className="form-control bg-dark text-light border-dark"
                        name="email"
                        id="email"
                        placeholder="Alex@gmail.com"
                        value={userDetails.email}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="password" className="form-label text-light">
                        Password<span className="text-danger">*</span>
                      </label>
                      <input
                        onChange={changeHandler}
                        type="password"
                        className="form-control bg-dark text-light border-dark"
                        name="password"
                        id="password"
                        value={userDetails.password}
                        required
                      />
                    </div>

                    <div className="col-12">
                      <div className="d-grid">
                        <button
                          className="btn bsb-btn-xl btn-primary"
                          type="submit"
                        >
                          Register now
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="text-center mt-4">
                  <p className="text-light mb-0">
                   Already have an account?{" "}
                    <Link to="/login" className="text-primary text-decoration-none">
                      Log In
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;
