import React, { useRef } from 'react';
import WaveImg from '../assets/ombak-membahana.png'
import { Navigate, useNavigate } from 'react-router-dom';
import ClientApi from '../Utils/ClientApi';

const RegisterPage = () => {
  const inputEmail = useRef();
  const inputName = useRef();
  const inputPassword = useRef();
  const nav = useNavigate();

  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    const email = inputEmail.current.value;
    const name = inputName.current.value;
    const password = inputPassword.current.value;

    ClientApi.post('/register', { email, name, password }).then(({ data }) => {
      // console.log(data);
      localStorage.setItem('token', data.token);
      localStorage.setItem('name', data.user.name);
      localStorage.setItem('email', data.user.email);
      const UserData = data.user
      console.log(UserData);
      nav('/todo')
    }).catch((error) => {
      console.log("error", error);
    });
  };

  if (localStorage.getItem("token") !== null) {
    return <Navigate to={"/todo"} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-400">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md z-50">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">Register</h2>
        <form onSubmit={handleRegisterSubmit}>
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
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              ref={inputPassword}
            />
          </div>
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
        <img src={WaveImg} className='absolute bottom-0 h-[400px] z-40' />
    </div>
  );
};

export default RegisterPage;