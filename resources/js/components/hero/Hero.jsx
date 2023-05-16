import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper";
import TabContent from "./TabContent";
import Overlay from "./Overlay";
import { FaSquare } from "react-icons/fa";
import { Link } from "react-router-dom";

const Hero = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const progressContent = useRef(null);
  const indexMarker = useRef(null);

  const onAutoplayTimeLeft = (s, time, progress) => {
    if (progressContent?.current?.style)
      progressContent.current.style.width = 100 * (1 - progress) + "%";
  };

  const slideChange = ({ activeIndex }) => {
    if (indexMarker?.current?.style)
      indexMarker.current.style.marginLeft = `${activeIndex * 25}%`;
  };

  const linkTo = (e) => {
    e.preventDefault();
    let id = e.target.getAttribute("href").toString();

    if (id.includes("/")) id = id.slice(1);

    // escape when not have #
    if (!id.includes("#")) return;

    document.querySelector(id).scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="relative top-[-101px] w-full h-full flex justify-center">
      <Swiper
        onSlideChange={slideChange}
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
          height: "100vh",
        }}
        rewind={true}
        spaceBetween={0}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Autoplay, FreeMode, Navigation, Thumbs]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper2"
      >
        <SwiperSlide>
          <Overlay src="/images/hero-slider/1.jpeg">
            <div className="flex flex-col gap-y-2 uppercase text-left pt-[10rem]">
              <h3 className="text-2xl font-semibold">Hello and Welcome to</h3>
              <h1 className="text-5xl font-extrabold tracking-wider text-primary-200">
                ssss
              </h1>
              <div className="bg-secondary-800/70 py-2 px-3 tracking-wide relative w-fit">
                <h2 className="w-full text-lg font-semibold">xxxx</h2>
              </div>
              <ul className="flex flex-col gap-y-2 pt-2 pb-6 font-light text-lg">
                <li className="flex gap-x-2 items-center hover:text-primary-200 transition-all ease-in-out duration-300 hover:translate-x-1">
                  <FaSquare className="w-3 h-3 flex-none text-primary-200 rotate-45" />
                  Roof Plumbing Estimating
                </li>
                <li className="flex gap-x-2 items-center hover:text-primary-200 transition-all ease-in-out duration-300 hover:translate-x-1">
                  <FaSquare className="w-3 h-3 flex-none text-primary-200 rotate-45" />
                  Plumbing Estimating
                </li>
              </ul>
              <Link
                to="#about"
                onClick={linkTo}
                className="w-48 uppercase p-3 text-lg text-center font-bold rounded-full hover-box-shadow transition-all ease-in-out duration-300 hover:scale-x-105 text-white bg-primary-200 hover:bg-primary-200/70"
              >
                Learn More
              </Link>
            </div>
          </Overlay>
        </SwiperSlide>

        <SwiperSlide>
          <Overlay src="/images/hero-slider/2.jpeg">
            <div className="flex flex-col gap-y-2 uppercase text-left pt-[10rem]">
              <h3 className="text-2xl font-semibold">
                Do you need a Full-time Estimator?
              </h3>
              <h1 className="text-5xl font-extrabold tracking-wider">
                <span className="text-primary-200">xxxxxx</span> is here to:
              </h1>
              <ul className="flex flex-col gap-y-2 pt-2 pb-6 font-light text-lg">
                <li className="flex gap-x-2 items-center hover:text-primary-200 transition-all ease-in-out duration-300 hover:translate-x-1">
                  <FaSquare className="w-3 h-3 flex-none text-primary-200 rotate-45" />
                  support Start-up and medium-sized construction and plumbing
                  companies that need a full-time estimator
                </li>
                <li className="flex gap-x-2 items-center hover:text-primary-200 transition-all ease-in-out duration-300 hover:translate-x-1">
                  <FaSquare className="w-3 h-3 flex-none text-primary-200 rotate-45" />
                  provide cost-effective and efficient estimating solutions
                </li>
                <li className="flex gap-x-2 items-center hover:text-primary-200 transition-all ease-in-out duration-300 hover:translate-x-1">
                  <FaSquare className="w-3 h-3 flex-none text-primary-200 rotate-45" />
                  Allowing you to maximize profitability while we're handling
                  the estimation process
                </li>
              </ul>
              <Link
                to="#services"
                onClick={linkTo}
                className="w-48 uppercase p-3 text-lg text-center font-bold rounded-full hover-box-shadow transition-all ease-in-out duration-300 hover:scale-x-105 text-white bg-primary-200 hover:bg-primary-200/70"
              >
                Learn More
              </Link>
            </div>
          </Overlay>
        </SwiperSlide>

        <SwiperSlide>
          <Overlay src="/images/hero-slider/3.jpeg">
            <div className="flex flex-col gap-y-2 uppercase text-left pt-[10rem]">
              <h3 className="text-2xl font-semibold">
                Do you feel frustrated with time management?
              </h3>
              <h1 className="text-5xl font-extrabold tracking-wider">
                <span className="text-primary-200">zczxczxc</span> also here
                to:
              </h1>
              <ul className="flex flex-col gap-y-2 pt-2 pb-6 font-light text-lg">
                <li className="flex gap-x-2 items-center hover:text-primary-200 transition-all ease-in-out duration-300 hover:translate-x-1">
                  <FaSquare className="w-3 h-3 flex-none text-primary-200 rotate-45" />
                  support Start-up businesses that struggling to balancing time
                  between quoting jobs and managing them
                </li>
                <li className="flex gap-x-2 items-center hover:text-primary-200 transition-all ease-in-out duration-300 hover:translate-x-1">
                  <FaSquare className="w-3 h-3 flex-none text-primary-200 rotate-45" />
                  provide a solution that alleviate your frustration and
                  streamline your workflow
                </li>
                <li className="flex gap-x-2 items-center hover:text-primary-200 transition-all ease-in-out duration-300 hover:translate-x-1">
                  <FaSquare className="w-3 h-3 flex-none text-primary-200 rotate-45" />
                  Allowing you to focus on what you do the best for growing your
                  business
                </li>
              </ul>
              <Link
                to="#services"
                onClick={linkTo}
                className="w-48 uppercase p-3 text-lg text-center font-bold rounded-full hover-box-shadow transition-all ease-in-out duration-300 hover:scale-x-105 text-white bg-primary-200 hover:bg-primary-200/70"
              >
                Learn More
              </Link>
            </div>
          </Overlay>
        </SwiperSlide>

        <SwiperSlide>
          <Overlay src="/images/hero-slider/4.jpeg" flip={true}>
            <div className="flex flex-col gap-y-2 uppercase text-left pt-[10rem]">
              <h3 className="text-2xl font-semibold">
                Do you want to scale up your business?
              </h3>
              <h1 className="text-5xl font-extrabold tracking-wider">
                <span className="text-primary-200">zxczxczxc</span> is the
                answer!
              </h1>
              <ul className="flex flex-col gap-y-2 pt-2 pb-6 font-light text-lg">
                <li className="flex gap-x-2 items-center hover:text-primary-200 transition-all ease-in-out duration-300 hover:translate-x-1">
                  <FaSquare className="w-3 h-3 flex-none text-primary-200 rotate-45" />
                  We provide comprehensive solutions that will bridging the gap
                  between limited knowledge of technology and proper management
                  processes
                </li>
                <li className="flex gap-x-2 items-center hover:text-primary-200 transition-all ease-in-out duration-300 hover:translate-x-1">
                  <FaSquare className="w-3 h-3 flex-none text-primary-200 rotate-45" />
                  We can also provide you with the necessary guidance,
                  expertise, and resources to navigate the challenges of
                  business growth, optimize your operations, and leverage
                  technology to streamline your processes and increase your
                  bottom line
                </li>
                <li className="flex gap-x-2 items-center hover:text-primary-200 transition-all ease-in-out duration-300 hover:translate-x-1">
                  <FaSquare className="w-3 h-3 flex-none text-primary-200 rotate-45" />
                  Allowing you to scale up your Start-up business and become
                  more profitable
                </li>
              </ul>
              <Link
                to="#surveyors"
                onClick={linkTo}
                className="w-48 uppercase p-3 text-lg text-center font-bold rounded-full hover-box-shadow transition-all ease-in-out duration-300 hover:scale-x-105 text-white bg-primary-200 hover:bg-primary-200/70"
              >
                Learn More
              </Link>
            </div>
          </Overlay>
        </SwiperSlide>

        {/* progress line top*/}
        <div
          ref={progressContent}
          className="absolute top-0 z-[1] w-1/2 h-1 rounded-xl bg-primary-200/40"
        ></div>
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="container !mx-auto mySwiper"
      >
        <SwiperSlide>
          <TabContent
            number={1}
            title={"Featured Services"}
            subtitle={"Expert Estimator"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <TabContent
            number={2}
            title={"Lack of Resources"}
            subtitle={"Full-time Estimator"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <TabContent
            number={3}
            title={"Frustrate of Managing Time"}
            subtitle={"Quoting & Managing Jobs"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <TabContent
            number={4}
            title={"Scaling Up Business"}
            subtitle={"Become More Profitable"}
          />
        </SwiperSlide>

        {/* current mark line*/}
        <div
          slot="container-start"
          className="relative w-full h-1.5 bg-primary-200/40 rounded-full mb-2"
        >
          <div
            ref={indexMarker}
            className="bg-primary-200 relative w-1/4 h-1.5 rounded-full transition-all duration-500 ease-in-out"
          ></div>
        </div>
      </Swiper>
    </div>
  );
};

export default Hero;
