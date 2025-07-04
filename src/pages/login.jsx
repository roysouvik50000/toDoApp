import { useNavigate } from "react-router";
import { useState } from "react";
import { loginUser } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import hide from "../assets/hide.png";
import view from "../assets/view.png";

export default function Login() {
  const [showPW, setShowPW] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handelShoePW = () => {
    setShowPW((curr) => !curr);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
    navigate("/toDoApp/toDoApp");
    console.log("User Logged in success");
  };

  return (
    <div className="bg-cyan-600 h-screen w-screen flex flex-col gap-6 items-center justify-center">
      <div className="bg-black/50 px-7 py-9 rounded-2xl text-white h-[420px] font-bold w-[280px]">
        <h1 className="text-center font-black text-white text-[36px]">
          To Do App
        </h1>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col justify-center gap-8"
        >
          <h1 className="text-center">Log In</h1>
          <div>
            <label>Email :- </label>
            <br />
            <input
              className="border-2 border-black relative w-48 outline-0"
              type="email"
              name="email"
              placeholder="Enter your Email.."
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password : -</label>
            <div className="border-2 border-black relative w-48">
              <input
                type={showPW ? "text" : "password"}
                placeholder="Enter password"
                className="outline-0"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={handelShoePW}
                className="absolute right-2 top-1 cursor-pointer"
              >
                {showPW ? (
                  <img src={hide} className="w-4 h-4" alt="i" />
                ) : (
                  <img src={view} className="w-4 h-4" alt="i" />
                )}
              </button>
            </div>
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
        <div className="flex justify-between mt-6">
          <p className="text-[12px] text-red-600">Don't have an Account ?</p>
          <p
            onClick={() => navigate("/toDoApp/signUp")}
            className="text-[12px] text-blue-200 underline cursor-pointer"
          >
            Sign Up
          </p>
        </div>
      </div>
    </div>
  );
}
