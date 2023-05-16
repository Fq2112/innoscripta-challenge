import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import classNames from "classnames";
import SidebarLinkGroup from "./SidebarLinkGroup";
import menuData from "../vars/menuData";
import { LOGO_WHITE_IMG } from "../vars/assets";
import authStore from "../store/authStore";
import { objIncludes } from "../helpers/ObjHelper";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);
  const overlay = useRef(null);

  const [getMenu] = useState(menuData);

  //   get authorized role list
  const { abilities } = authStore((state) => state);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? true : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      // if (!sidebar.current || !trigger.current) return;

      // if (
      //   !sidebarOpen ||
      //   sidebar.current.contains(target) ||
      //   trigger.current.contains(target)
      // )
      //   return;

      if (
        target.classList.contains("justify-between") ||
        target.closest(".justify-between")
      )
        return;

      // close when click backdrop overlay
      if (
        overlay?.current?.contains(target) ||
        target.tagName == "A" ||
        target.closest("a")
      )
        setSidebarOpen(false);
    };

    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [sidebarExpanded, sidebarOpen]);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        ref={overlay}
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto w-64
                lg:w-[5.5rem] lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 dark:bg-navy-750 p-4 transition-all duration-200 ease-in-out ${
                  sidebarOpen ? "translate-x-0" : "-translate-x-64"
                }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <NavLink end to="/" className="block">
            <img src={LOGO_WHITE_IMG()} alt="logo" className="w-full mt-2" />
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {getMenu
            ?.filter(
              (e) => !e.can_access_by || objIncludes(abilities, e.can_access_by)
            )
            .map((e, i) => (
              <div key={i + "grop"}>
                <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
                  <span
                    className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                    aria-hidden="true"
                  >
                    •••
                  </span>
                  <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                    {e.group}
                  </span>
                </h3>

                <ul className="mt-3">
                  {e?.list
                    ?.filter(
                      (e) =>
                        !e.can_access_by ||
                        objIncludes(abilities, e.can_access_by)
                    )
                    .map((e, i) => {
                      if (!e.list)
                        return (
                          <li
                            key={i + "menu"}
                            className={classNames(
                              "px-3 py-2 rounded-sm mb-0.5 last:mb-0",
                              {
                                "bg-slate-900":
                                  e.path == "/"
                                    ? pathname == "/"
                                    : pathname.includes(e.path),
                              }
                            )}
                          >
                            <NavLink
                              end
                              to={e.path}
                              className={classNames(
                                "block text-slate-200 hover:text-white truncate transition duration-150",
                                {
                                  "hover:text-slate-200":
                                    e.path == "/"
                                      ? pathname == "/"
                                      : pathname.includes(e.path),
                                }
                              )}
                            >
                              <div className="flex items-center">
                                <e.icon
                                  className={classNames(
                                    "shrink-0 h-6 w-6 text-slate-400 group-hover:text-primary-50",
                                    {
                                      "text-primary-50":
                                        e.path == "/"
                                          ? pathname == "/"
                                          : pathname.includes(e.path),
                                    }
                                  )}
                                />
                                <span className="capitalize text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  {e.name}
                                </span>
                              </div>
                            </NavLink>
                          </li>
                        );

                      return (
                        <SidebarLinkGroup
                          key={i + "menu"}
                          activecondition={pathname.includes(e.path)}
                        >
                          {(handleClick, open) => {
                            return (
                              <React.Fragment>
                                <a
                                  href="#0"
                                  className={classNames(
                                    "block text-slate-200 hover:text-white truncate transition duration-150",
                                    {
                                      "hover:text-slate-200": pathname.includes(
                                        e.path
                                      ),
                                    }
                                  )}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    sidebarExpanded
                                      ? handleClick()
                                      : setSidebarExpanded(true);
                                  }}
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                      <e.icon
                                        className={classNames(
                                          "shrink-0 h-6 w-6 text-slate-400 group-hover:text-primary-50",
                                          {
                                            "text-primary-50":
                                              pathname.includes(e.path),
                                          }
                                        )}
                                      />
                                      <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                        {e.name}
                                      </span>
                                    </div>
                                    {/* Icon */}
                                    <div className="flex shrink-0 ml-2">
                                      <svg
                                        className={classNames(
                                          "w-3 h-3 shrink-0 ml-1 fill-current text-slate-400",
                                          {
                                            "transform rotate-180": open,
                                          }
                                        )}
                                        viewBox="0 0 12 12"
                                      >
                                        <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                                      </svg>
                                    </div>
                                  </div>
                                </a>
                                <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                                  <ul
                                    className={classNames("pl-9 mt-1", {
                                      hidden: !open,
                                    })}
                                  >
                                    {e?.list
                                      ?.filter(
                                        (e) =>
                                          !e.can_access_by ||
                                          objIncludes(
                                            abilities,
                                            e.can_access_by
                                          )
                                      )
                                      .map((e, i) => (
                                        <li
                                          key={i + "subsub"}
                                          className="mb-1 last:mb-0"
                                        >
                                          <NavLink
                                            end
                                            to={e.path}
                                            className={({ isActive }) =>
                                              classNames(
                                                "block text-slate-400 hover:text-slate-200 transition duration-150 truncate",
                                                {
                                                  "!text-primary-50": isActive,
                                                }
                                              )
                                            }
                                          >
                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                              {e.name}
                                            </span>
                                          </NavLink>
                                        </li>
                                      ))}
                                  </ul>
                                </div>
                              </React.Fragment>
                            );
                          }}
                        </SidebarLinkGroup>
                      );
                    })}
                </ul>
              </div>
            ))}
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg
                className="w-6 h-6 fill-current sidebar-expanded:rotate-180"
                viewBox="0 0 24 24"
              >
                <path
                  className="text-slate-400"
                  d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
