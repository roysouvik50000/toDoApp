import { BrowserRouter, Route, Routes, HashRouter , Navigate , useNavigate } from "react-router";
import "./App.css";
import ToDoApp from "./pages/toDoApp";
import Login from "./pages/login";
import SignUp from "./pages/signUp";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { observeAuth } from "./store/authSlice";
import { Loader } from "./components/loading";


function App() {
    // const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  useEffect(() => {
    dispatch(observeAuth());
  }, []);

  if (loading) return <div className="min-h-screen flex justify-center items-center bg-linear-to-bl/srgb from-indigo-950 to-teal-950"><Loader/></div>

  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={user ? <ToDoApp /> : <Navigate to="/login" replace/>} />
          <Route path="/login" element={!user ? <Login /> :<Navigate to="/toDoApp" replace/>} />
          <Route path="/signUp" element={!user ? <SignUp /> : <Navigate to="/toDoApp" replace/>} />
          <Route path="/toDoApp" element={ user ? <ToDoApp /> : <Navigate to="/login" replace/>} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
