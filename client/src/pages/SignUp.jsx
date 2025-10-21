import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import "../pages/styles/SignUp.css";
import { signupApi } from "../services/authenticate";

function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const role = params.get("role");

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(
      password
    );
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address",
        confirmButtonColor: "#d33",
      });
      return;
    }

    if (!isValidPassword(password)) {
      Swal.fire({
        icon: "error",
        title: "Weak Password",
        text: "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
        confirmButtonColor: "#d33",
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Passwords do not match",
        text: "Please make sure your passwords match",
        confirmButtonColor: "#d33",
      });
      return; // stop form submission
    }

    try {
      await signupApi({
        name,
        address,
        email,
        mobile,
        password,
        role,
      });

      Swal.fire({
        icon: "success",
        title: "Signup Successful 🎉",
        text: "Your account has been created successfully.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Go to Login",
      }).then(() => {
        navigate("/login");
      });
    } catch (err) {
      const status = err.response?.status;
      const errorMessage =
        err.response?.data?.message || 
        err.response?.data?.error || 
        err.message || 
        "Signup failed email already exists. Please try again.";

      if (status === 409 && errorMessage.includes("Email already exists")) {
        Swal.fire({
          icon: "error",
          title: "Email Already Registered",
          text: "Please use a different email address.",
          confirmButtonColor: "#d33",
        });
      } else if (status === 400) {
        Swal.fire({
          icon: "error",
          title: "Invalid Password",
          text: errorMessage,
          confirmButtonColor: "#d33",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Signup Failed",
          text: errorMessage,
          confirmButtonColor: "#d33",
        });
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-left">
        <h1 className="signup-welcome">Welcome!</h1>
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <p>
            Already have an account?{" "}
            <span
              className="login-link"
              onClick={() => navigate("/login")}
              style={{ cursor: "pointer", color: "#3085d6" }}
            >
              Login
            </span>
          </p>

          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Address</label>
          <input
            type="text"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Mobile Number</label>
          <input
            type="text"
            placeholder="Enter your mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />

          <label>Password</label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create a Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ paddingRight: "40px" }} // space for the icon
            />
            <img
              src={showPassword ? "/eye.png" : "/hide.png"}
              alt="Toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "20px",
                height: "20px",
                cursor: "pointer",
              }}
            />
          </div>

          <label>Confirm Password</label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={{ paddingRight: "40px" }}
            />
            <img
              src={showPassword ? "/eye.png" : "/hide.png"}
              alt="Toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "20px",
                height: "20px",
                cursor: "pointer",
              }}
            />
          </div>

          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>
      </div>

      <div className="signup-right">
        <img src="/logo.png" alt="Logo" className="signup-logo" />
        <h1 className="signup-brand">
          Govi <span>Mansala</span>
        </h1>
        <p className="signup-tagline">Connect - Cultivate - Prosper 🌱</p>
      </div>
    </div>
  );
}

export default SignUp;
