import React, { useEffect, useState } from "react";
import axios from "axios";

const LINK = "http://localhost:5050";

const CountersPage = () => {
  const [counters, setCounters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCounter, setCurrentCounter] = useState(null);

  useEffect(() => {
    const fetchCounters = async () => {
      try {
        const response = await axios.get(`${LINK}/counter/`);
        setCounters(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch counters");
        setLoading(false);
      }
    };

    fetchCounters();
  }, []);

  const handleEdit = (counterId) => {
    const counter = counters.find((counter) => counter._id === counterId);
    setCurrentCounter(counter);
    setIsModalOpen(true);
  };

  const handleDelete = async (counterId) => {
    try {
      await axios.delete(`${LINK}/counter/id/${counterId}`);
      setCounters((prevCounters) =>
        prevCounters.filter((counter) => counter._id !== counterId)
      );
      console.log("Counter deleted successfully");
    } catch (err) {
      console.error("Failed to delete counter:", err);
    }
  };

  const handleUpdate = async (updatedCounter) => {
    try {
      await axios.put(
        `${LINK}/counter/id/${updatedCounter._id}`,
        updatedCounter
      );
      setCounters((prevCounters) =>
        prevCounters.map((counter) =>
          counter._id === updatedCounter._id ? updatedCounter : counter
        )
      );
      setIsModalOpen(false);
      console.log("Counter updated successfully");
    } catch (err) {
      console.error("Failed to update counter:", err);
    }
  };

  const handleOpenNewCounterModal = () => {
    setCurrentCounter({
      merchants: [],
      dishes: [],
      counter_name: "",
      description: "",
      location: "",
      imageUrl: "",
      operating_hours: { open: "", close: "" },
      isActive: false,
    });
    setIsModalOpen(true);
  };
  

  const handleSaveNewCounter = async () => {
    if (
      !currentCounter.counter_name ||
      !currentCounter.description ||
      !currentCounter.location ||
      !currentCounter.operating_hours.open ||
      !currentCounter.operating_hours.close
    ) {
      console.error("All fields are required.");
      return;
    }
  
    try {
      const newCounter = {
        merchants: currentCounter.merchants || [], // Ensure merchants array
        dishes: currentCounter.dishes || [], // Ensure dishes array
        counter_name: currentCounter.counter_name,
        description: currentCounter.description,
        location: currentCounter.location,
        imageUrl: currentCounter.imageUrl || "", // Optional image URL
        operating_hours: {
          open: currentCounter.operating_hours.open,
          close: currentCounter.operating_hours.close,
        },
        isActive: currentCounter.isActive,
      };
  
      const response = await axios.post(`${LINK}/counter/`, newCounter);
      setCounters((prevCounters) => [...prevCounters, response.data.counter]); // Add new counter to the list
      setIsModalOpen(false); // Close the modal
      console.log("New counter added successfully:", response.data.message);
    } catch (err) {
      console.error("Failed to add new counter:", err.response?.data || err.message);
    }
  };
  

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <h1 className="text-2xl font-bold">Counters</h1>
        <button style={styles.addButton} onClick={handleOpenNewCounterModal}>
          Add Counter
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {counters.map((counter) => (
          <div key={counter._id} style={styles.counterCard}>
            <img
              src={counter.imageUrl || "default-image.jpg"}
              alt={counter.counter_name}
              style={styles.image}
            />
            <h2>{counter.counter_name}</h2>
            <p>{counter.description}</p>
            <p>Location: {counter.location}</p>
            <p>
              Operating Hours: {counter.operating_hours?.open || "N/A"} -{" "}
              {counter.operating_hours?.close || "N/A"}
            </p>
            <p>Status: {counter.isActive ? "Active" : "Inactive"}</p>
            <div style={styles.buttonRow}>
              <button
                style={styles.editButton}
                onClick={() => handleEdit(counter._id)}
              >
                Edit
              </button>
              <button
                style={styles.deleteButton}
                onClick={() => handleDelete(counter._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && currentCounter && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2>{currentCounter._id ? "Edit Counter" : "Add Counter"}</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (currentCounter._id) {
                  handleUpdate(currentCounter); // Update existing counter
                } else {
                  handleSaveNewCounter(); // Add new counter
                }
              }}
              style={styles.form}
            >
              <div style={styles.formGroup}>
                <label style={styles.label}>Counter Name</label>
                <input
                  type="text"
                  value={currentCounter.counter_name}
                  onChange={(e) =>
                    setCurrentCounter({
                      ...currentCounter,
                      counter_name: e.target.value,
                    })
                  }
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Description</label>
                <textarea
                  value={currentCounter.description}
                  onChange={(e) =>
                    setCurrentCounter({
                      ...currentCounter,
                      description: e.target.value,
                    })
                  }
                  style={styles.textarea}
                ></textarea>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Location</label>
                <input
                  type="text"
                  value={currentCounter.location}
                  onChange={(e) =>
                    setCurrentCounter({
                      ...currentCounter,
                      location: e.target.value,
                    })
                  }
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Operating Hours (Open)</label>
                <input
                  type="time"
                  value={currentCounter.operating_hours?.open || ""}
                  onChange={(e) =>
                    setCurrentCounter({
                      ...currentCounter,
                      operating_hours: {
                        ...currentCounter.operating_hours,
                        open: e.target.value,
                      },
                    })
                  }
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Operating Hours (Close)</label>
                <input
                  type="time"
                  value={currentCounter.operating_hours?.close || ""}
                  onChange={(e) =>
                    setCurrentCounter({
                      ...currentCounter,
                      operating_hours: {
                        ...currentCounter.operating_hours,
                        close: e.target.value,
                      },
                    })
                  }
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Status</label>
                <select
                  value={currentCounter.isActive}
                  onChange={(e) =>
                    setCurrentCounter({
                      ...currentCounter,
                      isActive: e.target.value === "true",
                    })
                  }
                  style={styles.input}
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>

              <div style={styles.buttonGroup}>
                <button type="submit" style={styles.updateButton}>
                  {currentCounter._id ? "Update Counter" : "Add Counter"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={styles.closeButton}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  addButton: {
    backgroundColor: "green",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  counterCard: {
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "4px",
    marginBottom: "10px",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },
  editButton: {
    backgroundColor: "blue",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  deleteButton: {
    backgroundColor: "red",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "8px",
    width: "500px",
    maxWidth: "90%",
    marginTop: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    height: "550px",
  },
  formGroup: {
    marginBottom: "5px",
  },
  label: {
    fontWeight: "bold",
    marginBottom: "5px",
  },
  input: {
    padding: "8px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    width: "100%",
  },
  textarea: {
    padding: "8px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    width: "100%",
    minHeight: "100px",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  updateButton: {
    backgroundColor: "green",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  closeButton: {
    backgroundColor: "gray",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default CountersPage;
