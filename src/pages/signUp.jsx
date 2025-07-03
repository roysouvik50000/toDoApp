import { useState } from "react";
import { useNavigate } from "react-router";
import { signupUser } from "../store/authSlice";
import { useDispatch } from "react-redux";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      dispatch(signupUser({name, email, password }));
      navigate("/login");
      console.log("signUp Sucess");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="bg-cyan-600 h-screen w-screen flex items-center justify-center">
      <div className="bg-black/50 px-7 py-9 rounded-2xl text-white font-bold">
        <form
          onSubmit={handleRegister}
          className="flex flex-col justify-center gap-8"
        >
          <h1 className="text-center">Registration</h1>
          <div>
            <label>Name :- </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your Name.."
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
          >
            Sign Up
          </button>
        </form>
        <p
          onClick={() => navigate("/login")}
          className="text-right mt-5 font-mono underline text-red-600 cursor-pointer"
        >
          Login
        </p>
      </div>
    </div>
  );
}
