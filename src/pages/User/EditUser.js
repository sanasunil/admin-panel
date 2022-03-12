import React,{useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from '@material-ui/core';
import { useHistory,useParams} from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import {  getSingleUser, updateUser } from '../../redux/action';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: theme.spacing(2)
  },
  content: {
    margin: theme.spacing(2),
    padding: theme.spacing(2)
  }
}));

const EditUser = () => {
    const [state,setState]=useState({
        username:"",
        password: "",
        userType : "",
        userToken : "",

    });
const [error,setError] = useState("");

const{username,password,userType,userToken}=state;

let {id}=useParams();
const {user} = useSelector(state => state.data);
let history = useHistory();
let dispatch = useDispatch();

useEffect(()=>{
    dispatch(getSingleUser(id))
},[]);
   
useEffect(()=>{
       if(user){
         setState({...user})
       }
},[user])

const handleInputChange = (e) =>{
     let {name,value} = e.target;
     setState({...state,[name]:value});
 }

 const handleSubmit = (e) =>{
     e.preventDefault();
     if(!username || !password || !userType ||!userToken){
         setError("All input field is required")
     }else{
        dispatch(updateUser(state, id));
        history.push("/app/user");
        setError("");
     }

 }
 const classes = useStyles();
  return (
    <div className={classes.root}>
        <CssBaseline />
        <Paper className={classes.content}>
        <div className={classes.toolbar}>
          <Typography variant="h6" component="h1" color="secondary">
            Edit User
          </Typography>

        <Button 
          style={{width:"100px",marginTop:"20px"}} 
          variant="contained" color="secondary"
          onClick={()=>{history.push("/app/user")}}
          >Go Back</Button>
        </div>
        
        {error && <h4 style={{color:"red"}}>{error}</h4>}

    <form noValidate autoComplete='off' onSubmit={handleSubmit}>    
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField 
         id="outlined-basic"
         name= "username"
         label="Userame"
         variant="outlined"
         value={username || ""}
         type="text"
         onChange={handleInputChange} />
      <br/>
      <TextField 
         id="outlined-basic"
         name= "password"
         label="Password"
         variant="outlined"
         value={password || ""}
         type="text"
         onChange={handleInputChange} />
      <br/>
      <TextField 
         id="outlined-basic"
         name= "userType"
         label="UserType"
         variant="outlined"
         value={userType || ""}
         type="text"
         onChange={handleInputChange} />
      <br/>
      <TextField 
         id="outlined-basic"
         name= "userToken"
         label="UserToken"
         variant="outlined"
         value={userToken || ""}
         type="number" 
         onChange={handleInputChange} />
      <br/>
    </Box>
    
    <Button 
      style={{width:"100px"}} 
      variant="contained" color="secondary"
      type="submit">Update</Button>
    </form>
    </Paper>
    </div>
  )
}

export default EditUser;