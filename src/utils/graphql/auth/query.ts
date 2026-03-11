import { gql, DocumentNode } from "@apollo/client";

//sign in  mutation
export const SIGN_IN_MUTATION: DocumentNode = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      accessToken
      message
      refreshToken
      success
      user {
        activeStatus
        createdAt
        email
        id
        name
        phoneNumber
        profileImageUrl
        role
      }
    }
  }
`;

//logout mutation
export const LOGOUT_MUTATION: DocumentNode = gql`
  mutation Logout($deviceToken: String) {
    logout(deviceToken: $deviceToken) {
      message
      success
    }
  }
`;

//refresh token mutation
export const REFRESH_TOKEN_MUTATION: DocumentNode = gql`
  mutation RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      accessToken
      message
      refreshToken
      success
    }
  }
`;

//changed password mutation
export const CHANGE_PASSWORD_MUTATION: DocumentNode = gql`
  mutation ChangePassword($newPassword: String!, $oldPassword: String!) {
    changePassword(newPassword: $newPassword, oldPassword: $oldPassword) {
      message
      success
    }
  }
`;

//forgot password(username->email)
export const FORGOT_PASSWORD_MUTATION: DocumentNode = gql`
  mutation ForgetPassword($username: String!) {
    forgetPassword(username: $username) {
      message
      success
    }
  }
`;

//reset password
export const RESET_PASSWORD_MUTATION: DocumentNode = gql`
  mutation ResetPassword($password: String!, $username: String!) {
    resetPassword(password: $password, username: $username) {
      message
      success
    }
  }
`;

//verify otp
export const VERIFY_OTP_MUTATION: DocumentNode = gql`
  mutation VerifyOtp($code: String!, $username: String!) {
    verifyOtp(code: $code, username: $username) {
      message
      success
    }
  }
`;

//resend otp
export const RESEND_OTP_MUTATION: DocumentNode = gql`
  mutation ResendOtp($username: String!) {
    resendOtp(username: $username) {
      message
      success
    }
  }
`;

//email verification

export const VERIFY_EMAIL_MUTATION: DocumentNode = gql`
  mutation VerifyEmail($code: String!, $email: String!) {
    verifyEmail(code: $code, email: $email) {
      message
      success
    }
  }
`;


