import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-indigo-600 text-white p-4">
      <div className="container mx-auto text-center">
        &copy; {new Date().getFullYear()} Library Nest. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
