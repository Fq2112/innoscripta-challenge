const CardInfo = () => {
  return (
    <div className="relative min-h-[220px] w-full mt-4 hover-box-shadow bg-secondary-400/70 rounded-xl text-white py-4 px-6 scale-105 transition-all duration-300 ease-in-out">
      <div className="w-full relative">
        {/* title */}
        <div className="absolute w-full left-[-24px] top-[-48px]">
          <img
            src="/images/people-2.png"
            width={100}
            height={48}
            className="w-1/2 ml-8"
            alt=""
          />
          <div className="uppercase text-lg w-full rounded-r-xl py-2 pl-6 pr-3 bg-primary-400">
            Cost management
          </div>
        </div>

        {/* content */}
        <div className="pt-[6.5rem] pb-2.5">
          <p className="pb-4">
            Quantity surveyors specialise in cost management and have the
            expertise to estimate and manage project costs accurately.
          </p>
          <p>
            By using a quantity surveying company, a company can ensure that
            costs are properly managed, minimising the risk of cost overruns and
            maximising the return on investment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardInfo;
