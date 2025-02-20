import { Link, useNavigate } from "react-router-dom";
import { IoBook } from "react-icons/io5";
import { FaHeart, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const Navbar = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      fechCartCount();
    };

    // Fetch count on mount
    fechCartCount();

    // Listen for cart updates
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  const fechCartCount = async () => {
    try {
      const response = await axios.get(`${API}/get-cart`, {
        headers: { Authorization: `Bearer ${token} `, id: userId },
      });

      setCartCount(response.data.cart.length);

      // Store in localStorage
      localStorage.setItem("cartCount", response.data.cart.length);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("cartCount");
    navigate("/");
  };

  return (
    <>
      <nav className="flex justify-between p-4 shadow-md bg-white">
        {/* Logo */}
        <div>
          <Link to="/home">
            <IoBook className="text-emerald-600 text-4xl" />
          </Link>
        </div>

        {/* Navigation Links */}
        <div>
          <ul className="flex items-center space-x-6">
            <li>
              <Link to="/home" className="hover:text-emerald-600">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/favorites"
                className="hover:text-emerald-600 flex items-center"
              >
                <FaHeart className="mr-1 text-red-500" /> Favorites
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className="hover:text-emerald-600 flex items-center relative"
              >
                <FaShoppingCart className="mr-1 text-blue-500" /> Cart
                {cartCount > 0 && (
                  <span
                    className="bg-red-500 text-white text-xs font-bold px-2
                   py-1 rounded-full absolute -top-4 -right-4"
                  >
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>

            {token ? (
              <>
                <li>
                  <div
                    className="flex items-center space-x-2 cursor-pointer hover:text-emerald-600"
                    onClick={() => navigate("/profile")}
                  >
                    <FaUserCircle className="text-2xl text-gray-600" />
                    <span className="font-medium">Profile</span>
                  </div>
                </li>
                <li>
                  <button
                    onClick={handleSignOut}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  >
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/sign-in" className="hover:text-emerald-600">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link to="/sign-up">
                    <button className="bg-emerald-600 text-white px-4 py-2 rounded-full hover:bg-emerald-700 transition">
                      Sign Up
                    </button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      <hr className="border-t border-gray-300" />
    </>
  );
};

export default Navbar;
