import { Grid, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { IAgent } from "../interfaces";
import Card from "../components/Card";
import Filter, { type FilterTypes } from "../components/Filter";
import useMatchPage from "../hooks";
import PaginationButtons from "../components/PaginationButtons";
import IncomePage from "./Income";

type MatchPageProps = {
  income: number;
  setPageState: (x: "income" | "match") => void;
  setIncome: (x: number) => void;
};

export const ELEMENTS_PER_PAGE = 3;

function MatchPage(props: MatchPageProps) {
  const [agents, setAgents] = React.useState<{
    hasLoaded: boolean;
    value: IAgent[];
  }>({ hasLoaded: false, value: [] });

  const [hiddenAgentsDict, setHiddenAgentsDict] = React.useState<
    Record<number, IAgent>
  >({});

  const [elementsIndex, setElementsIndex] = React.useState(3);
  const [filter, setFilter] = React.useState<FilterTypes>(
    "(Default) Income: Closest first"
  );
  const theme = useTheme();
  const isUpToMd = useMediaQuery(theme.breakpoints.up("md"));
  const isUpToSm = useMediaQuery(theme.breakpoints.up("sm"));
  const {
    filterAndSortingAgentsByThreshold,
    numberFormatted,
    strategSortByFilter,
  } = useMatchPage();

  React.useEffect(() => {
    fetch("AGENTS_LIST.json")
      .then((req) => req.json())
      .then((agents) => {
        setAgents({
          hasLoaded: true,
          value: filterAndSortingAgentsByThreshold({
            income: props.income,
            agents,
            filter,
            hiddenAgentsDict,
          }),
        });
        if (elementsIndex > agents.length) setElementsIndex(3);
      });
  }, [filter, hiddenAgentsDict]);

  return (
    <Grid
      container
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: "32px",
        textAlign: "center",
        justifyContent: "center",
      }}
    >
      <Grid
        item
        xs={12}
        container
        style={{
          maxWidth: "912px",
          display: "flex",
          gap: "32px",
          paddingBottom: "32px",
        }}
      >
        <Grid
          container
          item
          xs={12}
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          <h3 className="title no-gutters">Your matches</h3>
          <h5 className="subtitle no-gutters">
            Your Income:{" "}
            <span className="bold">{numberFormatted(props.income)}</span>
          </h5>
        </Grid>
        <Grid item xs={12}>
          <IncomePage
            setIncome={props.setIncome}
            setPageState={props.setPageState}
          />
        </Grid>
        <Grid item xs={12} style={{ alignSelf: "start" }}>
          <Filter filter={filter} setFilter={setFilter} />
        </Grid>
        <Grid item xs={12} container justifyContent="space-between">
          {agents.hasLoaded && agents.value.length === 0 && (
            <Grid container>
              <Grid item xs={12}>
                <h5>
                  No available Agents based on your income. Please try a
                  different income value.
                </h5>
              </Grid>
              <Grid item xs={12}>
                <button
                  className="button-contained"
                  onClick={() => props.setPageState("income")}
                >
                  Change Income
                </button>
              </Grid>
            </Grid>
          )}
          {agents.hasLoaded &&
            agents.value.length !== 0 &&
            agents.value.slice(0, elementsIndex).map((agent) => (
              <Grid
                item
                key={agent.id}
                md={4}
                sm={6}
                xs={12}
                display={agent.id in hiddenAgentsDict ? "none" : "block"}
                sx={{
                  padding: `${
                    !isUpToSm ? "16px 0px 0px 0px" : "16px 24px 0px 0px"
                  }`,
                  textAlign: "-webkit-center",
                }}
              >
                <Card agent={agent} setHiddenAgentsDict={setHiddenAgentsDict} />
              </Grid>
            ))}
        </Grid>
        <Grid
          container
          item
          xs={12}
          gap={2}
          justifyContent={isUpToMd ? "end" : "space-between"}
        >
          <PaginationButtons
            agentsSize={agents.value.length}
            elementsIndex={elementsIndex}
            setElementsIndex={setElementsIndex}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default MatchPage;
