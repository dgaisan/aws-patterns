import env from "react-dotenv";

export const readConfig = () => ({
    auth0ClientId: env.AUTH0_CLIENT_ID,
    auth0Domain: env.AUTH0_DOMAIN,
    identityPoolId: env.IDENTITY_POOL_ID,
    identityPoolRegion: env.IDENTITY_POOL_REGION
});