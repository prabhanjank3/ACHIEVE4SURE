import React, { lazy, Suspense } from "react";
import {render} from "react-dom";
import "./assets/css/App.css";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/theme";
import { AuthProvider } from "./auth-context/auth.context";
import { ProtectedRoute } from "./layouts/protected.route.js";
import {Provider} from 'react-redux';
import store from './redux/store';
// React-Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from './components/helpers/loader';

const AdminLayout = lazy(() => import("./layouts/admin"));
const AuthLayout = lazy(() => import("./layouts/auth"));

let user = localStorage.getItem("user");
user = JSON.parse(user);

render(
  <Suspense fallback={<></>}>
  <ChakraProvider theme={theme}>
    <AuthProvider userData={user}>
    <React.StrictMode>
      <HashRouter>
        <Provider store={store}>
        <ToastContainer
        position="bottom-right"
        autoClose="2000"
        theme="colored"
      />
        <Switch>
          <Route path={`/auth`} component={AuthLayout} />
          <ProtectedRoute path={`/admin`} component={AdminLayout} />
          <Redirect from='/' to='/admin/dashboards' />
        </Switch>
        <Loader />
        </Provider>
      </HashRouter>
    </React.StrictMode>
    </AuthProvider>
  </ChakraProvider>
  </Suspense>
  ,
  document.getElementById("root")
);
