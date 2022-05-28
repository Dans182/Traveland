import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const SendMessageModal = ({ closeModal }) => {
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
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content bg-dark text-light">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">
                            Send a travel buddy request to <b>{store.trip.user_firstname}</b>
                        </h5>
                        {/* close buttom */}
                        <button
                            type="button"
                            className="btn-close bg-light"
                            aria-label="Close"
                            onClick={() => {
                                closeModal();
                            }}
                        ></button>
                    </div>
                    {/* Banner */}
                    <div className="modal-body m-5 ">
                        <div className="row text-center">
                            <input type="text" />
                        </div>
                    </div>
                    {/* Save buttom */}
                    <div className="modal-footer">
                        <button
                            className="col-2 offset-1 btn btn-light" onClick={async () => {
                                await actions.editTrip(trip);
                                closeModal();
                            }}>
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};