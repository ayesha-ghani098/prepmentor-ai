import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Avatar,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import {
  landingNavbar,
  landingNavbarButton,
  mobileMenuBase,
  mobileMenuClosed,
  mobileMenuOpen,
} from "../styles/tailwindStyles";
import { useAuth } from "../auth/useAuth";
import { AnimatedWrapperTop } from "./animation/AnimatedWrapper";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const isOnLandingPage = location.pathname === "/";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setMenuOpen(false); // close menu on mobile after navigate
  };

  return (
    <AppBar position="static" className={landingNavbar}>
      <Toolbar className="flex justify-between items-center w-full">
        {/* Left side: Logo or title */}
        <Typography
          variant="h6"
          className="text-white cursor-pointer"
          onClick={() => handleNavigate("/")}
        >
          PrepMentor AI
        </Typography>

        {/* Hamburger icon on mobile */}
        <Box className="flex sm:hidden">
          <IconButton onClick={() => setMenuOpen(!menuOpen)} color="inherit">
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Box>

        {/* Desktop menu */}
        <Box className="hidden sm:flex gap-4 items-center">
          {isOnLandingPage && !user && (
            <Button
              className={landingNavbarButton}
              variant="text"
              onClick={() => handleNavigate("/login")}
            >
              🪪 Login
            </Button>
          )}
          {user && (
            <>
              <Button
                className={landingNavbarButton}
                variant="text"
                onClick={() => handleNavigate("/dashboard")}
              >
                📊 Dashboard
              </Button>
              <Button
                className={landingNavbarButton}
                variant="text"
                onClick={() => handleNavigate("/question-sets")}
              >
                📚 Question Sets
              </Button>
              <Button
                className={landingNavbarButton}
                variant="text"
                onClick={() => handleNavigate("/questions")}
              >
                📝 Questions
              </Button>
            </>
          )}
        </Box>

        {/* Right-side user (desktop) */}
        {user && (
          <Box className="hidden sm:flex items-center gap-3">
            <Avatar>{user.email?.[0]?.toUpperCase() || "U"}</Avatar>
            <Typography className="text-white hidden sm:block">
              {user.email}
            </Typography>
            <Button
              variant="outlined"
              color="inherit"
              onClick={handleLogout}
              className="border-white text-white hover:bg-white hover:text-black transition"
            >
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <AnimatedWrapperTop>
          <Box
            className={`${mobileMenuBase} ${
              menuOpen ? mobileMenuOpen : mobileMenuClosed
            } flex flex-col items-start pl-6`} // <== aligned left with padding
          >
            {user && (
              <Box className="flex flex-col gap-2 mt-4 ml-3">
                <Avatar>{user.email?.[0]?.toUpperCase() || "U"}</Avatar>
                <Typography className="text-white pt-4 pb-2">
                  {user.email}
                </Typography>
              </Box>
            )}

            {isOnLandingPage && !user && (
              <Button
                className={`${landingNavbarButton} w-full justify-start`}
                variant="text"
                onClick={() => handleNavigate("/login")}
              >
                🪪 Login
              </Button>
            )}
            {user && (
              <>
                <Button
                  className={`${landingNavbarButton} w-full justify-start`}
                  variant="text"
                  onClick={() => handleNavigate("/dashboard")}
                >
                  📊 Dashboard
                </Button>
                <Button
                  className={`${landingNavbarButton} w-full justify-start`}
                  variant="text"
                  onClick={() => handleNavigate("/question-sets")}
                >
                  📚 Question Sets
                </Button>
                <Button
                  className={`${landingNavbarButton} w-full justify-start`}
                  variant="text"
                  onClick={() => handleNavigate("/questions")}
                >
                  📝 Questions
                </Button>
              </>
            )}

            {user && (
              <Button
                variant="outlined"
                color="inherit"
                onClick={handleLogout}
                className="mt-4 border-white text-white w-full justify-start hover:bg-white hover:text-black transition"
              >
                🚪 Logout
              </Button>
            )}
          </Box>
        </AnimatedWrapperTop>
      )}
    </AppBar>
  );
};

export default Navbar;
