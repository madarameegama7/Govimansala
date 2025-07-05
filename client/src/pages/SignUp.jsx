import React , {useState} from "react";
import "./SignUp.css";
import { useLocation } from "react-router-dom";
import { signupApi } from "../services/authenticate";

function SignUp() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const role = params.get("role");

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signupApi({
        name,
        address,
        email,
        mobile,
        password,
        role,
      });
      console.log("Success signup");
    } catch (err) {
      setError("Signup failed");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-left">
        <h1 className="signup-welcome">Welcome !</h1>
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <p>
            Already have an account? <span className="login-link">Login</span>
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
          <input
            type="password"
            placeholder="Create a Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <div className="error-message">{error}</div>}
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
        <p className="signup-tagline">
          Connect - Cultivate - Prosper{" "}
          <span role="img" aria-label="plant">
            🌱
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
