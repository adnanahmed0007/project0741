import React from "react";
import NameForm from "./NameForm";

const App = () => {
  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>Country Prediction System</h1>
      <p>Enter multiple names to predict their country using Nationalize API</p>

      <NameForm />
    </div>
  );
};

export default App;
