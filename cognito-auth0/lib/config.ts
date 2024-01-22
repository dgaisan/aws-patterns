require("dotenv").config();

export default {
    auth0ClientId: process.env.AUTH0_CLIENT_ID || "",
    auth0Domain: process.env.AUTH0_DOMAIN || "",
    auth0Provider: process.env.AUTH0_PROVIDER || ""
};