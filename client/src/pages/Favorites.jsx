import axios from "axios";
import React, { useEffect, useState } from "react";
import CartFavorites from "../Components/CartFavorites";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API = import.meta.env.VITE_API_URL;

const Favorites = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const [favoriteData, setFavoriteData] = useState([]);

  useEffect(() => {
    getFavorite();
  }, []);

  const getFavorite = async () => {
    try {
      const response = await axios.get(`${API}/get-favourite`, {
        headers: { Authorization: `Bearer ${token}`, id: userId },
      });

      setFavoriteData(response.data.data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const handleRemove = async (bookid) => {
    try {
      const response = await axios.delete(`${API}/remove-favourite`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: { id: userId, bookid },
      });

      setFavoriteData((prev) => prev.filter((book) => book._id !== bookid));
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove favorite.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-center p-2 font-bold text-3xl">Favorites</h1>
      {favoriteData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {favoriteData.map((book) => (
            <CartFavorites
              key={book._id}
              book={book}
              handleRemove={handleRemove}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">
          Your favorites is empty.
        </p>
      )}
    </div>
  );
};

export default Favorites;
