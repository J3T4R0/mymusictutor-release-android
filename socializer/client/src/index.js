/*
My Music Tutor (backend)
Made by Ryan Niemi
Date: 7/02/19
Description:
 	Decides whether the app is in production or dev mode. loads react and reat-dom
*/


import React from "react";
import ReactDOM from "react-dom";
import ClientApp from "./ClientApp";

import "bootstrap/dist/css/bootstrap.css";

const mount =
  process.env.NODE_ENV === "production" ? ReactDOM.hydrate : ReactDOM.render;

mount(<ClientApp />, document.getElementById("root"));
