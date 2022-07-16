import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.jsx";
import { Link, useParams } from "react-router-dom";
import { ChangeBannerModal } from "../component/changeBannerModal.jsx";
import { EditInformationModal } from "../component/editInformationModal.jsx";
import { ChangePhotoModal } from "../component/changePhotoModal.jsx";
import { CreateTripModal } from "../component/createTripModal.jsx";
import moment from "moment";
import "../../styles/profile.css";

export const Profile = () => {
  const { store, actions } = useContext(Context);
  const [showEdit, setShowEdit] = useState(false);
  const [showEdit2, setShowEdit2] = useState(false);
  const [showPhoto, setShowPhoto] = useState(false);
  const [showCreateTrip, setShowCreateTrip] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [user, setUser] = useState();
  const [trip, setTrip] = useState({});
  const { id } = useParams();

  useEffect(() => {
    actions.verify();
    actions.getProfile(id);
    actions.getUserTrips();
    actions.getUserProfiles();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    actions.getProfile(id);
  }, [store.user]);

  return (
    <div>
      <section className="user-profile">
        <div className="content-profile">
          <div
            className="portada-perfil"
            style={{
              backgroundImage: "url(" + store.profile.banner_picture + ")",
            }}
          >
            <div className="shadow-banner"></div>
            <div className="avatar-picture-profile">
              <img src={store.profile.profile_picture} alt="img" />
              <a
                href="#"
                className="cambiar-foto"
                onClick={(e) => {
                  setShowPhoto(true);
                  setUser(store.profile);
                }}
              >
                <i className="fas fa-camera"></i>
                <span style={{ fontSize: "14px" }}>Change photo</span>
              </a>

              <label htmlFor="inputTag" className="label-style">
                Cover image <br />
                <i className="fa fa-2x fa-camera"></i>
                <input
                  id="inputTag"
                  className="input-style "
                  type="file"
                  name="ratata"
                />
              </label>
            </div>
            <div className="data-profile">
              <h4 className="user-title">@{store.profile.username}</h4>
            </div>
            <div className="options-profile">
              <button
                type="button"
                onClick={(e) => {
                  setShowEdit(true);
                  setUser(store.profile);
                }}
              >
                <i className="fas fa-pencil" title="click to edit"></i>
              </button>
            </div>
          </div>
          <div className="information-box pt-1">
            {/*  boton 2 */}
            <div className="name-pencil">
              <i
                type="button"
                className="pencil-icon fas fa-pencil"
                title="click to edit information"
                onClick={(e) => {
                  setShowEdit2(true);
                  setUser(store.profile);
                }}
              ></i>
            </div>
            <h3 className="information1">
              <b>{store.profile.firstname + " " + store.profile.lastname}</b>
            </h3>

            <h5 className="information2">
              {store.profile.city_of_residence + " - " + store.profile.country}
            </h5>
            <p className="information-bio text-break">
              {store.profile.description}
            </p>
          </div>
        </div>
      </section>

      {showEdit ? (
        <ChangeBannerModal
          closeModal={() => {
            setShowEdit(false);
          }}
          editUser={(user) => {
            setUser(user);
          }}
          user={user}
        />
      ) : null}

      {showEdit2 ? (
        <EditInformationModal
          closeModal={() => {
            setShowEdit2(false);
          }}
          editUser={(user) => {
            setUser(user);
          }}
          user={user}
        />
      ) : null}

      {showPhoto ? (
        <ChangePhotoModal
          closeModal={() => {
            setShowPhoto(false);
          }}
          editUser={(user) => {
            setUser(user);
          }}
          user={user}
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

      {showCreateTrip ? (
        <CreateTripModal
          closeModal={() => {
            setShowCreateTrip(false);
          }}
          createTrip={(trip) => {
            setTrip(trip);
          }}
          trip={trip}
        />
      ) : null}

      <div className="container mt-2">
        <div className="py-2 border-top text-left justify-content-center"></div>
      </div>

      {/*MY TRIPS*/}

      <div className="content-trip-box container">
        <div>
          <div className="text-center">
            <h2>
              <b className="myTrips-title">My Trips</b>
            </h2>
          </div>
          <div className=" ">
            <div className="d-flex overflow-auto">
              <button
                className="button-add-trip btn text-light mt-4"
                style={{ height: "350px" }}
                title="click to create a trip"
                onClick={() => {
                  setShowCreateTrip(true);
                  trip.destination = "";
                  trip.start_of_the_trip = "";
                  trip.end_of_the_trip = "";
                  trip.people = "";
                }}
              >
                <i className="fas fa-plus"></i>
              </button>
              <div className="wrapper-trips">
                {store.userTrips.length > 0 ? (
                  store.userTrips.map((e) => {
                    return (
                      <div
                        key={e.id}
                        className="col container "
                        style={{ width: "280px", marginRight: "25px" }}
                      >
                        <Link
                          style={{ textDecoration: "none" }}
                          to={"/trip/" + e.id}
                        >
                          <div
                            className="card-image-box d-flex text-white bg-dark align-items-end "
                            style={{
                              height: "350px",
                              width: "290px",

                              display: "block",
                              backgroundImage:
                                "url(" + e.destination_picture + ")",
                              opacity: "0.9",
                            }}
                          >
                            <div
                              className="d-flex flex-column text-white "
                              style={{
                                minHeight: "50px",
                                minWidth: "230px",
                                display: "block",
                              }}
                            >
                              <div className="card-title-area ms-3 ">
                                <h3 className="">
                                  <i className="rute fas fa-map-marker-alt"></i>
                                  {e.destination}
                                </h3>
                              </div>
                              <ul className="card-text-box list-unstyled ms-3 text-wrap">
                                <li className="mb-1">
                                  <i className="icon-size icon fas fa-user-friends">
                                    {" "}
                                    {e.people}
                                  </i>
                                </li>
                                <li className="mb-1">
                                  <i className="icon-size icon fas fa-route">
                                    {" "}
                                    {e.transport}
                                  </i>
                                </li>
                                <li className="mb-1">
                                  <i className="icon-size icon fas fa-coins">
                                    {" "}
                                    {e.cost} €
                                  </i>
                                </li>
                                <li className="mb-1">
                                  <i className="icon-size icon fas fa-clock">
                                    {" "}
                                    {moment(e.start_of_the_trip).format(
                                      "LL"
                                    )} -{" "}
                                    {moment(e.end_of_the_trip).format("LL")}
                                  </i>
                                </li>
                              </ul>
                              <div className="shadow-card-image"></div>
                              <div className="shadow-card-image2"></div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    );
                  })
                ) : (
                  <h5 className="text-trips text-center text-dark mt-4">
                    You don't have trips created yet.
                  </h5>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
