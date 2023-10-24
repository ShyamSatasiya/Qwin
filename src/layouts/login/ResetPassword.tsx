import React, { useState } from "react";
import { auth } from "../../config/IntialiseFirebase";

function ResetPassword() {
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleResetPassword = () => {
    const { email } = formData;

    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        // Password reset email sent successfully
        alert("Password reset email sent. Check your inbox.");
      })
      .catch((error) => {
        console.error("Error sending password reset email:", error);
        alert("Error sending password reset email. Please try again.");
      });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <div className="text-center">
                <h2 className="card-title">Reset Password</h2>
              </div>
              <form>
                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="text-center">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleResetPassword}
                  >
                    Reset Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
