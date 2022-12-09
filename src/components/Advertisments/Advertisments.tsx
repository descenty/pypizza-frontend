import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./Advertisments.module.css";
import { useEffect, useState } from "react";

const Advertisments = () => {
  const [slidesPerView, setSlidesPerView] = useState<"auto" | number>(1);
  useEffect(() => {
    const interval = setInterval(() => {
      setSlidesPerView(
        window.innerWidth > 850 ? (window.innerWidth > 1300 ? 2 : 1.5) : 1
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  console.log(slidesPerView);
  return (
    <Swiper
      slidesPerView={slidesPerView}
      spaceBetween={20}
      loop={true}
      navigation={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay, Navigation]}
      className={styles.advertisments}
    >
      <SwiperSlide className={styles.slide}>
        <img src="coffee.webp" alt="" />
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <img src="snacks.webp" alt="" />
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <img src="rolls.webp" alt="" />
      </SwiperSlide>
    </Swiper>
    // <section className={styles.advertisments}>
    //   <img src="coffee.webp" alt="" />
    //   <img src="snacks.webp" alt="" />
    //   <img src="rolls.webp" alt="" />
    //   {/* <div>
    //     <img src="cupcake.png" alt="cupcake" />
    //     <div>
    //       <h3>Скидка 10% по промокоду</h3>
    //       <h1>МИРЭА</h1>
    //       <span>Акция действует до 25.12.2022</span>
    //     </div>
    //   </div>
    //   <div className={styles.orange}>
    //     <img src="burger.png" alt="burger" />
    //     <div>
    //       <h3>Big burgers</h3>
    //       <h1>50% OFF</h1>
    //       <span>Burgers</span>
    //     </div>
    //   </div> */}
    // </section>
  );
};

export default Advertisments;
