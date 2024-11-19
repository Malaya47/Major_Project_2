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
    <section className="p-3 p-md-4 p-xl-5">
      <div className="container">
        <div className="card border-light-subtle shadow-sm">
          <div className="row g-0">
            <div className="col-12 col-md-6 ">
              <div className="d-flex align-items-center justify-content-center h-100">
                <div className="col-10 col-xl-8 py-3">
                  <img
                    className="img-fluid rounded mb-4"
                    loading="lazy"
                    src="https://images.pexels.com/photos/2818118/pexels-photo-2818118.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="BootstrapBrain Logo"
                  />
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="card-body p-3 p-md-4 p-xl-5">
                <div className="row">
                  <div className="col-12">
                    <div className="mb-5">
                      <h3>Log in</h3>
                    </div>
                  </div>
                </div>
                <form onSubmit={loginHandler}>
                  <div className="row gy-3 gy-md-4 overflow-hidden">
                    <div className="col-12">
                      <label htmlFor="email" className="form-label">
                        Email<span className="text-danger">*</span>
                      </label>
                      <input
                        onChange={changeHandler}
                        type="email"
                        className="form-control"
                        name="email"
                        id="email"
                        placeholder="Alex@gmail.com"
                        value={userDetails.email}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="password" className="form-label">
                        Password<span className="text-danger">*</span>
                      </label>
                      <input
                        onChange={changeHandler}
                        type="password"
                        className="form-control"
                        name="password"
                        id="password"
                        value={userDetails.password}
                        required
                      />
                    </div>

                    <div className="col-12">
                      <div className="d-grid">
                        <button
                          className="btn bsb-btn-xl btn-dark"
                          type="submit"
                        >
                          Log in now
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="row">
                  <div className="col-12">
                    <hr className="mt-5 mb-4 border-secondary-subtle" />
                    <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-end">
                      <Link
                        to={"/register"}
                        className="link-secondary text-decoration-none"
                      >
                        Create new account
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogInForm;
