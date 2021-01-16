
import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import './leaderboard.css';
import First from './medals/1st.jpg'
import Second from './medals/2nd.jpg'
import Third from './medals/3rd.jpg'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});
const studentContainer={
  width: '98%',
  marginLeft: 'auto',
  marginRight: 'auto'
}
const useStyles = makeStyles((theme) => ({
  container: {
    padding: '20px 5%'
  },
  medalsContainer: {
    padding: '100px 20px',
    background: 'white',
    display: 'flex',
    justifyContent: 'space-evenly',
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
    overflow: 'hidden'
  },
  medalBox: {
    maxWidth: '1000px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    
  },
  firstPlace:{
    marginTop: '-80px',
    animation: 'scale 1s ease-in-out infinite alternate'
  },
  name: {
    color: '#3F0F3F',
    marginTop: '30px',
    fontSize: '25px'
  },
  heading: {
      margin: '0 auto 50px auto',
      background: '#3F0F3F',
      color: 'white',
      padding: 10
  },
  subheading:{
    fontSize: '16px',
    fontWeight: '300'
  }
  
}));


 function LeaderBoard() {
  const classes = useStyles();
  const [data, setData] = useState([]);

  useEffect(
    function () {
   
      fetch(`https://slacker-hackers.herokuapp.com/api/students/1`)
        .then(function (obj) {
          return obj.json();
        })
        .then(function (db) {
            setData(db.report);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    []
  );
  ////////////////////////////
  const [thresholdData, setThresholdData] = useState([]);

  useEffect( () => {
    fetch("https://slacker-hackers.herokuapp.com/api/threshold")
    .then(res => res.json())
    .then(obj=> {
      setThresholdData(obj)
    })
    .catch(err => alert(err));
    
    
   
  }, [])
  ///////calculte the slack usuage
  let low,medium,high;
  let topThreeList
  if(thresholdData.length>0 && data.length>0){
    low=thresholdData.filter(function(obj){
        return obj.level==="low"
    })

    medium=thresholdData.filter(function(obj){
      return obj.level==="medium"
    })

  high=thresholdData.filter(function(obj){
    return obj.level==="high"
  })
let topperData=data.sort(function(a,b){
  return (b.posts+b.reactions+b.attachments+b.files)-(a.posts+a.reactions+a.attachments+a.files)
})
let green=[],yellow=[],pink=[],gray=[]
topperData.forEach(function(obj){
  if((obj.posts>=high[0].postsWeight)&&(obj.reactions>=high[0].reactsWeight)
  &&(obj.attachments>=high[0].attachmentsWeight)&&(obj.files>=high[0].filesWeight)){
    green.push(obj)
  }else if((obj.posts>=medium[0].postsWeight)&&(obj.reactions>=medium[0].reactsWeight)&&(obj.attachments>=medium[0].attachmentsWeight)
  &&(obj.files>=medium[0].filesWeight)){
    yellow.push(obj)
  }else if(((obj.posts>=low[0].postsWeight))&&
  (obj.reactions>=low[0].reactsWeight)&&(obj.attachments>=low[0].attachmentsWeight)
  &&(obj.files>=low[0].filesWeight)){
    pink.push(obj)
  }else{
    gray.push(obj)
  }
})
let mixArr=green.concat(yellow);
mixArr=mixArr.concat(pink)
mixArr=mixArr.concat(gray)
topThreeList=mixArr.slice(0,3)

  }
  if(thresholdData.length>0 && data.length>0 && topThreeList.length>0){
  return (
    <div className={classes.container}>
    <h2 className={classes.heading}>Leaderboard - <span className={classes.subheading}>Check the winners of this week</span></h2>

    <div className={classes.medalsContainer}>
      <div className={classes.medalBox}>
          <img src={Second} alt="2nd medal"  />
              {topThreeList.length>0 && (
                <h2 className={classes.name}>{topThreeList[1].username}</h2>
                )}
        </div>

        <div className={`${classes.medalBox} ${classes.firstPlace}`}>
          <img src={First} alt="1st medal"  />
              {topThreeList.length>0 && (
                <h2 className={classes.name}>{topThreeList[0].username}</h2>
                )}
        </div>
      
      <div className={classes.medalBox}>
        <img src={Third} alt="3rd medal"  />
            {topThreeList.length>0 && (
              <h2 className={classes.name}>{topThreeList[2].username}</h2>
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
           
            <TableRow  id={"/#/student-profile/".concat(obj.userid)} key={Math.random(100)} style={{backgroundColor
            :((obj.posts>=high[0].postsWeight)&&(obj.reactions>=high[0].reactsWeight)
            &&(obj.attachments>=high[0].attachmentsWeight)&&(obj.files>=high[0].filesWeight))?('#4CAF5096')
            :((obj.posts>=medium[0].postsWeight)&&(obj.reactions>=medium[0].reactsWeight)&&(obj.attachments>=medium[0].attachmentsWeight)
            &&(obj.files>=medium[0].filesWeight))?('#FF980096')
            :(((obj.posts>=low[0].postsWeight))&&
           (obj.reactions>=low[0].reactsWeight)&&(obj.attachments>=low[0].attachmentsWeight)
           &&(obj.files>=low[0].filesWeight))?('#F4433696')
            :('#f3f3f3')}}>              
            <TableCell style={{ width: 'auto' }} align="left">
                <p  style={{textDecoration:'none',color:'black', cursor: 'pointer'}} >
                  {obj.username}
                </p>
              </TableCell>
             
              <TableCell style={{ width: 'auto' }} align="left">
                <p  style={{textDecoration:'none',color:'black', cursor: 'pointer'}} >
                  {obj.classname}
                </p>
              </TableCell>
              <TableCell style={{ width: 'auto' }} align="left">
              <p  style={{textDecoration:'none',color:'black', cursor: 'pointer'}} >
                  {obj.posts}
                </p>
              </TableCell>
              <TableCell style={{ width: 'auto' }} align="left">
              <p  style={{textDecoration:'none',color:'black', cursor: 'pointer'}} >
                  {obj.reactions}
                </p>
              </TableCell>
              <TableCell style={{ width: 'auto' }} align="left">
              <p  style={{textDecoration:'none',color:'black', cursor: 'pointer'}} >
                  {obj.attachments}
                </p>
              </TableCell>
              <TableCell style={{ width: 'auto' }} align="left">
              <p  style={{textDecoration:'none',color:'black', cursor: 'pointer'}} >
                  {obj.files}
                </p>
              </TableCell>
              
            </TableRow>
          ))}         
        </TableBody>
        
      </Table>
    </TableContainer>
    </div>
  );
            }else{
              return false;
            }
}

export default LeaderBoard;