import { useHistory } from "react-router-dom";

const getState = ({ getStore, getActions, setStore }) => {
  const history = useHistory();

  return {
    store: {
      user: {},
      profile: {},
      userProfiles: [],
      userTrips: [],
      url: "https://3001-georgelion-finalproject-aaswi73eujd.ws-eu54.gitpod.io/api/",
      user_id: null,
      trips: [],
      logged: null,
      trip: { likes: [] },
      searchedTrip: [],
      match: [],
    },


    actions: {
      verify: async () => {
        try {
          const resp = await fetch(getStore().url + "protected", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          });
          const data = await resp.json();
          if (data.user_id) {
            setStore({ user_id: data.user_id });
            setStore({ logged: data.logged_in || false });
            getActions().getUser();
          }
          // setStore({ logged: data.logged_in || false })
          else if (resp.status == 401 || resp.status == 422) {
            history.push("/");
          }
        } catch (e) {
          setStore({ logged: false });
        }
      },
      logout: async () => {
        localStorage.clear();
        setStore({
          logged: false,
          user_id: null,
          user: {},
          trips: [],
          trip: {},
          match: {},
          profile: {},
          userTrips: [],
        });
      },
      resetearTrip: async () => {
        setStore({
          trip: {},
        });
      },
      setUser: (loggedUser) => {
        setStore({ user: loggedUser });
      },
      getUser: async () => {
        try {
          const resp = await fetch(getStore().url + "user", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          });
          const data = await resp.json();
          setStore({ user: data.user });
        } catch (e) { }
      },

      getProfile: async (id) => {
        try {
          const resp = await fetch(getStore().url + "profile/" + id, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          });
          const data = await resp.json();
          setStore({ profile: data.user });
        } catch (e) { }
      },

      getUserTrips: async () => {
        try {
          const resp = await fetch(getStore().url + "trips", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          });
          const data = await resp.json();
          setStore({
            userTrips: data.trips.sort((a, b) => {
              return (
                new Date(a.start_of_the_trip) - new Date(b.start_of_the_trip)
              );
            }),
          });
          let matches = [];
          for (let x = 0; x < data.trips.length; x++) {
            for (let i in data.trips[x].trip_in_match) {
              if (data.trips[x].trip_in_match[i].confirmed != true) {
                matches.push(data.trips[x].trip_in_match[i]);
              }
            }
          }
          setStore({
            match: matches,
          });
        } catch (e) { }
      },

      getUserTripsById: async (id) => {
        try {
          const resp = await fetch(getStore().url + "trips/" + id, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          });
          const data = await resp.json();
          setStore({ userTrips: data.trips });
        } catch (e) { }
      },

      getUserProfiles: async () => {
        try {
          const resp = await fetch(getStore().url + "user/profiles", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          });
          const data = await resp.json();
          setStore({ userProfiles: data.profiles });
        } catch (e) { }
      },

      editUser: async (user) => {
        try {
          let body = new FormData();
          for (let key in user) {
            body.append(key, user[key]);
          }
          const resp = await fetch(getStore().url + "user", {
            method: "PUT",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: body,
          });
          const data = await resp.json();
          setStore({ user: data.user });
        } catch (e) { }
      },

      createTrip: async (trip) => {
        try {
          let body = new FormData();
          for (let key in trip) {
            body.append(key, trip[key]);
          }
          const resp = await fetch(getStore().url + "create/trip", {
            method: "POST",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: body,
          });
          const data = await resp.json();
          getActions().getUserTrips();
        } catch (e) { }
      },

      /* GET TRIP */

      getTrip: async (id) => {
        try {
          const resp = await fetch(getStore().url + "trip/" + id, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          });
          const data = await resp.json();
          /*   data.trip.start_of_the_trip = new Date(data.trip.start_of_the_trip)
              .toISOString()
              .split("T")[0]; */ //new Date se encarga de cambiar un string a date(fecha), luego .toISOString().split('T')[0] aplica el formato a yyyy-mm-dd
          /*  data.trip.end_of_the_trip = new Date(data.trip.end_of_the_trip)
             .toISOString()
             .split("T")[0]; */ //new Date se encarga de cambiar un string a date(fecha), luego .toISOString().split('T')[0] aplica el formato a yyyy-mm-dd
          if (resp.status == 200) {
            setStore({ trip: data.trip });
          } else {
            return false;
          }
        } catch (e) {
          return false;
        }
      },

      getTrips: async () => {
        try {
          const resp = await fetch(getStore().url + "allTrips", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          });
          const data = await resp.json();
          setStore({
            trips: data.trips.sort((a, b) => {
              return (
                new Date(a.start_of_the_trip) - new Date(b.start_of_the_trip)
                //Invertir B y A para cambiar orden en el feed
              );
            }),
          });
        } catch (e) { }
      },

      /* SEND MATCH */

      sendMatch: async (match) => {
        try {
          const resp = await fetch(getStore().url + "send/match", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify(match),
          });
          if (resp.status == 420) {
            alert("You are already part of this trip.");
          }
          const data = await resp.json();
        } catch (e) { }
      },

      /* ACCEPT MATCH */

      acceptMatch: async (match) => {
        try {
          const resp = await fetch(getStore().url + "accept", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify(match),
          });
          if (resp.ok) {
            getActions().getUserTrips();
          }
        } catch (e) { }
      },

      rejectMatch: async (match) => {
        try {
          const resp = await fetch(getStore().url + "reject", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify(match),
          });
          if (resp.ok) {
            getActions().getUserTrips();
          }
        } catch (e) { }
      },

      getMatch: async () => {
        try {
          const resp = await fetch(getStore().url + "match", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          });
          const data = await resp.json();
          if (resp.status == 200) {
            setStore({ match: data.match });
          } else {
            return false;
          }
        } catch (e) {
          return false;
        }
      },

      /* EDIT TRIP */

      editTrip: async (trip) => {
        //función para editar el viaje.
        try {
          let body = new FormData();
          for (let key in trip) {
            //Iteramos trip en su index.
            body.append(key, trip[key]);
          }
          const resp = await fetch(getStore().url + "trip", {
            //acceso a la base de datos.
            method: "PUT", //Metodo PUT para modificar la base de datos. si el metodo no se especifica por default es un metodo GET.
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: body,
          });
          const data = await resp.json();
          setStore({ trip: data.trip });
        } catch (e) { }
      },

      changeFavorite: async (id, page, searchTerm) => {
        const resp = await fetch(getStore().url + "tripLikes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({ trip_id: id }),
        });
        if (resp.ok) {
          if (page == "feed") {
            getActions().searchDestination(searchTerm);
            getActions().getUser();
          } else if (page == "trip" || page == "favorites") {
            getActions().getTrip(id);
            getActions().getUser();
          }
        }
      },
      searchDestination: async (searchTerm) => {
        try {
          const resp = await fetch(getStore().url + "search", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(searchTerm),
          });
          const dataSearched = await resp.json();
          setStore({
            trips: dataSearched.trip.sort((a, b) => {
              return (
                new Date(a.start_of_the_trip) - new Date(b.start_of_the_trip)
                //Invertir B y A para cambiar orden en el feed
              );
            }),
          });
          // setStore({ trips: dataSearched.trip });
        } catch (e) {
          alert("ERROR");
        }
      },

      readMessages: async () => {
        const resp = await fetch(getStore().url + "read", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        if (resp.status == 200) {
          getActions().getUserTrips();
        }
      },
    },
  };
};

export default getState;
