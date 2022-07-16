import React, { Fragment, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/help.css";

export const Help = () => {
  const { actions, store } = useContext(Context);

  useEffect(() => {
    actions.verify();
  }, []);

  return (
    <Fragment>
      <div className="footer-abajo">
        <div className="text-center mx-5 mt-5">
          <section>
            <h3 className="text-center mb-4 pb-2 text-primary fw-bold">FAQ</h3>
            <p className="text-center mb-5">
              Find the answers for the most frequently asked questions below.
            </p>

            <div className="row">
              <div className="col-md-6 col-lg-4 mb-4">
                <h6 className="mb-3 text-primary">
                  <i className="far fa-paper-plane text-primary pe-2"></i> What
                  is Traveland?
                </h6>
                <p>
                  Traveland is a website created by Jorge, Daniel and Sergi for
                  people who love to travel. We live & breathe travel and know
                  how important it is for a traveller to get the best adventures
                  for the best prices with the best people.
                </p>
              </div>

              <div className="col-md-6 col-lg-4 mb-4">
                <h6 className="mb-3 text-primary">
                  <i className="fas fa-pen-alt text-primary pe-2"></i> Create a
                  profile.
                </h6>
                <p>
                  First step? Completely fill out your Traveland profile! This
                  will be your home base and is a reflection of you: your
                  lifestyle, your mission and what's important to you. Having a
                  complete profile is the best way to connect with people. Here
                  you can tell people if you're traveling and where. Be sure to
                  include photos. Don't have a profile yet?{" "}
                  <Link to="/">Sign Up Now</Link>
                </p>
              </div>

              <div className="col-md-6 col-lg-4 mb-4">
                <h6 className="mb-3 text-primary">
                  <i className="fas fa-user text-primary pe-2"></i> Who can use
                  Traveland?
                </h6>
                <p>
                  Anyone can use Traveland. Traveland is made for all travellers
                  and all ages.
                </p>
              </div>

              <div className="col-md-6 col-lg-4 mb-4">
                <h6 className="mb-3 text-primary">
                  <i className="fas fa-rocket text-primary pe-2"></i> How much
                  does it cost?
                </h6>
                <p>
                  Free, and not a cent more! There will also be no annoying
                  advertising or in-app purchases.
                </p>
              </div>

              <div className="col-md-6 col-lg-4 mb-4">
                <h6 className="mb-3 text-primary">
                  <i className="fas fa-home text-primary pe-2"></i> Who’s
                  creating the travels?
                </h6>
                <p>
                  The travels are created by fellow travellers! It’s a great way
                  to meet people in a group situation. Why not create one
                  yourself and meet a bunch of new and likeminded people?
                </p>
              </div>

              <div className="col-md-6 col-lg-4 mb-4">
                <h6 className="mb-3 text-primary">
                  <i className="fas fa-book-open text-primary pe-2"></i> How
                  Traveland works?
                </h6>
                <p>
                  Easy! Traveland allows you to filter your search based on a
                  range of criteria. You can search by destination, the date you
                  want to start or finish your trip type.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Fragment>
  );
};
