import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useFeedback } from '../context/FeedbackContext';

const Reg = () => {
  const { user, register, generateAdminCode } = useFeedback();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'student',
    adminCode: ''
  });
  const [isRequestingCode, setIsRequestingCode] = useState(false);

  // If user is already logged in, redirect to appropriate dashboard
  if (user) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/student'} replace />;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.firstName.trim() && formData.lastName.trim() && formData.email.trim() && formData.password.trim()) {
      try {
        const userData = {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          adminCode: formData.adminCode
        };
        await register(userData);
        alert('Registration successful! You can now login.');
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          role: 'student'
        });
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert('Please fill in all required fields');
    }
  };

  return (
    <div>
      <section className="background-radial-gradient overflow-hidden">
  <style>
    {`
      .background-radial-gradient {
        background-color: hsl(218, 41%, 15%);
        background-image: radial-gradient(650px circle at 0% 0%,
          hsl(218, 41%, 35%) 15%,
          hsl(218, 41%, 30%) 35%,
          hsl(218, 41%, 20%) 75%,
          hsl(218, 41%, 19%) 80%,
          transparent 100%),
        radial-gradient(1250px circle at 100% 100%,
          hsl(218, 41%, 45%) 15%,
          hsl(218, 41%, 30%) 35%,
          hsl(218, 41%, 20%) 75%,
          hsl(218, 41%, 19%) 80%,
          transparent 100%);
      }

      #radius-shape-1 {
        height: 220px;
        width: 220px;
        top: -60px;
        left: -130px;
        background: radial-gradient(#44006b, #ad1fff);
        overflow: hidden;
      }

      #radius-shape-2 {
        border-radius: 38% 62% 63% 37% / 70% 33% 67% 30%;
        bottom: -60px;
        right: -110px;
        width: 300px;
        height: 300px;
        background: radial-gradient(#44006b, #ad1fff);
        overflow: hidden;
      }

      .bg-glass {
        background-color: hsla(0, 0%, 100%, 0.9) !important;
        backdrop-filter: saturate(200%) blur(25px);
      }
    `}
  </style>

  <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
    <div className="row gx-lg-5 align-items-center mb-5">
      <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
        <h1 className="my-5 display-5 fw-bold ls-tight" style={{ color: 'hsl(218, 81%, 95%)' }}>
          Student Feedback <br />
          <span style={{ color: 'hsl(218, 81%, 75%)' }}>System Registration</span>
        </h1>
        <p className="mb-4 opacity-70" style={{ color: 'hsl(218, 81%, 85%)' }}>
  Create your account in just a few steps and get instant access to our
  feedback system. Register today to submit feedback, view results, and
  stay connected with your academic progress — all from one secure dashboard.
</p>
      </div>

      <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

        <div className="card bg-glass">
          <div className="card-body px-4 py-5 px-md-5">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-4">
                  <div data-mdb-input-init className="form-outline">
                    <input
                      type="text"
                      id="form3Example1"
                      className="form-control"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                    <label className="form-label" htmlFor="form3Example1">First name</label>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div data-mdb-input-init className="form-outline">
                    <input
                      type="text"
                      id="form3Example2"
                      className="form-control"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                    <label className="form-label" htmlFor="form3Example2">Last name</label>
                  </div>
                </div>
              </div>

              <div data-mdb-input-init className="form-outline mb-4">
                <input
                  type="email"
                  id="form3Example3"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <label className="form-label" htmlFor="form3Example3">Email address</label>
              </div>

              <div data-mdb-input-init className="form-outline mb-4">
                <input
                  type="password"
                  id="form3Example4"
                  className="form-control"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <label className="form-label" htmlFor="form3Example4">Password</label>
              </div>

              <div className="form-group mb-4">
                <label htmlFor="role">Role:</label>
                <select
                  id="role"
                  name="role"
                  className="form-control"
                  value={formData.role}
                  onChange={handleInputChange}
                >
                  <option value="student">Student</option>
                  <option value="admin">Administrator/Teacher</option>
                </select>
              </div>

              {formData.role === 'admin' && (
                <div data-mdb-input-init className="form-outline mb-4">
                  <input
                    type="password"
                    id="form3Example5"
                    className="form-control"
                    name="adminCode"
                    value={formData.adminCode}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter admin verification code"
                  />
                  <label className="form-label" htmlFor="form3Example5">Admin Verification Code</label>
                </div>
              )}

              <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4">
                Sign up
              </button>
            </form>

            <div className="text-center">
              <p>Already have an account? <Link to="/login">Login here</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default Reg
