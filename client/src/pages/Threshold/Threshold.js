import React from 'react'
import './Threshold.css'
import { makeStyles } from '@material-ui/core/styles';
import ThresholdForm from '../../components/ThresholdForm/ThresholdForm';

const useStyles = makeStyles((theme) => ({
    
    container:{
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
      margin: '100px auto'
    },
    heading: {
        margin: '0 auto 50px auto'
    },
    box:{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap'
    }
  }));

export default function Threshold() {
  const classes = useStyles();

  return (
    <div  className={classes.container}>
        <h1 className={classes.heading}>Configure the thresholds</h1>
        <h2>enter you code</h2>
        <div className={classes.box} >
            <ThresholdForm level={'Good'} color={'#a5d6a7'} />
            <ThresholdForm level={'Average'} color={'#fff176'}  />
            <ThresholdForm level={'Poor'} color={'#ff6e40'} />
        </div>
    </div>
  );
}


