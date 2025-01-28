import React from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";

const Navbar = () => {
  const styles = {
    navbar: {
      position: "sticky",
      top: 0,
      left: 0,
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px 20px",
      backgroundColor: "#1a1a1a",
      color: "white",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      zIndex: 1000,
    },
    logo: {
      display: "flex",
      alignItems: "center",
      fontSize: "20px",
      color: "#ffa500",
      textDecoration: "none",
    },
    logoIcon: {
      marginRight: "8px",
      fontSize: "24px",
    },
    navLinks: {
      display: "flex",
      gap: "20px",
    },
    navLink: {
      color: "white",
      textDecoration: "none",
      fontSize: "16px",
      transition: "color 0.3s ease",
    },
    activeLink: {
      color: "#ffa500",
    },
    button: {
      backgroundColor: "#ffa500",
      color: "#fff",
      padding: "8px 16px",
      borderRadius: "4px",
      border: "none",
      cursor: "pointer",
      fontSize: "16px",
      transition: "background-color 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#e69500",
    },
  };

  return (
    <nav style={styles.navbar}>
      <Sidebar />
      <a href="#" style={styles.logo}>
        <span style={styles.logoIcon}>🍔</span>
        FlavourFusion
      </a>
      <div style={styles.navLinks}>
        <div>
          <a href="/" style={{ ...styles.navLink, ...styles.activeLink }}>
            Home
          </a>
        </div>
        <div>
          <a href="/counter" style={styles.navLink}>
            Counters
          </a>
        </div>
        <div>
          <a href="/allDishes" style={styles.navLink}>
            Dishes
          </a>
        </div>
        <div>
          <a href="/merchant" style={styles.navLink}>
            Merchants
          </a>
        </div>
        <div>
          <a href="/cart" style={styles.navLink}>
            Cart
          </a>
        </div>
      </div>
      <Link to= "/register">
      <button
        style={styles.button}
        onMouseOver={(e) =>
          (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)
        }
        onMouseOut={(e) =>
          (e.target.style.backgroundColor = styles.button.backgroundColor)
        }
      >
        Register
      </button>
      </Link>
    </nav>
  );
};

export default Navbar;
