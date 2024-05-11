import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "store";
import InitialPage from "pages/InitialPage";
import MainPage from "pages/MainPage";
import NotFoundPage from "pages/NotFoundPage";
import Login from "components/Login";
import Register from "components/Register";

const App = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" Component={InitialPage}>
              <Route index Component={Login} />
              <Route path="/register" Component={Register} />
            </Route>
            <Route path="/main" Component={MainPage}>
              {/* <Route index Component={MainPage} /> */}
            </Route>
            <Route path="*" Component={NotFoundPage} />
          </Routes>
        </Router>
        <ToastContainer />
      </Provider>
    </div>
  );
};

export default App;
