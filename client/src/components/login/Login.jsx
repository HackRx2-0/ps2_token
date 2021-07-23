import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {Link , useHistory} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import useStyles from './style'
import {useMutation} from 'react-query'
import {login } from '../../api/Auth'
import Checkbox from '@material-ui/core/Checkbox';



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
    
       All rights reserved 2021.
     
    </Typography>
  );
}





export default function Login() {
  const classes = useStyles();
  const loginMutation =useMutation(info=>login(info))

  
  const [email,setemail]=useState('')
  const [password,setPassword]=useState('')

  const changeemail=(e)=>{
      
   
        setemail(e.target.value)
      
     

  }



  const [passvisible,setPassvisible]=useState(false)


  const changePass=(e)=>{
    setPassword(e.target.value)
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    loginMutation.mutate( {email,password})


    
  }

 
const history=useHistory()

if(loginMutation.isLoading){
  return(<>loading</>)
}

if(loginMutation.isSuccess){

  localStorage.setItem('profile', JSON.stringify({ ...loginMutation.data.data}))
  history.push(`/dashboard/all-community`)

  

}
  



  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography component="h1" variant="h5" className={classes.paper} >
            Social Commerce
        </Typography>
      </div>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
           Login
        </Typography>


        {loginMutation.isError? <div >
          <span style={{textAlign:'center',color:"red" ,fontSize:'20px'}} >
           <p>error</p>
        
            {loginMutation.error.response.data.errors[0].msg}
          </span>
        </div>:null}

        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email number"
            label="email Number"
            name="email number"
            autoComplete="email number"
            type="email"
            autoFocus
            value={email}
            onChange={changeemail}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={passvisible?"text":"password"}
            id="password"
            autoComplete="current-password"
            onChange={changePass}
          />
          <div>
            <Checkbox
            
            color="primary"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
            onClick={()=>setPassvisible(!passvisible)}
          />
          <span style={{marginLeft:"10px"}}>
            Show password
          </span>
            </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/Signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}