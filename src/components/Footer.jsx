import React from "react";

const Footer = () => {
  const styles = {
    footer: {
      backgroundColor: "#0b112b",
      color: "#fff",
      padding: "2rem 1rem",
      fontSize: "0.9rem",
    },
    container: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "2rem",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    section: {
      marginBottom: "1.5rem",
    },
    heading: {
      fontSize: "1.2rem",
      fontWeight: "bold",
      color: "#ff6700",
      marginBottom: "1rem",
    },
    link: {
      color: "#fff",
      textDecoration: "none",
      marginBottom: "0.5rem",
      display: "block",
      transition: "color 0.3s",
    },
    linkHover: {
      color: "#ff6700",
    },
    iconContainer: {
      display: "flex",
      gap: "0.5rem",
      marginTop: "1rem",
    },
    icon: {
      width: "30px",
      height: "30px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fff",
      color: "#0b112b",
      fontSize: "1rem",
      transition: "background-color 0.3s, color 0.3s",
      cursor: "pointer",
    },
    iconHover: {
      backgroundColor: "#ff6700",
      color: "#fff",
    },
    emailInput: {
      padding: "0.5rem",
      width: "100%",
      border: "none",
      borderRadius: "5px 0 0 5px",
      outline: "none",
    },
    emailButton: {
      padding: "0.5rem 1rem",
      backgroundColor: "#ff6700",
      color: "#fff",
      border: "none",
      borderRadius: "0 5px 5px 0",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    emailButtonHover: {
      backgroundColor: "#e05c00",
    },
    copyright: {
      textAlign: "center",
      marginTop: "2rem",
      borderTop: "1px solid #444",
      paddingTop: "1rem",
    },
    footerLinks: {
      display: "flex",
      justifyContent: "center",
      gap: "1rem",
      marginTop: "0.5rem",
    },
    footerLink: {
      color: "#fff",
      textDecoration: "none",
      transition: "color 0.3s",
    },
    footerLinkHover: {
      color: "#ff6700",
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Company Section */}
        <div style={styles.section}>
          <h3 style={styles.heading}>Company</h3>
          <a href="#" style={styles.link}>About Us</a>
          <a href="#" style={styles.link}>Contact Us</a>
          <a href="#" style={styles.link}>Reservation</a>
          <a href="#" style={styles.link}>Privacy Policy</a>
          <a href="#" style={styles.link}>Terms & Conditions</a>
        </div>

        {/* Contact Section */}
        <div style={styles.section}>
          <h3 style={styles.heading}>Contact</h3>
          <p>123 Street, New York, USA</p>
          <p>+012 345 67890</p>
          <p>info@example.com</p>
          <div style={styles.iconContainer}>
            <div style={styles.icon}>T</div>
            <div style={styles.icon}>F</div>
            <div style={styles.icon}>Y</div>
            <div style={styles.icon}>L</div>
          </div>
        </div>

        {/* Opening Section */}
        <div style={styles.section}>
          <h3 style={styles.heading}>Opening</h3>
          <p>Monday - Saturday</p>
          <p>09AM - 09PM</p>
          <p>Sunday</p>
          <p>10AM - 08PM</p>
        </div>

        {/* Newsletter Section */}
        <div style={styles.section}>
          <h3 style={styles.heading}>Newsletter</h3>
          <p>Subscribe to our newsletter for updates.</p>
          <div style={{ display: "flex" }}>
            <input
              type="email"
              placeholder="Your email"
              style={styles.emailInput}
            />
            <button style={styles.emailButton}>Sign Up</button>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div style={styles.copyright}>
        <p>&copy; Your Site Name, All Rights Reserved. Designed By HTML Codex</p>
        <div style={styles.footerLinks}>
          <a href="#" style={styles.footerLink}>Home</a>
          <a href="#" style={styles.footerLink}>Cookies</a>
          <a href="#" style={styles.footerLink}>Help</a>
          <a href="#" style={styles.footerLink}>FAQs</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
