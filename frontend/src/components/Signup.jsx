import axios from "axios";
import { Eye, EyeOff, Loader, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const initialState = {
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  };
  const [user, setUser] = useState(initialState);

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // SUBMIT HANDLER
  const submitHandler = async (e) => {
    e.preventDefault();

    // Submit Api
    const API_URL = import.meta.env.VITE_API_URL;
    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/user/register`, user, {
        withCredentials: true,
      });
      if (res.data.success) {
        setUser(initialState);
        toast.success("🎉 Create Successfull", {
          description: ` ${res.data.message}!`,
          duration: 2500,
        });
        navigate("/login");
      }
    } catch (error) {
     toast.error("❌ Failed", {
       description:
         error.response?.data?.message ||
         "Please check your username and password.",
       duration: 3000,
     });
    } finally {
      setLoading(false);
    }
  };

  const handleChecked = (gender) => {
    setUser({ ...user, gender });
  };
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4">
      {/* Background */}
      <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-cyan-500/25 blur-3xl animate-pulse" />

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-violet-600/25 blur-3xl animate-pulse" />

      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[150px]" />

      {/* Card */}

      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-xl shadow-2xl">
          {/* Logo */}

          {/* Logo */}

          <div className="flex flex-col items-center justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 shadow-xl shadow-cyan-500/40">
              <MessageCircle className="h-10 w-10 text-white" />
            </div>

            <h2 className="mt-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-3xl font-extrabold text-transparent">
              NovaChat
            </h2>
          </div>

          {/* Heading */}

          <h1 className="mt-5 text-center text-3xl font-bold text-white">
            Create Account
          </h1>

          <p className="mt-2 text-center text-sm text-slate-300">
            Join thousands of people chatting in real-time.
          </p>

          {/* Form */}
          <form onSubmit={submitHandler}>
            <div className="mt-7 space-y-4">
              {/* First Name */}

              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Full Name
                </label>

                <input
                  type="text"
                  name="fullname"
                  value={user.fullname}
                  onChange={changeHandler}
                  placeholder="John"
                  className="input input-md input-bordered w-full border-white/10 bg-white/10 text-white placeholder:text-slate-400 focus:border-cyan-400"
                />
              </div>

              {/* Username */}

              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Username
                </label>

                <input
                  type="text"
                  name="username"
                  value={user.username}
                  onChange={changeHandler}
                  placeholder="@john123"
                  className="input input-md input-bordered w-full border-white/10 bg-white/10 text-white placeholder:text-slate-400 focus:border-cyan-400"
                />
              </div>

              {/* Password */}

              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={user.password}
                    onChange={changeHandler}
                    placeholder="********"
                    className="input input-md input-bordered w-full border-white/10 bg-white/10 pr-12 text-white placeholder:text-slate-400 focus:border-cyan-400"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-cyan-400"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}

              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Confirm Password
                </label>

                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={user.confirmPassword}
                    onChange={changeHandler}
                    placeholder="********"
                    className="input input-md input-bordered w-full border-white/10 bg-white/10 pr-12 text-white placeholder:text-slate-400 focus:border-cyan-400"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-cyan-400"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* Gender */}

              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Gender
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3 text-white transition-all hover:border-cyan-400 hover:bg-cyan-500/10">
                    <input
                      type="radio"
                      checked={user.gender === "male"}
                      onChange={() => handleChecked("male")}
                      name="gender"
                      className="radio radio-info radio-sm"
                    />
                    Male
                  </label>

                  <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3 text-white transition-all hover:border-pink-400 hover:bg-pink-500/10">
                    <input
                      type="radio"
                      checked={user.gender === "female"}
                      onChange={() => handleChecked("female")}
                      name="gender"
                      className="radio radio-secondary radio-sm"
                    />
                    Female
                  </label>
                </div>
              </div>

              {/* Button */}

              <button
                type="submit"
                disabled={loading}
                className="btn mt-2 w-full border-none bg-gradient-to-r from-cyan-500 to-blue-600 text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/40"
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin" />
                  </>
                ) : (
                  "Create Account 🚀"
                )}
              </button>
            </div>
          </form>

          {/* Footer */}

          <div className="mt-7 text-center text-sm text-slate-300">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="font-semibold text-cyan-400 transition hover:text-cyan-300"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
