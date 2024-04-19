import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confPassword: "",
  });
  const navigate = useNavigate()

  function changeHandler(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  async function submitHandler(event) {
    event.preventDefault();
    if (formData.password != formData.confPassword) {
      toast.error("Passwords don't match");
      return;
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("Form submitted successfully");
        navigate("/roomJoin")
        toast.success("Account Created");
        setFormData({
          username: "",
          email: "",
          password: "",
          confPassword: "",
        });
      } else {
        toast.error("Form submission failed");
        console.error("Form submission failed");
      }
    } catch (error) {
      toast.error("Error submitting form");
      console.error("Error submitting form:", error);
    }
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-r from-purple-500 to-pink-300">
      <div className="w-96 h-4/5 bg-rose-100 rounded-2xl flex flex-col items-center justify-evenly">
        <h1 className="text-2xl font-bold tracking-tighter">
          Welcome to CodeHub!
        </h1>

        <form onSubmit={submitHandler} className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-1">
            <label htmlFor="username" className="font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="rounded-full pl-3 py-2 focus:outline-double"
              placeholder="Create your username"
              name="username"
              onChange={changeHandler}
              value={formData.username}
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <label htmlFor="email" className="font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="rounded-full pl-3 py-2 focus:outline-double"
              placeholder="Enter your email"
              name="email"
              onChange={changeHandler}
              value={formData.email}
            />
          </div>
          <div className="flex flex-col gap-y-1 relative">
            <label htmlFor="password" className="font-medium">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="rounded-full pl-3 py-2 focus:outline-double"
              placeholder="Create your password"
              name="password"
              onChange={changeHandler}
              value={formData.password}
            />
            <span
              onClick={() => {
                setShowPassword((prev) => {
                  setShowPassword(!prev);
                });
              }}
              className="absolute top-9 right-3 cursor-pointer"
            >
              {showPassword ? (
                <IoEye fontSize={23} />
              ) : (
                <IoMdEyeOff fontSize={23} />
              )}
            </span>
          </div>
          <div className="flex flex-col gap-y-1 relative">
            <label htmlFor="confPassword" className="font-medium">
              Confirm Password
            </label>
            <input
              type={showConfPassword ? "text" : "password"}
              id="confPassword"
              className="rounded-full pl-3 py-2 focus:outline-double"
              placeholder="Confirm Password"
              name="confPassword"
              onChange={changeHandler}
              value={formData.confPassword}
            />
            <span
              onClick={() => {
                setShowConfPassword((prev) => {
                  setShowConfPassword(!prev);
                });
              }}
              className="absolute top-9 right-3 cursor-pointer"
            >
              {showConfPassword ? (
                <IoEye fontSize={23} />
              ) : (
                <IoMdEyeOff fontSize={23} />
              )}
            </span>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white mt-4 rounded-full py-2"
          >
            Sign up
          </button>
          <div className="flex gap-x-3">
            <p>Already have an account?</p>
            <Link to="/login" className="text-blue-500 hover:text-blue-700">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
