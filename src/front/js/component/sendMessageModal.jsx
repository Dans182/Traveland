import React, { useContext } from "react";
import { Context } from "../store/appContext.jsx";
import "../../styles/sendMessageModal.css";

export const SendMessageModal = ({ closeModal, setMessage, message }) => {
  const { store, actions } = useContext(Context);
  return (
    <div
      className="modal fade show "
      id="staticBackdrop"
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
      <div className=" modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="message-1 modal-content text-light">
          <div className="title-mss">
            <h5 className="modal-title" id="staticBackdropLabel">
              Send a travel buddy request to <b>{store.trip.user_firstname}</b>
            </h5>

            {/* CLOSE BUTTON */}

            <i
              type="button"
              className="close-photo far fa-times-circle"
              aria-label="Close"
              onClick={() => {
                closeModal();
              }}
            ></i>
          </div>

          {/* MESSAGE */}

          <div className="modal-body m-2 ">
            <div className="row text-center">
              <input
                className="text-message-1"
                type="text"
                placeholder="Message"
                maxLength={120}
                onChange={(e) => setMessage(e.target.value)}
              ></input>
            </div>
          </div>

          {/* SEND BUTTON */}

          <div className="send-box">
            <button
              className="send-button"
              onClick={async () => {
                await actions.sendMatch(message);
                closeModal();
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
