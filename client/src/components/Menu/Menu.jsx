import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import Menu from "@material-ui/core/Menu";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Flag from "../Flag/Flag";
import { countryCodes } from "../../utils";

const useStyles = makeStyles(() => ({
  currencyName: {
    marginLeft: 10,
    fontSize: 15,
  },
}));

const ExchangeCardMenu = ({
  anchorElement,
  id,
  open,
  onClose,
  menuItemOnClick,
  isLoading,
  getCurrencyName,
  ...restProps
}) => {
  const classes = useStyles();

  return (
    <Menu
      id="menu"
      anchorEl={anchorElement}
      keepMounted
      open={open}
      onClose={onClose}
      {...restProps}
    >
      {countryCodes.map((code, index) => (
        <MenuItem
          style={{ backgroundColor: "#F5F5F5" }}
          key={code}
          onClick={() => menuItemOnClick(index)}
        >
          <Flag code={code} />
          {isLoading ? (
            <CircularProgress size={25} />
          ) : (
            <h5 className={classes.currencyName}>{getCurrencyName(index)}</h5>
          )}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default ExchangeCardMenu;
