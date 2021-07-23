import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import useStyles from './styles'
import Checkbox from '@material-ui/core/Checkbox';
import {Link , useHistory} from 'react-router-dom';




import {
  useMutation,
} from 'react-query'


import {signup} from '../../api/Auth'



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
    
       All rights reserved 2021.
     
    </Typography>
  );
}




export default function Signup() {

  const signupMutation =useMutation(info=>signup(info))
  const classes = useStyles();
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')

  const [password,setPassword]=useState('')
 
  const nameChange=(e)=>{
    setName(e.target.value)
    const pattern = /[^a-zA-Z0-9 ]+/
    if(e.target.value.match(pattern)){
      error.name="Name cannot contain special characters"
    }
    else{
       error.name=""
    }
   

  }
 
const [error,setError]=useState({
  name:"",
  password:"",
  email:"",

})
const history=useHistory()



  const emailChange=(e)=>{
    setEmail(e.target.value)

 

 const  pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);


 if(!e.target.value.match(pattern)){
   error.email="Enter valid email"
 }
 else{
    error.email=""
 }


    

  }
 



 
 

const [passvisible,setPassvisible]=useState(false)

  const passwordChange=(e)=>{
    setPassword(e.target.value)
   
    
    const patternUpper = /[A-Z]+/
     const patternLower = /[a-z]+/
     const patternNum = /[0-9]+/
     const patternSpecail = /[^a-zA-Z0-9 ]+/
     

        if(!e.target.value.match(patternLower) ){
          error.password="Password must have atleast one lower character"
        }
        
        else if(!e.target.value.match(patternUpper) ){
          error.password="Password must have atleast one upper character"
        }
        
        else if(!e.target.value.match(patternNum) ){
          error.password="Password must have atleast one Number"
        }
        else if(!e.target.value.match(patternSpecail) ){
          error.password="Password must have atleast Special character"
        }

        else{
          error.password=""
        }









     





  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    signupMutation.mutate(
      {name,email,password}
    )

  }


  if(signupMutation.isLoading){
    return(<>Loading</>)
  }
  
  if(signupMutation.isSuccess){
  
    localStorage.setItem('profile', JSON.stringify({name}))

    history.push(`/dashboard/all-community`)
  
    
  
  }

console.log(signupMutation)
 

  






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
          Sign up
        </Typography>
        {signupMutation.isError? <div >
          <span style={{textAlign:'center',color:"red" ,fontSize:'20px'}} >
           <p>Error!</p>
        
            {signupMutation.error.response.data.errors[0].msg}
          </span>
        </div>:null}
        <form className={classes.form} noValidate>
        
              <TextField
                autoComplete="Name"
                name="Name"
                variant="outlined"
                required
                fullWidth
                id="Name"
                label="Name"
                autoFocus
                onChange={nameChange}
                error={error.name!==""}
                helperText={error.name}
                value={name}
              />
           
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            
            type="email"
            onChange={emailChange}
            error={error.email!==""}
            value={email}
            helperText={error.email}

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
            onChange={passwordChange}
            error={error.password!==""}
            helperText={error.password}
            value={password}

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
{/*           
         <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Confirm Password"
            label="Confirm Password"
            type="Confirm Password"
            id="Confirm Password"
            autoComplete="current-password"
          /> */}

         
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={
              handleSubmit
            }
          >
            Sign up
          </Button>
          <Grid container justify="flex-end" >
          <Grid item >
              <Link to="/" variant="body2" >
                {" Already have an account? Sign in"}
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