import { BrowserRouter, Route, Routes } from "react-router";
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
      <BrowserRouter>
        <Routes>
          <Route path="/toDoApp/" element={user ? <ToDoApp /> : <Login />} />
          <Route path="/toDoApp/login" element={<Login />} />
          <Route path="/toDoApp/signUp" element={<SignUp />} />
          <Route path="/toDoApp/toDoApp" element={<ToDoApp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
