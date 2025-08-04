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
    <>
      {shouldShowNavbar && <Navbar />}
      {children}
      {shouldShowNavbar && <Footer />}
    </>
  );
};

export default Layout;
