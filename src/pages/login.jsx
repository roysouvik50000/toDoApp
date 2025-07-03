import { useNavigate } from "react-router";
import { useState } from "react";
import { loginUser } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
    user && navigate("/toDoApp");
    console.log("User Logged in success");
  };

  return (
    <div className="bg-cyan-600 h-screen w-screen flex flex-col gap-6 items-center justify-center">
      <h1 className="text-center font-black text-white" >To Do App</h1>
      <div className="bg-black/50 px-7 py-9 rounded-2xl text-white font-bold w-screen sm:w-[420px]">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col justify-center gap-8"
        >
          <h1 className="text-center">Log In</h1>
          <div>
            <label>Email :- </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your Email.."
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Passward :- </label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password..."
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="mx-auto cursor-pointer w-52 p-2 rounded-xl bg-blue-700"
            onClick={(e) => {
              ` ${handleLogin(e)}
             `;
            }}
          >
            Log In
          </button>
        </form>
        <p
          className="text-right mt-5 font-mono underline text-red-600 cursor-pointer"
          onClick={() => navigate("/signUp")}
        >
          Sign Up
        </p>
      </div>
    </div>
  );
}
