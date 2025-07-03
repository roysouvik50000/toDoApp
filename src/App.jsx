import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import ToDoApp from "./pages/toDoApp";
import Login from "./pages/login";
import SignUp from "./pages/signUp";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/login" element={<Login/>} />
          <Route path="/signUp" element={<SignUp/>} />
          <Route path="/toDoApp" element={<ToDoApp/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
