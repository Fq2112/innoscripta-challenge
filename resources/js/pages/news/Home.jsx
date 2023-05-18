import React, { useEffect, useMemo, useState } from "react";
import dataStore from "../../store/dataStore";
import { titleScroller } from "../../utils/Utils";
import Extend from "../../components/layouts/Extend";
import Hero from "../../components/hero/Hero";
import { useLocation, useNavigate } from "react-router-dom";
import loadingStore from "../../store/loadingStore";
import { L_CHECK } from "../../vars/loading";
import authStore from "../../store/authStore";
import paramsStore from "../../store/paramsStore";
import Preloader from "../../components/others/Preloader";
import Overlay1 from "../../components/overlays/Overlay1";
import CardContent from "../../components/card/CardContent";
import CardInfo from "../../components/card/CardInfo";
import DefaultAction from "../../action/DefaultAction";
import { A_NEWS_HERO } from "../../vars/api";

export default function Home() {
  const [updateLock] = useState("home");
  const { getData } = DefaultAction();
  const { data, setLock, lock } = dataStore((state) => state);

  const location = useLocation();
  const { pathname, search } = location;

  const navigate = useNavigate();

  const { loading: getLoading } = loadingStore((state) => state);
  const loading = useMemo(() => getLoading[L_CHECK], [getLoading]);

  const { token } = authStore((state) => state);
  const { setParams } = paramsStore((state) => state);

  const [moreTime, setMoreTime] = useState(true);

  // init
  useEffect(() => {
    setLock(updateLock);
  }, []);

  useEffect(() => titleScroller(), []);

  // params trigger
  useEffect(() => {
    if (search.includes("=")) setParams(searchParamsToObj(search));
  }, [search]);

  useEffect(() => {
    if (loading) {
      setMoreTime(true);
    }
  }, [loading]);

  useEffect(() => {
    let timeout;
    if (moreTime) {
      timeout = setTimeout(() => setMoreTime(false), 1000);
    }
    return () => clearTimeout(timeout);
  }, [moreTime]);

  useEffect(() => {
    if (!loading) {
      const check = pathname.includes("news");

      if (check && !token) navigate("/signin", { replace: true });

      if (!check && !token) navigate("/", { replace: true });
    }
  }, [loading, token, pathname]);

  useEffect(() => {
    getData(A_NEWS_HERO, {}, {}, false);
  }, []);

  return loading || moreTime ? (
    <Preloader />
  ) : (
    <Extend isSlate={true}>
      {/* hero */}
      <Hero data={data} />

      {/* content */}
      <main className="relative w-full text-slate-400">
        <section className="relative w-full bg-slate-100 pt-16 pb-20">
          {/* overlay */}
          <Overlay1 />

          <div className="relative container mx-auto">
            {/* head title*/}
            <div className="pb-8 text-center">
              <h2 className="uppercase text-5xl font-['Helvetica'] font-bold pb-4">
                quantity <span className="text-primary-200">surveying</span>
              </h2>
              <h4 className="w-fit mx-auto text-xl">
                by using our service, clients will save time and money, improve
                project quality, <br />
                and minimise risks associated with construction projects
              </h4>
            </div>

            {/* content */}
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-x-8 gap-y-6 items-center">
              <div className="col-span-3 w-full">
                <div className="grid md:grid-cols-2 gap-6 py-4">
                  {/* card */}
                  <div className="flex flex-col gap-y-6">
                    <CardContent
                      image="/images/surveyor-1.jpg"
                      title="Expertise"
                      subtitle="Quantity surveyors have extensive knowledge and experience in their field. They understand the construction industry and have a deep understanding of building materials, labour costs, and other factors that impact construction costs. By using a quantity surveying company, a company can benefit from this expertise and ensure that its project is delivered to the highest quality standards."
                    />
                    <CardContent
                      image="/images/surveyor-3.jpg"
                      title="Risk management"
                      subtitle="Quantity surveyors are skilled in risk management and can help companies identify and mitigate risks associated with construction projects. They can identify potential risks and develop strategies to minimise the impact of these risks on the project."
                    />
                  </div>
                  <div className="flex flex-col gap-y-6">
                    <CardContent
                      image="/images/surveyor-2.jpg"
                      title="Improved efficiency"
                      subtitle="Quantity surveying companies use specialised tools and software to streamline the cost estimating and management process. This can help improve the efficiency of the project, reduce delays, and ensure that the project is completed on time and within budget."
                    />
                    <CardContent
                      image="/images/surveyor-4.jpg"
                      title="Legal compliance"
                      subtitle="Quantity surveyors are also knowledgeable about legal and regulatory requirements related to construction projects. By using a quantity surveying company, a company can ensure that its project is compliant with all relevant laws and regulations."
                    />
                  </div>
                </div>
              </div>

              <div>
                <CardInfo />
              </div>
            </div>
          </div>
        </section>
      </main>
    </Extend>
  );
}
