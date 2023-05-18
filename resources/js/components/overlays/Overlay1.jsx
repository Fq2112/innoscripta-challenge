import classNames from "classnames";

const Overlay1 = ({ size = null, position = null, flip = false }) => {
  return (
    <div
      className={classNames(
        "absolute inset-0 bg-ov-2 w-full h-full bg-no-repeat",
        {
          "bg-cover": size == "cover",
          "bg-contain": size == "contain",
          "bg-center": position == "center",
          "scale-x-[-1]": flip,
        }
      )}
    ></div>
  );
};

export default Overlay1;
