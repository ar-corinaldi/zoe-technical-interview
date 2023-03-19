import {
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { IAgent } from "../interfaces";
import Card from "../components/Card";
import Filter, { type FilterTypes } from "../components/Filter";
/**
 * "id": 1,
    "name": "Michael",
    "avatar": "",
    "income": 85273
 */
type MatchPageProps = {
  income: number;
  setPageState: (x: "income" | "match") => void;
};

const THRESHOLD_VALUE = 10000;
/**
 * income = 50000
 * 55000 <= 60000
 * 55000 >= 40000
 */
const filterAndSortingAgentsByThreshold = ({
  agents,
  income,
  filter,
  hiddenAgentsDict,
}: {
  agents: IAgent[];
  income: number;
  filter: FilterTypes;
  hiddenAgentsDict: Record<number, IAgent>;
}) => {
  const filteredAgents = agents
    .filter((agent) => !(agent.id in hiddenAgentsDict))
    .filter(
      (agent) =>
        agent.income <= income + THRESHOLD_VALUE &&
        agent.income >= income - THRESHOLD_VALUE
    );

  const sortedAgents = filteredAgents.sort((agentA, agentB) => {
    const difA = Math.abs(agentA.income - income);
    const difB = Math.abs(agentB.income - income);
    return difA - difB;
  });

  return strategSortByFilter[filter](sortedAgents, income);
};

function numberFormatted(x: number) {
  return `$${x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

const ELEMENTS_PER_PAGE = 3;

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
          <button
            className="pagination-button"
            onClick={() => {
              setElementsIndex(
                (prevElementsIndex) => prevElementsIndex - ELEMENTS_PER_PAGE
              );
            }}
            disabled={elementsIndex <= 3 || agents.value.length === 0}
          >
            Show less -
          </button>
          <button
            className="pagination-button"
            onClick={() => {
              setElementsIndex(
                (prevElementsIndex) => prevElementsIndex + ELEMENTS_PER_PAGE
              );
            }}
            disabled={
              elementsIndex >= agents.value.length || agents.value.length === 0
            }
          >
            Show more +
          </button>
        </Grid>
      </Grid>
    </Grid>
  );
}

const strategSortByFilter: Record<
  FilterTypes,
  (agents: IAgent[], income: number) => IAgent[]
> = {
  ID: (agents) => agents.sort((agentA, agentB) => agentA.id - agentB.id),
  "Name (A-Z)": (agents) =>
    agents.sort((agentA, agentB) => agentA.name.localeCompare(agentB.name)),
  "Income: High first": (agents) =>
    agents.sort((agentA, agentB) => agentB.income - agentA.income),
  "Income: Low first": (agents) =>
    agents.sort((agentA, agentB) => agentA.income - agentB.income),
  "(Default) Income: Closest first": (agents: IAgent[], income: number) =>
    agents.sort((agentA, agentB) => {
      const difA = Math.abs(agentA.income - income);
      const difB = Math.abs(agentB.income - income);
      return difA - difB;
    }),
};
export default MatchPage;
