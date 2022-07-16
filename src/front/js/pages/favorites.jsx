import React, { Fragment, useContext, useEffect } from "react";
import { Context } from "../store/appContext.jsx";
import { Link } from "react-router-dom";
import moment from "moment";
import "../../styles/favorites.css";

export const Favorites = () => {
  const { actions, store } = useContext(Context);
  let favCount = 0;
  favCount = store.user.likes.length;

  useEffect(() => {
    actions.verify();
    actions.getUser();
  }, []);

  return (
    <Fragment>
      <div className="footer-abajo">
        <div className="favorites-box position-static d-block py-1 mt-5">
          {store.user.likes && store.user.likes.length > 0 ? (
            <h3
              className="travel-title mt-3 mb-3 text-center"
              style={{ color: "white" }}
            >
              <b>Favorites {favCount}</b>
            </h3>
          ) : null}

          {/* WRAPPER */}

          <div>
            <div className="start-div d-flex overflow-auto">
              <div className="wrapper-favorites">
                <div className="container">
                  {store.user.likes && store.user.likes.length > 0 ? (
                    store.user.likes.map((e) => {
                      return (
                        <div className="favorite-box mb-3" key={e.id}>
                          <div className=""></div>
                          <div className="favorite-ul d-flex">
                            <div className="favorite-time text-white">
                              <i className="fas fa-clock"></i>{" "}
                              {moment(e.start_of_the_trip).format("LL")} -{" "}
                              {moment(e.end_of_the_trip).format("LL")}
                            </div>
                            <div className="favorite-li text-white">
                              <i className="fas fa-user-friends"></i> {e.people}{" "}
                            </div>
                            {!e.likes.includes(store.user_id) ? (
                              <div className="favorite-li text-white">
                                <i
                                  className="star far fa-star me-2"
                                  type="button"
                                  onClick={() => {
                                    actions.changeFavorite(e.id, "favorites");
                                  }}
                                ></i>
                                {e.likes.length}
                              </div>
                            ) : (
                              <div className="favorite-li fontprueba corazon-like text-white">
                                <i
                                  className="star-2 fas fa-star text-warning"
                                  type="button"
                                  onClick={() => {
                                    actions.changeFavorite(e.id, "favorites");
                                  }}
                                ></i>
                                {e.likes.length}
                              </div>
                            )}
                          </div>

                          {/*  INFORMATION */}

                          <Link
                            to={
                              e.user_id_of_trip_creator == store.user_id
                                ? "/profile/" + e.user_id_of_trip_creator
                                : "/noEditProfile/" + e.user_id_of_trip_creator
                            }
                            style={{ textDecoration: "none" }}
                          >
                            <img
                              className="favorite-picture ms-3"
                              src={e.profile_picture}
                              alt="user"
                            />
                            <div className="favorite-username">
                              <h4 className="text-white">{e.username}</h4>
                            </div>
                          </Link>

                          <Link to={"/trip/" + e.id}>
                            <div
                              className="favorite-destination position-relative"
                              style={{
                                backgroundImage:
                                  "url(" + e.destination_picture + ")",
                              }}
                            >
                              <div className="shadow-image"></div>
                              <div className="shadowf-image1"></div>
                              <div className="shadowf-image2"></div>
                              <div className="d-flex me-4 position-absolute top-0 end-0 mt-3">
                                <p className="favorite-title text-white">
                                  <i className="fas fa-map-marker-alt"></i>{" "}
                                  {e.destination}
                                </p>
                              </div>
                            </div>
                          </Link>
                        </div>
                      );
                    })
                  ) : (
                    <h5 className="travel-title text-center text-white mt-4">
                      No favorites.
                    </h5>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
