import React, { Fragment, useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.jsx";
import { useHistory, useParams, Link } from "react-router-dom";
import { SendMessageModal } from "../component/sendMessageModal.jsx";
import { EditTripModal } from "../component/editTripModal.jsx";
import { EditInfoTrip } from "../component/editInfoTrip.jsx";
import { EditGaleryModal } from "../component/editGaleryModal.jsx";
import { TravelBuddies } from "../component/travelBuddies.jsx";
import { GoogleMapsApi } from "../component/googleMapsApi.jsx";
import moment from "moment";
import "../../styles/trip.css";
import "../../styles/imageGalery.css";

export const Trip = () => {
  const { store, actions } = useContext(Context);
  const { id } = useParams();
  const [modalMessage, setModalMessage] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalInfo, setModalInfo] = useState(false);
  const [editGalery, setEditGalery] = useState(false);
  const history = useHistory();
  const [message, setMessage] = useState({});
  const [trip, setTrip] = useState({ likes: [] });

  useEffect(() => {
    actions.verify();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    actions.getTrip(id);
    if (!store.trip) {
      history.push("/feed");
    }
  }, []);

  useEffect(() => {
    setTrip(store.trip);
    setMessage({ ...message, trip_id: store.trip.id });
  }, [store.trip]);

  return (
    <Fragment>
      {trip ? (
        <>
          {modalMessage ? (
            <SendMessageModal
              message={message}
              setMessage={(x) => {
                setMessage({ ...message, message: x });
              }}
              closeModal={() => {
                setModalMessage(false);
              }}
            />
          ) : null}

          {modalEdit ? (
            <EditTripModal
              closeModal={() => {
                setModalEdit(false);
              }}
              editTrip={(trip) => {
                setTrip(trip);
              }}
              trip={trip}
            />
          ) : null}

          {modalInfo ? (
            <EditInfoTrip
              closeModal={() => {
                setModalInfo(false);
              }}
              editTrip={(trip) => {
                setTrip(trip);
              }}
              trip={trip}
            />
          ) : null}

          <div className="footer-abajo">
            <section className="trip-user">
              <div className="trip-content">
                {/*Banner*/}

                <div
                  className="font-page"
                  style={{
                    backgroundImage:
                      "url(" + store.trip.destination_picture + ")",
                    opacity: "0.9",
                  }}
                >
                  <div className="shadow-page"></div>
                  <div className="avatar-trip">
                    <Link
                      to={
                        store.trip.user_id_of_trip_creator == store.user_id
                          ? "/profile/" + store.trip.user_id_of_trip_creator
                          : "/noEditProfile/" +
                            store.trip.user_id_of_trip_creator
                      }
                    >
                      <img src={store.trip.profile_picture} alt="img" />
                    </Link>
                  </div>
                  <div className="trip-data">
                    <p className="info-user">
                      <i className="rute fas fa-map-marker-alt"></i>
                      {store.trip.destination}
                    </p>
                  </div>

                  {new Date(store.trip.start_of_the_trip) > new Date() ? (
                    <div className="match-position">
                      <ul className="list-position">
                        <li className="suin">
                          {store.trip.user_id_of_trip_creator !=
                          store.user_id ? (
                            <button
                              type="button"
                              className="match-button color-9 "
                              onClick={() => {
                                setModalMessage(true);
                              }}
                            >
                              JOIN YOU
                            </button>
                          ) : null}
                        </li>
                      </ul>
                    </div>
                  ) : null}

                  <div className="datos-like">
                    <ul className="lista-perfil">
                      <li>
                        <i
                          type="button"
                          className={
                            store.trip.likes &&
                            store.trip.likes.includes(store.user_id)
                              ? "star-3 fas fa-star text-warning me-2"
                              : "star-3 far fa-star me-2"
                          }
                          onClick={() => {
                            actions.changeFavorite(store.trip.id, "trip");
                          }}
                        ></i>
                        {store.trip.likes ? store.trip.likes.length : 0}
                      </li>
                    </ul>
                  </div>
                  {store.user_id == store.trip.user_id_of_trip_creator ? (
                    <div className="edit-options">
                      <button
                        type="button"
                        title="click to edit"
                        onClick={() => {
                          setModalEdit(true);
                        }}
                      >
                        Edit trip
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            </section>
            <div className="mt-3">
              <h3 className="text-center">
                <b>
                  <Link
                    id="RouterNavLink"
                    to={
                      store.trip.user_id_of_trip_creator == store.user_id
                        ? "/profile/" + store.trip.user_id_of_trip_creator
                        : "/noEditProfile/" + store.trip.user_id_of_trip_creator
                    }
                    className="user-informations"
                  >
                    {store.trip.user_firstname} {store.trip.user_lastname}
                  </Link>
                </b>
              </h3>
              <h5 className="user-city text-center">
                {store.trip.user_city_of_residence +
                  " - " +
                  store.trip.user_country}
              </h5>
              <div className="container">
                <div className="place-description  mb-4 border-top border-bottom text-left justify-content-center">
                  <p className="text-description mt-3 text-break">
                    {store.trip.text}
                  </p>
                </div>

                {/* FEATURES */}

                <div className="icon-box">
                  <li className="li-icon">
                    <i className="icon-options fas fa-user-friends"></i>
                    {store.trip.trip_in_match
                      ? store.trip.trip_in_match.filter(
                          (x) => x.accepted == true
                        ).length
                      : 0}
                    /{store.trip.people}
                  </li>
                  <li className="li-icon">
                    <i className="icon-options fas fa-route"> </i>
                    {store.trip.transport}{" "}
                  </li>
                  <li className="li-icon">
                    <i className="icon-options fas fa-coins"> </i>
                    {store.trip.cost} €{" "}
                  </li>
                  <li className="li-icon">
                    <i className="icon-options fas fa-clock"> </i>
                    {moment(store.trip.start_of_the_trip).format("LL")} -{" "}
                    {moment(store.trip.end_of_the_trip).format("LL")}
                  </li>
                </div>

                {/*  TRAVEL BUDDIES */}

                <TravelBuddies />

                {/* TRIP INFORMATION */}

                <div
                  className="position-static d-block py-3"
                  tabIndex="-1"
                  role="dialog"
                  id="modalChoice"
                >
                  {/* API GOOGLE MAPS */}

                  <div className="mt-4 ">
                    <GoogleMapsApi />

                    {/* IMAGE GALERY */}

                    {editGalery ? (
                      <EditGaleryModal
                        closeModal={() => {
                          setEditGalery(false);
                        }}
                        editTrip={(trip) => {
                          setTrip(trip);
                        }}
                        trip={trip}
                      />
                    ) : null}

                    <div
                      className="position-static d-block py-3 mt-5"
                      tabIndex="-1"
                      role="dialog"
                      id="modalChoice"
                    >
                      <div className="galery-box  position-static d-block py-3 ">
                        <div className="">
                          <ul className="list-unstyled d-flex justify-content-around">
                            <li className="square1"></li>
                            <li className="">
                              <h3
                                className="travel-title mt-2  text-dark"
                                style={{ color: "white" }}
                              >
                                <b className="t-rute">Galery</b>
                              </h3>
                            </li>
                            {store.user_id ==
                            store.trip.user_id_of_trip_creator ? (
                              <li>
                                <div className="edit-galery">
                                  <button
                                    type="button"
                                    title="add image"
                                    onClick={() => {
                                      setEditGalery(true);
                                    }}
                                  >
                                    <i className="fas fa-camera"></i>
                                  </button>
                                </div>
                              </li>
                            ) : (
                              <li className="square1"></li>
                            )}
                          </ul>
                        </div>

                        {/* img 1 */}

                        <div>
                          <div className="row row-cols-1 align-items-stretch g-4 pt-1">
                            <div className="d-flex overflow-auto">
                              <div className="galery-wrapper">
                                <div
                                  className="pe-3"
                                  style={{ width: "410px" }}
                                >
                                  <div
                                    className="galery-img d-flex text-white align-items-end "
                                    style={{
                                      backgroundImage:
                                        "url(" + store.trip.imagen_1 + ")",
                                    }}
                                  >
                                    <div
                                      className="d-flex flex-column text-white "
                                      style={{
                                        minHeight: "40px",
                                        minWidth: "210px",
                                        display: "block",
                                      }}
                                    >
                                      <ul className="card-text-box list-unstyled ms-3">
                                        <li className="mb-1">
                                          <h2></h2>
                                        </li>
                                      </ul>
                                      <div className="shadow-card-image"></div>
                                    </div>
                                  </div>
                                </div>

                                {/* img 2 */}

                                <div
                                  className="pe-3"
                                  style={{ width: "410px" }}
                                >
                                  <div
                                    className="galery-img d-flex text-white align-items-end "
                                    style={{
                                      backgroundImage:
                                        "url(" + store.trip.imagen_2 + ")",
                                    }}
                                  >
                                    <div
                                      className="d-flex flex-column text-white "
                                      style={{
                                        minHeight: "40px",
                                        minWidth: "210px",
                                        display: "block",
                                      }}
                                    >
                                      <ul className="card-text-box list-unstyled ms-3">
                                        <li className="mb-1">
                                          <h2></h2>
                                        </li>
                                      </ul>
                                      <div className="shadow-card-image"></div>
                                    </div>
                                  </div>
                                </div>

                                {/* img 3 */}

                                <div
                                  className="pe-3"
                                  style={{ width: "410px" }}
                                >
                                  <div
                                    className="galery-img d-flex text-white align-items-end "
                                    style={{
                                      backgroundImage:
                                        "url(" + store.trip.imagen_3 + ")",
                                    }}
                                  >
                                    <div
                                      className="d-flex flex-column text-white "
                                      style={{
                                        minHeight: "40px",
                                        minWidth: "210px",
                                        display: "block",
                                      }}
                                    >
                                      <ul className="card-text-box list-unstyled ms-3">
                                        <li className="mb-1">
                                          <h2></h2>
                                        </li>
                                      </ul>
                                      <div className="shadow-card-image"></div>
                                    </div>
                                  </div>
                                </div>

                                {/* img 4 */}

                                <div
                                  className="pe-3"
                                  style={{ width: "410px" }}
                                >
                                  <div
                                    className="galery-img d-flex text-white align-items-end "
                                    style={{
                                      backgroundImage:
                                        "url(" + store.trip.imagen_4 + ")",
                                    }}
                                  >
                                    <div
                                      className="d-flex flex-column text-white "
                                      style={{
                                        minHeight: "40px",
                                        minWidth: "210px",
                                        display: "block",
                                      }}
                                    >
                                      <ul className="card-text-box list-unstyled ms-3">
                                        <li className="mb-1">
                                          <h2></h2>
                                        </li>
                                      </ul>
                                      <div className="shadow-card-image"></div>
                                    </div>
                                  </div>
                                </div>

                                {/* img 5 */}

                                <div
                                  className="pe-3"
                                  style={{ width: "410px" }}
                                >
                                  <div
                                    className="galery-img d-flex text-white align-items-end "
                                    style={{
                                      backgroundImage:
                                        "url(" + store.trip.imagen_5 + ")",
                                    }}
                                  >
                                    <div
                                      className="d-flex flex-column text-white "
                                      style={{
                                        minHeight: "40px",
                                        minWidth: "210px",
                                        display: "block",
                                      }}
                                    >
                                      <ul className="card-text-box list-unstyled ms-3">
                                        <li className="mb-1">
                                          <h2></h2>
                                        </li>
                                      </ul>
                                      <div className="shadow-card-image"></div>
                                    </div>
                                  </div>
                                </div>

                                {/* img 6 */}

                                <div
                                  className="pe-3"
                                  style={{ width: "410px" }}
                                >
                                  <div
                                    className="galery-img d-flex text-white align-items-end "
                                    style={{
                                      backgroundImage:
                                        "url(" + store.trip.imagen_6 + ")",
                                    }}
                                  >
                                    <div
                                      className="d-flex flex-column text-white "
                                      style={{
                                        minHeight: "40px",
                                        minWidth: "210px",
                                        display: "block",
                                      }}
                                    >
                                      <ul className="card-text-box list-unstyled ms-3">
                                        <li className="mb-1">
                                          <h2></h2>
                                        </li>
                                      </ul>
                                      <div className="shadow-card-image"></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        "loading"
      )}{" "}
    </Fragment>
  );
};
