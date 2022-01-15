import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoadingToRedirect from "./loadingToRedirect";

const PrivateRoute = ({
  children /**component ben trong PrivareRoute */,
  ...rest /** extrac all props like path, exact */
}) => {
  const { isAuthenticated, user } = useAuth0();
  const isUser = isAuthenticated && user;
  // const isUser = true;
  return (
    <Route
      {...rest}
      render={() => {
        return isUser ? children : <Redirect to={"/login"} />;
        // return isUser ? children : <LoadingToRedirect />;
      }}
    ></Route>
  );
};
export default PrivateRoute;
