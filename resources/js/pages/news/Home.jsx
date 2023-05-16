import React, { useEffect, useState } from "react";
import dataStore from "../../store/dataStore";
import { titleScroller } from "../../utils/Utils";
import { M_HOME } from "../../vars/menuData";
import Extend from "../../components/layouts/Extend";
import Hero from "../../components/hero/Hero";

export default function Home() {
  const [updateLock] = useState("home");
  const { setLock, lock } = dataStore((state) => state);

  // init
  useEffect(() => {
    setLock(updateLock);
  }, []);

  useEffect(() => titleScroller(), []);

  return (
    <Extend menu={M_HOME}>
      {/* hero */}
      <Hero />

      {/* content */}
      <main className="relative w-full text-slate-400">wwkkwkw</main>
    </Extend>
  );
}
