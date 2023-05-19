import React, { useEffect, useMemo, useState } from "react";
import dataStore from "../../store/dataStore";
import { titleScroller, wordLimit } from "../../utils/Utils";
import Extend from "../../components/layouts/Extend";
import EmptyState from "../../components/others/EmptyState";
import LoadingForm from "../../components/LoadingForm";
import { Link, useParams } from "react-router-dom";
import loadingStore from "../../store/loadingStore";
import { L_DATA } from "../../vars/loading";
import authStore from "../../store/authStore";
import Overlay1 from "../../components/overlays/Overlay1";
import CardContent from "../../components/card/CardContent";
import DefaultAction from "../../action/DefaultAction";
import { A_NEWS_FEEDS, A_NEWS_PREFERED_FEEDS } from "../../vars/api";
import { AUTH3_IMG } from "../../vars/assets";
import PageTitle from "../../components/layouts/partials/PageTitle";
import { setDateFormat } from "../../helpers/DateHelper";

export default function Feeds() {
  const [updateLock] = useState("feeds");
  const { getFeedsData } = DefaultAction();
  const { feedsData, setLock, lock } = dataStore((state) => state);

  const { code } = useParams();

  const { loading: getLoading } = loadingStore((state) => state);
  const loadingFeeds = useMemo(() => getLoading[L_DATA], [getLoading]);
  const { token } = authStore((state) => state);

  // init
  useEffect(() => {
    setLock(updateLock);
  }, []);

  useEffect(() => titleScroller("News Feeds"), []);

  useEffect(() => {
    getFeedsData(
      token && code ? A_NEWS_PREFERED_FEEDS : A_NEWS_FEEDS,
      { category: code },
      {},
      false
    );
  }, [token, code]);

  return (
    <Extend isSlate={true}>
      {/* page title */}
      <PageTitle
        title="News Feeds"
        links={[{ name: "Home", url: "/" }, { name: "News" }, { name: code }]}
        imageUrl="/images/page-title/news.jpg"
      />

      {/* feeds */}
      <main className="relative w-full text-slate-800">
        <section
          key={`${code}-cat`}
          className="relative w-full bg-slate-100 mb-28"
        >
          {/* overlay */}
          <Overlay1 />

          <div className="relative container mx-auto">
            {/* head title*/}
            <div className="pb-8 text-center">
              <h2 className="uppercase text-5xl font-['Helvetica'] font-bold pb-4">
                <span className="text-primary-200 uppercase">{code}</span> News
              </h2>
              <h4 className="w-fit mx-auto text-xl">
                Stay Informed and Empowered with the Latest <span className="capitalize">{code}</span> News
              </h4>
            </div>

            {/* content */}
            {loadingFeeds && <LoadingForm />}
            {feedsData[code] && feedsData[code].length ? (
              <div className="grid md:grid-cols-1 gap-6 py-4">
                {!loadingFeeds &&
                  feedsData[code].map((v) => (
                    <CardContent
                      key={`${v.id}-news`}
                      image={v.url_to_image ? v.url_to_image : AUTH3_IMG()}
                      title={v.title}
                      subtitle={v.description}
                      url={v.permalink}
                      date={setDateFormat({
                        date: v.published_at,
                        withTime: true,
                        withWeekDay: true,
                      })}
                      sourceName={v.source_name}
                      sourceUrl={v.source_url}
                    />
                  ))}
              </div>
            ) : (
              <EmptyState
                message={`There's no any ${code} News found!`}
                addClass={"text-center"}
                htmlFor="action-search"
                noBg={true}
              >
                <div className="flex justify-center mb-8">
                  <Link
                    to="/"
                    className="w-48 uppercase py-2 px-4 text-lg text-center rounded-full hover-box-shadow font-medium transition-all duration-300 hover:scale-x-105 text-white bg-primary-400 hover:bg-primary-400/70"
                  >
                    Search More
                  </Link>
                </div>
              </EmptyState>
            )}
          </div>
        </section>
      </main>
    </Extend>
  );
}
