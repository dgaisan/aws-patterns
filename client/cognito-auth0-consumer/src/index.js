import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";

import "./index.css";
import App from "./App";
import { readConfig } from "./config";

const config = readConfig();
const providerConfig = {
  clientId: config.auth0ClientId,
  domain: config.auth0Domain,
  redirectUri: window.location.origin
};

console.log(providerConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider  {...providerConfig} >
    <App />
  </Auth0Provider>
);
