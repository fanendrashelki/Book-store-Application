import { useEffect, useState } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";

const API = import.meta.env.VITE_API_URL;

const ProfileDetail = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`${API}/get-user`, {
        headers: { Authorization: `Bearer ${token}`, id: userId },
      });
      console.log(response);

      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        {userData ? (
          <div className="flex flex-col items-center">
            <FaUserCircle className="text-gray-400 text-6xl mb-4" />
            <h1 className="text-2xl font-semibold">{userData.username}</h1>
            <p className="text-gray-600">{userData.email}</p>

            <div className="mt-6 space-y-2 w-full">
              <div className="flex justify-between text-gray-700">
                <span className="font-medium">Username:</span>
                <span>{userData.username}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span className="font-medium">Email:</span>
                <span>{userData.email}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span className="font-medium">Joined On:</span>
                <span>{new Date(userData.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            <button
              onClick={() => window.history.back()}
              className="mt-6 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
            >
              Go Back
            </button>
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading profile...</p>
        )}
      </div>
    </div>
  );
};

export default ProfileDetail;
