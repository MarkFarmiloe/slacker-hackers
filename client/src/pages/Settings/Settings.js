import React from 'react'
import './settings.css'
import { makeStyles } from '@material-ui/core/styles';
import Token from '../../components/Token/Token'

const useStyles = makeStyles((theme) => ({
    
    
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

export default function Settings() {
    const classes = useStyles();
    return (
        <div className='settings-page'>
            <h2 className={classes.heading}>Token - <span className={classes.subheading}>used to provide access to mentors when they Register</span></h2>
            <Token />
        </div>
    )
}
 