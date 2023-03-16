import { Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import GroupsIcon from "@mui/icons-material/Groups";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  income: z.number().max(99_999).min(10_000),
});

type IncomeForm = z.infer<typeof schema>;
const defaultValues: IncomeForm = {
  income: 0,
};

type IcomePageProps = {
  setPageState: (x: "income" | "match") => void;
  setIncome: (x: number) => void;
};

function IncomePage(props: IcomePageProps) {
  const { control, handleSubmit } = useForm({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const onSuccess = (values: any) => {
    console.log(values);
    props.setIncome(values.income);
    props.setPageState("match");
  };

  const onError = (err: any) => {
    console.log(err);
  };

  return (
    <Grid
      container
      justifyContent="center"
      textAlign="center"
      gap={2}
      width="60%"
    >
      <Grid item xs={12}>
        <GroupsIcon fontSize="large" />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4">Find the best agent for you!</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">
          Fill the information below to get your matches!
        </Typography>
      </Grid>
      <Grid item xs={12} mt={3}>
        <form onSubmit={handleSubmit(onSuccess, onError)}>
          <Grid container alignContent="center" justifyContent="center">
            <Grid item xs={5}>
              <Typography align="left">Current Income</Typography>
              <Controller
                name="income"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    onChange={(e) => {
                      const numberValue = Number(e.target.value);
                      if (isNaN(numberValue)) return;
                      field.onChange(Number(numberValue));
                    }}
                    hiddenLabel
                    variant="outlined"
                    fullWidth
                    InputProps={{ startAdornment: <i>$</i> }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} mt={3}>
              <Button
                variant="contained"
                type="submit"
                endIcon={<ArrowForwardIcon />}
              >
                Get matches
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}

export default IncomePage;
