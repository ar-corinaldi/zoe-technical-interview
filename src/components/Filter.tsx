import { MenuItem, Select, useMediaQuery, useTheme } from "@mui/material";

const FILTER_OPTIONS = [
  "Name (A-Z)",
  "ID",
  "Income: High first",
  "Income: Low first",
  "(Default) Income: Closest first",
] as const;

export type FilterTypes = typeof FILTER_OPTIONS[number];

type FilterProps = {
  filter: FilterTypes;
  setFilter: (x: FilterTypes) => void;
};

function Filter(props: FilterProps) {
  const theme = useTheme();
  const isUpToSm = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        gap: "9px",
      }}
    >
      <label className="caption">Order agents by</label>
      <Select
        value={props.filter}
        onChange={(e) => props.setFilter(e.target.value as FilterTypes)}
        fullWidth={!isUpToSm}
      >
        {FILTER_OPTIONS.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}

export default Filter;
