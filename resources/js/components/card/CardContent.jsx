import { wordLimit } from "../../utils/Utils";
import React, { useState } from "react";

const CardContent = ({ image, title, subtitle, possssss }) => {
  const [readMore, setReadMore] = useState(false);

  return (
    <div className="w-full bg-white/70 shadow-md hover-box-shadow rounded-lg flex group hover:scale-105 transition-all duration-300 ease-in-out">
      <div
        className="w-1/3 h-full rounded-lg bg-cover rounded-r-none bg-secondary-200 opacity-70 transition-all duration-300 ease-in-out group-hover:opacity-100 flex justify-center items-end"
        style={{
          backgroundImage: `url(${image})`,
        }}
      ></div>
      <div className="w-2/3 py-4 px-6">
        <h4 className="uppercase text-xl pb-2 font-bold text-primary-200">
          {title}
        </h4>
        <p className="pb-4">
          {readMore ? subtitle : wordLimit(subtitle, 100) + "..."}
        </p>
        <button
          className="uppercase py-2 px-4 text-xs rounded-full hover-box-shadow font-medium transition-all duration-300 text-white bg-primary-200 hover:bg-primary-200/70"
          onClick={() => setReadMore(!readMore)}
        >
          Read {readMore ? "Less" : "More"}
        </button>
      </div>
    </div>
  );
};

export default CardContent;
