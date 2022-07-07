import React, { Fragment, useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import "../../styles/loginAndRegister.css";
import logo from "../component/img/traveland.png";
import ReactTooltip from 'react-tooltip';

export const Login = () => {

  const history = useHistory();
  const { store, actions } = useContext(Context);
  const [user, setUser] = useState({});
  const [switchPanel, setSwitchPanel] = useState(false)
  const [infoError, setInfoError] = useState(false);

  useEffect(() => {
    initialState();
  }, []);

  const loginUser = async () => {
    try {
      const resp = await fetch(store.url + "login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await resp.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        await actions.verify();
        history.push("/feed");
      } else {
        alert("Email o contraseña incorrectos.");
      }
    } catch (e) {
      alert("ERROR");
    }
  };

  const sendUserInfo = async () => {
    if (onlyLettersAndNumbers(user.username) && user.username != "" && emailIsValid(user.email) && emailInput(user.email) && user.email != "" && user.password != "") {
      const response = await fetch(store.url + "register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)

      });

      const data = await response.json();
      if (data.created) {
        formSignUp.reset();
        initialState();
        setSwitchPanel(false);
      } else {
        alert(error)
      }
    } else {
      messageError();
    }
  };

  const onlyLettersAndNumbers = (element) => {
    return /^[A-Ñ-Za-ñ-z0-9]*$/.test(element);
  }

  const emailInput = (element) => {
    return /^[A-Ñ-Za-ñ-z0-9@.]*$/.test(element);
  }

  const emailIsValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const messageError = () => {
    setInfoError(true);
  };

  const initialState = () => {
    user.username = "";
    user.email = "";
    user.password = "";
    user.firstname = "";
    user.lastname = "";
  };

  return (
    <Fragment>
      <div className="body-all">
        <div className={"container-1 " + (switchPanel == true ? "right-panel-active" : "false")} id="container">
          <div className="form-container sign-up-container">
            <form className="form-move" action="#" id="formSignUp">

              <div className="social-container">
              </div>
              <h1 className="title-login" style={{
                fontWeight: "bold",
                margin: "0"
              }}>Create Account</h1>
              <input type="text" className="inp-data" data-tip data-for="botonTooltipUsername" placeholder="Username" style={
                user.username == "" ||
                  !onlyLettersAndNumbers(user.username)
                  ? {
                    borderStyle: "solid",
                    borderWidth: "3px",
                    borderColor: "#DB2C2C",
                  }
                  : null
              } onChange={(e) =>
                setUser({ ...user, username: e.target.value.trim() },
                  setInfoError(false)
                )
              } />
              <input type="text" className="inp-data" data-tip data-for="botonTooltipEmail" placeholder="Email" style={
                user.email == "" ||
                  !emailIsValid(user.email) || !emailInput(user.email)
                  ? {
                    borderStyle: "solid",
                    borderWidth: "3px",
                    borderColor: "#DB2C2C",
                  }
                  : null} onChange={(e) =>
                    setUser({ ...user, email: e.target.value.trim() }, setInfoError(false))
                  } />
              <input type="password" className="inp-data" data-tip data-for="botonTooltipPassword" placeholder="Password"
                style={user.password == ""
                  ? {
                    borderStyle: "solid",
                    borderWidth: "3px",
                    borderColor: "#DB2C2C",
                  }
                  : null}

                onChange={(e) =>
                  setUser({ ...user, password: e.target.value.trim() }, setInfoError(false))
                } />
              <input type="text" className="inp-data" placeholder="First name" onChange={(e) =>
                setUser({ ...user, firstname: e.target.value.trim() })
              } />
              <input type="text" className="inp-data" placeholder="Last name" onChange={(e) =>
                setUser({ ...user, lastname: e.target.value.trim() })
              } />
              <button type="button" className="button-all mt-2" onClick={() => {
                sendUserInfo();
              }}>Sign Up</button>
              {infoError == true ? (
                <div className="error-register">
                  <i className="icon-error2 fas fa-exclamation-circle"></i>
                  <p>please write the fields correctly </p>
                </div>
              ) : <div className="before-register"></div>}
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form className="form-move" action="#">
              <div className="social-container">
              </div>
              <h1 className="title-login" style={{
                fontWeight: "bold",
                margin: "0"
              }}>Sign in</h1>
              <input type="text" className="inp-data" placeholder="Email" onChange={(e) => {
                setUser({ ...user, email: e.target.value.trim() });
              }} />
              <input type="password" className="inp-data" placeholder="Password" onChange={(e) => {
                setUser({ ...user, password: e.target.value.trim() });
              }} />
              <a className="social" href="#"></a>
              <button type="submit" className="button-all" onClick={() => {
                loginUser();
              }}>Sign In</button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <div className="img-left"></div>
                <h1 className="title-login2" style={{
                  fontWeight: "bold",
                  marginTop: "90px"
                }}>Welcome Back!</h1>
                <p className="text-instruction">To keep connected with us please login with your personal info</p>
                <button className="button-all ghost" id="signIn" onClick={() => {
                  setSwitchPanel(false)
                }}>Sign In</button>
              </div>
              <div className="overlay-panel overlay-right">
                <img
                  className="logo-t mb-4 pb-4 pt-2 col-12"
                  src={logo}
                  alt=""
                />
                <h1 className="title-login" style={{
                  fontWeight: "bold",
                  margin: "0"
                }}>Hello!</h1>
                <p className="text-instruction">Enter your personal details and start journey with us</p>
                <button className="button-all ghost" id="signUp" onClick={() => {
                  setSwitchPanel(true)
                  initialState()
                }}>Sign Up</button>
              </div>
            </div>
          </div>
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

      {user.email == "" ?
        <ReactTooltip id="botonTooltipEmail"
          type="error" className="tooltip-style">
          The field is required.
        </ReactTooltip> : !emailIsValid(user.email) ?
          <ReactTooltip id="botonTooltipEmail"
            type="error" className="tooltip-style">
            Email example: jhon77@email.com
          </ReactTooltip> : !emailInput(user.email) ?
            <ReactTooltip id="botonTooltipEmail"
              type="error" className="tooltip-style">
              Sorry you can only use (@) and (.)
            </ReactTooltip> : null}

      {user.password == "" ?
        <ReactTooltip id="botonTooltipPassword"
          type="error" className="tooltip-style">
          The field is required.
        </ReactTooltip> : null}
    </Fragment >
  );
};

