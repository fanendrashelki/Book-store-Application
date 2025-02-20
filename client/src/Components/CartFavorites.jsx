import React from "react";
import { FaTrash } from "react-icons/fa";
const CartFavorites = ({ book, handleRemove }) => {
  return (
    <div key={book._id} className="border p-4 rounded-lg shadow-lg bg-white">
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

      <div className="flex justify-between items-center mt-4">
        <button
          className="bg-red-500 text-white px-3 py-1 rounded flex items-center hover:bg-red-600"
          onClick={() => handleRemove(book._id)}
        >
          <FaTrash className="mr-2" /> Remove
        </button>
      </div>
    </div>
  );
};

export default CartFavorites;
