import React, {useContext, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import ReactCountryFlag from "react-country-flag";
import CurrencyContext from "../../context/CurrencyContext";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from '@material-ui/core/Button';
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: "auto",
      marginTop: theme.spacing(15),
      width: theme.spacing(55),
      height: theme.spacing(70),
    },
  },
  title :{
    marginTop: 35,
    marginLeft: 45,
    fontSize: 40
  },
  label: {
    fontSize: 20,
    marginBottom: 1
  },
  list: {
    width: '100%',
    maxWidth: 390,
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
  },
  listItem:{
    marginBottom: 5
  },
  input: {
    backgroundColor: "#F5F5F5",
    marginBottom: 5
  },
  button: {
    marginLeft: 15
  },
  financial: {
    fontSize: 21
  }
}));

const ExchangeCard = () => {
  const countryCode =
   ['TH', 'US', 'AU', 'HK', 'CA', 'NZ',
     'SG', 'EU', 'HU', 'CH', 'GB', 'UA', 'JP', 'CZ', 'DK', 'IS', 'NO', 'SE',
     'HR', 'RO', 'BG', 'TR', 'IL', 'CL', 'PH', 'MX', 'ZA', 'BR', 'MY',
     'RU', 'ID', 'IN', 'KR', 'CN', 'PL'];
  const classes = useStyles();
  const {currency} = useContext(CurrencyContext);
  const [firstCurrency, setFirstCurrency] = useState('');
  const [secondCurrency, setSecondCurrency] = useState('');
  const [firstIndex, setFirstIndex] = useState(0);
  const [secondIndex, setSecondIndex] = useState(1);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setFirstCurrency('')
    setSecondCurrency('')
  };

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
    setFirstCurrency('')
    setSecondCurrency('')
  };
  const calculateFirstCurrency = (value) => {
    setSecondCurrency(value);
    setFirstCurrency(String((currency[secondIndex].mid / currency[firstIndex].mid).toFixed(5) * value));
  }
  const calculateSecondCurrency = (value) => {
    setFirstCurrency(value);
    setSecondCurrency(String((currency[firstIndex].mid / currency[secondIndex].mid).toFixed(5) * value));
  }

  return (
   <div className={classes.root}>
     <Paper elevation={3}>
       <h1 className={classes.title}>Currency Converter</h1>
       <List className={classes.list}>
         <ListItem className={classes.listItem}>
           <InputLabel className={classes.label}>You send</InputLabel>
         </ListItem>
         <Button className={classes.button} aria-controls="simple-menu" aria-haspopup="true"  startIcon={<AttachMoneyIcon/>} color="primary" variant="outlined" onClick={handleClick}>
           Choose Currency
         </Button>
         <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
         >
           {countryCode.map((code, index) =>
            <MenuItem  key={code} onClick={() => {
              setFirstIndex(index);
              handleClose();
            }}>
              <ReactCountryFlag
               countryCode={code}
               svg
               style={{
                 width: '2.5em',
                 height: '2.5em',
               }}
               title={code}
              />
            </MenuItem>
           )}
         </Menu>
         <ListItem>
           <OutlinedInput
            className={classes.input}
            type="number"
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <ReactCountryFlag
                 countryCode={countryCode[firstIndex]}
                 svg
                 style={{
                   width: '2.5em',
                   height: '2.5em',
                 }}
                 title={countryCode[firstIndex]}
                />
              </InputAdornment>
            }
            fullWidth
            value={firstCurrency}
            endAdornment={<InputAdornment position="end"> <b>{!currency ?
             <CircularProgress/> : currency[firstIndex].code}</b></InputAdornment>}
            onChange={(e) => calculateSecondCurrency(e.target.value)}
           />
         </ListItem>
         <ListItem>
           <InputLabel className={classes.label}>They receive</InputLabel>
         </ListItem>
         <Button className={classes.button} aria-controls="menu" aria-haspopup="true" startIcon={<AttachMoneyIcon/>} color="primary" variant="outlined" onClick={handleClick2}>
           Choose Currency
         </Button>
         <Menu
          id="menu"
          anchorEl={anchorEl2}
          keepMounted
          open={Boolean(anchorEl2)}
          onClose={handleClose2}
         >
           {countryCode.map((code, index2) =>
            <MenuItem key={code} onClick={() => {
              setSecondIndex(index2);
              handleClose2();
            }}>
              <ReactCountryFlag
               countryCode={code}
               svg
               style={{
                 width: '2.5em',
                 height: '2.5em',
               }}
               title={code}
              />
            </MenuItem>
           )}
         </Menu>
         <ListItem>
           <OutlinedInput
            className={classes.input}
            type="number"
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <ReactCountryFlag
                 countryCode={countryCode[secondIndex]}
                 svg
                 style={{
                   width: '2.5em',
                   height: '2.5em',
                 }}
                 title={countryCode[secondIndex]}
                />
              </InputAdornment>
            }
            fullWidth
            value={secondCurrency}
            onChange={(e) => calculateFirstCurrency(e.target.value)}
            endAdornment={<InputAdornment position="end"><b>{!currency ?
             <CircularProgress/> : currency[secondIndex].code}</b></InputAdornment>}
           />
         </ListItem>
         <ListItem> <label className={classes.financial}>1 {!currency ? <CircularProgress/> : currency[firstIndex].code} = <b> {!currency ?
          <CircularProgress/> : (currency[firstIndex].mid / currency[secondIndex].mid).toFixed(5)} </b> {!currency ?
          <CircularProgress/> : currency[secondIndex].code}</label></ListItem>
         <ListItem><InputLabel><b>No transfer fee</b></InputLabel></ListItem>
       </List>
     </Paper>
   </div>
  );
}

export default ExchangeCard;