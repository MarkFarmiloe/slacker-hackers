
import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import './leaderboard.css';

import First from './medals/1st.jpg'
import Second from './medals/2nd.jpg'
import Third from './medals/3rd.jpg'

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

    topThreeList = topThreeList.slice(0,3);


  return (
    <div className={classes.container}>
    <h2 className={classes.heading}>Leaderboard - <span className={classes.subheading}>See the winners of this week</span></h2>

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
    
    </div>
  );
}

export default LeaderBoard;