import React, { useEffect, useState } from "react";
import axios from "axios";
import UserNavbar from "../../components/UserNavbar";

export default function UserProfile() {

  const userID = localStorage.getItem("userID");

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userID) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/profile/${userID}`);
      setProfile(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔴 Loading
  if (loading) {
    return (
      <div>
        <UserNavbar />
        <h3 style={{ textAlign: "center", marginTop: "40px" }}>
          Loading Profile...
        </h3>
      </div>
    );
  }

  // 🔴 No userID
  if (!userID) {
    return (
      <div>
        <UserNavbar />
        <h3 style={{ textAlign: "center", marginTop: "40px" }}>
          Please login first
        </h3>
      </div>
    );
  }

  // 🔴 No profile in DB
  if (!profile) {
    return (
      <div>
        <UserNavbar />
        <h3 style={{ textAlign: "center", marginTop: "40px" }}>
          No Profile Found ❌
        </h3>
      </div>
    );
  }

  return (
    <div>
      <UserNavbar />

      <div style={styles.container}>
        <h2>User Profile 👤</h2>

        <div style={styles.card}>
          <p><b>User ID:</b> {profile.userID || "-"}</p>
          <p><b>Name:</b> {profile.firstName || "-"} {profile.lastName || "-"}</p>
          <p><b>Email:</b> {profile.emailID || "-"}</p>
          <p><b>Mobile:</b> {profile.mobileNo || "-"}</p>
          <p><b>Gender:</b> {profile.gender || "-"}</p>
          <p><b>Date of Birth:</b> {profile.dateOfBirth || "-"}</p>

          <hr />

          <p><b>Address:</b></p>
          <p>{profile.street || "-"}, {profile.location || "-"}</p>
          <p>{profile.city || "-"}, {profile.state || "-"} - {profile.pincode || "-"}</p>
        </div>
      </div>
    </div>
  );
}

// 🎨 Styles
const styles = {
  container: {
    textAlign: "center",
    marginTop: "30px"
  },
  card: {
    width: "400px",
    margin: "auto",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
    textAlign: "left"
  }
};