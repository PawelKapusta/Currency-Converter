import React from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import CircularProgress from "@material-ui/core/CircularProgress";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { makeStyles } from "@material-ui/core/styles";
import { countryCodes } from "../../utils";
import Flag from "../Flag/Flag";

const useStyles = makeStyles(() => ({
  input: {
    backgroundColor: "#F5F5F5",
    marginBottom: 5,
  },
  inputAdornmentStart: {
    position: "start",
    marginRight: 8,
  },
  inputAdornmentEnd: {
    position: "end",
  },
}));

const Input = ({
  isLoading,
  currencyValue,
  currencyCode,
  index,
  onChange,
  ...restProps
}) => {
  const classes = useStyles();

  return (
    <OutlinedInput
      className={classes.input}
      type="number"
      startAdornment={
        <InputAdornment className={classes.inputAdornmentStart}>
          <Flag code={countryCodes[index]} />
        </InputAdornment>
      }
      fullWidth
      value={currencyValue}
      endAdornment={
        <InputAdornment className={classes.inputAdornmentEnd}>
          {isLoading ? <CircularProgress size={25} /> : <b>{currencyCode}</b>}
        </InputAdornment>
      }
      onChange={onChange}
      {...restProps}
    />
  );
};

export default Input;
