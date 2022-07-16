import React, { Fragment, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import "../../styles/editInformationModal.css";
import ReactTooltip from 'react-tooltip';

export const EditInformationModal = ({ closeModal, editUser, user }) => {
  const { store, actions } = useContext(Context);
  const history = useHistory();
  const [infoError, setInfoError] = useState(false);
  const [infoCheck, setInfoCheck] = useState(false);
  const special = [
    " ",
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
  const [confirmDelete, setConfirmDelete] = useState(false);

  const deleteProfile = async () => {
    try {
      const resp = await fetch(store.url + "deleteProfile", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await resp.json();
      if (resp.ok) {
        setConfirmDelete(false);
        history.push("/");
        actions.logout();
      }
    } catch (e) { }
  };

  const messageError = () => {
    setInfoError(true);
    setInfoCheck(false);
  };

  const messageCheck = () => {
    setInfoCheck(true);
    setInfoError(false);
  };

  const onlyLettersAndNumbers = (element) => {
    return /^[A-Ñ-Za-ñ-z0-9]*$/.test(element);
  }

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
        <div className="modal-box1">
          <div className="content-head ">
            <div className="section-title">
              <h4>Edit Profile</h4>
            </div>

            {/* CLOSE BUTTON */}

            <i
              type="button"
              className="close-button far fa-times-circle"
              aria-label="Close"
              onClick={() => {
                closeModal();
              }}
            ></i>
          </div>
          <div className="content-body">

            {/* USERNAME */}

            <div className="section-user">
              <div className="section-username">
                <input
                  className="input-username"
                  type="text"
                  maxLength={20}
                  defaultValue={store.user.username}
                  id="username"
                  name="Username"
                  data-tip data-for="botonTooltipUsername"
                  placeholder="Username"
                  style={user.username == "" || !onlyLettersAndNumbers(user.username) ? { borderStyle: "solid", borderWidth: "2px", borderColor: '#DB2C2C' } : null}
                  onChange={(e) =>
                    editUser(
                      { ...user, username: e.target.value },
                      setInfoError(false),
                      setInfoCheck(false)
                    )
                  }
                ></input>
              </div>
            </div>

            {user.username == "" ?
              <ReactTooltip id="botonTooltipUsername"
                type="error" className="tooltip-style">
                The field is required.
              </ReactTooltip> : !onlyLettersAndNumbers(user.username) ?
                <ReactTooltip id="botonTooltipUsername"
                  type="error" className="tooltip-style">
                  Please remove any special characters.
                </ReactTooltip> : null}

            {/* FIRSTNAME AND LASTNAME */}

            <div className="section-info">
              <div className="section-first">
                <input
                  className="input-style"
                  type="text"
                  maxLength={30}
                  defaultValue={store.user.firstname}
                  id="first"
                  name="First"
                  data-tip data-for="botonTooltipFirstname"
                  placeholder="First name"
                  style={(user.firstname == "" || !onlyLettersAndNumbers(user.firstname) ? { borderStyle: "solid", borderWidth: "2px", borderColor: '#DB2C2C' } : null)}
                  onChange={(e) =>
                    editUser(
                      {
                        ...user,
                        firstname: e.target.value,
                      },
                      setInfoError(false),
                      setInfoCheck(false)
                    )
                  }
                ></input>
              </div>

              {user.firstname == "" ?
                <ReactTooltip id="botonTooltipFirstname"
                  type="error" className="tooltip-style">
                  The field is required.
                </ReactTooltip> : !onlyLettersAndNumbers(user.firstname) ?
                  <ReactTooltip id="botonTooltipFirstname"
                    type="error" className="tooltip-style">
                    Please remove any special characters.
                  </ReactTooltip> : null}

              <div className="section-last">
                <input
                  className="input-style"
                  type="text"
                  maxLength={15}
                  defaultValue={store.user.lastname}
                  id="last"
                  name="Last"
                  data-tip data-for="botonTooltipLastname"
                  placeholder="Last name"
                  style={(user.lastname == "" || !onlyLettersAndNumbers(user.lastname) ? { borderStyle: "solid", borderWidth: "2px", borderColor: '#DB2C2C' } : null)}
                  onChange={(e) =>
                    editUser(
                      {
                        ...user,
                        lastname: e.target.value,
                      },
                      setInfoError(false),
                      setInfoCheck(false)
                    )
                  }
                ></input>
              </div>
            </div>

            {user.lastname == "" ?
              <ReactTooltip id="botonTooltipLastname"
                type="error" className="tooltip-style">
                The field is required.
              </ReactTooltip> : !onlyLettersAndNumbers(user.lastname) ?
                <ReactTooltip id="botonTooltipLastname"
                  type="error" className="tooltip-style">
                  Please remove any special characters.
                </ReactTooltip> : null}

            {/* CITY AND COUNTRY OF RESIDENCE */}

            <div className="section-info">
              <div className="section-first">
                <input
                  className="input-style"
                  type="text"
                  maxLength={18}
                  defaultValue={store.user.city_of_residence}
                  id="city"
                  name="City"
                  placeholder="City"
                  onChange={(e) =>
                    editUser(
                      {
                        ...user,
                        city_of_residence:
                          e.target.value.replace(/\b\w/g, l => l.toUpperCase()).trim()
                      },
                      setInfoError(false),
                      setInfoCheck(false)
                    )
                  }
                ></input>
              </div>
              <div className="section-last">
                <input
                  className="input-style"
                  type="text"
                  maxLength={18}
                  defaultValue={store.user.country}
                  id="country"
                  name="Country"
                  placeholder="Country"
                  onChange={(e) =>
                    editUser(
                      {
                        ...user,
                        country:
                          e.target.value.charAt(0).toUpperCase() +
                          e.target.value.slice(1).toLowerCase(),
                      },
                      setInfoError(false),
                      setInfoCheck(false)
                    )
                  }
                ></input>
              </div>
            </div>

            {/* ABOUT ME */}

            <div className="section-text">
              <div className="text-area">
                <textarea
                  className="text-information "
                  defaultValue={store.user.description}
                  rows="4"
                  cols="50"
                  placeholder="About me"
                  maxLength={280}
                  onChange={(e) =>
                    editUser(
                      {
                        ...user,
                        description:
                          e.target.value.charAt(0).toUpperCase() +
                          e.target.value.slice(1).toLowerCase(),
                      },
                      setInfoError(false),
                      setInfoCheck(false)
                    )
                  }
                ></textarea>
              </div>
              {
                <p className="counter-bio">
                  {user.description ? user.description.length : 0}/280
                </p>
              }
            </div>
          </div>

          {/*  DELETE PROFILE */}

          {confirmDelete ? (
            <div
              className="modal fade show"
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
              <div className="modal-dialog" style={{ marginTop: "16rem" }}>
                <div className=" delete-modal modal-content" style={{ backgroundColor: "#151d26", marginTop: "0rem" }}>
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Are you sure you want to delete the profile?{" "}
                      <i>This action cannot be undone</i>
                    </h5>
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
                        deleteProfile(true);
                      }}
                    >
                      Yes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          <div className="">
            <div className="buttons-footer">
              <i
                className="delete-profile fa-solid fa-trash"
                type="button"
                title="Click to delete profile"
                style={{ fontSize: "20px" }}
                onClick={() => {
                  setConfirmDelete(true);
                }}
              ></i>

              {/* SAVE BUTTON */}

              <button
                className="save-button"
                onClick={() => {
                  if (
                    onlyLettersAndNumbers(user.username) &&
                    onlyLettersAndNumbers(user.firstname) &&
                    onlyLettersAndNumbers(user.lastname) &&
                    user.username != "" &&
                    user.firstname != "" &&
                    user.lastname != ""
                  ) {
                    messageCheck();
                    actions.editUser(user);
                  } else {
                    messageError();
                  }
                }}
              >
                save
              </button>
            </div>
          </div>
          {infoCheck == true ? (
            <div className="message-check">
              <i className="icon-check fas fa-check-circle"></i>
              <p>Changes saved</p>
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
    </Fragment >
  );
};
