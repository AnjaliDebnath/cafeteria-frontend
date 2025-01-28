import React, { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const styles = {
    sidebarContainer: {
      position: "fixed",
      top: 0,
      left: 0,
      height: "100%",
      width: isOpen ? "250px" : "0",
      backgroundColor: "#1a1a1a",
      overflowX: "hidden",
      transition: "0.3s",
      zIndex: 1000,
      boxShadow: isOpen ? "4px 0 6px rgba(0, 0, 0, 0.1)" : "none",
    },
    sidebarLinks: {
      display: "flex",
      flexDirection: "column",
      padding: "20px",
      gap: "20px",
    },
    navLink: {
      color: "white",
      textDecoration: "none",
      fontSize: "18px",
      transition: "color 0.3s ease",
    },
    activeLink: {
      color: "#ffa500",
    },
    closeButton: {
      position: "absolute",
      top: "20px",
      right: "20px",
      fontSize: "24px",
      color: "white",
      background: "none",
      border: "none",
      cursor: "pointer",
    },
    menuButton: {
      fontSize: "24px",
      color: "white",
      background: "none",
      border: "none",
      cursor: "pointer",
      marginRight: "10px",
    },
  };

  return (
    <>
      <button
        style={styles.menuButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>
      <div style={styles.sidebarContainer}>
        <button
          style={styles.closeButton}
          onClick={() => setIsOpen(false)}
        >
          &times;
        </button>
        <div style={styles.sidebarLinks}>
          <a href="/" style={{ ...styles.navLink, ...styles.activeLink }}>
            Home
          </a>
          <a href="/counter" style={styles.navLink}>
            Counters
          </a>
          <a href="/allDishes" style={styles.navLink}>
            Dishes
          </a>
          <a href="/merchant" style={styles.navLink}>
            Merchants
          </a>
          <a href="/cart" style={styles.navLink}>
            Cart
          </a>
          <a href="#" style={styles.navLink}>
            Logout
          </a>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
