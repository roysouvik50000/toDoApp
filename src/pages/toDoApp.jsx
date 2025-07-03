import "../App.css";
import AddToDoTaskModal from "../components/AddToDoTaskModal";
import ToDoTaskLists from "../components/TodoTaskLists";
import { modalHandelar } from "../store/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import todoIcon from "../assets/checklist.gif";
import { logoutUser, setUser , observeAuth } from "../store/authSlice";
import { useEffect, useState } from "react";
import Login from "./login";
function ToDoApp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user , isAuthenticated , loading } = useSelector((state) => state.auth);
  useEffect(()=>{
    dispatch(observeAuth());
  },[dispatch])
  

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
    console.log("User signed out");
    navigate(<Login/>)
  };

  return (
    <>
      {isAuthenticated ? (<div className="bg-linear-to-bl/srgb from-indigo-950 to-teal-950 min-h-screen pt-[150px] pb-6 px-3">
        <div className="bg-black shadow-xl/20 fixed top-0 left-0 right-0 h-[120px] z-10"></div>
        <div className="bg-linear-to-bl from-violet-300/100 to-fuchsia-300/100 rounded-2xl p-4 flex flex-col justify-center items-center gap-5 shadow-xl/20 fixed top-0.5 right-0.5 left-0.5 w-[100%] z-20">
          <div className="flex justify-center items-center gap-1.5">
            <img
              src={todoIcon}
              alt="icon"
              className="bg-none rounded-2xl inline"
              width={24}
            />
            <h1 className="text-center text-2xl font-black text-zinc-50 inline">
              To-Do-App
            </h1>
          </div>
          <button
            className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-800 outline-none w-40 cursor-pointer"
            onClick={() => dispatch(modalHandelar())}
          >
            Add Tasks
          </button>
          <div className="absolute right-5 top-5">
            <h1 className="text-center text-[16px]">
              {user && user.displayName}
            </h1>
            <p className="text-right font-mono text-[12px]">
              {user && user.email}
            </p>
            <button
              type="button"
              className="bg-blue-600 rounded-lg p-1.5 cursor-pointer float-end"
              onClick={(e) => handleLogout(e)}
            >
              Logout
            </button>
          </div>
        </div>
        <AddToDoTaskModal />
         <ToDoTaskLists />
      </div>) : (loading?<h1>Loading..</h1>:<div><Login/></div>)}
    </>
  );
}

export default ToDoApp;
