import { Amplify, Auth } from "aws-amplify";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";

import { useEffect, Button } from "react";

Amplify.configure({
  aws_project_region: "us-east-1",
  Auth: {
    identityPoolId: "us-east-1:ae7e81f4-4c8b-4f32-93cd-b6fa0d0b1311",
    region: "us-east-1",
  },
});

function App() {
  const { isAuthenticated, loginWithRedirect, getIdTokenClaims } = useAuth0();

  useEffect(() => {
    const fetchAccessToken = async () => {
      console.log('-----fetchAccessToken');
      const idTokenClaims = await getIdTokenClaims();
      console.log('idTokenClaims:');
      console.log(idTokenClaims);

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
      console.log("currentUser:");
      console.log(currentUser);
    };

    fetchAccessToken();
  }, [isAuthenticated, getIdTokenClaims]);

  return (
    <Auth0Provider>
      <div className="App">
        <button
          id="qsLoginBtn"
          color="primary"
          className="btn-margin"
          onClick={() => loginWithRedirect()}
        >
          Log in
        </button>
      </div>
    </Auth0Provider>
  );
}

export default App;
