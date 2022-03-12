import React,{useEffect} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useDispatch,useSelector} from "react-redux";
import { deleteUsers, loadUsers } from '../../redux/action';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useHistory } from 'react-router-dom';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  const useStyles= makeStyles({
      table:{
          marginTop:100,
          minWidth : 900
      },
      
  })

const User = () => {
    const classes = useStyles();
    let dispatch = useDispatch();
    const {users}= useSelector(state=>state.data)
    let history = useHistory();

    useEffect(()=>{
      dispatch(loadUsers());
    },[]);

    const handleDelete=(id)=>{
      if(window.confirm("Are you sure wanted to delete the user ?")){
        dispatch(deleteUsers(id));
        
      }
    }
  return (
    <div >
      
      
      <div>
      <Button variant="contained" onClick ={()=> history.push("/app/user/addUser")}>Add User</Button>
      </div>
      
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Username</StyledTableCell>
            <StyledTableCell align="center">Password</StyledTableCell>
            <StyledTableCell align="center">UserType</StyledTableCell>
            <StyledTableCell align="center">UserToken</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users && users.map((user) => (
            <StyledTableRow key={user.id}>
             
              <StyledTableCell component="th" scope="row"> {user.username}</StyledTableCell>
              <StyledTableCell align="center">{user.password}</StyledTableCell>
              <StyledTableCell align="center">{user.userType}</StyledTableCell>
              <StyledTableCell align="center">{user.userToken}</StyledTableCell>
              <StyledTableCell align="center">
              <ButtonGroup 
              
                 variant="contained" 
                 aria-label="outlined primary button group">
                  <Button 
                    onClick={()=>history.push(`/app/user/editUser/${user.id}`)} 
                    style={{marginRight:"5px"}} 
                    color = "primary"
                    >Edit</Button>
                  <Button onClick={()=> handleDelete(user.id)} color = "secondary">Delete</Button>
               
              </ButtonGroup>
              </StyledTableCell>
            </StyledTableRow>
          ))}
          </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default User;
