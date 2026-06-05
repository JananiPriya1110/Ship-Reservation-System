import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../auth/AuthForms.css";

const API = "http://localhost:8080/auth";

export default function Register() {
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // { type: 'error'|'success', text: string }

  const navigate = useNavigate();

  const register = async (e) => {
    e?.preventDefault?.();

    if (!userID || !password) {
      setMessage({ type: "error", text: "Please fill all fields" });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const res = await axios.post(`${API}/register`, {
        userID,
        password,
        userType: "A" // ✅ ADMIN
      });

      if (res.data === "Registration Successful") {
        setMessage({ type: "success", text: "Admin Registered Successfully" });
        setTimeout(() => navigate("/admin/login"), 700);
      } else {
        setMessage({ type: "error", text: String(res.data) });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Registration Failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="authPage">
      <div className="authCard" aria-live="polite">
        <div className="authCardHeader">
          <div className="authKicker">SHIP RESERVATION SYSTEM</div>
          <h1 className="authTitle">Admin Register</h1>
          <p className="authSubtitle">Create an admin account in seconds.</p>
        </div>

        <div className="authCardBody">
          <form className="authForm" onSubmit={register}>
            <div className="authField">
              <label className="authLabel">
                <span>User ID</span>
              </label>
              <input
                className="authInput"
                placeholder="Choose a User ID"
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
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
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
                {loading ? "Creating…" : "Register"}
              </button>
            </div>

            <div className="authSwitch">
              Already have an account?{" "}
              <span onClick={() => navigate("/admin/login")}>Login</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
