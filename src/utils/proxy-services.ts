import { PUBLIC_PATH } from "./constant";
import { refreshToken } from "./graphql/auth/action";
import { NextRequest, NextResponse } from "next/server";

type RoleConfig = {
  prefix: string;
  dashboard: string;
};

export function getRoleConfig(role: string): RoleConfig | null {
  const roleConfigs: Record<string, RoleConfig> = {
    admin: { prefix: "/admin", dashboard: "/admin/dashboard" },

    superadmin: {
      prefix: "/super-admin",
      dashboard: "/super-admin/dashboard",
    },
  };
  return roleConfigs[role] || null;
}

// Function to clear all authentication-related cookies
export const clearAuthCookies = (response: NextResponse) => {
  response.cookies.delete("access_token");
  response.cookies.delete("refresh_token");
  response.cookies.delete("token");
  response.cookies.delete("user");
};

export function isProtectedRoute(path: string): boolean {
  return (
    path.startsWith("/admin") ||
    path.startsWith("/super-admin") ||
    path === "/"
  );
}

export function decodeJWT(token: string) {
  const base64Url = token.split(".")[1];

  const base64 = base64Url.replaceAll("-", "+").replaceAll("_", "/");

  return JSON.parse(
    new TextDecoder().decode(
      Uint8Array.from(atob(base64), (c) => c.codePointAt(0)!),
    ),
  );
}

// Redirect to the login page and clear authentication cookies
export const redirectToLogin = (request: NextRequest) => {
  const redirectResponse = NextResponse.redirect(
    new URL(PUBLIC_PATH.LOGIN, request.url),
  );
  clearAuthCookies(redirectResponse);
  return redirectResponse;
};

// Set access token in cookies and continue to the next response
export const setAccessTokenAndContinue = (accessToken: string) => {
  const nextResponse = NextResponse.next();
  nextResponse.cookies.set({
    name: "access_token",
    value: accessToken,
  });
  return nextResponse;
};

export const handleTokenExpiration = async (request: NextRequest) => {
  
  const refresh_token = request.cookies.get("refresh_token")?.value;

  // If there's no refresh token, clear cookies and redirect to login
  if (!refresh_token) {
    return redirectToLogin(request);
  }

  const refreshResult = await refreshToken(refresh_token);
  
  // If refresh token is valid, set the new access token in cookies
  if (refreshResult?.refreshToken?.success) {
    return setAccessTokenAndContinue(refreshResult?.refreshToken?.accessToken);
  }

  // If refresh token fails, clear cookies and redirect to login
  return redirectToLogin(request);
};

export const checkTokenExpired = (token: string) => {
  const decodedToken = decodeJWT(token);
  const expirationTime = decodedToken.exp * 1000;
  const delayTime = 30;
  const currentTime = Date.now() - delayTime;
  // Compare expiration time with current time
  return expirationTime < currentTime;
};
