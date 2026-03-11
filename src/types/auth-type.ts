export type AuthState = {
    access_token: string | null;
    refresh_token: string;
    user: User |undefined;
}

export type LoginRes = {
    access_token: string
    user: User,
    refresh_token: string;
}


export interface User {
  activeStatus: boolean;
  createdAt: string;
  email: string;
  id: string;
  name: string;
  orgId: string;
  phoneNumber: string;
  profileImageUrl: string;
  role: string;
  subId: string;
  updatedAt: string;
}

export interface SignInResponse {
  signIn?: {
    accessToken: string;
    message: string;
    refreshToken: string;
    success: boolean;
    user: User;
  };
  success:string;
  message:string;
}

export type SignInInput = {
  email: string;
  password: string;
}

export interface LogoutResponse {
  logout?: {
    message: string;
    success: boolean;
  };
  message: string;
  success: boolean;
}


export interface RefreshTokenRes {
  refreshToken: {
    accessToken: string;
    refreshToken: string;
    message: string;
    success: string;
  };
  message: string;
  success: string;
}


export interface ChangePasswordResponse {
  changePassword?: {
    message: string;
    success: boolean;
  };
  message: string;
  success: string;
}

export interface ForgotPasswordResponse {
  forgetPassword?: {
    message: string;
    success: boolean;
  };
  message: string;
  success: string;
}


export interface ResetPasswordResponse {
  resetPassword?: {
    message: string;
    success: boolean;
  };
  message: string;
  success: string;
}

export interface VerifyOtpResponse {
  verifyOtp?: {
    message: string;
    success: boolean;
  };
  message: string;
  success: string;
}

export interface ResendOtpResponse {
  resendOtp?: {
    message: string;
    success: boolean;
  };
  message: string;
  success: string;
}


export interface EmailVerifyResponse {
  verifyEmail?: {
    message: string;
    success: boolean;
  };
  message: string;
  success: string;
}
