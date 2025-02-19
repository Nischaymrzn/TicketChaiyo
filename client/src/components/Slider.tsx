import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

interface SliderImage {
  src: string;
  movie: string;
}

// Slider images
const images: SliderImage[] = [
  {
    src: "https://wallpapers.com/images/featured/spider-man-no-way-home-background-mcg8r3eg84os1zue.jpg",
    movie: "Spider Man : No Way Home",
  },
  {
    src: "https://thestreamable.com/media/pages/news/breaking-avatar-the-way-of-water-to-debut-on-max-and-disney-plus-next-month/962e3c3408-1684166914/avatar-hbo-max-disney-plus.jpeg",
    movie: "Avatar: The Way of Water",
  },
];

const Slider: React.FC = () => {
    return (
        <div className="relative w-full h-[725px] px-4 pt-3"> {/* Container for slider */}
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="absolute top-0 left-0 w-full h-full z-0"  // Positioned absolutely behind navbar
          >
            {images.map((image) => (
              <SwiperSlide className="w-full h-72" key={image.movie}>
                <img
                  src={image.src}
                  alt={image.movie}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <style>{`
            .swiper-button-next {
                background-color: rgba(0, 0, 0, 0.5);
                color: white;
                width: 40px;
                height: 40px;
                border-radius: 50%;
            }
    
            .swiper-button-prev {
                background-color: rgba(0, 0, 0, 0.5);
                color: white;
                width: 40px;
                height: 40px;
                border-radius: 50%;
            }
    
            .swiper-button-next::after,
            .swiper-button-prev::after {
                font-size: 20px;
                font-weight: bold;
            }`}
           </style>
        </div>

  );
};

export default Slider;