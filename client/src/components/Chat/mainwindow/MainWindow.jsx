import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Chat from '../../spam/Chat/Chat'
import Groups from "./Groups";
import TextField  from "@material-ui/core/TextField";

import { alpha,makeStyles, useTheme } from "@material-ui/core/styles";



const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  
  drawer: {

    maxWidth:"100vw", 
   
    [theme.breakpoints.up("sm")]: {
  
  
      
      flexShrink: 0
    }
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor:"#282C34"
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("lg")]: {
      display: "none"
    }
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    [theme.breakpoints.down("sm")]: {
      maxWidth:"85vw",

    },
    width:370
  },
  content: {
    flexGrow: 1,
  
  },
 
 
  search:{
    width:"100%",
    padding:"20px"
  }
  
}));
const GROUP=["abc" ,"bcd","efg","hij"]

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <TextField id="outlined-basic" placeholder="Search" variant="outlined"  className={classes.search}/>

     {
       GROUP.map((grp)=>{
        return(
          <Groups GroupName={grp}/>
        )
        
       })
     }
    
     
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            HackRx
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden mdUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden mdDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Chat location={props.location.pathname} />
           
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  
  window: PropTypes.func
};

export default ResponsiveDrawer;