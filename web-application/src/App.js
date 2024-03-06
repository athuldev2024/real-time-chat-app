import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "pages/LoginPage";
import ProfilePage from "pages/ProfilePage";
import MainPage from "pages/MainPage";
import NotFoundPage from "pages/NotFoundPage";
import { Login, Register } from "components/LoginRegister";
import { Provider } from "react-redux";
import store from "store";
import { ToastContainer } from "react-toastify";
import COLORS from "constants/color";

function App() {
  return (
    <div
      className="App"
      style={{
        backgroundColor: COLORS.mainBgColor,
      }}
    >
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" Component={LoginPage}>
              <Route index Component={Login} />
              <Route path="/register" Component={Register} />
            </Route>

            <Route path="/profile" Component={ProfilePage}>
              <Route index Component={Register} />
            </Route>

            <Route path="/main" Component={MainPage}>
              <Route index Component={MainPage} />
              <Route path="/main/:id" Component={MainPage} />
              <Route path="/main/create" Component={MainPage} />
            </Route>

            <Route path="*" Component={NotFoundPage} />
          </Routes>
        </Router>
      </Provider>
      <ToastContainer />
    </div>
  );
}

export default App;
