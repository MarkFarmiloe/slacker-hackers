
import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import gold from './madels/gold.jpg'
import silver from './madels/silver.jpg'
import bronze from './madels/3rd.jpg'
const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});
/////////////////////////////
 function LeaderBoard() {
  const [data, setData] = useState([]);
  let madels=[];
  let cnt=1;
  useEffect(
    function () {
   
      fetch(`https://slacker-hackers.herokuapp.com/api/students/1`)
        .then(function (obj) {
          return obj.json();
        })
        .then(function (db) {
            setData(db.report);
            // setDefault(db.report);
           
        })
        .then(function (error) {
          console.log(error);
        });
    },
    []
  );
  
  ///////calculte the slack usuage
    let topThreeList=data.sort(function(a, b) {
      return (parseInt(b.posts)+parseInt(b.reactions)+parseInt(b.attachments)+parseInt(b.files)) - (parseInt(a.posts)+parseInt(a.reactions)+parseInt(a.attachments)+parseInt(a.files));
  });
  topThreeList=topThreeList.slice(0,3);

    const studentContainer={
      width: '98%',
      marginLeft: 'auto',
      marginRight: 'auto'
    }
    //////////////////////////
    const [thresholdData, setThresholdData] = useState([]);

    useEffect( () => {
      fetch("https://slacker-hackers.herokuapp.com/api/threshold")
      .then(res => res.json())
      .then(obj=> {
        setThresholdData(obj)
      })
      .catch(err => alert(err));
      
      
     
    }, [])
  let low=thresholdData.filter(function(obj){
      return obj.level==="low"
 })

 let medium=thresholdData.filter(function(obj){
  return obj.level==="medium"
})

let high=thresholdData.filter(function(obj){
  return obj.level==="high"
})
    ///////////////////
  return (
    <>
    <hr></hr>
     <div style={{width:'98%',backgroundColor:'wheat',marginRight:'auto',marginLeft:'auto',textAlign:'center',display:'flex',justifyContent:"space-around"}}>
        <div>
          <img src={gold} alt="Girl in a jacket" width="200" height="180" />
          {topThreeList.length>0 && (<>
            <h4>{topThreeList[0].username}</h4>
            </>
            )}
        </div>
        <div>
          <img src={silver} alt="Girl in a jacket" width="200" height="180" />
          {topThreeList.length>0 && (<>
            <h4>{topThreeList[1].username}</h4>
            </>
            )}
        </div>
        <div>
          <img src={bronze} alt="Girl in a jacket" width="200" height="180" />
          {topThreeList.length>0 && (<>
            <h4>{topThreeList[2].username}</h4>
            </>
            )}
        </div>
    </div>
    <hr></hr>
    <TableContainer component={Paper} >
      <Table  style={studentContainer}  aria-label="custom pagination table">
        <TableBody >
        <TableRow>
          <TableCell component="th" scope="row" style={{ width: 'auto',fontWeight:'bold' }} align="left">Name</TableCell>
          <TableCell component="th" scope="row" style={{ width: 'auto',fontWeight:'bold'}} align="left">Class</TableCell>
          <TableCell component="th" scope="row" style={{ width: 'auto',fontWeight:'bold'}} align="left">Posts</TableCell>
          <TableCell component="th" scope="row" style={{ width: 'auto',fontWeight:'bold'}} align="left">Reactions</TableCell>
          <TableCell component="th" scope="row" style={{ width: 'auto',fontWeight:'bold'}} align="left">Attachments</TableCell>
          <TableCell component="th" scope="row" style={{ width: 'auto',fontWeight:'bold'}} align="left">Files</TableCell>
        </TableRow>
          {topThreeList.map((obj) => (
           
            <TableRow  id={"/#/student-profile/".concat(obj.username)} key={Math.random(100)} style={{backgroundColor
            :((obj.posts>=high[0].postsWeight)&&(obj.reactions>=high[0].reactsWeight)
            &&(obj.attachments>=high[0].attachmentsWeight)&&(obj.files>=high[0].filesWeight))?('green')
            :((obj.posts>=medium[0].postsWeight)&&(obj.reactions>=medium[0].reactsWeight)&&(obj.attachments>=medium[0].attachmentsWeight)
            &&(obj.files>=medium[0].filesWeight))?('yellow')
            :(((obj.posts>=low[0].postsWeight))&&
           (obj.reactions>=low[0].reactsWeight)&&(obj.attachments>=low[0].attachmentsWeight)
           &&(obj.files>=low[0].filesWeight))?('pink')
            :('gray')}}>              
            <TableCell style={{ width: 'auto' }} align="left">
                <a href={"/#/student-profile/".concat(obj.username)} style={{textDecoration:'none',color:'black'}} >
                  {obj.username}
                </a>
              </TableCell>
             
              <TableCell style={{ width: 'auto' }} align="left">
                <a href={"/#/student-profile/".concat(obj.name)} style={{textDecoration:'none',color:'black'}} >
                  {obj.classname}
                </a>
              </TableCell>
              <TableCell style={{ width: 'auto' }} align="left">
                <a href={"/#/student-profile/".concat(obj.name)} style={{textDecoration:'none',color:'black'}} >
                  {obj.posts}
                </a>
              </TableCell>
              <TableCell style={{ width: 'auto' }} align="left">
                <a href={"/#/student-profile/".concat(obj.name)} style={{textDecoration:'none',color:'black'}} >
                  {obj.reactions}
                </a>
              </TableCell>
              <TableCell style={{ width: 'auto' }} align="left">
                <a href={"/#/student-profile/".concat(obj.name)} style={{textDecoration:'none',color:'black'}} >
                  {obj.attachments}
                </a>
              </TableCell>
              <TableCell style={{ width: 'auto' }} align="left">
                <a href={"/#/student-profile/".concat(obj.name)} style={{textDecoration:'none',color:'black'}} >
                  {obj.files}
                </a>
              </TableCell>
              
            </TableRow>
          ))}         
        </TableBody>
        
      </Table>
    </TableContainer>
    </>
  );
}

export default LeaderBoard;