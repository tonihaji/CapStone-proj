

import React, {  useContext, useState } from "react";
import Swal from 'sweetalert';


import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


export default function Login({ setCurrentUser, setAppUserType }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [userType, setUserType] = useState("userType");
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  
  const handleLogin = (event) => {
    event.preventDefault();
  
    fetch("http://127.0.0.1:3000/login",{
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email, password, userType
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        // Show an error message
        Swal({
          title: "Login Error",
          text: `${data.error}`,
          icon: "error",
          button: "Try Again"
        });
        
      } else {
        localStorage.setItem("token", data.jwt);
        setCurrentUser(data.current_user)
        setAppUserType(data.user_type)
         // Navigate to the appropriate component
        Swal({
          title: "Success!",
          text: "LoggedIn successfully.",
          icon: "success",
          button: "OK",
        });
       
        if (data.user_type === "Administrator") {
          navigate("/administratordashboard");
        } 
        else if (data.user_type === "Charity"){
          navigate("/charitydashboard");
        }
        else  {
          navigate("/home");
        }
      }
    });
  };

  return (
    <div className="auth-page">
    <div className="auth-wrapper container">
      
        <form onSubmit={handleLogin}>
          <h3>Sign In</h3>

          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label style={{ marginRight: "10px" }}>
              Login As:
              <select
                name="userType"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                style={{ marginLeft: "5px" }}
              >
                <option value="donor">Donor</option>
                <option value="charity">Charity</option>
                <option value="administrator">Administrator</option>
              </select>
            </label>
          </div>
          <div className="mb-3">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />

              <label className="custom-control-label" htmlFor="customCheck1">
                Remember me
              </label>
            </div>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary" onClick={handleLogin}>
             Login
            </button>
          </div>
          <p class="mb-0 mt-2 pt-1 text-sm font-semibold">
                Don't have an account?
                <a
                  href="#!"
                  class="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                  ></a
                >
            
          <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
   
  );
}
