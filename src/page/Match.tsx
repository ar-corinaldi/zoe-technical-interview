import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import { IAgent } from "../interfaces";
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
const filterAndSortingAgentsByThreshold = (
  agents: IAgent[],
  income: number
) => {
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
  return sortedAgents;
};

const ELEMENTS_PER_PAGE = 3;

function MatchPage(props: MatchPageProps) {
  const [agents, setAgents] = React.useState<IAgent[]>([]);
  const [elementsIndex, setElementsIndex] = React.useState(3);

  React.useEffect(() => {
    fetch("AGENTS_LIST.json")
      .then((req) => req.json())
      .then((agents) => {
        setAgents(filterAndSortingAgentsByThreshold(agents, props.income));
      });
  }, []);

  console.log(elementsIndex);

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

export default MatchPage;
