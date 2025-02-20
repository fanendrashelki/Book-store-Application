import axios from "axios";
import React from "react";
const API = import.meta.env.VITE_API_URL;
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const CartBox = (book) => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const { url, title, author, price, _id } = book.data;

  const handleAddCart = async () => {
    try {
      const response = await axios.post(
        `${API}/add-cart`,
        { id: userId, bookid: _id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // Update cart count in localStorage
      const cartCount = Number(localStorage.getItem("cartCount")) || 0;
      localStorage.setItem("cartCount", cartCount + 1);

      // Dispatch event to notify Navbar
      window.dispatchEvent(new Event("cartUpdated"));
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add to cart");
      console.error("Error fetching profile data:", error);
    }
  };
  const handleFavourite = async () => {
    try {
      const response = await axios.post(
        `${API}/add-favourite`,
        { id: userId, bookid: _id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(response.data.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add to favourite"
      );
      console.error("Error fetching profile data:", error);
    }
  };

  return (
    <div className="relative bg-white rounded-xl p-4 mx-2 w-64 group hover:drop-shadow-lg transition-all">
      <div className="relative">
        <img
          src={url}
          alt={title}
          className="w-full h-72 object-cover rounded-lg"
        />
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button
            onClick={handleFavourite}
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition"
          >
            ❤️
          </button>
        </div>
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded-lg shadow-md flex items-center">
          ⭐ {"No rating"}
        </div>
      </div>
      <h2 className="text-green-600 font-semibold text-md text-center mt-2">
        {title}
      </h2>
      <p className="text-gray-500 text-sm text-center">
        {author || "Unknown Author"}
      </p>
      <p className="text-lg font-bold text-green-600 text-center">
        ${price?.toFixed(2) || "0.00"}
      </p>
      <button
        className="text-md opacity-0 group-hover:opacity-100 mt-3 w-full bg-green-600 text-white py-2 rounded-full flex items-center justify-center gap-2 hover:bg-green-700 transition-opacity"
        onClick={handleAddCart}
      >
        + Add To Cart
      </button>
    </div>
  );
};

export default CartBox;
