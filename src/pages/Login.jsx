import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/Dataprovider";
import { server } from "..";
import jwtDecode from "jwt-decode";
import Main from "./Main";

const Login = ({ setIsUserAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [token, setToken] = useState("");
  const [jwt, setJwt] = useState("");
  const { setAccount } = UserAuth();
  const [decodedToken, setDecodedToken] = useState(null);
  const naviGate = useNavigate();

  const handleEmailChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your login logic here
    axios(`${server}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: { username, password },

      withCredentials: true,
    })
      .then((res) => {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        const jwtd = jwtDecode(res.data.token);
        setAccount({ username: jwtd?.username });

        alert(`Hello ${jwtd.username}`);
        // alert(res.data.message);
        setJwt(jwtd);
        // console.log("Jwt" , jwtd);

        setIsUserAuthenticated(true);
        setRedirect(true);
      })
      .catch((e) => {
        // alert(e.data.message);
        console.log(e);
        alert(e.response.data.message);
        setRedirect(false);
      });
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
  };


  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const decoded = jwtDecode(storedToken);
      const currentTime = Date.now() / 1000; // Convert to seconds
      if (decoded.exp < currentTime) {
        // Token has expired
        handleLogout();
      } else {
        setToken(storedToken);
        setDecodedToken(decoded);
      }
    }
  }, []);

  if (redirect) {
    return <Navigate to={"/home"} />;
  }
  return (
    <>



      <div className="flex items-center justify-center h-screen bg-gray-100">


{/* {
  token ? ( naviGate('/home')   ) : ( */}
    <div className="p-8 max-w-md w-full bg-white rounded-lg shadow-md">
    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
      Login
    </h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <label
          htmlFor="username"
          className="block text-gray-700 text-sm font-medium mb-2"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block text-gray-700 text-sm font-medium mb-2"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-full transition-colors duration-300"
      >
        Login
      </button>
    </form>
    <p className="text-gray-600 text-sm mt-4">
      Don't have an account?{" "}
      <Link to="/signup" className="text-blue-500 font-semibold">
        Sign up
      </Link>
    </p>
  </div>
{/* } */}

      
      </div>
    </>
  );
};

export default Login;
