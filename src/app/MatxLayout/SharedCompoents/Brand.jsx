import React from "react";

const Brand = ({ children }) => {
  return (
    <div className="flex items-center justify-center brand-area">
      <div className="flex items-center brand">
        <img src="/assets/logo.png" alt="company-logo" />
        {/* <span className="brand__text">Meditrak Life</span> */}
      </div>
      {children}
    </div>
  );
};

export default Brand;
