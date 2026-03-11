"use client";
import { useState } from "react";
import VerifyEmailPage from "./verify-email";
import NewPassword from "./new-password";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md">
        {/* Branding & Header Section */}
        <div className="text-center mb-8">
          <div className="inline-block bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-6 ">
            <img
              src="/assets/logo.png"
              alt="GM Workspace"
              className="h-12 w-auto"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Forgot Password?
          </h1>
          <p className="text-gray-600">
            {step === 1
              ? "No worries! Enter your email below and we will send you  instructions to reset your password."
              : "Enter your new password below."}
          </p>
        </div>

        {step === 1 && (
          <VerifyEmailPage
            setStep={setStep}
            email={email}
            setEmail={setEmail}
          />
        )}
        {step === 2 && <NewPassword email={email} />}
      </div>
    </div>
  );
}
