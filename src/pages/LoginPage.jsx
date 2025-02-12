import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import {setCurrentUser} from "../slices/AuthSlice"

const LINK = "http://localhost:5050"; // Update this to match your backend URL

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const [error, setError] = useState("");
  

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
        setError("Please fill in both email and password.");
        return;
      }
    try {
      
      const response = await axios.post(`${LINK}/auth/login`, { email, password });
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      const username= response.data.username;
      
      console.log(username);
      
      console.log("Login successful:", response.data);
      dispatch(setCurrentUser({ username: username }));
      navigate("/");
    } catch (err) {
      
      console.error("Login error:", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  const styles = {
    container: {
        display: "flex",
        // marginLeft:"500px",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
      },
      form: {
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        padding: "24px",
        width: "350px",
        maxWidth: "400px",
      },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "16px",
      color: "#1f2937",
    },
    label: {
      display: "block",
      
      marginBottom: "8px",
      color:"black"
    },
    input: {
      width: "100%",
      padding: "8px 12px",
      border: "1px solid #d1d5db",
      borderRadius: "4px",
      marginBottom: "16px",
      fontSize: "14px",
      color:"black"
    },
    button: {
      width: "100%",
      backgroundColor: "#3b82f6",
      color: "#ffffff",
      padding: "10px 0",
      border: "none",
      borderRadius: "4px",
      fontSize: "16px",
      cursor: "pointer",
    },
    errorMessage: {
      color: "red",
      fontSize: "14px",
      marginBottom: "16px",
    },
  };

  return (
    <div style={styles.container}>
        
      <form style={styles.form} onSubmit={handleLogin}>
        <h2 style={styles.title}>Login</h2>

        {error && <p style={styles.errorMessage}>{error}</p>}

        <div>
          <label htmlFor="email" style={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label htmlFor="password" style={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            placeholder="Enter your password"
          />
        </div>

        

        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
