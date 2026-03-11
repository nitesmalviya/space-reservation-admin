"use client";
import { useState, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { PUBLIC_PATH } from "@/utils/constant";
import { toast } from "sonner";
import {
  forgotPassword,
  resendOtp,
  verifyOtp,
} from "@/store/actions/auth-action";
import Loader from "@/components/Loader";
import SimpleReactValidator from "simple-react-validator";
import { useRouter } from "next/navigation";

interface PageProps {
  readonly setStep: (step: number) => void;
  readonly setEmail: (email: string) => void;
  readonly email: string;
}

/**
 * ForgotPasswordPage Component
 * Provides a user interface for users to request a password reset link via email.
 * Follows the same design system and layout as the Login page.
 */
export default function VerifyEmailPage({
  setStep,
  setEmail,
  email,
}: PageProps) {
  const router = useRouter();

  const [code, setCode] = useState("");
  const [gotCode, setGotCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResendCodeLoading, setIsResendCodeLoading] = useState(false);

  const [, forceUpdate] = useState<number>(0);
  const validator = useRef(
    new SimpleReactValidator({
      className: "text-sm text-red-600 mt-1",
    }),
  );

  /**
   * Handles the form submission for password reset request.
   * @param e - The form submission event
   */
  const handleGetCode = async () => {
    if (isLoading ||isResendCodeLoading) return;
    if (validator.current.allValid()) {
      setIsLoading(true);
      try {
        const res = await forgotPassword({ username: email });

        if (res?.success) {
          toast.success(res?.message);
          setGotCode(true);
          // Reset validator status so code field doesn't immediately show errors
          validator.current.hideMessages();
        } else {
          toast.error(
            res?.message || "Failed to send reset code. Please try again.",
          );
        }
      } catch (err: any) {
        toast.error(
          err?.message || "Failed to send reset code. Please try again.",
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      validator.current.showMessages();
      forceUpdate((prev) => prev + 1);
    }
  };

  const handleVerifyCode = async () => {
    if (isLoading || isResendCodeLoading) return;
    if (validator.current.allValid()) {
      setIsLoading(true);
      try {
        const res = await verifyOtp({ username: email, code: code });
        if (res?.success) {
          toast.success(res?.message);
          setStep(2);
        } else {
          toast.error(res?.message || "code verification failed.");
        }
      } catch (err: any) {
        toast.error(err?.message || "code verification failed.");
      } finally {
        setIsLoading(false);
      }
    } else {
      validator.current.showMessages();
      forceUpdate((prev) => prev + 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading || isResendCodeLoading) return;
    if (gotCode) {
      handleVerifyCode();
    } else {
      handleGetCode();
    }
  };

  const handleResendCode = async () => {
    if (isLoading || isResendCodeLoading) return;
    setIsResendCodeLoading(true);
    try {
      const res = await resendOtp({ username: email });
      if (res?.success) {
        toast.success(res?.message);
      } else {
        toast.error(
          res?.message || "Failed to send reset code. Please try again.",
        );
      }
    } catch (err: any) {
      toast.error(
        err?.message || "Failed to send reset code. Please try again.",
      );
    } finally {
      setIsResendCodeLoading(false);
    }
  };

  return (
    <div className="bg-white  border border-gray-200 shadow-sm p-8 rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Input Field */}
        <div>
          <label htmlFor="email" className="block text-gray-700 mb-2 ">
            Email Address
          </label>
          <input
            type="email"
            disabled={gotCode || isLoading}
            readOnly={gotCode || isLoading}
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validator.current.showMessageFor("email");
            }}
            onBlur={() => validator.current.showMessageFor("email")}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
              validator.current.message("email", email, "required|email")
                ? "border-red-500"
                : "border-gray-300"
            }`}
            placeholder="Enter your email"
          />
          {validator.current.message("email", email, "required|email")}
        </div>

        {gotCode && (
          <div>
            <label htmlFor="code" className="block text-gray-700 mb-2">
              code
            </label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                validator.current.showMessageFor("code");
              }}
              onBlur={() => validator.current.showMessageFor("code")}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                validator.current.message("code", code, "required")
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Enter code"
            />

            {validator.current.message("code", code, "required")}
            <div className="flex justify-end">
              <button
                disabled={isResendCodeLoading || isLoading}
                onClick={handleResendCode}
                type="button"
                className="text-orange-600 hover:text-orange-700 hover:underline flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-orange-600 disabled:hover:no-underline"
              >
                resend code
                {isResendCodeLoading && <Loader size="sm" />}
              </button>
            </div>
          </div>
        )}

        {/* Submission Button */}
        <button
          type="submit"
          disabled={isLoading || isResendCodeLoading}
          className="w-full px-4 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 focus:ring-4 focus:ring-orange-200 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-orange-600"
        >
          {isLoading && <Loader size="sm" />}
          {!isLoading && gotCode && "Verify code"}
          {!isLoading && !gotCode && "Get reset code"}
        </button>

        {/* Navigation Back to Login */}
        <div className="text-center pt-2">
          <button
            type="button"
            disabled={isLoading || isResendCodeLoading}
            onClick={() => {
              if (isLoading || isResendCodeLoading) return;
              router.push(PUBLIC_PATH.LOGIN);
            }}
            className={`inline-flex items-center text-sm font-medium text-gray-600 ${(!isLoading && !isResendCodeLoading) && "hover:text-orange-600"} transition-colors group disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <ArrowLeft
              className={`w-4 h-4 mr-2  ${(!isLoading && !isResendCodeLoading) && "group-hover:-translate-x-1 transform transition-transform"} `}
            />
            Back to Login
          </button>
        </div>
      </form>
    </div>
  );
}
