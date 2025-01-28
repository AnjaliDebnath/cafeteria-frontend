import React, { useEffect, useState } from "react";
import axios from "axios";
const LINK= "http://localhost:5050"
const Merchant = () => {
  const [merchants, setMerchants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch merchants from the backend
    const fetchMerchants = async () => {
      try {
        const response = await axios.get(`${LINK}/user/merchant/`);
        console.log(response); 
        setMerchants(response.data.merchants);
      } catch (err) {
        setError(err.response ? err.response.data.error : "Failed to fetch merchants");
      } finally {
        setLoading(false);
      }
    };

    fetchMerchants();
  }, []);

  if (loading) return <p>Loading merchants...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Merchants</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {merchants.map((merchant) => (
          <div
            key={merchant._id}
            className="border rounded-lg p-4 shadow-md hover:shadow-lg transition duration-200"
          >
            <h2 className="text-xl font-semibold mb-2">{merchant.name}</h2>
            <p className="text-gray-600">
              <strong>Email:</strong> {merchant.email}
            </p>
            <p className="text-gray-600">
              <strong>Phone:</strong> {merchant.phone}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Merchant;
