import React from "react";
import {
  footerBase,
  footerContainer,
  footerLink,
} from "../../styles/tailwindStyles";

const Footer: React.FC = () => {
  return (
    <footer className={footerBase}>
      <div className={footerContainer}>
        <div className="text-sm">
          © {new Date().getFullYear()} PrepMentor AI. All rights reserved.
        </div>
        <div className="flex gap-4">
          <a href="/privacy" className={footerLink}>
            Privacy Policy
          </a>
          <a href="/terms" className={footerLink}>
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
