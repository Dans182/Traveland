import React, { Fragment, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";
import "../../styles/travelBuddies.css";

export const TravelBuddies = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams();

    useEffect(() => {
        if (store.match == "") {
            actions.getUserTrips();
        }

    }, []);

    return (
        <Fragment>
            <div
                className="section-box position-static d-block py-1 mt-3"

            >
                <h4 className="travel-titlex mt-3 text-center" style={{ color: "white" }}>
                    <b>Travel buddies</b>
                </h4>

                {/* CARDS */}

                <div>
                    <div className="">
                        <div className="">
                            <div className="wrapper-travelers">

                                {store.trip.trip_in_match ? store.trip.trip_in_match.filter((x) => x.accepted == true).map((e) => {

                                    return (
                                        <div
                                            key={e.id}
                                            className=""

                                        >
                                            <Link
                                                style={{ textDecoration: "none" }}
                                                to={"/noEditProfile/" + e.user_id}
                                            >
                                                <div
                                                    className="travelers-img d-flex text-white align-items-end "
                                                    style={{
                                                        backgroundImage: "url(" + e.profile_picture + ")",
                                                    }}
                                                >
                                                    <div
                                                        className=" "

                                                    >
                                                        <ul className="card-text-box list-unstyled ms-3">
                                                            <li className="mb-1">
                                                                <h2>{e.username}</h2>

                                                            </li>

                                                        </ul>

                                                    </div>
                                                </div>

                                            </Link>
                                        </div>
                                    );
                                }) : (null)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}