import React from "react";

const BookCard = () => {
  return (
    <div className="relative bg-white  rounded-xl p-4 mx-2 w-64 group hover:drop-shadow-lg transition-all ">
      <div className="relative">
        <img
          src="https://m.media-amazon.com/images/I/71C29P7kn2L._SL1500_.jpg"
          alt=""
          className="w-full h-72 object-cover rounded-lg"
        />
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition ">
            ❤️
          </button>
        </div>
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded-lg shadow-md flex items-center">
          ⭐ rating (4)
        </div>
      </div>
      <h2 className="text-green-600 font-semibold text-md text-center mt-2 ">
        title
      </h2>
      <p className="text-gray-500 text-sm text-center">author</p>
      <p className="text-lg font-bold text-green-600 text-center">$price</p>
      <button className="text-md opacity-0 group-hover:opacity-100 mt-3 w-full bg-green-600 text-white py-2 rounded-full flex items-center justify-center gap-2 hover:bg-green-700 transition-opacity">
        + Add To Cart
      </button>
    </div>
  );
};

export default BookCard;
