import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./RoomSwiper.css";

// import required modules
import { Pagination, Navigation } from "swiper";

const RoomSwiper = props => {
  const { roomImages } = props;

  return (
    <>
      <Swiper
        pagination={{
          type: "fraction",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper3"
      >
        {roomImages.map(({ room_id, image_url }, index) => {
          return (
            <SwiperSlide>
              <img src={image_url} alt={`${room_id}번룸 ${index}번 사진`} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default RoomSwiper;
