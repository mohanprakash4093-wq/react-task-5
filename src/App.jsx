import { useState } from "react";
import "./App.css";

const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
  password: "",
  confirmPassword: "",
  dob: "",
  gender: "",
  address: "",
  city: "",
  pincode: "",
};

function App() {
  // Store all form values
  const [formData, setFormData] = useState(initialFormData);

  // Store validation errors
  const [errors, setErrors] = useState({});

  // Store successful submission message
  const [success, setSuccess] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      ...(name === "password" ? { confirmPassword: "" } : {}),
    }));

    setSuccess("");
  };

  // Validate all form fields
  const validateForm = () => {
    const newErrors = {};

    // First Name
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (!/^[A-Za-z][A-Za-z\s'-]*$/.test(formData.firstName.trim())) {
      newErrors.firstName = "Enter a valid first name";
    }

    // Last Name
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (!/^[A-Za-z][A-Za-z\s'-]*$/.test(formData.lastName.trim())) {
      newErrors.lastName = "Enter a valid last name";
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formData.email.trim())
    ) {
      newErrors.email = "Enter a valid email address";
    }

    // Mobile Number
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile.trim())) {
      newErrors.mobile = "Enter a valid 10-digit Indian mobile number";
    }

    // Password
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(formData.password)
    ) {
      newErrors.password =
        "Minimum 8 characters with uppercase, lowercase and number";
    }

    // Confirm Password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Date of Birth
    if (!formData.dob) {
      newErrors.dob = "Date of birth is required";
    } else if (formData.dob > new Date().toISOString().split("T")[0]) {
      newErrors.dob = "Date of birth cannot be in the future";
    }

    // Gender
    if (!formData.gender) {
      newErrors.gender = "Please select your gender";
    }

    // Address
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    } else if (formData.address.trim().length < 5) {
      newErrors.address = "Address must contain at least 5 characters";
    }

    // City
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    } else if (!/^[A-Za-z][A-Za-z\s'-]*$/.test(formData.city.trim())) {
      newErrors.city = "Enter a valid city name";
    }

    // Pincode
    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^[1-9]\d{5}$/.test(formData.pincode.trim())) {
      newErrors.pincode = "Enter a valid 6-digit Indian pincode";
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSuccess(
        `Registration successful! Welcome, ${formData.firstName.trim()} ${formData.lastName.trim()}!`
      );

      console.log("Registration Details:", formData);
    } else {
      setSuccess("");
    }
  };

  // Reset the form
  const handleReset = () => {
    setFormData({ ...initialFormData });
    setErrors({});
    setSuccess("");
  };

  return (
    <div className="page-container">
      <div className="registration-card">

        <div className="form-header">
          <div className="logo">R</div>
          <h1>Create Your Account</h1>
          <p>Register today and get started with us!</p>
        </div>

        {success && (
          <div className="success-message">
            ✓ {success}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>

          <h2 className="section-title">Personal Information</h2>

          <div className="form-grid">

            {/* First Name */}
            <div className="form-group">
              <label htmlFor="firstName">First Name *</label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={handleChange}
                aria-invalid={!!errors.firstName}
              />
              {errors.firstName && (
                <span className="error">{errors.firstName}</span>
              )}
            </div>

            {/* Last Name */}
            <div className="form-group">
              <label htmlFor="lastName">Last Name *</label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={handleChange}
                aria-invalid={!!errors.lastName}
              />
              {errors.lastName && (
                <span className="error">{errors.lastName}</span>
              )}
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={handleChange}
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <span className="error">{errors.email}</span>
              )}
            </div>

            {/* Mobile */}
            <div className="form-group">
              <label htmlFor="mobile">Mobile Number *</label>
              <input
                id="mobile"
                type="tel"
                name="mobile"
                placeholder="10-digit mobile number"
                value={formData.mobile}
                onChange={handleChange}
                maxLength={10}
                aria-invalid={!!errors.mobile}
              />
              {errors.mobile && (
                <span className="error">{errors.mobile}</span>
              )}
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password *</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                aria-invalid={!!errors.password}
              />
              {errors.password && (
                <span className="error">{errors.password}</span>
              )}
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password *</label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Re-enter password"
                value={formData.confirmPassword}
                onChange={handleChange}
                aria-invalid={!!errors.confirmPassword}
              />
              {errors.confirmPassword && (
                <span className="error">{errors.confirmPassword}</span>
              )}
            </div>

            {/* Date of Birth */}
            <div className="form-group">
              <label htmlFor="dob">Date of Birth *</label>
              <input
                id="dob"
                type="date"
                name="dob"
                max={new Date().toISOString().split("T")[0]}
                value={formData.dob}
                onChange={handleChange}
                aria-invalid={!!errors.dob}
              />
              {errors.dob && (
                <span className="error">{errors.dob}</span>
              )}
            </div>

            {/* Gender */}
            <div className="form-group">
              <label htmlFor="gender">Gender *</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                aria-invalid={!!errors.gender}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
              {errors.gender && (
                <span className="error">{errors.gender}</span>
              )}
            </div>

          </div>

          <h2 className="section-title address-title">
            Address Information
          </h2>

          <div className="form-grid">

            {/* Address */}
            <div className="form-group full-width">
              <label htmlFor="address">Address *</label>
              <textarea
                id="address"
                name="address"
                placeholder="Enter your full address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                aria-invalid={!!errors.address}
              />
              {errors.address && (
                <span className="error">{errors.address}</span>
              )}
            </div>

            {/* City */}
            <div className="form-group">
              <label htmlFor="city">City *</label>
              <input
                id="city"
                type="text"
                name="city"
                placeholder="Enter your city"
                value={formData.city}
                onChange={handleChange}
                aria-invalid={!!errors.city}
              />
              {errors.city && (
                <span className="error">{errors.city}</span>
              )}
            </div>

            {/* Pincode */}
            <div className="form-group">
              <label htmlFor="pincode">Pincode *</label>
              <input
                id="pincode"
                type="text"
                inputMode="numeric"
                name="pincode"
                placeholder="6-digit pincode"
                value={formData.pincode}
                onChange={handleChange}
                maxLength={6}
                aria-invalid={!!errors.pincode}
              />
              {errors.pincode && (
                <span className="error">{errors.pincode}</span>
              )}
            </div>

          </div>

          <div className="button-group">
            <button type="submit" className="submit-btn">
              Create Account →
            </button>

            <button
              type="button"
              className="reset-btn"
              onClick={handleReset}
            >
              Reset Form
            </button>
          </div>

          <p className="footer-text">
            * All fields are mandatory
          </p>

        </form>
      </div>
    </div>
  );
}

export default App;