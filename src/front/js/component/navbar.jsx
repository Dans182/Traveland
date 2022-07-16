import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.jsx";
import image from "./img/traveland.png";
import "../../styles/navbar.css";

export const Navbar = () => {
  const { actions, store } = useContext(Context);

  /*  NEW  MESSAGE */
  const [newMessage, setNewMessage] = useState([]);

  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = async () => {
    const response = await fetch(store.url + "messageA", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    setNewMessage(data.messages);
  };

  return (
    <Fragment>
      <div className="new-nav navbar navbar-dark shadow-sm">
        <div className="fig container">
          <Link
            to="/feed"
            className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none"
          >
            <img
              src={image}
              alt="logo"
              className="logo"
              onClick={() => actions.resetearTrip()}
            />
          </Link>

          <ul className="ul-control nav col-lg-auto">
            <li className="">
              <Link to="/feed" className="navbar-icon me-4 text-light ">
                <i
                  className="ras fas fa-house"
                  onClick={() => actions.resetearTrip()}
                ></i>
              </Link>
            </li>
            {/*  {newMessage.length} */}
            <li className="">
              <Link
                to="/message"
                className="navbar-icon me-4 text-light "
                onClick={async () => {
                  await actions.readMessages();
                  await getMessages();
                }}
              >
                {" "}
                {store.match &&
                newMessage &&
                store.match.length > 0 &&
                store.match.filter((x) => x.read != true).length > 0 &&
                newMessage.length > 0 ? (
                  <div className="message-count">
                    {" "}
                    {store.match.filter((x) => x.read != true).length +
                      newMessage.length}
                  </div>
                ) : store.match &&
                  store.match.length > 0 &&
                  store.match.filter((x) => x.read != true).length > 0 ? (
                  <div className="message-count">
                    {" "}
                    {store.match.filter((x) => x.read != true).length}
                  </div>
                ) : newMessage &&
                  newMessage.length > 0 &&
                  newMessage.filter((x) => x.read != true).length > 0 ? (
                  <div className="message-count">
                    {" "}
                    {newMessage.filter((x) => x.read != true).length}
                  </div>
                ) : null}
                <i
                  className="ras fas fa-envelope"
                  onClick={() => actions.resetearTrip()}
                ></i>
              </Link>
            </li>
            <li className="">
              <div className="dropdown text-end">
                <p
                  href="#"
                  className="d-block link-light text-decoration-none "
                  id="dropdownUser1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    type="button"
                    src={store.user.profile_picture}
                    alt="mdo"
                    width="40"
                    height="40"
                    className="rounded-circle mt-1"
                  />
                </p>
                <ul
                  className="d-down dropdown-menu text-small"
                  aria-labelledby="dropdownUser1"
                  style={{
                    position: "absolute",
                    inset: "0px 0px auto auto",
                    margin: "0px",
                    marginTop: "20px",
                    transform: "translate(0px, 34px)",
                  }}
                  data-popper-placement="bottom-end"
                >
                  <li className="link-title ps-3 pb-1">
                    Hello <b>{store.user.firstname}</b>
                  </li>
                  <Link
                    to={"/profile/" + store.user_id}
                    className="link-styles"
                  >
                    <li
                      className="nav-links ps-3"
                      onClick={() => actions.resetearTrip()}
                    >
                      Profile
                    </li>
                  </Link>

                  <Link to="/myTrips/" className="link-styles">
                    <li
                      className="nav-links ps-3"
                      onClick={() => actions.resetearTrip()}
                    >
                      My trips
                    </li>
                  </Link>

                  <Link to="/favorites" className="link-styles">
                    <li
                      className="nav-links ps-3"
                      onClick={() => actions.resetearTrip()}
                    >
                      Favorites
                    </li>
                  </Link>
                  <Link to="/help" className="link-styles">
                    <li
                      className="nav-links ps-3"
                      onClick={() => actions.resetearTrip()}
                    >
                      Help
                    </li>
                  </Link>
                  <li className="ps-3">
                    <hr className="dropdown-divider" />
                  </li>
                  <Link to="/" className="link-styles">
                    <li>
                      <p
                        className="nav-logout"
                        onClick={() => actions.logout()}
                      >
                        <i
                          className="fas fa-sign-out-alt"
                          style={{ fontSize: "1.3rem", marginRight: "15px" }}
                        ></i>
                        Sign out
                      </p>
                    </li>
                  </Link>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};
