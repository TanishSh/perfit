import React from "react";
import Navigation from "./Navigation";

function Header() {
  return (
    <div className="border-b p-3 flex justify-between items-center">
      <Navigation />
    </div>
  );
}

export default Header;
