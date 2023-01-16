import React from "react";
import Navbar from "./navbar/index";
import NavbarTwo from "./navbar/navbarTwo";

function Layout({ children, navbarType }) {
  return (
    <>
      {navbarType == 1 && <Navbar />}
      {navbarType == 2 && <NavbarTwo />}
      <main>{children}</main>
    </>
  );
}

export default Layout;
