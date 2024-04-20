import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useUserContext } from "../../context/user/UserContext";
import {useForm} from "react-hook-form"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  const { setItem } = useLocalStorage()
  const { setUserData } = useUserContext()

  const loginSchema = z.object({
    email:z.string({
      invalid_type_error:"Invalid email is provided",
      required_error:"Email is required"
    }).email(),
    password: z.string({
      required_error:"Password is required",
      invalid_type_error:"Password must be of atleast 8 characters"
    }).min(8)
  })
  const {register,handleSubmit,formState:{errors}} = useForm({
    resolver: zodResolver(loginSchema)
  })

  async function submitHandler(data) {
    console.log(data)
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log("Form submitted successfully");
        const data = await response.json()
        setItem("user", data.data)
        setUserData(data.data)
        console.log(data.data)
        navigate("/roomJoin")
        toast.success("Logged in");
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
      <div className="w-96 h-2/3 bg-rose-100 rounded-2xl flex flex-col items-center justify-evenly">
        <h1 className="text-2xl font-bold tracking-tighter">
          Welcome to CodeHub!
        </h1>

        <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-y-4">
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
              {...register("email")}
            />
            {errors.email && <div className="text-red-500">{errors.email.message}</div>}
          </div>
          <div className="flex flex-col gap-y-1 relative">
            <label htmlFor="password" className="font-medium">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="rounded-full pl-3 py-2 focus:outline-double"
              placeholder="Enter your password"
              name="password"
               {...register("password")}
            />
            {errors.password && <div className="text-red-500">{errors.password.message}</div>}

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
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white mt-4 rounded-full py-2"
          >
            Login
          </button>
          <div>
            <a href="" className="text-blue-500 hover:text-blue-700">
              Forgot Password?
            </a>
          </div>
          <div className="flex gap-x-3">
            <p>Don't have an account?</p>
            <Link to="/signup" className="text-blue-500 hover:text-blue-700">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
