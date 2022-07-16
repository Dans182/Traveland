import React, { Fragment, useContext, useEffect } from "react";
import { Context } from "../store/appContext.jsx";
import "../../styles/myTrips.css";
import moment from "moment";
import { Link } from "react-router-dom";

export const MyTrips = () => {
  const { actions, store } = useContext(Context);

  useEffect(() => {
    actions.verify();
    if (store.trip) {
      actions.getUserTrips();
    }
  }, []);

  return (
    <Fragment>
      <div className="footer-abajo">
        <div className="content-mytrips mt-5 pt-1">
          {store.userTrips && store.userTrips.length > 0 ? (
            <h2 className="title-myTrips text-center mt-4">My trips</h2>
          ) : (
            <h3 className="text-center text-white mt-4">
              You don't have trips created.
            </h3>
          )}
          <div className="box-mytrips">
            <div className="content-trips">
              {store.userTrips.map((trip) => {
                return (
                  <Link
                    to={"/trip/" + trip.id}
                    key={trip.id}
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      className="card-trip"
                      style={{
                        backgroundImage:
                          "url(" + trip.destination_picture + ")",
                      }}
                    >
                      <div className="text-mytrips text-white">
                        <h2 className="title-index">{trip.destination}</h2>
                        <p className="text-index">
                          <i className="fas fa-user-friends mt-2 me-2"></i>
                          {trip.people}
                        </p>
                        <p className="text-index">
                          <i className="fas fa-user-friends mt-2 me-2"></i>
                          {trip.transport}
                        </p>
                        <p className="text-index">
                          {" "}
                          <i className="fas fa-clock mt-2 me-2"></i>
                          {moment(trip.start_of_the_trip).format("LL")} -{" "}
                          {moment(trip.end_of_the_trip).format("LL")}
                        </p>
                        <div className="shadow1-mytrips1"></div>
                        <div className="shadow2-mytrips2"></div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
