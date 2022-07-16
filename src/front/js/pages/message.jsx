import React, { useEffect, useContext, Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/message.css";

export const Message = () => {
  const { actions, store } = useContext(Context);
  const { id } = useParams();
  const [accept, setAccept] = useState(false);
  const [newMessage, setNewMessage] = useState([]);

  useEffect(() => {
    actions.verify();
  }, []);

  useEffect(() => {
    actions.readMessages();
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

  const deleteMessage = async (id) => {
    try {
      const resp = await fetch(store.url + "deleteMessage", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ id: id }),
      });
      if (resp.ok) {
        await actions.getUserTrips();
        await getMessages();
      }
    } catch (e) { }
  };
  return (
    <Fragment>
      <div className="footer-abajo">
        <div className="message-box position-static d-block py-1 mt-5 mb-4">
          {(store.match && store.match.length == 1 && newMessage && newMessage.length == 0) || (newMessage && newMessage.length == 1 && store.match && store.match.length == 0) ? (
            <h3 className="sms-title mt-3 mb-3 text-center text-white">
              <b>1 message.</b>
            </h3>
          ) : (store.match && store.match.length > 1) || (newMessage && newMessage.length > 1) ? (
            <h3 className="sms-title mt-3 mb-3 text-center text-white">
              <b>{store.match.length + newMessage.length} messages.</b>
            </h3>
          ) : null}
          <div className="d-flex overflow-auto ">
            <div className="wrapper-message">
              <div className="container">
                {(store.match && store.match.length > 0) || (newMessage && newMessage.length > 0) ? (
                  store.match
                    .sort((a, b) => a.id - b.id)
                    .map((e) => {
                      return (
                        <div key={e.id} className="mb-3" role="document">
                          <div
                            className="mss-body box-f1 modal-content rounded-4 shadow"
                            style={
                              e.accepted
                                ? { background: "#94C973" }
                                : e.rejected
                                  ? { background: "#FF7A69" }
                                  : { background: "white" }
                            }
                          >
                            <div className="text-center">
                              <div>
                                <Link
                                  to={"/noEditProfile/" + e.user_id}
                                  className="text-decoration-none"
                                ></Link>
                              </div>

                              <div className="div-delete">
                                <Link to={"/noEditProfile/" + e.user_id}>
                                  <img
                                    className="message-avatar"
                                    src={e.profile_picture}
                                    alt="img"
                                  />
                                  <p
                                    className="div-link u-name"
                                    style={
                                      e.accepted
                                        ? { color: "#130A0D" }
                                        : e.rejected
                                          ? { color: "#130A0D" }
                                          : { color: "black" }
                                    }
                                  >
                                    {e.username}{" "}
                                  </p>
                                </Link>
                                <div className="margin-buttons">
                                  <button
                                    type="button"
                                    className="delete-mss"
                                    onClick={() => actions.acceptMatch(e)}
                                    disabled={e.accepted}
                                  >
                                    {e.accepted ? (
                                      <i className="fas fa-check-circle text-light"></i>
                                    ) : (
                                      <i
                                        className="fas fa-check-circle"
                                        style={{ color: "#7ABB64" }}
                                      ></i>
                                    )}
                                  </button>
                                  <button
                                    type="button"
                                    className="delete-mss"
                                    onClick={async () => {
                                      await actions.rejectMatch(e);
                                      await deleteMessage(e.id);
                                    }}
                                  >
                                    {e.accepted ? (
                                      <i
                                        className="fas fa-times-circle text-danger"
                                        style={{
                                          background: "#ffffff",
                                          borderRadius: "50%",
                                        }}
                                      ></i>
                                    ) : (
                                      <i
                                        className="fas fa-times-circle"
                                        style={{ color: "#d20000" }}
                                      ></i>
                                    )}
                                  </button>
                                  {/* <i className="fas fa-trash"></i> */}{" "}
                                  {/* PARA BORRAR */}
                                </div>
                              </div>
                              <p
                                className="u-request"
                                style={
                                  e.accepted
                                    ? { color: "#130A0D" }
                                    : e.rejected
                                      ? { color: "#130A0D" }
                                      : { color: "#130A0D" }
                                }
                              >
                                {" "}
                                <i
                                  className="fas fa-map-marker-alt text-dark"
                                  style={{ marginRight: "3px" }}
                                ></i>{" "}
                                {e.destination}
                              </p>
                              <p
                                className="text-message rounded  text-break"
                                style={
                                  e.accepted
                                    ? { color: "#130A0D" }
                                    : e.rejected
                                      ? { color: "#130A0D" }
                                      : { color: "#130A0D" }
                                }
                              >
                                {e.message}
                              </p>
                            </div>
                            <div className="caja-botones">
                              <div className="flex-nowrap p-0"></div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                ) : (
                  <div className="abajo">
                    <h4 className="sms-title text-center text-white mt-5">
                      You have no messages.
                    </h4>
                  </div>
                )}

                {/* REPLY MESSAGE */}

                {newMessage
                  .sort((a, b) => a.id - b.id)
                  .map((e) => {
                    return (
                      <div key={e.id} className="mb-3" role="document">
                        <div
                          className="mss-body box-f1 modal-content rounded-4 shadow"
                          style={
                            e.confirmed
                              ? { background: "#6CE1DD" }
                              : e.rejected
                                ? { background: "#FF7A69" }
                                : { background: "white" }
                          }
                        >
                          <div className="text-center">
                            <div>
                              <Link
                                to={"/noEditProfile/" + e.user_id_of_trip_creator}
                                className="text-decoration-none"
                              ></Link>
                            </div>

                            <div className="div-delete">
                              <Link to={"/noEditProfile/" + e.user_id_of_trip_creator}>
                                <img
                                  className="message-avatar"
                                  src={e.user_picture}
                                  alt="img"
                                />
                                <p
                                  className="div-link u-name"
                                  style={
                                    e.accepted
                                      ? { color: "#130A0D" }
                                      : e.rejected
                                        ? { color: "#130A0D" }
                                        : { color: "black" }
                                  }
                                >
                                  {e.user_name}{" "}
                                </p>
                              </Link>
                              <div className="margin-buttons">
                                <button
                                  type="button"
                                  className="delete-mss"
                                  onClick={() => {
                                    deleteMessage(e.id);
                                  }}
                                >
                                  {e.accepted ? (
                                    <i
                                      className="fas fa-times-circle text-danger"
                                      style={{
                                        background: "#ffffff",
                                        borderRadius: "50%",
                                      }}
                                    ></i>
                                  ) : (
                                    <i
                                      className="fas fa-times-circle"
                                      style={{ color: "#d20000" }}
                                    ></i>
                                  )}
                                </button>
                                {/* <i className="fas fa-trash"></i> */}{" "}
                                {/* PARA BORRAR */}
                              </div>
                            </div>
                            <p
                              className="u-request"
                              style={
                                e.accepted
                                  ? { color: "#130A0D" }
                                  : e.rejected
                                    ? { color: "#130A0D" }
                                    : { color: "#130A0D" }
                              }
                            >
                              {" "}
                              <i
                                className="fas fa-map-marker-alt text-dark"
                                style={{ marginRight: "3px" }}
                              ></i>{" "}
                              {e.destination}
                            </p>
                            <p
                              className="text-message rounded  text-break"
                              style={
                                e.accepted
                                  ? { color: "#130A0D" }
                                  : e.rejected
                                    ? { color: "#130A0D" }
                                    : { color: "#130A0D" }
                              }
                            >
                              {e.message}
                            </p>
                          </div>
                          <div className="caja-botones">
                            <div className="flex-nowrap p-0"></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
