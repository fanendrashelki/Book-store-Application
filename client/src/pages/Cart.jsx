import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

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
      await axios.delete(`${API}/remove-cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
          id: userId,
          bookid: bookid,
        },
      });

      const updatedCart = cartData.filter((item) => item._id !== bookid);
      setCartData(updatedCart);
      calculateTotal(updatedCart);
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
            <div
              key={book._id}
              className="border p-4 rounded-lg shadow-lg bg-white"
            >
              <img
                src={
                  book.url ||
                  "https://dhmckee.com/wp-content/uploads/2018/11/defbookcover-min.jpg"
                }
                alt={book.title}
                className="w-full h-60 object-cover rounded-lg"
              />
              <h2 className="text-lg font-semibold mt-2">{book.title}</h2>
              <p className="text-gray-500">Price: ${book.price}</p>
              <p className="text-gray-500">Quantity: {book.quantity}</p>
              <div className="flex justify-between items-center mt-4">
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded flex items-center hover:bg-red-600"
                  onClick={() => handleRemove(book._id)}
                >
                  <FaTrash className="mr-2" /> Remove
                </button>
              </div>
            </div>
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
