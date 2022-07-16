import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/editGaleryModal.css";

export const EditGaleryModal = ({ closeModal, editTrip, trip }) => {
    const { store, actions } = useContext(Context);
    const [selectedImage, setSelectedImage] = useState();
    const [selectedImage2, setSelectedImage2] = useState();
    const [selectedImage3, setSelectedImage3] = useState();
    const [selectedImage4, setSelectedImage4] = useState();
    const [selectedImage5, setSelectedImage5] = useState();
    const [selectedImage6, setSelectedImage6] = useState();

    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            editTrip({ ...trip, imagen_1: e.target.files[0] }),
                setSelectedImage(e.target.files[0]);
        }
    };

    const imageChange2 = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            editTrip({ ...trip, imagen_2: e.target.files[0] }),
                setSelectedImage2(e.target.files[0]);
        }
    };

    const imageChange3 = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            editTrip({ ...trip, imagen_3: e.target.files[0] }),
                setSelectedImage3(e.target.files[0]);
        }
    };

    const imageChange4 = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            editTrip({ ...trip, imagen_4: e.target.files[0] }),
                setSelectedImage4(e.target.files[0]);
        }
    };

    const imageChange5 = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            editTrip({ ...trip, imagen_5: e.target.files[0] }),
                setSelectedImage5(e.target.files[0]);
        }
    };

    const imageChange6 = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            editTrip({ ...trip, imagen_6: e.target.files[0] }),
                setSelectedImage6(e.target.files[0]);
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
                backdropFilter: "brightness(20%)",
            }}
        >
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-galery modal-content text-light">
                    <div className="title-galery-1">
                        <h5 className="" id="staticBackdropLabel">
                            Add imagens
                        </h5>
                        <i
                            type="button"
                            className="close-modal-galery far fa-times-circle"
                            aria-label="Close"
                            onClick={() => {
                                closeModal();
                            }}
                        ></i>
                    </div>
                    <div className="modal-body">

                        {/* PRUEBA */}
                        <div className="column-image">
                            <section className="galery-pi">
                                <div className="modal-pi-galery">
                                    <img
                                        className="size-pic"
                                        src={
                                            selectedImage == undefined
                                                ? store.trip.imagen_1
                                                : URL.createObjectURL(selectedImage)
                                        }
                                        alt="img"
                                    />
                                </div>
                                <div className="image-upload">
                                    <label htmlFor="photo-input">
                                        <img
                                            className="galery-selected1"
                                            src="https://www.kindpng.com/picc/m/112-1120914_plus-sign-icon-png-plus-icon-png-transparent.png"
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

                            {/* IMAGEN 2 */}

                            <section className="galery-pi">
                                <div className="modal-pi-galery">
                                    <img
                                        className="size-pic"
                                        src={
                                            selectedImage2 == undefined
                                                ? store.trip.imagen_2
                                                : URL.createObjectURL(selectedImage2)
                                        }
                                        alt="img"
                                    />
                                </div>
                                <div className="image-upload">
                                    <label htmlFor="photo-input2">
                                        <img
                                            className="galery-selected2"
                                            src="https://www.kindpng.com/picc/m/112-1120914_plus-sign-icon-png-plus-icon-png-transparent.png"
                                        />

                                    </label>
                                    <input
                                        className=""
                                        accept="image/*"
                                        id="photo-input2"
                                        type="file"
                                        onChange={imageChange2}
                                    />
                                </div>
                            </section>
                        </div>
                        {/* IMAGEN 3*/}
                        <div className="column-image">
                            <section className="galery-pi">
                                <div className="modal-pi-galery">
                                    <img
                                        className="size-pic"
                                        src={
                                            selectedImage3 == undefined
                                                ? store.trip.imagen_3
                                                : URL.createObjectURL(selectedImage3)
                                        }
                                        alt="img"
                                    />
                                </div>
                                <div className="image-upload">
                                    <label htmlFor="photo-input3">
                                        <img
                                            className="galery-selected3"
                                            src="https://www.kindpng.com/picc/m/112-1120914_plus-sign-icon-png-plus-icon-png-transparent.png"
                                        />

                                    </label>
                                    <input
                                        className=""
                                        accept="image/*"
                                        id="photo-input3"
                                        type="file"
                                        onChange={imageChange3}
                                    />
                                </div>
                            </section>

                            {/* IMAGEN 4*/}

                            <section className="galery-pi">
                                <div className="modal-pi-galery">
                                    <img
                                        className="size-pic"
                                        src={
                                            selectedImage4 == undefined
                                                ? store.trip.imagen_4
                                                : URL.createObjectURL(selectedImage4)
                                        }
                                        alt="img"
                                    />
                                </div>
                                <div className="image-upload">
                                    <label htmlFor="photo-input4">
                                        <img
                                            className="galery-selected4"
                                            src="https://www.kindpng.com/picc/m/112-1120914_plus-sign-icon-png-plus-icon-png-transparent.png"
                                        />

                                    </label>
                                    <input
                                        className=""
                                        accept="image/*"
                                        id="photo-input4"
                                        type="file"
                                        onChange={imageChange4}
                                    />
                                </div>
                            </section>
                        </div>

                        {/*  IMAGEN 5 */}

                        <div className="column-image">
                            <section className="galery-pi">
                                <div className="modal-pi-galery">
                                    <img
                                        className="size-pic"
                                        src={
                                            selectedImage5 == undefined
                                                ? store.trip.imagen_5
                                                : URL.createObjectURL(selectedImage5)
                                        }
                                        alt="img"
                                    />
                                </div>
                                <div className="image-upload">
                                    <label htmlFor="photo-input5">
                                        <img
                                            className="galery-selected5"
                                            src="https://www.kindpng.com/picc/m/112-1120914_plus-sign-icon-png-plus-icon-png-transparent.png"
                                        />

                                    </label>
                                    <input
                                        className=""
                                        accept="image/*"
                                        id="photo-input5"
                                        type="file"
                                        onChange={imageChange5}
                                    />
                                </div>
                            </section>

                            {/* IMAGEN 6*/}

                            <section className="galery-pi">
                                <div className="modal-pi-galery">
                                    <img
                                        className="size-pic"
                                        src={
                                            selectedImage6 == undefined
                                                ? store.trip.imagen_6
                                                : URL.createObjectURL(selectedImage6)
                                        }
                                        alt="img"
                                    />
                                </div>
                                <div className="image-upload">
                                    <label htmlFor="photo-input6">
                                        <img
                                            className="galery-selected6"
                                            src="https://www.kindpng.com/picc/m/112-1120914_plus-sign-icon-png-plus-icon-png-transparent.png"
                                        />

                                    </label>
                                    <input
                                        className=""
                                        accept="image/*"
                                        id="photo-input6"
                                        type="file"
                                        onChange={imageChange6}
                                    />
                                </div>
                            </section>
                        </div>

                        {/* Save buttom */}
                        <div className="modal-footer mt-2">
                            <div>
                                <button
                                    className="save-galery"
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

        </div >
    );

};
