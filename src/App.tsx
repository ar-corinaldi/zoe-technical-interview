import React, { useState } from "react";
import "./App.css";
import IncomePage from "./page/Income";
import Navbar from "./components/Navbar";
import MatchPage from "./page/Match";

function App() {
  const [pageState, setPageState] = useState<"income" | "match">("income");
  const [income, setIncome] = useState(0);

  return (
    <React.Fragment>
      <Navbar />
      <main
        style={{
          height: "92vh",
          display: "flex",
          padding: "32px",
        }}
      >
        {pageState === "income" && (
          <IncomePage setPageState={setPageState} setIncome={setIncome} />
        )}
        {pageState === "match" && (
          <MatchPage income={income} setPageState={setPageState} />
        )}
        {!["income", "match"].includes(pageState) && <div>Page Not Found</div>}
      </main>
    </React.Fragment>
  );
}

export default App;
