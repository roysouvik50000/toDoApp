import { BrowserRouter, Route, Routes , HashRouter } from "react-router";
import "./App.css";
import ToDoApp from "./pages/toDoApp";
import Login from "./pages/login";
import SignUp from "./pages/signUp";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { observeAuth } from "./store/authSlice";

function App() {
  const user = useSelector((state) => state.auth.user);
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={user ? <ToDoApp /> : <Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/toDoApp" element={<ToDoApp />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
