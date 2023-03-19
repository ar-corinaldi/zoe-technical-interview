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
}: {
  agents: IAgent[];
  income: number;
  filter: FilterTypes;
}) => {
  const filteredAgents = agents.filter(
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

function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const ELEMENTS_PER_PAGE = 3;

function MatchPage(props: MatchPageProps) {
  const [agents, setAgents] = React.useState<IAgent[]>([]);
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
        setAgents(
          filterAndSortingAgentsByThreshold({
            agents,
            income: props.income,
            filter,
          })
        );
      });
  }, [filter]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h3" fontWeight="bold">
          Your Matches
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <ul>
          {agents.slice(0, elementsIndex).map((agent) => (
            <li key={agent.id}>
              {agent.name}, {agent.income}
            </li>
          ))}
        </ul>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          onClick={() => {
            setElementsIndex(
              (prevElementsIndex) => prevElementsIndex - ELEMENTS_PER_PAGE
            );
          }}
          disabled={elementsIndex <= 3}
        >
          see less
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setElementsIndex(
              (prevElementsIndex) => prevElementsIndex + ELEMENTS_PER_PAGE
            );
          }}
          disabled={elementsIndex + ELEMENTS_PER_PAGE >= agents.length}
        >
          see more
        </Button>
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
