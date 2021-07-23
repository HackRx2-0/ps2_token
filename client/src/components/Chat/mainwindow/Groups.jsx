import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button'
import {useHistory, Link} from 'react-router-dom';

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

export default function Groups({grp, key}) {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = () => {
    history.replace({ pathname : `/dashboard/all-community`})
  }

  return (
        <Link to={`/dashboard/${grp}`} key={key} className={classes.root} variant="outlined">
        {grp}
        </Link>
  );
}
