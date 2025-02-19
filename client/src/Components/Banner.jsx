import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner_1 from "../assets/banner-a.jpg";
import banner_2 from "../assets/banner-b.jpg";
import banner_3 from "../assets/banner-c.jpg";

const Banner = () => {
  return (
    <Carousel
      autoPlay
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      swipeable={true}
      emulateTouch={true}
    >
      <div>
        <img
          src={banner_1}
          alt="Slide 1"
          style={{ width: "100%", height: "300px", objectFit: "cover" }}
        />
      </div>
      <div>
        <img
          src={banner_2}
          alt="Slide 2"
          style={{ width: "100%", height: "300px", objectFit: "cover" }}
        />
      </div>
      <div>
        <img
          src={banner_3}
          alt="Slide 3"
          style={{ width: "100%", height: "300px", objectFit: "cover" }}
        />
      </div>
    </Carousel>
  );
};

export default Banner;
