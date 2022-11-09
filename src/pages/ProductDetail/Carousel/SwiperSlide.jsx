import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import theme from "../../../styles/theme";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";

const SwiperCarousel = props => {
  const { productImages } = props;
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        touchRatio={0}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
        loopFillGroupWithBlank={true}
        loop={true}
      >
        {productImages &&
          productImages.map(image => {
            return (
              <SwiperSlide>
                <img src={image.url} alt={`숙소사진${image.id}번`} />
              </SwiperSlide>
            );
          })}
      </Swiper>

      <Swiper
        style={{
          "--swiper-navigation-color": `${theme.brandColor}`,
        }}
        thumbs={{ swiper: thumbsSwiper }}
        spaceBetween={5}
        slidesPerView={4}
        freeMode={false}
        navigation={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
        loopFillGroupWithBlank={true}
        loop={true}
      >
        {productImages &&
          productImages.map(image => {
            return (
              <SwiperSlide>
                <img src={image.url} alt={`숙소사진2 :${image.id}번`} />
              </SwiperSlide>
            );
          })}
      </Swiper>
    </>
  );
};

export default SwiperCarousel;
