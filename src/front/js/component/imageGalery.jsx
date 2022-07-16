import React, { Fragment, useContext } from "react";
import { Context } from "../store/appContext.jsx";
import "../../styles/imageGalery.css";

export const ImageGalery = () => {
  const { store, actions } = useContext(Context);
  const ImagePlace = [
    {
      id: 1,
      title: "Ontario",
      image:
        "https://images.pexels.com/photos/11449484/pexels-photo-11449484.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 2,
      title: "Amelia Treu",
      image:
        "https://images.pexels.com/photos/11020215/pexels-photo-11020215.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 3,
      title: "Dana Silva",
      image:
        "https://images.pexels.com/photos/11020025/pexels-photo-11020025.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 4,
      title: "Andre Rush",
      image:
        "https://images.pexels.com/photos/3010969/pexels-photo-3010969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 5,
      title: "Carlos Blun",
      image:
        "https://images.pexels.com/photos/6468928/pexels-photo-6468928.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 7,
      title: "Carlos Blun",
      image:
        "https://images.pexels.com/photos/5833890/pexels-photo-5833890.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  return <Fragment></Fragment>;
};
