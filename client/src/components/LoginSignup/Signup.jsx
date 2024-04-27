import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import {useForm} from "react-hook-form"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const navigate = useNavigate()

  const signupSchema = z.object({
    username:z.string({
      invalid_type_error:"Username must be of 3 characters",
      required_error:"Username is required"
    }).min(3),
    email:z.string({
      invalid_type_error:"Invalid email is provided",
      required_error:"Email is required"
    }).email(),
    password: z.string({
      required_error:"Password is required",
      invalid_type_error:"Password must be of atleast 8 characters"
    }).min(8),
    confPassword: z.string({
      required_error:"Password is required",
      invalid_type_error:"Password must be of atleast 8 characters"
    }).min(8)
  }).refine(data => data.password === data.confPassword, {
        message: "Passwords must match",
        path: ["confPassword"]
    })

  const {register,handleSubmit,formState:{errors}} = useForm({
    resolver: zodResolver(signupSchema)
  })

  async function submitHandler(data) {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log("Form submitted successfully");
        navigate("/roomJoin")
        toast.success("Account Created");
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
      <div className="w-96 h-[90%] bg-rose-100 rounded-2xl flex flex-col items-center justify-evenly">
        <h1 className="text-2xl font-bold tracking-tighter">
          Welcome to CodeHub!
        </h1>

        <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-y-4">
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
              {...register("username")}
            />
            {errors.username && <div className="text-red-500 text-xs">{errors.username.message}</div>}
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
              {...register("email")}
            />
            {errors.email && <div className="text-red-500 text-xs">{errors.email.message}</div>}
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
              {...register("password")}
            />
            {errors.password && <div className="text-red-500 text-xs">{errors.password.message}</div>}
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
             {...register("confPassword")}
            />
            {errors.confPassword && <div className="text-red-500 text-xs">{errors.confPassword.message}</div>}
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
