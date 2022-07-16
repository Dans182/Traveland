import React, { Fragment, useContext, useState } from "react";
import { Context } from "../store/appContext.jsx";
import "../../styles/createTripModal.css";
import ReactTooltip from "react-tooltip";

export const CreateTripModal = ({ closeModal, createTrip, trip }) => {
  const { store, actions } = useContext(Context);
  const [infoError, setInfoError] = useState(false);
  const [infoCheck, setInfoCheck] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
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
      createTrip({ ...trip, destination_picture: e.target.files[0] }),
        setSelectedImage(e.target.files[0]);
    }
  };

  const messageError = () => {
    setInfoError(true);
    setInfoCheck(false);
  };

  const messageCheck = () => {
    setInfoCheck(true);
    setInfoError(false);
  };

  const _onFocus = (e) => {
    e.currentTarget.type = "date";
  };

  const specialCharacters = (element) => {
    if (element) {
      if (Array.isArray(special)) {
        for (let value of special) {
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

  const deleteTripState = () => {
    trip.destination = "";
    trip.people = "";
    trip.transport = "";
    trip.start_of_the_trip = "";
    trip.end_of_the_trip = "";
    trip.cost = "";
    trip.text = "";
    trip.destination_picture = "";
  };

  const disablePastDate = () => {
    const today = new Date();
    const dd = String(today.getDate() + 1).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
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
              <h4>Create a trip</h4>
            </div>

            {/* CLOSE BUTTON */}

            <i
              type="button"
              className="close-button far fa-times-circle"
              aria-label="Close"
              onClick={() => {
                deleteTripState();
                closeModal();
              }}
            ></i>
          </div>
          <div className="content-body">
            <div className="banner-box">
              <img
                className="modal-banner"
                src={
                  selectedImage == undefined
                    ? "https://res.cloudinary.com/dmogh4y33/image/upload/v1656681829/d_hivrmb.jpg"
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
                placeholder="Destination"
                maxLength={25}
                data-tip
                data-for="botonTooltipDestination"
                style={
                  trip.destination.length == "" ||
                  !onlyLettersAndSpaces(trip.destination)
                    ? {
                        borderStyle: "solid",
                        borderWidth: "2px",
                        borderColor: "#DB2C2C",
                      }
                    : null
                }
                onChange={(e) =>
                  createTrip(
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
                data-tip
                data-for="botonTooltipBuddies"
                placeholder="Travel buddies"
                style={
                  trip.people < 1
                    ? {
                        borderStyle: "solid",
                        borderWidth: "2px",
                        borderColor: "#DB2C2C",
                      }
                    : null
                }
                onChange={(e) =>
                  createTrip(
                    {
                      ...trip,
                      people:
                        e.target.value.charAt(0).toUpperCase() +
                        e.target.value.slice(1).toLowerCase(),
                    },
                    setInfoError(false)
                  )
                }
              ></input>

              {/* START OF THE TRIP */}

              <input
                type="text"
                name="date"
                className="input-time"
                min={disablePastDate()}
                placeholder="Depart"
                onFocus={_onFocus}
                data-tip
                data-for="botonTooltipStart"
                style={
                  trip.start_of_the_trip == "" ||
                  trip.start_of_the_trip > trip.end_of_the_trip
                    ? {
                        borderStyle: "solid",
                        borderWidth: "2px",
                        borderColor: "#DB2C2C",
                      }
                    : null
                }
                onChange={(e) =>
                  onlyLettersAndSpaces(
                    createTrip(
                      {
                        ...trip,
                        start_of_the_trip:
                          e.target.value.charAt(0).toUpperCase() +
                          e.target.value.slice(1).toLowerCase(),
                      },
                      setInfoError(false)
                    )
                  )
                }
              ></input>

              {/* END OF THE TRIP */}

              <input
                id="endTrip"
                type="text"
                required
                min={disablePastDate()}
                className="input-time"
                placeholder="Return"
                onFocus={_onFocus}
                data-tip
                data-for="botonTooltipEnd"
                style={
                  trip.start_of_the_trip > trip.end_of_the_trip ||
                  trip.end_of_the_trip == ""
                    ? {
                        borderStyle: "solid",
                        borderWidth: "2px",
                        borderColor: "#DB2C2C",
                      }
                    : null
                }
                onChange={(e) =>
                  createTrip(
                    {
                      ...trip,
                      end_of_the_trip:
                        e.target.value.charAt(0).toUpperCase() +
                        e.target.value.slice(1).toLowerCase(),
                    },
                    setInfoError(false)
                  )
                }
              ></input>

              {/* TRANSPORT */}

              <select
                name="transporte"
                className="input-time"
                placeholder="none"
                onChange={(e) =>
                  createTrip(
                    {
                      ...trip,
                      transport:
                        e.target.value.charAt(0).toUpperCase() +
                        e.target.value.slice(1).toLowerCase(),
                    },
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
                max={9999}
                min={0}
                id="cost"
                className="input-time"
                data-tip
                data-for="botonTooltipCost"
                placeholder="Cost"
                style={
                  specialCharacters(trip.cost)
                    ? {
                        borderStyle: "solid",
                        borderWidth: "2px",
                        borderColor: "#DB2C2C",
                      }
                    : null
                }
                onChange={(e) =>
                  createTrip(
                    {
                      ...trip,
                      cost:
                        e.target.value.charAt(0).toUpperCase() +
                        e.target.value.slice(1).toLowerCase(),
                    },
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
                    createTrip(
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
          <div className="">
            <div className="save-footer">
              {/* SAVE BUTTON */}

              <button
                className="save-button-3"
                onClick={() => {
                  if (
                    trip.destination != "" &&
                    onlyLettersAndSpaces(trip.destination) &&
                    trip.start_of_the_trip != "" &&
                    trip.end_of_the_trip != "" &&
                    trip.start_of_the_trip < trip.end_of_the_trip &&
                    trip.people >= 1 &&
                    trip.people != "" &&
                    !specialCharacters(trip.cost)
                  ) {
                    actions.createTrip(trip), closeModal();
                  } else {
                    messageError();
                  }
                }}
              >
                save
              </button>
            </div>
          </div>

          {trip.people == "" ? (
            <ReactTooltip
              id="botonTooltipBuddies"
              type="error"
              className="tooltip-style"
            >
              The field is required.
            </ReactTooltip>
          ) : trip.people < 1 ? (
            <ReactTooltip
              id="botonTooltipBuddies"
              type="error"
              className="tooltip-style"
            >
              min one travel buddie.
            </ReactTooltip>
          ) : null}

          {trip.destination == "" ? (
            <ReactTooltip
              id="botonTooltipDestination"
              type="error"
              className="tooltip-style"
            >
              The field is required.
            </ReactTooltip>
          ) : !onlyLettersAndSpaces(trip.destination) ? (
            <ReactTooltip
              id="botonTooltipDestination"
              type="error"
              className="tooltip-style"
            >
              Sorry, only letters (A-Z).
            </ReactTooltip>
          ) : null}

          {trip.start_of_the_trip.length == "" ? (
            <ReactTooltip
              id="botonTooltipStart"
              type="error"
              className="tooltip-style"
            >
              The field is required.
            </ReactTooltip>
          ) : trip.start_of_the_trip > trip.end_of_the_trip ? (
            <ReactTooltip
              id="botonTooltipStart"
              type="error"
              className="tooltip-style"
            >
              The dates do not match.
            </ReactTooltip>
          ) : null}

          {trip.end_of_the_trip.length == "" ? (
            <ReactTooltip
              id="botonTooltipEnd"
              type="error"
              className="tooltip-style"
            >
              The field is required.
            </ReactTooltip>
          ) : trip.start_of_the_trip > trip.end_of_the_trip ? (
            <ReactTooltip
              id="botonTooltipEnd"
              type="error"
              className="tooltip-style"
            >
              The dates do not match.
            </ReactTooltip>
          ) : null}

          {specialCharacters(trip.cost) ? (
            <ReactTooltip
              id="botonTooltipCost"
              type="error"
              className="tooltip-style"
            >
              invalid field.
            </ReactTooltip>
          ) : null}

          {infoError == true ? (
            <div className="message-error-1">
              <i className="icon-error2 fas fa-exclamation-circle"></i>
              <p>please write the fields correctly </p>
            </div>
          ) : null}
        </div>
      </div>
    </Fragment>
  );
};
