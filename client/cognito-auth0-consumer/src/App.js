import { Amplify, Auth } from "aws-amplify";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {readConfig} from "./config";

const config = readConfig();

Amplify.configure({
  aws_project_region: config.identityPoolRegion,
  Auth: {
    identityPoolId: config.identityPoolId,
    region: config.identityPoolRegion,
  },
});

function App() {
  const { isAuthenticated, loginWithRedirect, getIdTokenClaims } = useAuth0();

  useEffect(() => {
    const fetchAccessToken = async () => {
      console.log("-----fetchAccessToken");
      const idTokenClaims = await getIdTokenClaims();
      console.log({idTokenClaims});

      await Amplify.Credentials.set(
        {
          provider: "dev-fh4wv65ztynqar53.us.auth0.com",
          token: idTokenClaims.__raw,
          user: { name: idTokenClaims.email },
          expires_at: idTokenClaims.exp,
        },
        "federation"
      );

      const currentUser = await Auth.currentAuthenticatedUser();
      console.log({currentUser});
    };

    fetchAccessToken();
  }, [isAuthenticated, getIdTokenClaims]);

  return (
    <div className="App">
      <button
        onClick={() => loginWithRedirect()}
      >
        Log in
      </button>
    </div>
  );
}

export default App;
