"use client";
import { AppDispatch } from "../store";
import * as authReducer from "../reducers/auth-reducer";
import {
  changePasswordAction,
  emailVerificationAction,
  forgotPasswordAction,
  LogoutAction,
  resendOtpAction,
  resetPasswordAction,
  signInAction,
  verifyOtpAction,
} from "@/utils/graphql/auth/action";

//login action
export const login =
  (formData: { email: string; password: string }) =>
  async (dispatch: AppDispatch) => {
    try {
      const res = await signInAction({ variables: formData });
      if (res?.signIn?.success) {
        dispatch(
          authReducer.login({
            user: res?.signIn?.user,
            access_token: res?.signIn?.accessToken,
            refresh_token: res?.signIn?.refreshToken,
          }),
        );
        return {
          success: true,
          message: res?.message || "login successfully",
        };
      } else {
        return {
          success: false,
          message: res?.message || "login failed",
        };
      }
      return res;
    } catch (err: any) {
      console.log(err);
      return {
        success: false,
        message: err?.message || "login failed",
      };
    }
  };

//logout action
export const logout = async (dispatch: AppDispatch) => {
  try {
    const res = await LogoutAction();

    if (res?.logout?.success) {
      dispatch(authReducer.logout());
      return {
        success: true,
        message: res?.logout?.message || "logout successfully",
      };
    } else {
      return {
        success: false,
        message: res?.message || "logout failed",
      };
    }
  } catch (err: any) {
    console.log(err);
    return {
      success: false,
      message: err?.message || "logout failed",
    };
  }
};

//change password action
export const changePassword = async ({
  variables,
}: {
  variables: { newPassword: string; oldPassword: string };
}) => {
  try {
    const res = await changePasswordAction({ variables });
    if (res?.changePassword?.success) {
      return {
        success: true,
        message: res?.changePassword?.message || "change password successfully",
      };
    } else {
      return {
        success: false,
        message: res?.message || "change password failed",
      };
    }
  } catch (err: any) {
    console.log(err);
    return {
      success: false,
      message: err?.message || "change password failed",
    };
  }
};

//forgot password action
export const forgotPassword = async ({ username }: { username: string }) => {
  try {
    const res = await forgotPasswordAction({ variables: { username } });

    if (res?.forgetPassword?.success) {
      return {
        success: true,
        message: res?.forgetPassword?.message || "forgot password successfully",
      };
    } else {
      return {
        success: false,
        message: res?.message || "forgot password failed",
      };
    }
  } catch (err: any) {
    console.log(err);
    return {
      success: false,
      message: err?.message || "forgot password failed",
    };
  }
};

//reset password action(username->email)
export const resetPassword = async (data: {
  password: string;
  username: string;
}) => {
  try {
    const res = await resetPasswordAction({ variables: data });

    if (res?.resetPassword?.success) {
      return {
        success: true,
        message: res?.resetPassword?.message || "reset password successfully",
      };
    } else {
      return {
        success: false,
        message: res?.message || "reset password failed",
      };
    }
  } catch (err: any) {
    console.log(err);
    return {
      success: false,
      message: err?.message || "reset password failed",
    };
  }
};

//verify otp action
export const verifyOtp = async (data: { code: string; username: string }) => {
  try {
    const res = await verifyOtpAction({ variables: data });
    if (res?.verifyOtp?.success) {
      return {
        success: true,
        message: res?.verifyOtp?.message || "verify otp successfully",
      };
    } else {
      return {
        success: false,
        message: res?.message || "verify otp failed",
      };
    }
  } catch (err: any) {
    console.log(err);
    return {
      success: false,
      message: err?.message || "verify otp failed",
    };
  }
};

//resend otp action
export const resendOtp = async (data: { username: string }) => {
  try {
    const res = await resendOtpAction({ variables: data });
    if (res?.resendOtp?.success) {
      return {
        success: true,
        message: res?.resendOtp?.message || "resend otp successfully",
      };
    } else {
      return {
        success: false,
        message: res?.message || "resend otp failed",
      };
    }
  } catch (err: any) {
    console.log(err);
    return {
      success: false,
      message: err?.message || "resend otp failed",
    };
  }
};

//email verification action
export const emailVerification = async ({
  variables,
}: {
  variables: { email: string; code: string };
}) => {
  try {
    const res = await emailVerificationAction({ variables });
    if (res?.verifyEmail?.success) {
      return {
        success: true,
        message: res?.verifyEmail?.message || "email successfully verify",
      };
    } else {
      return {
        success: false,
        message: res?.message || "email verification failed",
      };
    }
  } catch (err: any) {
    console.log(err);
    return {
      success: false,
      message: err?.message || "email verification failed",
    };
  }
};

//refresh token action
// export const refreshToken = async (dispatch: AppDispatch) => {
//   const res: any = await API.get("/api/auth/refresh");

//   if (res?.accessToken) {
//     Cookies.set("token", res.accessToken);
//     dispatch(authReducer.refreshToken(res.accessToken));
//     return res.data;
//   } else if (res === "token has expired") {
//     dispatch({ type: "auth/logout" });
//   } else {
//     dispatch({ type: "auth/logout" });
//   }
//   return {
//     access_token: "asdasdd",
//   };
// };
