/*
My Music Tutor (backend)
Made by Ryan Niemi
Date: 7/02/19
Description:
 	Very important. Where the absinthe socket wraps around the app. This is where the app is served to the client
*/


import React, { useRef } from "react";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter } from "react-router-dom";
import { createClient } from "util/apollo";
import App from "./App";

const ClientApp = () => {
  const client = useRef(createClient());

  return (
    <ApolloProvider client={client.current.client}>
      <BrowserRouter>
        <App socket={client.current.absintheSocket} />
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default ClientApp;
