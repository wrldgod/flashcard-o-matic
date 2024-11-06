import React from "react";
import Header from "./Header";

function Layout({ children }) {
  return (
    <>
      <Header />
      <div className="container">
        {children} {/* This will render the main content based on the route */}
      </div>
    </>
  );
}

export default Layout;

