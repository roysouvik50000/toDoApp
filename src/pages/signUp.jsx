import { useState } from "react";
import { useNavigate } from "react-router";
import { signupUser } from "../store/authSlice";
import { useDispatch } from "react-redux";
import hide from "../assets/hide.png";
import view from "../assets/view.png";

export default function SignUp() {
  const [showPW, setShowPW] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handelShoePW = () => {
    setShowPW((curr) => !curr);
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      dispatch(signupUser({ name, email, password }));
      navigate("/toDoApp/login");
      console.log("signUp Sucess");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="bg-cyan-600 h-screen w-screen flex items-center justify-center">
      <div className="bg-black/50 px-7 py-9 rounded-2xl text-white font-bold">
        <h1 className="text-center font-black text-white text-[36px]">
          To Do App
        </h1>
        <form
          onSubmit={handleRegister}
          className="flex flex-col justify-center gap-8"
        >
          <h1 className="text-center">Sign Up</h1>
          <div>
            <label>Name :- </label>
            <br />
            <input
              className="border-2 border-black relative w-48 outline-0"
              type="text"
              name="name"
              placeholder="Enter your Name.."
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
                className="absolute right-2 top-1"
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
          >
            Sign Up
          </button>
        </form>
        <div className="flex gap-20 mt-3">
          <p className="text-[14px] text-red-600">Already user ?</p>
          <p
            className="text-[14px] text-blue-200 underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </p>
        </div>
      </div>
    </div>
  );
}
