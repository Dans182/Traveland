import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";

export const EditInfoTrip = ({ closeModal, editTrip, trip }) => {
  const { store, actions } = useContext(Context);
  const history = useHistory();
  const [confirmDelete, setConfirmDelete] = useState(false);

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
    } catch (e) { }
  };

  return (
    <div>
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
          <div className="trip-modal modal-content text-light">
            <div className="modal-header ">
              <h5 className="modal-title" id="staticBackdropLabel">
                Edit Trip
              </h5>
            </div>

            {/* Banner */}

            <div className="modal-body m-5">
              {/* Destination */}

              <div className="row text-center mb-2 mt-4">
                <label htmlFor="place" className="col-6">
                  Destination
                </label>
                <input
                  defaultValue={trip.destination}
                  id="place"
                  type="text"
                  className="col-5"
                  placeholder="Destination"
                  maxLength={13}
                  onChange={(e) =>
                    editTrip({
                      ...trip,
                      destination:
                        e.target.value.charAt(0).toUpperCase() +
                        e.target.value.slice(1).toLowerCase(),
                    })
                  }
                ></input>
              </div>

              {/* start trip */}

              <div className="row text-center mb-2">
                <label htmlFor="startTrip" className="col-6">
                  Start of the trip
                </label>
                <input
                  defaultValue={trip.start_of_the_trip}
                  id="startTrip"
                  type="date"
                  className="col-5"
                  placeholder="Start"
                  onChange={(e) =>
                    editTrip({ ...trip, start_of_the_trip: e.target.value })
                  }
                ></input>
              </div>

              {/* end trip */}

              <div className="row text-center mb-2">
                <label htmlFor="endTrip" className="col-6">
                  End of the trip
                </label>
                <input
                  defaultValue={trip.end_of_the_trip}
                  id="endTrip"
                  type="date"
                  required
                  className="col-5"
                  placeholder="End"
                  onChange={(e) =>
                    editTrip({ ...trip, end_of_the_trip: e.target.value })
                  }
                ></input>
              </div>

              {/* people */}

              <div className="row text-center mb-2">
                <label htmlFor="people" className="col-6">
                  Travel buddies
                </label>
                <input
                  type="number"
                  defaultValue={trip.people}
                  id="people"
                  className="col-5"
                  placeholder="Travel buddies"
                  onChange={(e) =>
                    editTrip({ ...trip, people: e.target.value })
                  }
                ></input>
              </div>
              {/* Transport */}
              <div className="row text-center mb-2">
                <label htmlFor="transport" className="col-6">
                  Transport
                </label>
                <select
                  name="transporte"
                  className="col-5"
                  placeholder="none"
                  defaultValue={trip.transport}
                  onChange={(e) =>
                    editTrip({ ...trip, transport: e.target.value })
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
              </div>
              {/* Cost */}
              <div className="row text-center mb-2">
                <label htmlFor="cost" className="col-6">
                  Cost
                </label>
                <input
                  defaultValue={trip.cost}
                  type="number"
                  max="9999"
                  id="cost"
                  className="col-5"
                  placeholder="Cost"
                  onChange={(e) => editTrip({ ...trip, cost: e.target.value })}
                ></input>
              </div>
              {/* Text */}
              <p>Description of the trip:</p>
              <div className="input-group">
                <textarea
                  defaultValue={trip.text}
                  name="contador"
                  id="contador"
                  className="form-control"
                  aria-label="With textarea"
                  maxLength={280}
                  placeholder="Text"
                  onChange={(e) =>
                    editTrip({
                      ...trip,
                      text:
                        e.target.value.charAt(0).toUpperCase() +
                        e.target.value.slice(1).toLowerCase(),
                    })
                  }
                ></textarea>
              </div>
              <p>{trip.text ? trip.text.length : 0}/280</p>
            </div>

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
                <div className="delete-modal modal-dialog">
                  <div className="trip-modal modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Are you sure you want to delete the trip?{" "}
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
            {/* Save buttom */}
            <div className="modal-footer d-flex justify-content-between px-5">
              <i
                className="delete-icon fa-solid fa-trash"
                title="delete trip"
                style={{ fontSize: "20px" }}
                onClick={() => {
                  setConfirmDelete(true);
                }}
              ></i>
              <div>
                <button
                  className="btn btn-light me-3"
                  onClick={() => {
                    closeModal();
                  }}
                >
                  Close
                </button>
                <button
                  className="btn btn-light"
                  onClick={async () => {
                    await actions.editTrip(trip);
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
