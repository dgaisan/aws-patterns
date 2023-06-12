import { Amplify, Auth } from "aws-amplify";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { readConfig } from "./config";

const config = readConfig();

Amplify.configure({
  aws_project_region: config.identityPoolRegion,
  Auth: {
    identityPoolId: config.identityPoolId,
    region: config.identityPoolRegion,
  },
});

console.log(config);

function App() {
  const { isAuthenticated, loginWithRedirect, getIdTokenClaims, user, logout } =
    useAuth0();

  console.log("------Re-rendering <App>");
  console.log({ user });
  console.log({ isAuthenticated });

  useEffect(() => {
    const fetchAccessToken = async () => {
      console.log("-----fetchAccessToken");
      const idTokenClaims = await getIdTokenClaims();
      console.log({ idTokenClaims });

      if (idTokenClaims && idTokenClaims.__raw) {
        await Amplify.Credentials.set(
          {
            provider: config.auth0Provider,
            token: idTokenClaims.__raw,
            user: { name: idTokenClaims.email },
            expires_at: idTokenClaims.exp,
          },
          "federation"
        );
      }

      const currentUser = await Auth.currentAuthenticatedUser();
      console.log({ currentUser });
    };

    fetchAccessToken();
  }, [isAuthenticated, getIdTokenClaims]);

  return (
    <div className="App">
      {user && user.sub ? (
        <div>
          <button
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            Log Out
          </button>
          <div>
            <h4>{user.name}</h4>
          </div>
          <img src={user.picture} alt="" />
          <h4>{user.sub}</h4>
        </div>
      ) : (
        <button onClick={() => loginWithRedirect()}>Log in</button>
      )}
    </div>
  );
}

export default App;
