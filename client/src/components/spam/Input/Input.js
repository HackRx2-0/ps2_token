import React, {useState} from "react";
import Divider from "@material-ui/core/Divider";
import {makeStyles,withStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import { Typography, Button } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import SendIcon from '@material-ui/icons/Send';
import CardActions from '@material-ui/core/CardActions';
import {Link} from 'react-router-dom'
import AttachFileIcon from '@material-ui/icons/AttachFile';
import Badge from '@material-ui/core/Badge';

import "./Input.css";
import circle from '../../../assets/circle.png';

const useStyles = makeStyles(theme=> ({
  root: {
    maxWidth: 345,
    margin : "10px",
    width : 300,
    border : "1px solid black"
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
    recommendRoot : {
    },
    icon : {
        height: "40px",
        width : "40px",
        borderRadius: "50%",
        objectFit : "cover"
    },
    inputDiv: {
        display : "flex",
        flexDirection : "column",
    },
    recBtn : {
        justifySelf : "flex-end",
        display : "flex",
        justifyContent : "flex-end"
    },
    paper : {
      width : "500px",
      minWidth : "80vw",
      minHeight: "60vh",
      [theme.breakpoints.down('sm')] : {
        minWidth : "95vw",
      }
    },
    prods: {
      display : "flex",
      flexWrap : "wrap",
      justifyContent : "center",
    },
    link : {
      backgroundColor : "#4EB4CB",
      color : "white",
      textDecoration : "none",
      fontWeight : "600",
      padding: "5px",
      width : "100%",
      display : "flex",
      justifyContent : "center",
      cursor : "pointer"
    }
})) 
const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });
  
  const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);
  
  const DialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);


  const Recommend = ({ prods }) =>{
    const classes = useStyles();
    console.log(prods)
    const [open,setOpen] = useState(false );

    React.useEffect(() => {setOpen(Boolean( prods && prods.product && prods.product.productName ))},[Boolean(prods && prods.product )])

    const handleClick = () => {
        setOpen(!open);
        
    }
    return (
        <>
        <div className={classes.recommendRoot} >
            <IconButton onClick={handleClick}>
                {
                  prods && prods.product && prods.product.productImage ?
                <Badge color="secondary" variant="dot">
                  <img className={classes.icon} src={circle} alt="icon" />
                </Badge>
                :
                  <img className={classes.icon} src={circle} alt="icon" />
                }
            </IconButton>
        </div>
        <Dialog onClose={handleClick} aria-labelledby="customized-dialog-title" open={ open } classes={{ paper : classes.paper}}>
          <DialogTitle id="customized-dialog-title" onClose={handleClick}>
            Recommendations
          </DialogTitle>
          <DialogContent dividers>
              <div className={classes.prods}>
                {
                  prods && prods.product && prods.product.productImage?
                  
                  <Card className={classes.root}>
                    <CardHeader
                      title={prods.product.productName}
                      subheader={prods.product.productPrice}
                    />
                    <CardMedia
                      className={classes.media}
                      image={prods.product.productImage}
                      title={'phone'}
                    />
                    <CardActions disableSpacing>
                      <a href={prods.product.productUrl} target="_blank" aria-label="add to favorites" className={classes.link}>
                        Buy
                      </a>
                    </CardActions>
                  </Card>
                  :
                  <span >Nothing to show here.</span>
                }
              </div>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClick} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }

const Input = ({ message, setMessage, sendMessage, setFile, prods }) => {
    const classes =useStyles();

    const selectFile = (e) => {
      setMessage(e.target.files[0].name);
      setFile(e.target.files[0]);
    }

    return(
    <div className={classes.inputDiv}>
        <div className={classes.recBtn}>
            <Recommend prods={prods} />
        </div>
    <form className="Input_Form">
        <Divider/>
        <div className="inputDiv">
            <label for="file-send" className="fileBtn"> <AttachFileIcon className="icon" /> </label>
            <input type="file" onChange={selectFile} id='file-send' style={{ display : "none"}} />
            
            <input 
                className="input"  
                type="text" 
                placeholder="Type a message..." 
                value={message} 
                onChange={(event) => setMessage(event.target.value)}
                onKeyPress={(event) => event.key === 'Enter' ? sendMessage(event) : null}>                
            </input>
            <button className="sendButton" onClick={(event) => sendMessage(event)}> <SendIcon className="send-icon" /> </button>
            
        </div>

       {/* <input  onChange={(event) => setMessage(event.target.value)} type="file"/>
        */}<Divider/> 
    </form>
    </div>
)};

export default Input;