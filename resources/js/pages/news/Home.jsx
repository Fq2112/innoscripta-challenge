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

export default function Home() {
  const [updateLock] = useState("home");
  const { setLock, lock } = dataStore((state) => state);

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

  return loading || moreTime ? (
    <Preloader />
  ) : (
    <Extend>
      {/* hero */}
      <Hero />

      {/* content */}
      <main className="relative w-full text-slate-400">wwkkwkw</main>
    </Extend>
  );
}
