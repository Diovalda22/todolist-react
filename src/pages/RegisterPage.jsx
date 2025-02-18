import React, { useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { EyeIcon, EyeOffIcon } from 'lucide-react'; // Eye icons
import ClientApi from '../Utils/ClientApi';
import WaveImg from '../assets/ombak-membahana.png';

const RegisterPage = () => {
  const inputEmail = useRef();
  const inputName = useRef();
  const inputPassword = useRef();
  const nav = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [errors, setErrors] = useState({}); // For storing error messages
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Validation function
  const validateForm = () => {
    let formErrors = {};
    // Check if name is valid
    if (!formData.name) formErrors.name = 'Name is required.';
    // Check if email is valid
    if (!formData.email) {
      formErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Email is invalid.';
    }
    // Check if password is valid
    if (!formData.password) {
      formErrors.password = 'Password is required.';
    } else if (formData.password.length < 6 || formData.password.length > 12) {
      formErrors.password = 'Password must be between 6 and 12 characters.';
    }
    
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0; // Return true if no errors
  };

  const handleRegisterSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      ClientApi.post('/register', formData)
        .then(({ data }) => {
          localStorage.setItem('name', data.user.name);
          localStorage.setItem('email', data.user.email);
          nav('/login');
        })
        .catch((error) => {
          console.log("Error during registration:", error);
        });
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (localStorage.getItem("token") !== null) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-400">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md z-50">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">Register</h2>
        <form onSubmit={handleRegisterSubmit}>
          {/* Input Username */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Input Email */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Input Password with Toggle Eye Icon */}
          <div className="mb-6 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
              id="password"
              type={showPassword ? "text" : "password"} // Toggle between text and password
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {/* Eye Icon Button */}
            <button
              type="button"
              className="absolute right-3 top-12 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
            </button>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <button
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-purple-500 hover:text-purple-600"
              href="/login"
            >
              Already have an account?
            </a>
          </div>
        </form>
      </div>
      <img src={WaveImg} className="absolute bottom-0 h-[400px] z-40" alt="Background wave" />
    </div>
  );
};

export default RegisterPage;
