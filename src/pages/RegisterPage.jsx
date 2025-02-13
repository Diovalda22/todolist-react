import React, { useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { EyeIcon, EyeOffIcon } from 'lucide-react'; // Tambahkan ikon mata
import ClientApi from '../Utils/ClientApi';
import WaveImg from '../assets/ombak-membahana.png';

const RegisterPage = () => {
  const inputEmail = useRef();
  const inputName = useRef();
  const inputPassword = useRef();
  const nav = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // State untuk toggle password

  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    const email = inputEmail.current.value;
    const name = inputName.current.value;
    const password = inputPassword.current.value;

    ClientApi.post('/register', { email, name, password })
      .then(({ data }) => {
        localStorage.setItem('name', data.user.name);
        localStorage.setItem('email', data.user.email);
        nav('/login');
      })
      .catch((error) => {
        console.log("error", error);
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
              ref={inputName}
            />
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
              ref={inputEmail}
            />
          </div>

          {/* Input Password dengan Mata */}
          <div className="mb-6 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
              id="password"
              type={showPassword ? "text" : "password"} // Toggle tipe input
              placeholder="Password"
              ref={inputPassword}
            />
            {/* Tombol Mata */}
            <button
              type="button"
              className="absolute right-3 top-12 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
            </button>
          </div>

          {/* Tombol Register */}
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
              Already have account?
            </a>
          </div>
        </form>
      </div>
      <img src={WaveImg} className="absolute bottom-0 h-[400px] z-40" alt="Background wave" />
    </div>
  );
};

export default RegisterPage;
