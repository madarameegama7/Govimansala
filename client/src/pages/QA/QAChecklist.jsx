import React, { useState } from "react";
import "./QAChecklistStyles.css";

const QAChecklist = () => {
  const [formData, setFormData] = useState({
    fieldClean: false,
    correctMaturity: false,
    pestFree: false,
    properHandling: false,
    goodPackaging: false,
    notes: "",
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Checklist Submitted:", formData);
    alert("✅ Checklist submitted successfully!");
  };

  return (
    <div className="qa-dashboard">
      <div className="qa-container">
        <div className="qa-content fade-in">
          <div className="qa-header">
            <h2>🌾 Harvest Inspection Checklist</h2>
            <p>Ensure all quality standards are met before approval.</p>
          </div>

          <form onSubmit={handleSubmit} className="qa-checklist-form pretty">
            <div className="qa-checklist-section">
              <h3>Field & Harvest Conditions</h3>
              <div className="qa-checklist-grid">
                <label className="qa-check-item">
                  <input
                    type="checkbox"
                    name="fieldClean"
                    checked={formData.fieldClean}
                    onChange={handleChange}
                  />
                  <span>Field is clean and free of debris</span>
                </label>

                <label className="qa-check-item">
                  <input
                    type="checkbox"
                    name="correctMaturity"
                    checked={formData.correctMaturity}
                    onChange={handleChange}
                  />
                  <span>Harvested at correct maturity stage</span>
                </label>

                <label className="qa-check-item">
                  <input
                    type="checkbox"
                    name="pestFree"
                    checked={formData.pestFree}
                    onChange={handleChange}
                  />
                  <span>Produce is pest and disease free</span>
                </label>

                <label className="qa-check-item">
                  <input
                    type="checkbox"
                    name="properHandling"
                    checked={formData.properHandling}
                    onChange={handleChange}
                  />
                  <span>Handled carefully (no bruising or damage)</span>
                </label>

                <label className="qa-check-item">
                  <input
                    type="checkbox"
                    name="goodPackaging"
                    checked={formData.goodPackaging}
                    onChange={handleChange}
                  />
                  <span>Proper packaging and labeling used</span>
                </label>
              </div>
            </div>

            <div className="qa-notes-section">
              <h3>Inspector Notes</h3>
              <textarea
                name="notes"
                rows="4"
                placeholder="Add remarks or observations..."
                value={formData.notes}
                onChange={handleChange}
              />
            </div>

            <div className="qa-actions">
              <button type="submit" className="qa-btn qa-btn-primary large">
                Submit Checklist
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QAChecklist;
