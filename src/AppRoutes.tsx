import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound/NotFound";
import { privateRoutes, publicRoutes } from "./Routes";
import * as cookie from "cookie";
import { useSelector } from "react-redux";
import { AuthState } from "./types/user.js";

export const AppRouter = () => {
  const { isAuthenticated } = useSelector((state: AuthState) => state.auth);
  const [isAuth, setIsAuth] = useState(isAuthenticated);
  useEffect(() => {
    const cookies = cookie.parse(document.cookie);
    const accessToken = cookies["Authorization"];
    if (accessToken) setIsAuth(true);
  }, [isAuthenticated]);
  return (
    <Routes>
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      {isAuth &&
        privateRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      <Route key={"*"} path={"*"} element={<NotFound />} />
    </Routes>
  );
};
