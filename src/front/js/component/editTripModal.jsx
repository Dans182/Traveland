import React, { Fragment, useContext, useState } from "react";
import { Context } from "../store/appContext.jsx";
import { useHistory } from "react-router-dom";
import "../../styles/createTripModal.css";

export const EditTripModal = ({ closeModal, editTrip, trip }) => {
  const { store, actions } = useContext(Context);
  const [infoError, setInfoError] = useState(false);
  const [infoCheck, setInfoCheck] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const history = useHistory();
  const special = [
    "$",
    "#",
    "*",
    "@",
    "-",
    "(",
    ")",
    "!",
    "^",
    "?",
    "/",
    "=",
    "+",
    "[",
    "]",
    ",",
    "%",
    "{",
    "}",
    "'",
    '"',
    "<",
    ">",
    "|",
    "¨",
    "`",
    ":",
    ";",
    "¿",
    "·",
    "&",
    "¡",
  ];
  const numberList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const bannerChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      editTrip({
        ...trip,
        destination_picture: e.target.files[0],
      });
      setSelectedImage(e.target.files[0]);
    }
  };

  const disablePastDate = () => {
    const today = new Date();
    const dd = String(today.getDate() + 1).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };

  const messageError = () => {
    setInfoError(true);
    setInfoCheck(false);
  };

  const messageCheck = () => {
    setInfoCheck(true);
    setInfoError(false);
  };

  const numbers = (element) => {
    if (element) {
      if (Array.isArray(numberList)) {
        for (let value of numberList) {
          for (let x of element) {
            if (value == x) {
              return true;
            } else false;
          }
        }
      } else {
        return false;
      }
    }
  };

  const onlyLettersAndSpaces = (str) => {
    return /^[A-Ñ-Za-ñ-z\s]*$/.test(str);
  };

  const restoreState = () => {
    (trip.destination = store.trip.destination),
      (trip.cost = store.trip.cost),
      (trip.start_of_the_trip = store.trip.start_of_the_trip),
      (trip.end_of_the_trip = store.trip.end_of_the_trip),
      (trip.people = store.trip.people),
      (trip.text = store.trip.text);
  };

  const deleteTrip = async () => {
    try {
      const resp = await fetch(store.url + "deleteTrip", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(store.trip),
      });
      const data = await resp.json();
      if (resp.ok) {
        setConfirmDelete(false);
        history.push("/mytrips");
      }
    } catch (e) {}
  };

  return (
    <Fragment>
      <div
        className="modal fade show"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-modal="true"
        style={{
          display: "block",
          backdropFilter: "blur(3px) brightness(40%)",
        }}
      >
        <div className="modal-box2">
          <div className="content-head ">
            <div className="section-title">
              <h4>Edit trip</h4>
            </div>

            {/* CLOSE BUTTON */}

            <i
              type="button"
              className="close-button far fa-times-circle"
              aria-label="Close"
              onClick={() => {
                closeModal();
                restoreState();
              }}
            ></i>
          </div>
          <div className="content-body">
            <div className="banner-box">
              <img
                className="modal-banner"
                src={
                  selectedImage == undefined
                    ? store.trip.destination_picture
                    : URL.createObjectURL(selectedImage)
                }
                alt="img"
              />
            </div>
            <div className="banner-x">
              <div className="image-upload">
                <label htmlFor="file-input">
                  <img
                    className="image-selected"
                    src="https://res.cloudinary.com/dmogh4y33/image/upload/v1656708631/camera-icon-circle-21_k0bqrq.png"
                  />
                </label>
                <input
                  className=""
                  accept="image/*"
                  id="file-input"
                  type="file"
                  onChange={bannerChange}
                />
              </div>
            </div>

            {/* DESTINATION */}

            <div className="trip-first">
              <input
                type="text"
                className="input-time"
                defaultValue={store.trip.destination}
                placeholder="Destination"
                maxLength={25}
                style={
                  trip.destination == "" ||
                  store.trip.destination == 0 ||
                  !onlyLettersAndSpaces(trip.destination)
                    ? {
                        borderStyle: "solid",
                        borderWidth: "3px",
                        borderColor: "#DB2C2C",
                      }
                    : null
                }
                onChange={(e) =>
                  editTrip(
                    {
                      ...trip,
                      destination: e.target.value
                        .replace(/\b\w/g, (l) => l.toUpperCase())
                        .trim(),
                    },
                    setInfoError(false)
                  )
                }
              ></input>

              {/* PEOPLE */}

              <input
                type="number"
                min={1}
                id="people"
                className="input-time"
                defaultValue={store.trip.people}
                placeholder="Travel buddies"
                style={
                  trip.people < 1
                    ? {
                        borderStyle: "solid",
                        borderWidth: "3px",
                        borderColor: "#DB2C2C",
                      }
                    : null
                }
                onChange={(e) =>
                  editTrip(
                    { ...trip, people: e.target.value },
                    setInfoError(false)
                  )
                }
              ></input>

              {/* START OF THE TRIP */}

              <input
                type="date"
                className="input-time"
                min={disablePastDate()}
                defaultValue={store.trip.start_of_the_trip}
                placeholder="Start"
                style={
                  trip.start_of_the_trip > trip.end_of_the_trip
                    ? {
                        borderStyle: "solid",
                        borderWidth: "3px",
                        borderColor: "#DB2C2C",
                      }
                    : null
                }
                onChange={(e) =>
                  editTrip(
                    { ...trip, start_of_the_trip: e.target.value },
                    setInfoError(false)
                  )
                }
              ></input>

              {/* END OF THE TRIP */}

              <input
                id="endTrip"
                type="date"
                required
                className="input-time"
                min={disablePastDate()}
                defaultValue={store.trip.end_of_the_trip}
                placeholder="End"
                style={
                  trip.start_of_the_trip > trip.end_of_the_trip
                    ? {
                        borderStyle: "solid",
                        borderWidth: "3px",
                        borderColor: "#DB2C2C",
                      }
                    : null
                }
                onChange={(e) =>
                  editTrip(
                    { ...trip, end_of_the_trip: e.target.value },
                    setInfoError(false)
                  )
                }
              ></input>

              {/* TRANSPORT */}

              <select
                name="transporte"
                className="input-time"
                defaultValue={store.trip.transport}
                placeholder="none"
                onChange={(e) =>
                  editTrip(
                    { ...trip, transport: e.target.value },
                    setInfoError(false)
                  )
                }
              >
                <option>None</option>
                <option>Car</option>
                <option>Airplane</option>
                <option>Train</option>
                <option>Boat</option>
                <option>Bike</option>
                <option>Motorcycle</option>
              </select>

              {/* COST */}

              <input
                type="number"
                min={0}
                id="cost"
                className="input-time"
                defaultValue={store.trip.cost}
                placeholder="Cost"
                onChange={(e) =>
                  editTrip(
                    { ...trip, cost: e.target.value },
                    setInfoError(false)
                  )
                }
              ></input>
            </div>

            {/* DESCRIPTION TRIP */}

            <div className="section-text">
              <div className="text-area2">
                <textarea
                  className="text-information "
                  defaultValue={store.trip.text}
                  rows="4"
                  cols="50"
                  placeholder="About me"
                  maxLength={280}
                  onChange={(e) =>
                    editTrip(
                      {
                        ...trip,
                        text:
                          e.target.value.charAt(0).toUpperCase() +
                          e.target.value.slice(1).toLowerCase(),
                      },
                      setInfoError(false)
                    )
                  }
                ></textarea>
              </div>
            </div>
            {
              <p className="counter-text">
                {trip.text ? trip.text.length : 0}/280
              </p>
            }
          </div>
          <div className="modal-footer">
            {confirmDelete ? (
              <div
                className="trim modal fade show"
                id="exampleModal"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-modal="true"
                style={{
                  display: "block",
                  backdropFilter: "brightness(20%)",
                }}
              >
                <div className="m-delete modal-dialog">
                  <div className="trip-d modal-content">
                    <div className="modal-header">
                      <p className="modal-title" id="exampleModalLabel">
                        Are you sure you want to delete the trip?{" "}
                        <i>This action cannot be undone</i>
                      </p>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-light text-dark"
                        onClick={() => {
                          setConfirmDelete(false);
                        }}
                        data-bs-dismiss="modal"
                      >
                        No
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger text-white"
                        onClick={() => {
                          deleteTrip(true);
                        }}
                      >
                        Yes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="save-delete">
              <i
                className="delete-trip-button fa-solid fa-trash"
                title="delete trip"
                style={{ fontSize: "20px" }}
                onClick={() => {
                  setConfirmDelete(true);
                }}
              ></i>

              {/* SAVE BUTTON */}

              <button
                className="save-button-2"
                onClick={() => {
                  if (
                    onlyLettersAndSpaces(trip.destination) &&
                    trip.start_of_the_trip < trip.end_of_the_trip &&
                    !trip.destination == "" &&
                    trip.people >= 1
                  ) {
                    actions.editTrip(trip), closeModal();
                  } else {
                    messageError();
                  }
                }}
              >
                save
              </button>
            </div>
          </div>

          {trip.people < 1 && trip.people != "" ? (
            <div className="message-error">
              <i className="icon-error fas fa-exclamation-circle"></i>
              <p>At least one travel companion</p>
            </div>
          ) : null}

          {trip.destination == "" ||
          trip.start_of_the_trip.length == 0 ||
          trip.end_of_the_trip.length == 0 ? (
            <div className="message-error">
              <i className="icon-error fas fa-exclamation-circle"></i>
              <p>the field is required</p>
            </div>
          ) : null}

          {!onlyLettersAndSpaces(trip.destination) ? (
            <div className="message-error">
              <i className="icon-error fas fa-exclamation-circle"></i>
              <p>Only letters</p>
            </div>
          ) : null}

          {trip.start_of_the_trip > trip.end_of_the_trip &&
          trip.start_of_the_trip != "" &&
          trip.end_of_the_trip != "" ? (
            <div className="message-error">
              <i className="icon-error fas fa-exclamation-circle"></i>
              <p>the dates do not match</p>
            </div>
          ) : null}

          {infoError == true ? (
            <div className="message-error">
              <i className="icon-error2 fas fa-exclamation-circle"></i>
              <p>please write the fields correctly </p>
            </div>
          ) : null}
        </div>
      </div>
    </Fragment>
  );
};
