import React, { useContext } from "react";
import { Context } from "../store/appContext.jsx";
import { Link } from "react-router-dom";
import "../../styles/footer.css";

export const Footer = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="footer container ">
      <footer className="mt-auto py-3 my-4">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <Link
            to="/feed"
            onClick={() => actions.resetearTrip()}
            style={{ textDecoration: "none" }}
          >
            <li
              className="nav-link px-2 text-muted"
              onClick={() => actions.resetearTrip()}
            >
              Home
            </li>
          </Link>
          <Link to="/help" style={{ textDecoration: "none" }}>
            <li
              className="nav-link px-2 text-muted"
              onClick={() => actions.resetearTrip()}
            >
              FAQs
            </li>
          </Link>
        </ul>
        <p className="text-center text-muted">© 2022 Company, Inc</p>
      </footer>
    </div>
  );
};
