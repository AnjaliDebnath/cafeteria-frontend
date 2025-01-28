import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const LINK= "http://localhost:5050";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate= useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    axios.post(`${LINK}/auth/register`, {name:username,email,password}).then((res)=>{
        console.log("Registered successful", res.data);
        navigate('/login');
    }).catch((err)=>{
        console.error("Error: ", err.response?.status, err.response?.data || err.message)
    })
}

  

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
      fontSize: "20px",
      fontWeight: "bold",
      color: "#1f2937",
      marginBottom: "16px",
    },
    label: {
      display: "block",
      color: "#4b5563",
      marginBottom: "8px",
    },
    input: {
      width: "100%",
      padding: "8px 12px",
      border: "1px solid #d1d5db",
      borderRadius: "4px",
      marginBottom: "16px",
      fontSize: "14px",
      outline: "none",
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
    buttonHover: {
      backgroundColor: "#2563eb",
    },
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleRegister}>
        <h2 style={styles.title}>Register</h2>

        <div>
            <label htmlFor="username" style={styles.label}> Username</label>
          
          <input
          name="username"
            type="text"        
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            placeholder="Enter username"
          />
        </div>

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

        <button
          type="submit"
          style={styles.button}
          onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
