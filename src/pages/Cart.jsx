import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCart, removeItem } from "../slices/CartSlice"; // Import setCart action
import axios from "axios";

const LINK = "http://localhost:5050";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  // console.log(cartItems);
  const dispatch = useDispatch();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        // console.log(token);

        if (!token) {
          console.error("No token found");
          return;
        }

        // Fetch cart for the user
        const response = await axios.get(`${LINK}/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(response.data.cart);
        setCart(response.data.cart);

        // dispatch(setCart(response.cart));
      } catch (error) {
        console.error(
          "Error fetching cart:",
          error.response?.data || error.message
        );
      }
    };

    fetchCart();
  }, [dispatch]);

  const handleRemoveItem = async (itemId) => {
    try {
      // Fetch the token from local storage
      const token = localStorage.getItem("accessToken");
      // console.log(token);
      
      if (!token) {
        console.error("No token found");
        return;
      }
console.log(itemId);

      // Remove item from backend
      await axios.delete(`${LINK}/cart/delete/${itemId}`, {
        
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(removeItem({ _id: itemId })); 
    } catch (error) {
      console.error(
        "Error removing item:",
        error.response?.data || error.message
      );
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen min-w-screen">
    {/* Header */}
    <h1 className="text-4xl font-bold text-center mb-8">My Cart</h1>

    {/* Cart Items Section */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Items List */}
      <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">Cart Items</h2>
        {cart.length > 0 ? (
          <div className="space-y-4">
            {cart.map((item, index) => 
              (
              <div
                key={index}
                
                className="flex items-center justify-between border-b pb-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image || "image not available "}
                    alt={item.dish_name || "Dish"}
                    className="w-16 h-16 object-cover rounded-lg border"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">
                      {item.dish_name || "Dish not found"}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {item.description || "No description available"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded-lg">
                    <button className="px-3 py-1 text-lg">-</button>
                    <span className="px-4 py-1 text-lg font-medium">
                      {item.quantity}
                    </span>
                    <button className="px-3 py-1 text-lg">+</button>
                  </div>
                  <p className="text-lg font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    className="text-red-500 hover:text-red-600"
                    onClick={() => handleRemoveItem(item._id)}
                  >
                    ×
                  </button>
                </div>
              </div>
            )
            )}
          </div>
        ) : (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        )}
      </div>

      {/* Order Summary */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <p>Total Items:</p>
            <p>{cart.length}</p>
          </div>
          <div className="flex justify-between">
            <p>Total Price:</p>
            <p>${totalPrice.toFixed(2)}</p>
          </div>
        </div>
        <button className="mt-6 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">
          Checkout
        </button>
      </div>
    </div>
  </div>
  );
};

export default Cart;
