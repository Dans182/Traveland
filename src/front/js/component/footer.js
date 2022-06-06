import React from "react";
import { Link } from "react-router-dom";
import "../../styles/footer.css";

export const Footer = () => (
  <div className="container">
    <footer className="py-3 my-4">
      <ul className="nav justify-content-center border-bottom pb-3 mb-3">
        <Link to="/feed" style={{ textDecoration: "none" }}>
          <li className="nav-link px-2 text-muted">Home</li>
        </Link>
        <Link to="/help" style={{ textDecoration: "none" }}>
          <li className="nav-link px-2 text-muted">FAQs</li>
        </Link>
      </ul>
      <p className="text-center text-muted">© 2022 Company, Inc</p>
    </footer>
  </div>
);
