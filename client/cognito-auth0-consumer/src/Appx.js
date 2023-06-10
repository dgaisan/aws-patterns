import React from "react";

// Amplify.configure({
//   aws_project_region: "us-east-1",
//   Auth: {
//     identityPoolId: "us-east-1:ae7e81f4-4c8b-4f32-93cd-b6fa0d0b1311",
//     region: "us-east-1",
//   },
// });

function Appx() {
  return (
    <div className="App">
      <button
        id="qsLoginBtn"
        color="primary"
        className="btn-margin"
        onClick={() => {}}
      >
        Log in
      </button>
    </div>
  );
}

export default Appx;
