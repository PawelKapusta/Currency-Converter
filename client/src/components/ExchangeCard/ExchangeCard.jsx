import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import InputLabel from "@material-ui/core/InputLabel";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import CurrencyContext from "../../context/CurrencyContext";
import { capitalize } from "../../utils";
import Input from "../Input/Input";
import ExchangeCardMenu from "../Menu/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: "auto",
      marginTop: theme.spacing(15),
      width: theme.spacing(55),
      height: theme.spacing(70),
    },
  },
  title: {
    marginTop: 35,
    marginLeft: 45,
    fontSize: 40,
  },
  label: {
    fontSize: 20,
    marginBottom: 1,
  },
  list: {
    width: "100%",
    maxWidth: 390,
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
  },
  listItem: {
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#F5F5F5",
    marginBottom: 5,
  },
  button: {
    marginLeft: 15,
  },
  financial: {
    fontSize: 21,
  },
  inputAdornmentStart: {
    position: "start",
    marginRight: 8,
  },
  inputAdornmentEnd: {
    position: "end",
  },
  financialCircularProgress: {
    marginLeft: "0.5rem",
  },
}));

const ExchangeCard = () => {
  const classes = useStyles();
  const { currency, isLoading } = useContext(CurrencyContext);
  const [sendCurrency, setSendCurrency] = useState("");
  const [receiveCurrency, setReceiveCurrency] = useState("");
  const [sendIndex, setSendIndex] = useState(0);
  const [receiveIndex, setReceiveIndex] = useState(1);
  const [anchorElement, setAnchorElement] = useState(null);
  const [secondAnchorElement, setSecondAnchorElement] = useState(null);

  const handleClick = (event) => {
    setAnchorElement(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElement(null);
    setSendCurrency("");
    setReceiveCurrency("");
  };

  const secondHandleClick = (event) => {
    setSecondAnchorElement(event.currentTarget);
  };

  const secondHandleClose = () => {
    setSecondAnchorElement(null);
    setSendCurrency("");
    setReceiveCurrency("");
  };

  const calculateSendCurrency = (value) => {
    setReceiveCurrency(value);
    const final = Number(
      (currency[receiveIndex].mid / currency[sendIndex].mid) * value
    ).toFixed(2);
    setSendCurrency(final);
  };

  const calculateReceiveCurrency = (value) => {
    setSendCurrency(value);
    const final = Number(
      (currency[sendIndex].mid / currency[receiveIndex].mid) * value
    ).toFixed(2);
    setReceiveCurrency(final);
  };

  const getCurrencyName = (index) => {
    if (!currency || currency.length === 0) {
      return;
    }

    const endOfCurrencyName = currency[index].currency.indexOf("(");

    if (endOfCurrencyName === -1) {
      // eslint-disable-next-line consistent-return
      return capitalize(currency[index].currency);
    }

    // eslint-disable-next-line consistent-return
    return capitalize(currency[index].currency.substring(0, endOfCurrencyName));
  };

  const getCurrencyCode = (index) => {
    if (!currency || currency.length === 0) {
      return;
    }
    // eslint-disable-next-line consistent-return
    return currency[index].code;
  };

  const calculateCurrencyFactor = () => {
    if (!currency || currency.length === 0) {
      return;
    }
    // eslint-disable-next-line consistent-return
    return (currency[sendIndex].mid / currency[receiveIndex].mid).toFixed(2);
  };

  const sendCurrencyCode = getCurrencyCode(sendIndex);
  const receiveCurrencyCode = getCurrencyCode(receiveIndex);

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <h1 className={classes.title}>Currency Converter</h1>
        <List className={classes.list}>
          <ListItem className={classes.listItem}>
            <InputLabel className={classes.label}>You send</InputLabel>
          </ListItem>
          <Button
            className={classes.button}
            aria-controls="simple-menu"
            aria-haspopup="true"
            startIcon={<AttachMoneyIcon />}
            color="primary"
            variant="outlined"
            onClick={handleClick}
          >
            Choose Currency
          </Button>
          <ExchangeCardMenu
            anchorElement={anchorElement}
            isLoading={isLoading}
            id="simple-menu"
            onClose={handleClose}
            open={!!anchorElement}
            menuItemOnClick={(index) => {
              setSendIndex(index);
              handleClose();
            }}
            getCurrencyName={getCurrencyName}
          />
          <ListItem>
            <Input
              currencyValue={sendCurrency}
              currencyCode={sendCurrencyCode}
              isLoading={isLoading}
              index={sendIndex}
              onChange={(e) => calculateReceiveCurrency(e.target.value)}
            />
          </ListItem>
          <ListItem>
            <InputLabel className={classes.label}>They receive</InputLabel>
          </ListItem>
          <Button
            className={classes.button}
            aria-controls="menu"
            aria-haspopup="true"
            startIcon={<AttachMoneyIcon />}
            color="primary"
            variant="outlined"
            onClick={secondHandleClick}
          >
            Choose Currency
          </Button>
          <ExchangeCardMenu
            anchorElement={secondAnchorElement}
            isLoading={isLoading}
            id="menu"
            onClose={secondHandleClose}
            open={!!secondAnchorElement}
            menuItemOnClick={(index) => {
              setReceiveIndex(index);
              secondHandleClose();
            }}
            getCurrencyName={getCurrencyName}
          />
          <ListItem>
            <Input
              currencyValue={receiveCurrency}
              currencyCode={receiveCurrencyCode}
              isLoading={isLoading}
              index={receiveIndex}
              onChange={(e) => calculateSendCurrency(e.target.value)}
            />
          </ListItem>
          <ListItem>
            <div className={classes.financial}>
              1 {sendCurrencyCode} =
              {isLoading ? (
                <CircularProgress
                  size={20}
                  className={classes.financialCircularProgress}
                />
              ) : (
                <b> {calculateCurrencyFactor()} </b>
              )}
              {receiveCurrencyCode}
            </div>
          </ListItem>
          <ListItem>
            <InputLabel>
              <b>No transfer fee</b>
            </InputLabel>
          </ListItem>
        </List>
      </Paper>
    </div>
  );
};

export default ExchangeCard;
