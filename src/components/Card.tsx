import React from "react";
import { IAgent } from "../interfaces";
import { Avatar, Grid, useMediaQuery, useTheme } from "@mui/material";

type CardProps = {
  agent: IAgent;
  setHiddenAgentsDict: React.Dispatch<
    React.SetStateAction<Record<number, IAgent>>
  >;
};
function Card(props: CardProps) {
  const theme = useTheme();
  const isUpToSm = useMediaQuery(theme.breakpoints.up("sm"));

  const handleOnClickCard = () => {
    props.setHiddenAgentsDict((prev) => ({
      ...prev,
      [props.agent.id]: { ...props.agent },
    }));
  };

  if (!isUpToSm) {
    return (
      <Grid
        container
        xs={12}
        padding="16px"
        sx={{
          background: "#FFFFFF",
          boxShadow: "0px 8px 16px rgba(29, 35, 58, 0.1)",
          borderRadius: "12px",
        }}
        onClick={() => handleOnClickCard()}
      >
        <Grid item xs={4}>
          <Avatar
            style={{ width: "112px", height: "112px" }}
            src={props.agent.avatar}
          />
        </Grid>
        <Grid container item xs={8}>
          <Grid item xs={12}>
            <h4 className="card-name no-gutters">{props.agent.name}</h4>
          </Grid>
          <Grid item xs={12}>
            <h5 className="card-id no-gutters">ID: {props.agent.id}</h5>
          </Grid>
          <Grid item xs={12}>
            <div className="income-label">
              Income: <span className="bold"> ${props.agent.income}</span>
            </div>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  return (
    <div className="card secondary-color" onClick={() => handleOnClickCard()}>
      <div className="card-body">
        <Avatar
          style={{ width: "112px", height: "112px" }}
          src={props.agent.avatar}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <h4 className="card-name no-gutters">{props.agent.name}</h4>
          <h5 className="card-id no-gutters">ID: {props.agent.id}</h5>
        </div>
      </div>
      <footer className="card-footer income-label">
        Income: <span className="bold"> ${props.agent.income}</span>
      </footer>
    </div>
  );
}

export default Card;
