import { Amplify, Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { readConfig } from "./config";
import { encode as base64_encode } from "base-64";
console.log({ base64_encode });

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
  const {
    getIdTokenClaims,
    isAuthenticated,
    loginWithRedirect,
    logout,
    user,
    getAccessTokenSilently,
    isLoading
  } = useAuth0();

  const [tokens, setTokens] = useState({});

  console.log("------Re-rendering <App>");

  useEffect(() => {
    const fetchAccessToken = async () => {
      console.log("-----fetchAccessToken");
      const idTokenClaims = await getIdTokenClaims();

      if (idTokenClaims && idTokenClaims.__raw) {
        console.log("++++idTokenClaims");
        console.log({ idTokenClaims });
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
      const authUserDetails = {
        currentUserCredentials: await Auth.currentUserCredentials(),
        currentCredentials: await Auth.currentCredentials(),
        currentUserInfo: await Auth.currentUserInfo(),
      };
      console.log({ currentUser });

      console.log("-------", authUserDetails);
      console.log(authUserDetails);
    };

    fetchAccessToken();
  }, [isAuthenticated, getIdTokenClaims]);

  useEffect(() => {
    console.log("!!!!!!!!!!! tokens chenged");
    console.log(tokens);

    const fetchApi = async () => {
      if (!tokens || !tokens.aud) {
        return;
      }
      try {
        const data = await fetch("https://api.linkedin.com/v2/me", {
          method: "GET",
          mode: "no-cors",
          headers: {
            Authorization: `Bearer ${base64_encode(tokens.aud)}`,
          },
        });

        const x = await data.json();
        console.log(x);
      } catch (err) {
        console.error("Something went wrong fetching dta from Linkedin");
        console.log({ err });
      }
    };

    const fetchAllUsers = async () => {
      const data = await fetch("https://dev-fh4wv65ztynqar53.us.auth0.com/api/v2/users", {
        headers: {
          Authorization: `Bearer ${config.auth0ClientId}`
        }
      });
      const allUser = await data.json();
      console.log("????All Users");
      console.log("Authorization:", `Bearer ${config.auth0ClientId}`);
      console.log(allUser);

    };

    fetchApi();
    fetchAllUsers();
  }, [tokens]);

  // if (isLoading) {
  //   return (<>Loading...</>)
  // }

  console.log({ user });
  console.log({ isAuthenticated });
  console.log("----tokens from function body");
  console.log(tokens);

  // getAccessTokenSilently()
  //   .then((silentTokens) => {
  //     console("?????? got access tokens silently");
  //     console.log({ silentTokens });
  //   })
  //   .catch((err) => {
  //     console.log("Error getting silentTokens");
  //     console.log({ err });
  //   });

  // getIdTokenClaims().then((x) => {
  //   console.log("++++getIdTokenClaims callback");
  //   console.log(x);
  //   setTokens(x);
  // });

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
          {/* <img src={user.picture} alt="" /> */}
          <h4>{user.sub}</h4>
        </div>
      ) : (
        <button onClick={() => loginWithRedirect()}>Log in</button>
      )}
    </div>
  );
}

export default App;
