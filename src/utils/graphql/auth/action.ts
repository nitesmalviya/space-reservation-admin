"use server";
import { fetchGraphQLMutation } from "..";
import {
  SIGN_IN_MUTATION,
  LOGOUT_MUTATION,
  REFRESH_TOKEN_MUTATION,
  CHANGE_PASSWORD_MUTATION,
  FORGOT_PASSWORD_MUTATION,
  RESET_PASSWORD_MUTATION,
  VERIFY_OTP_MUTATION,
  RESEND_OTP_MUTATION,
  VERIFY_EMAIL_MUTATION,
} from "./query";
import {
  SignInResponse,
  SignInInput,
  LogoutResponse,
  RefreshTokenRes,
  ChangePasswordResponse,
  ForgotPasswordResponse,
  ResetPasswordResponse,
  VerifyOtpResponse,
  ResendOtpResponse,
  EmailVerifyResponse,
} from "@/types/auth-type";

//sign in action
export const signInAction = async ({
  variables,
}: {
  variables: SignInInput;
}): Promise<SignInResponse> => {
  const res = await fetchGraphQLMutation<SignInResponse>(
    SIGN_IN_MUTATION,
    variables,
  );
  return res as SignInResponse;
};

//logout action
export const LogoutAction = async (): Promise<LogoutResponse> => {
  const res = await fetchGraphQLMutation<LogoutResponse>(LOGOUT_MUTATION, {});
  return res;
};

//refresh token action
export const refreshToken = async (
  refreshToken: string,
): Promise<RefreshTokenRes> => {
  const variables = { refreshToken };
  const res = await fetchGraphQLMutation<RefreshTokenRes>(
    REFRESH_TOKEN_MUTATION,
    variables,
  );
  return res;
};

//changed password action
export const changePasswordAction = async ({
  variables,
}: {
  variables: { newPassword: string; oldPassword: string };
}): Promise<ChangePasswordResponse> => {
  const res = await fetchGraphQLMutation<ChangePasswordResponse>(
    CHANGE_PASSWORD_MUTATION,
    variables,
  );
  return res;
};

//forgot password action
export const forgotPasswordAction = async ({
  variables,
}: {
  variables: { username: string };
}): Promise<ForgotPasswordResponse> => {
  const res = await fetchGraphQLMutation<ForgotPasswordResponse>(
    FORGOT_PASSWORD_MUTATION,
    variables,
  );
  return res;
};

//reset password action
export const resetPasswordAction = async ({
  variables,
}: {
  variables: { password: string; username: string };
}): Promise<ResetPasswordResponse> => {
  const res = await fetchGraphQLMutation<ResetPasswordResponse>(
    RESET_PASSWORD_MUTATION,
    variables,
  );
  return res;
};

//verify otp action
export const verifyOtpAction = async ({
  variables,
}: {
  variables: { code: string; username: string };
}): Promise<VerifyOtpResponse> => {
  const res = await fetchGraphQLMutation<VerifyOtpResponse>(
    VERIFY_OTP_MUTATION,
    variables,
  );
  return res;
};

//resend otp action
export const resendOtpAction = async ({
  variables,
}: {
  variables: { username: string };
}): Promise<ResendOtpResponse> => {
  const res = await fetchGraphQLMutation<VerifyOtpResponse>(
    RESEND_OTP_MUTATION,
    variables,
  );
  return res;
};

//email verification

export const emailVerificationAction = async ({
  variables,
}: {
  variables: { email: string; code: string };
}): Promise<EmailVerifyResponse> => {
  const res = await fetchGraphQLMutation<EmailVerifyResponse>(
    VERIFY_EMAIL_MUTATION,
    variables,
  );
  return res;
};
