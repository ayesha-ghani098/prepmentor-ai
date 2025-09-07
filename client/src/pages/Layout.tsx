import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/common/Footer";
import { AuthContext } from "../auth/AuthContext";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { token } = useContext(AuthContext);
  const location = useLocation();

  const hideNavbarRoutes = ["/login", "/signup"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);
  const shouldShowNavbar =
    !shouldHideNavbar && (token || location.pathname === "/");

  return (
    <div className="min-h-screen flex flex-col">
      {shouldShowNavbar && <Navbar />}
      <main className="flex-1">{children}</main>
      {shouldShowNavbar && <Footer />}
    </div>
  );
};

export default Layout;
