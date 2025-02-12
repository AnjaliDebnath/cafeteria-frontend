import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addItem } from "../slices/CartSlice";

const LINK = "http://localhost:5050";

const Dishes = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editDish, setEditDish] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isAddingDish, setIsAddingDish] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get(`${LINK}/dish/`);
        setDishes(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch dishes");
        setLoading(false);
      }
    };

    fetchDishes();
  }, []);

  const handleEditClick = (dish) => {
    setIsAddingDish(false);
    setEditDish(dish);
    setShowModal(true);
  };

  const handleAddDishClick = () => {
    setIsAddingDish(true);
    setEditDish({
      dish_name: "",
      description: "",
      price: "",
      category: "",
      availablility: true,
      image: "",
      counter: counter || 0,
    });
    setShowModal(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (isAddingDish) {
      try {
        const response = await axios.post(`${LINK}/dish/newDish`, editDish);
        alert("Dish added successfully");
        setDishes((prevDishes) => [...prevDishes, response.data]);
        setShowModal(false);
      } catch (err) {
        alert("Failed to add the dish");
      }
    } else {
      try {
        const response = await axios.put(`${LINK}/dish/id/${editDish._id}`, editDish);
        alert("Dish updated successfully");
        setDishes((prevDishes) =>
          prevDishes.map((dish) =>
            dish._id === editDish._id ? { ...dish, ...response.data } : dish
          )
        );
        setShowModal(false);
      } catch (err) {
        alert("Failed to update the dish");
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditDish((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeleteDish = async (dishId) => {
    try {
      await axios.delete(`${LINK}/dish/id/${dishId}`);
      setDishes((prevDishes) => prevDishes.filter((dish) => dish._id !== dishId));
      alert("Dish deleted successfully");
    } catch (err) {
      alert("Failed to delete the dish");
    }
  };

  const handleaddToCart = async (dish) => {
    try {
      const response = await axios.put(
        `${LINK}/cart/update`,
        {
          dishId: dish._id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      dispatch(addItem({ ...dish, quantity: 1 }));
      alert("Item added to cart successfully");
    } catch (err) {
      alert("Failed to add item to cart");
    }
  };

  if (loading) return <p>Loading dishes...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4 ">
      
      <h1 className="text-2xl font-bold mb-4">Dishes</h1>
      <button
        className="mb-6 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 "
        onClick={handleAddDishClick}
      >
        Add Dish
      </button>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dishes.map((dish) => (
          <div
            key={dish._id}
            className="border rounded-lg p-4 shadow-md hover:shadow-lg transition duration-200"
          >
            <img
              src={dish.image || "https://via.placeholder.com/150"}
              alt={dish.dish_name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold">{dish.dish_name}</h2>
            <p className="text-gray-600 mt-2">{dish.description}</p>
            <p className="text-red-600 mt-2">Sold by : {dish.counter}</p>
            <p className="text-lg font-bold mt-2">${dish.price.toFixed(2)}</p>
            <p className="text-sm text-gray-500 mt-1">Category: {dish.category}</p>
            <p
              className={`mt-2 ${
                dish.availablility ? "text-green-600" : "text-red-600"
              }`}
            >
              {dish.availablility ? "Available" : "Not Available"}
            </p>
            <div className="flex justify-between mt-4">
              <button
                className="text-white px-4 py-2 rounded-lg transition bg-blue-400"
                onClick={() => handleEditClick(dish)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                onClick={() => handleDeleteDish(dish._id)}
              >
                Delete
              </button>
            </div>
            <button
              className="mt-4 w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
              onClick={() => handleaddToCart(dish)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <button
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        onClick={() => navigate("/cart")}
      >
        Go to Cart
      </button>

      {/* Modal for Adding/Editing Dish */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-lg mx-4 p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">
              {isAddingDish ? "Add Dish" : "Edit Dish"}
            </h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Dish Name</label>
                <input
                  type="text"
                  name="dish_name"
                  value={editDish.dish_name}
                  onChange={handleInputChange}
                  className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  value={editDish.description}
                  onChange={handleInputChange}
                  className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={editDish.price}
                    onChange={handleInputChange}
                    className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <input
                    type="text"
                    name="category"
                    value={editDish.category}
                    onChange={handleInputChange}
                    className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-sm font-medium">Availability:</p>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="availablility"
                    value={true}
                    checked={editDish.availablility === true}
                    onChange={() =>
                      setEditDish((prev) => ({ ...prev, availablility: true }))
                    }
                    className="form-radio text-blue-500"
                  />
                  <span className="ml-2">Available</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="availablility"
                    value={false}
                    checked={editDish.availablility === false}
                    onChange={() =>
                      setEditDish((prev) => ({ ...prev, availablility: false }))
                    }
                    className="form-radio text-red-500"
                  />
                  <span className="ml-2">Not Available</span>
                </label>
              </div>
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  {isAddingDish ? "Add Dish" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dishes;
