import React from "react";

const Signup = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-r from-purple-500 to-pink-300">
      <div className="w-96 h-4/5 bg-rose-100 rounded-2xl flex flex-col items-center justify-evenly">
        <h1 className="text-2xl font-bold tracking-tighter">
          Welcome to CodeHub!
        </h1>

        <form action="" className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-1">
            <label htmlFor="username" className="font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="rounded-full pl-3 py-2 focus:outline-double"
              placeholder="Create your username"
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
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <label htmlFor="password" className="font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="rounded-full pl-3 py-2 focus:outline-double"
              placeholder="Create your password"
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <label htmlFor="confirm-pass" className="font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-pass"
              className="rounded-full pl-3 py-2 focus:outline-double"
              placeholder="Confirm Password"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white mt-4 rounded-full py-2"
          >
            Sign up
          </button>
          <div className="flex gap-x-3">
            <p>Already have an account?</p>
            <a href="" className="text-blue-500 hover:text-blue-700">
              Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
