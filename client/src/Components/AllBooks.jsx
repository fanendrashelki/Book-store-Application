import React, { useEffect, useState } from "react";
import CartBox from "../Components/CartBox";
import axios from "axios";
const API = import.meta.env.VITE_API_URL;

const AllBooks = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axios.get(`${API}/book-list`, {
        headers: { Authorization: `Bearer ${token}`, id: userId },
      });
      // console.log(response.data.data);

      setCartData(response.data.data);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  return (
    <>
      {cartData.map((book, index) => (
        <CartBox key={index} data={book} />
      ))}
    </>
  );
};

export default AllBooks;
