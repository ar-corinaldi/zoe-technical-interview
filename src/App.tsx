import React, { useState } from "react";
import "./App.css";
import IncomePage from "./page/Income";
import Navbar from "./components/Navbar";
import MatchPage from "./page/Match";

export const IncomeContext = React.createContext<
  [number, React.Dispatch<React.SetStateAction<number>>] | null
>(null);

function App() {
  const [pageState, setPageState] = useState<"income" | "match">("income");
  const [income, setIncome] = useState(0);

  return (
    <React.Fragment>
      <IncomeContext.Provider value={[income, setIncome]}>
        <Navbar />
        <main
          style={{
            height: "92vh",
            display: "flex",
            padding: "32px",
          }}
        >
          {pageState === "income" && <IncomePage setPageState={setPageState} />}
          {pageState === "match" && <MatchPage setPageState={setPageState} />}
          {!["income", "match"].includes(pageState) && (
            <div>Page Not Found</div>
          )}
        </main>
      </IncomeContext.Provider>
    </React.Fragment>
  );
}

export default App;
