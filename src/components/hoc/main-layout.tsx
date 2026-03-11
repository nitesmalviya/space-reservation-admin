'use client';
import { store } from "@/store/store";
import { Provider } from "react-redux";
import { Toaster } from "../ui/sonner";

const Layout = ({ children }: { children: React.ReactNode }) => {

  return (
    <>
      <Toaster />
      <Provider store={store}>
        {children}
      </Provider>
    </>
  )
}

export default Layout;
