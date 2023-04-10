import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound/NotFound";
import { privateRoutes, publicRoutes } from "./Routes";
import { useSelector } from "react-redux";
import { AuthState } from "./types/user.js";

function getToken() {
  return localStorage.getItem("Authorization");
}

export const AppRouter = () => {
  const { isAuthenticated } = useSelector((state: AuthState) => state.auth);
  const [isAuth, setIsAuth] = useState(isAuthenticated);
  useEffect(() => {
    getToken() && setIsAuth(true);
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
