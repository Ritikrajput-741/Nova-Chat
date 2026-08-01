import { setAuthUser } from "@/Redux/slices/userSlices";
import axios from "axios";
import { Eye, EyeOff, Loader, Lock, MessageCircle, User } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialState = {
    username: "",
    password: "",
  };
  const [user, setUser] = useState(initialState);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Submit Api
    const API_URL = import.meta.env.VITE_API_URL;
    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/user/login`, user, {
        withCredentials: true,
      });
      if (res.data.success) {
        // setUser(initialState);
        toast.success("🎉 Login Successful", {
          description: `Welcome back, ${res.data.user.fullname}!`,
          duration: 2500,
        });
        dispatch(setAuthUser(res.data.user));
        navigate("/");
      }
    } catch (error) {
      toast.error("❌ Login Failed", {
        description:
          error.response?.data?.message ||
          "Please check your username and password.",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4">
      {/* Background Blur */}
      <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-cyan-500/25 blur-3xl animate-pulse" />

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-violet-600/25 blur-3xl animate-pulse" />

      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[150px]" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-xl shadow-2xl">
          {/* Logo */}
          {/* Logo */}

          <div className="flex flex-col items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/40">
              <MessageCircle className="h-8 w-8 text-white" />
            </div>

            <h2 className="mt-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-2xl font-extrabold text-transparent">
              NovaChat
            </h2>
          </div>

          {/* Heading */}
          <h1 className="mt-5 text-center text-3xl font-bold text-white">
            Welcome Back 👋
          </h1>

          <p className="mt-2 text-center text-sm text-slate-300">
            Login to continue chatting with your friends.
          </p>

          {/* Form */}
          <form onSubmit={submitHandler}>
            <div className="mt-8 space-y-5">
              {/* Username */}
              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Username
                </label>

                <div className="relative">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />

                  <input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={changeHandler}
                    placeholder="@john123"
                    className="input input-bordered input-md w-full border-white/10 bg-white/10 pl-12 text-white placeholder:text-slate-400 focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Password
                </label>

                <div className="relative">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={user.password}
                    onChange={changeHandler}
                    placeholder="********"
                    className="input input-bordered input-md w-full border-white/10 bg-white/10 pl-12 pr-12 text-white placeholder:text-slate-400 focus:border-cyan-400"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <button
                  type="button"
                  onClick={() =>
                    toast.info("🚧 Feature Coming Soon", {
                      description:
                        "Forgot Password functionality is currently under development.",
                    })
                  }
                  className="text-sm font-medium text-cyan-400 transition hover:text-cyan-300"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn mt-2 w-full border-none bg-gradient-to-r from-cyan-500 to-blue-600 text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/40"
              >
                {loading ? (
                  <Loader className="animate-spin" />
                ) : (
                  <>
                    Login
                    <span className="ml-2">🚀</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-slate-300">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-cyan-400 hover:text-cyan-300 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
