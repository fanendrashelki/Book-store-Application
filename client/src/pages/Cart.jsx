import { useEffect, useState } from "react";
import axios from "axios";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import CartFavorites from "../Components/CartFavorites";
const API = import.meta.env.VITE_API_URL;

const Cart = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const [cartData, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    getCart();
  }, []);

  const getCart = async () => {
    try {
      const response = await axios.get(`${API}/get-cart`, {
        headers: { Authorization: `Bearer ${token}`, id: userId },
      });

      if (response.data.cart) {
        setCartData(response.data.cart);
        calculateTotal(response.data.cart);
        localStorage.setItem("cartCount", response.data.cart.length);
        window.dispatchEvent(new Event("cartUpdated"));
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const calculateTotal = (cartItems) => {
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    setTotalPrice(total);
  };

  const handleRemove = async (bookid) => {
    try {
      const response = await axios.delete(`${API}/remove-cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
          id: userId,
          bookid: bookid,
        },
      });

      const updatedCart = cartData.filter((item) => item._id !== bookid);
      setCartData(updatedCart);
      calculateTotal(updatedCart);

      // Update cart count in localStorage
      localStorage.setItem("cartCount", updatedCart.length);

      // Dispatch event to notify Navbar
      window.dispatchEvent(new Event("cartUpdated"));
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-center text-3xl font-bold mb-6">Your Cart</h1>

      {cartData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {cartData.map((book) => (
            <CartFavorites
              key={book._id}
              book={book}
              handleRemove={handleRemove}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">Your cart is empty.</p>
      )}

      {cartData.length > 0 && (
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-semibold">
            Total Price: ${totalPrice.toFixed(2)}
          </h2>
          <button className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition mt-4">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
