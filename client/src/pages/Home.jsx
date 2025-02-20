import AllBooks from "../Components/AllBooks";
import Banner from "../Components/Banner";
import BookCard from "../Components/BookCard";

const Home = () => {
  return (
    <>
      <Banner />
      <div className=" m-10">
        <h1 className="text-2xl font-bold">Recently Added Books</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <BookCard />
        </div>
      </div>
      <div className=" m-10">
        <h1 className="text-2xl font-bold">All Books</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <AllBooks />
        </div>
      </div>
    </>
  );
};

export default Home;
