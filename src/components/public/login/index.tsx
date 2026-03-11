"use client";
import React, { useEffect, useState, useRef } from "react";
import { Eye, EyeOff } from "lucide-react";
import { PUBLIC_PATH } from "@/utils/constant";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { login } from "@/store/actions/auth-action";
import { getRoleConfig } from "@/utils/proxy-services";
import Loader from "@/components/Loader";
import SimpleReactValidator from "simple-react-validator";

const defaultForm = {
  email: "",
  password: "",
};

export default function Login() {
  const { user } = useAppSelector((store) => store.auth);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const [form, setForm] = useState<{ email: string; password: string }>(
    defaultForm,
  );
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  // Initialize SimpleReactValidator
  const [, forceUpdate] = useState<number>(0);
  const validator = useRef(
    new SimpleReactValidator({
      className: "text-sm text-red-600 mt-1",
    }),
  );

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isLoading) return;
    if (validator.current.allValid()) {
      setIsloading(true);
      const { email, password } = form;
      try {
        const res = await dispatch(login({ email, password }));
        if (res?.success) {
          toast.success(res?.message);
        } else {
          toast.error(res?.message);
        }
      } catch (err: any) {
        toast.error(err?.message || "login failed");
      } finally {
        setIsloading(false);
      }
    } else {
      validator.current.showMessages();
      forceUpdate((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (user) {
      const userRoute = getRoleConfig(user?.role?.toLowerCase());
      if (userRoute?.dashboard) {
        router.replace(userRoute.dashboard);
      }
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}

        <div className="text-center mb-8">
          <div className="inline-block bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-6">
            <img
              src={"/assets/logo.png"}
              alt="GM Workspace"
              className="h-12 w-auto"
            />
          </div>
          <h1 className="text-gray-900 mb-2 font-bold">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your workspace account</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={form.email}
                onChange={(e) => {
                  setForm((pre) => ({ ...pre, email: e.target.value }));
                  validator.current.showMessageFor("email");
                }}
                onBlur={() => validator.current.showMessageFor("email")}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  validator.current.message(
                    "email",
                    form.email,
                    "required|email",
                  )
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="Enter your email"
              />
              {validator.current.message("email", form.email, "required|email")}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={form.password}
                  onChange={(e) => {
                    setForm((pre) => ({
                      ...pre,
                      password: e.target.value,
                    }));

                    validator.current.showMessageFor("password");
                  }}
                  onBlur={() => validator.current.showMessageFor("password")}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                    validator.current.message(
                      "password",
                      form.password,
                      "required|min:6",
                    )
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {validator.current.message(
                "password",
                form.password,
                "required|min:6",
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-end">
              {/* <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                />
                <span className="text-sm text-gray-700">Remember me</span>
              </label> */}
              <Link
                href={PUBLIC_PATH.FORGOT_PASSWORD}
                type="button"
                className="text-sm text-orange-600 hover:text-orange-700 "
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              disabled={isLoading}
              type="submit"
              className="w-full px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-orange-600 flex items-center justify-center gap-2"
            >
              <span> Sign In</span> {isLoading && <Loader size="sm" inline />}
            </button>
          </form>
        </div>

        {/* Footer */}
        {/* <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href={"#"} className="text-orange-600 hover:text-orange-700">
              Contact administrator
            </Link>
          </p>
        </div> */}
      </div>
    </div>
  );
}
