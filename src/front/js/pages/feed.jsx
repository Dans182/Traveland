import React, { Fragment, useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.jsx";
import { Link } from "react-router-dom";
import moment from "moment";
import "../../styles/feed.css";

export const Feed = () => {
  const [searchTerm, setSearchTerm] = useState({ destination: "" });
  const { actions, store } = useContext(Context);

  useEffect(() => {
    actions.verify();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    actions.getTrips();
    actions.getUserTrips();
  }, []);

  return (
    <Fragment>
      <div className="footer-abajo">
        <div className="search-back container">
          <nav className="search-style navbar mt-4 mb-2">
            <div className="w-inputs">
              <form className="d-flex" role="search">
                <input
                  className="inp-control form-control me-2"
                  type="text"
                  placeholder="Search destination"
                  aria-label="Search"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      e.stopPropagation();
                      actions.searchDestination(searchTerm);
                    }
                  }}
                  onChange={(e) => {
                    setSearchTerm({
                      ...searchTerm,
                      destination: e.target.value
                        .replace(/\b\w/g, (l) => l.toUpperCase())
                        .trim(),
                    });
                  }}
                />
                <input
                  className="inp-control form-control me-2"
                  type="date"
                  aria-label="Search"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      e.stopPropagation();
                      actions.searchDestination(searchTerm);
                    }
                  }}
                  onChange={(e) => {
                    setSearchTerm({ ...searchTerm, date: e.target.value });
                  }}
                />
                <input
                  className="inp-control form-control me-2"
                  type="date"
                  aria-label="Search"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      e.stopPropagation();
                      actions.searchDestination(searchTerm);
                    }
                  }}
                  onChange={(e) => {
                    setSearchTerm({ ...searchTerm, end_date: e.target.value });
                  }}
                />
                <button
                  className="search-button btn "
                  type="button"
                  onClick={() => {
                    actions.searchDestination(searchTerm);
                  }}
                >
                  Search
                </button>
              </form>
            </div>
          </nav>
        </div>
        <div className="container">
          <div className="cont-1">
            {store.trips.map((e) => {
              return (
                <div className="feed-box" key={e.id}>
                  <div className=""></div>
                  <div className="ul-feed d-flex">
                    <div className="il-time text-white">
                      <i className="fas fa-clock"></i>{" "}
                      {moment(e.start_of_the_trip).format("LL")} -{" "}
                      {moment(e.end_of_the_trip).format("LL")}
                    </div>
                    <div className="il-feed text-white">
                      <i className="fas fa-user-friends"></i>{" "}
                      {e.trip_in_match
                        ? e.trip_in_match.filter((x) => x.accepted == true)
                            .length
                        : 0}
                      /{e.people}{" "}
                    </div>
                    {!e.likes.includes(store.user_id) ? (
                      <div className="il-feed text-white">
                        <i
                          className="star far fa-star me-2"
                          type="button"
                          onClick={() => {
                            actions.changeFavorite(e.id, "feed", searchTerm);
                          }}
                        ></i>
                        {e.likes.length}
                      </div>
                    ) : (
                      <div className="il-feed fontprueba corazon-like text-white">
                        <i
                          className="star-2 fas fa-star text-warning me-2"
                          type="button"
                          onClick={() => {
                            actions.changeFavorite(e.id, "feed", searchTerm);
                          }}
                        ></i>
                        {e.likes.length}
                      </div>
                    )}
                  </div>

                  {/*  INFORMATION */}

                  <Link
                    className="a-style"
                    to={
                      e.user_id_of_trip_creator == store.user_id
                        ? "/profile/" + e.user_id_of_trip_creator
                        : "/noEditProfile/" + e.user_id_of_trip_creator
                    }
                    style={{ textDecoration: "none", fontWeight: "900" }}
                  >
                    <img
                      className="image-user1 ms-3"
                      src={e.profile_picture}
                      alt="user"
                    />
                    <div className="trip-box">
                      <h2 className="user-name">{e.username}</h2>
                    </div>
                  </Link>

                  <Link to={"/trip/" + e.id} style={{ padding: "50px" }}>
                    <div
                      className="img-content position-relative"
                      style={{
                        backgroundImage: "url(" + e.destination_picture + ")",
                        opacity: "0.9",
                      }}
                    >
                      <div className="shadow1-image1"></div>
                      <div className="shadow2-image2"></div>
                      <div className="d-flex me-5 position-absolute top-0 end-0 mt-2">
                        <p className="destination-title1">
                          <i className="fas fa-map-marker-alt"></i>{" "}
                          {e.destination}
                        </p>
                      </div>
                      <></>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Fragment>
  );
};
