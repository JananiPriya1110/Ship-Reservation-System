import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../auth/AuthForms.css";

const API = "http://localhost:8080/auth";

export default function UserLogin() {
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // { type: 'error'|'success', text: string }

  const navigate = useNavigate();

  const login = async (e) => {
    e?.preventDefault?.();

    if (!userID || !password) {
      setMessage({ type: "error", text: "Enter credentials" });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const res = await axios.post(`${API}/login`, { userID, password });

      if (res.data === "USER_SUCCESS") {
        localStorage.setItem("userID", userID);
        localStorage.setItem("userType", "U");
        setMessage({ type: "success", text: "Login successful" });
        setTimeout(() => navigate("/user/dashboard"), 650);
      } else {
        setMessage({ type: "error", text: "Invalid Credentials" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Server Error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="authPage">
      <div className="authCard" aria-live="polite">
        <div className="authCardHeader">
          <div className="authKicker">SHIP RESERVATION SYSTEM</div>
          <h1 className="authTitle">User Login</h1>
          <p className="authSubtitle">Book tickets with confidence.</p>
        </div>

        <div className="authCardBody">
          <form className="authForm" onSubmit={login}>
            <div className="authField">
              <label className="authLabel">
                <span>User ID</span>
              </label>
              <input
                className="authInput"
                placeholder="Enter your User ID"
                value={userID}
                onChange={(e) => setUserID(e.target.value)}
                autoComplete="username"
              />
            </div>

            <div className="authField">
              <label className="authLabel">
                <span>Password</span>
              </label>
              <input
                className="authInput"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            {message ? (
              <div
                className={`authMsg ${
                  message.type === "error" ? "authMsgError" : "authMsgSuccess"
                }`}
              >
                {message.text}
              </div>
            ) : null}

            <div className="authActions">
              <button className="authBtn" type="submit" disabled={loading}>
                {loading ? "Signing in…" : "Login"}
              </button>
            </div>

            <div className="authSwitch">
              Don&apos;t have an account?{" "}
              <span onClick={() => navigate("/user/register")}>Register</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

