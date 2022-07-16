import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.jsx";
import "../../styles/changePhotoModal.css";

export const ChangePhotoModal = ({ closeModal, editUser, user }) => {
  const { store, actions } = useContext(Context);
  const [selectedImage, setSelectedImage] = useState();

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      editUser({ ...user, profile_picture: e.target.files[0] }),
        setSelectedImage(e.target.files[0]);
    }
  };

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
        backdropFilter: "blur(3px) brightness(40%)",
      }}
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="user-modal modal-content text-light">
          <div className="photo-title">
            <h4 className="modal-title" id="staticBackdropLabel">
              Profile picture
            </h4>

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
          <div className="mt-3">
            <div className="row">
              {/*PROFILE PICTURE*/}

              <section className="user-pi">
                <div className="modal-pi">
                  <img
                    className="modal-pic"
                    src={
                      selectedImage == undefined
                        ? store.profile.profile_picture
                        : URL.createObjectURL(selectedImage)
                    }
                    alt="img"
                  />
                </div>
                <div className="image-upload">
                  <label htmlFor="photo-input">
                    <img
                      className="photo-selected1"
                      src="https://res.cloudinary.com/dmogh4y33/image/upload/v1656708631/camera-icon-circle-21_k0bqrq.png"
                    />
                  </label>
                  <input
                    className=""
                    accept="image/*"
                    id="photo-input"
                    type="file"
                    onChange={imageChange}
                  />
                </div>
              </section>
            </div>

            {/* SAVE BUTTON */}

            <div className="button-footer">
              <button
                className="save-changes"
                onClick={() => {
                  actions.editUser(user);
                  closeModal();
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
