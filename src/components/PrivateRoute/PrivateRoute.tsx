import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  ...rest
}: any) => {
  return (
    <Route
      {...rest}
      render={(props: any) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Navigate to="/auth/sign-in" />
        )
      }
    />
  );
};

export default PrivateRoute;
