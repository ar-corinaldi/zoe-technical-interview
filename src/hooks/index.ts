import React from "react";
import { FilterTypes } from "../components/Filter";
import { IAgent } from "../interfaces";

const THRESHOLD_VALUE = 10000;

const useMatchPage = () => {
  const numberFormatted = React.useCallback(
    (x: number) => `$${x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
    []
  );

  const strategSortByFilter: Record<
    FilterTypes,
    (agents: IAgent[], income: number) => IAgent[]
  > = React.useMemo(
    () => ({
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
    }),
    []
  );
  const filterAndSortingAgentsByThreshold = React.useCallback(
    ({
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
    },
    []
  );

  return {
    filterAndSortingAgentsByThreshold,
    strategSortByFilter,
    numberFormatted,
  };
};

export default useMatchPage;
