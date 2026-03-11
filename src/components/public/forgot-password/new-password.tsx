"use client";
import Loader from "@/components/Loader";
import { resetPassword } from "@/store/actions/auth-action";
import { PUBLIC_PATH } from "@/utils/constant";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import SimpleReactValidator from "simple-react-validator";
import { toast } from "sonner";

interface PageProps {
  readonly email: string;
}

export default function NewPassword({ email }: PageProps) {
  const router = useRouter();

  const [newPass, setNewPass] = useState("");
  const [confrPass, setConfrPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfrPassword, setShowConfrPassword] = useState(false);

  const [, forceUpdate] = useState<number>(0);
  const validator = useRef(
    new SimpleReactValidator({
      className: "text-sm text-red-600 mt-1",
      validators: {
        matchRegex: {
          message: "The :attribute must match the new password.",
          rule: (val: any, params: any) => {
            return val === params[0];
          },
        },
      },
    }),
  );

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    if (validator.current.allValid()) {
      setIsLoading(true);
      try {
        const res = await resetPassword({ username: email, password: newPass });
        if (res?.success) {
          toast.success(res?.message);
          router.push(PUBLIC_PATH.LOGIN);
        } else {
          toast.error(res?.message);
        }
      } catch (err: any) {
        toast.error(err?.message || "Failed to reset password");
      } finally {
        setIsLoading(false);
      }
    } else {
      validator.current.showMessages();
      forceUpdate((prev) => prev + 1);
    }
  };

  return (
    <div className="bg-white  border border-gray-200 shadow-sm p-8 rounded-lg">
      <form onSubmit={handleResetPassword} className="space-y-6">
        {/* New Password */}
        <div>
          <label htmlFor="newPassword" className="block text-gray-700 mb-2">
            New Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="newPassword"
              value={newPass}
              onChange={(e) => {
                setNewPass(e.target.value);
                validator.current.showMessageFor("newPass");
              }}
              onBlur={() => validator.current.showMessageFor("newPass")}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                validator.current.message("newPass", newPass, "required|min:6")
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Enter your new password"
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
          {validator.current.message("newPass", newPass, "required|min:6")}
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="cnfrPassword" className="block text-gray-700 mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfrPassword ? "text" : "password"}
              id="cnfrPassword"
              value={confrPass}
              onChange={(e) => {
                setConfrPass(e.target.value);
                validator.current.showMessageFor("confrPass");
              }}
              onBlur={() => validator.current.showMessageFor("confrPass")}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                validator.current.message(
                  "confrPass",
                  confrPass,
                  `required|matchRegex:${newPass}`,
                )
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Confirm your password"
            />
            <button
              type="button"
              onClick={() => setShowConfrPassword(!showConfrPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfrPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {validator.current.message(
            "confrPass",
            confrPass,
            `required|matchRegex:${newPass}`,
            { messages: { matchRegex: "Passwords do not match." } },
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-4 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 focus:ring-4 focus:ring-orange-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-orange-600"
        >
          <span>Reset Password</span>
          {isLoading && <Loader size="sm" inline />}
        </button>

        {/* Back to Login */}
        {/* <div className="text-center pt-2">
          <Link
            href={PUBLIC_PATH.LOGIN}
            className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
            Back to Login
          </Link>
        </div> */}
      </form>
    </div>
  );
}
