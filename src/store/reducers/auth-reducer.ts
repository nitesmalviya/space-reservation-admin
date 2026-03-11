import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { AuthState, LoginRes, User } from "@/types/auth-type";

const access_token = Cookies?.get?.("access_token");
const refresh_token = Cookies?.get?.("refresh_token");
const user:User | undefined = Cookies?.get?.("user") ? JSON.parse(Cookies?.get?.("user")!) : undefined

const initialState: AuthState = {
  access_token: access_token || '',
  refresh_token: refresh_token ?? "",
  user: user,
};

export const authSlice = createSlice({
  name: "auth", 
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginRes>) => {
      Cookies.set("access_token", action.payload.access_token);
      Cookies.set("refresh_token", action.payload.refresh_token);
      Cookies.set("user", JSON.stringify(action.payload.user));
      state.access_token = action.payload.access_token;
      state.user = action.payload.user;
      state.refresh_token = action.payload.refresh_token;
    },
    logout: (state) => {
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      Cookies.remove("user");
      localStorage.clear();
      state.access_token = "";
      state.refresh_token = "";
      state.user = undefined;
    },
    refreshToken: (state, action: PayloadAction<string>) => {
      state.access_token = action.payload;
    }
  },
});
export const { login, logout, refreshToken } = authSlice.actions;

export default authSlice.reducer;
