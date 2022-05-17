const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      logged: null,
      user: null,
    },
    actions: {
      verify: async () => {
        try {
          const resp = await fetch(
            "https://3001-georgelion-finalproject-d16qehmb8rn.ws-eu45.gitpod.io/api/protected",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          );
          const data = await resp.json();
          setStore({ logged: data.logged_in || false });
        } catch (e) {
          setStore({ logged: false });
        }
      },
      logout: async () => {
        localStorage.clear();
        setStore({ logged: false });
      },
      setUser: (loggedUser) => {
        setStore({ user: loggedUser });
      },
    },
  };
};

export default getState;
