import LeftArrowIcon from "../assets/left-arrow.png";
import GroupIcon from "../assets/group-icon.svg";
import DollarIcon from "../assets/Currency.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Grid } from "@mui/material";

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
  const { handleSubmit, setValue, formState } = useForm({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const onSuccess = (values: any) => {
    props.setIncome(values.income);
    props.setPageState("match");
  };

  const hasIncomeError = Boolean(formState.errors.income);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        gap: "56px",
        alignContent: "center",
        width: "100%",
      }}
    >
      <div className="container" style={{ gap: "16px", alignItems: "center" }}>
        <img src={GroupIcon} style={{ width: "90px", height: "63px" }} />
        <h3 className="title no-gutters" style={{ marginTop: "8.5px" }}>
          Find the best agent for you!
        </h3>
        <h5 className="subtitle-2 no-gutters">
          Fill the information below to get your matches!
        </h5>
      </div>
      <form onSubmit={handleSubmit(onSuccess)} className="form">
        <Grid
          container
          style={{
            width: "364px",
            alignSelf: "center",
            gap: "40px",
            display: "flex",
          }}
        >
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "start",
              gap: "10px",
            }}
          >
            <label
              style={{
                color: hasIncomeError ? "#d32f2f" : "#5F5F5F",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "16px",
              }}
            >
              {hasIncomeError
                ? formState.errors.income?.message
                : "Current Income"}
            </label>
            <div
              style={{
                lineHeight: "1.4375em",
                position: "relative",
              }}
            >
              <img
                src={DollarIcon}
                style={{
                  position: "absolute",
                  width: "10.13px",
                  left: "15px",
                  top: "38%",
                }}
              />
              <input
                type="number"
                onChange={(e) => {
                  const valueNumber = Number(e.target.value);
                  if (isNaN(valueNumber)) return;
                  setValue("income", valueNumber);
                }}
                name="income"
                style={{
                  lineHeight: "1.4375em",
                  height: "46px",
                  width: "320px",
                  padding: "10px",
                  paddingLeft: "2rem",
                  border: "1px solid #DCDCDC",
                  fontSize: "16px",
                  borderRadius: "4px",
                  borderColor: hasIncomeError ? "#d32f2f" : "inherit",
                }}
              />
            </div>
          </Grid>
          <Grid item xs={12} style={{ width: "inherit", textAlign: "end" }}>
            <button type="submit" className="button-contained">
              <label style={{ position: "relative", right: "5px" }}>
                Get matches
              </label>
              <img
                src={LeftArrowIcon}
                style={{
                  position: "relative",
                  width: "15.78px",
                  height: "15.56px",
                  left: "11.78px",
                  top: "2px",
                }}
              />
            </button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default IncomePage;
