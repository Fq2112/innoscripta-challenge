import React from "react";
import { Route, Routes as RouteDom } from "react-router-dom";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import PreventMiddleware from "../middlewares/PreventMiddleware";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import Signin from "../pages/auth/Signin";
import NotFound from "../action/alerts/NotFound";
import { W_HOME, W_FORGOT, W_RESET, W_SIGNIN, W_S_ACCOUNT } from "../vars/web";
import AbilityMiddleware from "../middlewares/AbilityMiddleware";
import { ROOT_ABILITY, USER_ABILITY } from "../vars/auth";
import Home from "../pages/news/Home";
import AccountSettings from "../pages/settings/AccountSettings";

function Spa() {
  return (
    <RouteDom>
      <Route path={W_HOME} element={<Home />} />

      <Route element={<AuthMiddleware />}>
        <Route element={<PreventMiddleware />}>
          <Route path={W_FORGOT} element={<ForgotPassword />} />
          <Route path={W_RESET} element={<ResetPassword />} />
          {[
            {
              path: W_SIGNIN,
              view: Signin,
            },
          ].map((e, i) => (
            <Route key={`${i}route`} path={e.path} element={<e.view />} />
          ))}

          {/* main */}

          {/* SETTINGS */}
          <Route path={W_S_ACCOUNT} element={<AccountSettings />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    </RouteDom>
  );
}

export default Spa;
