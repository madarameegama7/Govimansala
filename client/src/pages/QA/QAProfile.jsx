import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./QAStyles.css";

const QAProfile = () => {
  const [profile, setProfile] = useState({
    qaId: null,
    user: { userId: null, name: "", email: "", phone: "", address: "" },
    certificationId: "",
    expertiseArea: "",
    region: "",
    yearsOfExperience: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) throw new Error("No access token found");

        // Decode JWT to get userId
        const decoded = jwtDecode(token);
        const userId = decoded.sub || decoded.userId; // depends on your token

        const res = await axios.get(`http://localhost:8080/api/qa/profile/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProfile(res.data); // keep full structure for PUT
      } catch (error) {
        console.error("Error fetching profile:", error);
        alert("Unable to fetch profile. Please login again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["name", "email", "phone", "address"].includes(name)) {
      setProfile({ ...profile, user: { ...profile.user, [name]: value } });
    } else {
      setProfile({ ...profile, [name]: value });
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No access token found");

      await axios.put(`http://localhost:8080/api/qa/profile`, profile, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="qa-profile">
        <div className="qa-container">
          <div className="qa-content">
            <div className="qa-loading">
              <div className="loading-spinner"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="qa-profile">
      <div className="qa-container">
        <div className="qa-content fade-in">
          <div className="qa-header">
            <h2>QA Inspector Profile</h2>
            <p>Manage your professional information</p>
          </div>

          <div className="qa-segment">
            <form onSubmit={handleSubmit} className="qa-form">
              {/* User Fields */}
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.user.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Full Name"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile.user.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Email"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={profile.user.phone || ""}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Phone number"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  name="address"
                  value={profile.user.address || ""}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Address"
                />
              </div>

              {/* QA Fields */}
              <div className="form-group">
                <label className="form-label">Certification ID</label>
                <input
                  type="text"
                  name="certificationId"
                  value={profile.certificationId}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Certification ID"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Expertise Area</label>
                <input
                  type="text"
                  name="expertiseArea"
                  value={profile.expertiseArea}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Expertise Area"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Region</label>
                <input
                  type="text"
                  name="region"
                  value={profile.region}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Region"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Years of Experience</label>
                <input
                  type="number"
                  name="yearsOfExperience"
                  value={profile.yearsOfExperience}
                  onChange={handleChange}
                  className="form-input"
                  min="0"
                  max="50"
                />
              </div>

              <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                <button
                  type="submit"
                  className="qa-btn qa-btn-primary"
                  disabled={saving}
                  style={{ minWidth: "200px" }}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QAProfile;
