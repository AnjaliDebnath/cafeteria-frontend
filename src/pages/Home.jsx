import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  const [experience, setExperience] = useState(0);
  const [chefs, setChefs] = useState(0);

  useEffect(() => {
    // Counter animation for "15 Years of Experience"
    const experienceInterval = setInterval(() => {
      setExperience((prev) => {
        if (prev < 15) return prev + 1;
        clearInterval(experienceInterval);
        return prev;
      });
    }, 100);

    // Counter animation for "50 Master Chefs"
    const chefsInterval = setInterval(() => {
      setChefs((prev) => {
        if (prev < 50) return prev + 1;
        clearInterval(chefsInterval);
        return prev;
      });
    }, 50);
  }, []);

  const chef = [
    {
      id: 1,
      name: "Chef John Doe",
      designation: "Head Chef",
      image: "/img/team-1.jpg",
      socials: ["facebook", "twitter", "instagram"],
    },
    {
      id: 2,
      name: "Chef Jane Smith",
      designation: "Sous Chef",
      image: "/img/team-2.jpg",
      socials: ["facebook", "twitter"],
    },
    {
      id: 3,
      name: "Chef Michael Brown",
      designation: "Pastry Chef",
      image: "/img/team-3.jpg",
      socials: ["facebook", "instagram"],
    },
    {
      id: 4,
      name: "Chef Emily Davis",
      designation: "Line Cook",
      image: "/img/team-4.jpg",
      socials: ["facebook", "twitter", "instagram"],
    },
  ];

  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      padding: "2rem",
      backgroundColor: "#f9f9f9",
      width: "100vw",
      height: "100vh",
    },
    imagesContainer: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "1rem",
      flex: "1",
      marginRight: "2rem",
    },
    image: {
      width: "100%",
      height: "220px",
      borderRadius: "8px",
      objectFit: "cover",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    },
    imageHover: {
      transform: "scale(1.05)",
      boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
    },
    textSection: {
      flex: "1",
    },
    heading: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      color: "#ff6700",
      marginBottom: "1rem",
    },
    subheading: {
      fontSize: "1.2rem",
      color: "#333",
      marginBottom: "1.5rem",
    },
    statsContainer: {
      display: "flex",
      gap: "2rem",
      marginTop: "1.5rem",
    },
    statBox: {
      textAlign: "center",
    },
    statNumber: {
      fontSize: "2rem",
      fontWeight: "bold",
      color: "#ff6700",
    },
    statLabel: {
      fontSize: "1rem",
      color: "#555",
    },
    button: {
      marginTop: "2rem",
      padding: "0.75rem 2rem",
      backgroundColor: "#ff6700",
      color: "#fff",
      fontSize: "1rem",
      fontWeight: "bold",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    buttonHover: {
      backgroundColor: "#e05c00",
    },
  };

  return (
    <div>
     
      {/* Hero section */}
      <section style={styles.container}>
        {/* Images Section */}
        <div style={styles.imagesContainer}>
          {["/img/about-1.jpg", "/img/about-2.jpg", "/img/about-3.jpg", "/img/about-4.jpg"].map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Restaurant ${index + 1}`}
              style={styles.image}
              onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
            />
          ))}
        </div>

        {/* Text Section */}
        <div style={styles.textSection}>
          <h1 style={styles.heading}>Welcome to FlavourFusion</h1>
          <p style={styles.subheading}>
            Discover the best dining experience with us. Delicious food, great ambiance, and exceptional service await you!
          </p>
          <div style={styles.statsContainer}>
            <div style={styles.statBox}>
              <div style={styles.statNumber}>{experience}</div>
              <div style={styles.statLabel}>Years of Experience</div>
            </div>
            <div style={styles.statBox}>
              <div style={styles.statNumber}>{chefs}</div>
              <div style={styles.statLabel}>Master Chefs</div>
            </div>
          </div>
          <button
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#e05c00")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#ff6700")}
          >
            Learn More
          </button>
        </div>
      </section>

      <section className="py-10 bg-gray-50">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Our Master Chefs</h2>
        <p className="text-gray-600">Meet the culinary experts behind our dishes</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
        {chef.map((chef) => (
          <div
            key={chef.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
          >
            <div className="relative w-full h-56">
              <img
                src={chef.image}
                alt={chef.name}
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="p-4 text-center">
              <h3 className="text-lg font-bold text-gray-800">{chef.name}</h3>
              <p className="text-sm text-gray-600">{chef.designation}</p>
              <div className="flex justify-center mt-4 gap-3">
                {chef.socials.includes("facebook") && (
                  <a
                    href="#"
                    className="text-blue-500 hover:text-blue-700 transition"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                )}
                {chef.socials.includes("twitter") && (
                  <a
                    href="#"
                    className="text-blue-400 hover:text-blue-600 transition"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                )}
                {chef.socials.includes("instagram") && (
                  <a
                    href="#"
                    className="text-pink-500 hover:text-pink-700 transition"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default Home;
