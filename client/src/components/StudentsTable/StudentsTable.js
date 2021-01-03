import React, { useEffect, useState } from "react"
import "./StudentTable.css";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import StudentData from './StudentData'


export function StudentTable(prop){
let searchData=[],cnt=0;
searchData=prop.Data

    return(
    <div >
   
    {/* <a href="/#/StudentData">call</a> */}
    <TableContainer component={Paper} id="studentContainer">
      <Table  size="small" aria-label="a dense table" style={{width:'80%'}}>
        <TableHead>
          <TableRow>
            <TableCell key={Math.random(1,5)}>Name</TableCell>
            <TableCell key={Math.random(5,10)}>Location</TableCell>
            <TableCell key={Math.random(10,15)}>Class</TableCell>
            <TableCell key={Math.random(15,20)}>Posts/Week</TableCell>
            <TableCell key={Math.random(20,25)}>Calls/Week</TableCell>
            <TableCell key={Math.random(25,30)}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {
       searchData.map(function(obj){
        return  <ROW obj={obj} key={obj.id} id={obj.id}/>
                })
        }
        </TableBody>
      </Table>
    </TableContainer>
  </div>
  );
}
//return each student table row
function ROW(prop){
  const [id,setId]=useState(null)
  function next(){
   return  <StudentData />
  }
  function warnFunc(){
      var warn = prompt("Please enter your Message", "message");
      if (warn != null) {
          alert("your message has been send to "+prop.obj.name)
        }

  }
  if(parseInt(prop.obj.posts)<5){
    return(<>
    
      <TableRow onClick={<StudentData />}  key={"row".concat(prop.obj.id)} style={{backgroundColor:'#eb5a46'}} >
        <TableCell align="right" ><a href="/#/StudentData" style={{textDecoration: 'none',color:' black'}}>{prop.obj.name}</a></TableCell>
        <TableCell align="right">{prop.obj.location}</TableCell>
        <TableCell align="right">{prop.obj.class}</TableCell>
        <TableCell align="right">{parseInt(prop.obj.posts)}</TableCell>
        <TableCell align="right">{prop.obj.week}</TableCell>
        <TableCell align="right"><button>Profile</button></TableCell>
      </TableRow>
    </>)  
  }
  else if(parseInt(prop.obj.posts)>=5 && parseInt(prop.obj.posts)<=10){
     return(<>
        <TableRow onClick={next} key={"row".concat(prop.obj.id)} style={{backgroundColor:'orange'}}>
        <TableCell align="right">{prop.obj.name}</TableCell>
        <TableCell align="right">{prop.obj.location}</TableCell>
        <TableCell align="right">{prop.obj.class}</TableCell>
        <TableCell align="right">{parseInt(prop.obj.posts)}</TableCell>
        <TableCell align="right">{prop.obj.week}</TableCell>
        <TableCell align="right"><button>Profile</button></TableCell>
      </TableRow>
     </>)
    
  }else{
    return(<>
     
      <TableRow onClick={next} key={"row".concat(prop.obj.id)} style={{backgroundColor:'#90ee90'}}>
        <TableCell align="right">{prop.obj.name}</TableCell>
        <TableCell align="right">{prop.obj.location}</TableCell>
        <TableCell align="right">{prop.obj.class}</TableCell>
        <TableCell align="right">{parseInt(prop.obj.posts)}</TableCell>
        <TableCell align="right">{prop.obj.week}</TableCell>
        <TableCell align="right"><button>Profile</button></TableCell>
      </TableRow>
      </>)
      
  }
  
}
export default StudentTable;