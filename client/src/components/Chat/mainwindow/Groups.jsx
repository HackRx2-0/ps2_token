import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button'
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin:"10px",
    backgroundColor:"grey",
    width : "100%",
    "&:hover":{
        backgroundColor:"blue"
    }
  },
}));

export default function Groups({GroupName, key}) {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = () => {
    window.location.reload();
    history.push({ pathname : '/dashboard' , search : `room=${GroupName}`})
  }

  return (
      <Button key={key} onClick={handleClick} className={classes.root} variant="outlined">
      {GroupName}
      </Button>
  );
}
