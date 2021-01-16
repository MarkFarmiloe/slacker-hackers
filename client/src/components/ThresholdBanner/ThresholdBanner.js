import React from 'react'
import './thresholdBanner.css';
import {useHistory} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    accordionSummary: {
        background: '#3F0F3F',
        color: 'white'
    },
    button: {
        margin: '0 auto',
        fontWeight: '300',
        background: '#a5d6a7',
        color: '#3F0F3F'
    },
    heading: {
      flexBasis: '50%',
      flexShrink: 0,
      alignSelf: 'center',
      
    },
    subheading: {
        width: '100px',
        padding: '10px',
        textTransform: 'capitalize'
      },
    subheadingGreen: {
      background: '#4CAF5096',
    },
    subheadingYellow: {
      background: '#FF980096'
    },
    subheadingRed: {
      background: '#F4433696'
    },

    details: {
        display: 'flex', 
        margin: '5px 0'
    },
    act: {
        margin: '0 10px',
        padding: '10px',
        textTransform: 'capitalize'
    },
    span: {
        fontWeight: '600',
        textTransform: 'capitalize'
        
    }
  }));



export default function ThresholdBanner({data}) {

    const history = useHistory();
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div style={{width: '100%'}}>

        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon style={{fill: "white"}}/>}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                className={classes.accordionSummary}
            >
                <Typography className={classes.heading}>Check Threshold Values</Typography>
            </AccordionSummary>

            <AccordionDetails>
                <Typography component="div">
                    

                    {
                        Object.entries(data).map(([level,value],index) => {
                            return  <div className={`${classes.details} ${level =='high' ? classes.subheadingGreen : (level == 'medium' ? classes.subheadingYellow : classes.subheadingRed)}`}>
                                    
                                        <h4 
                                            className={classes.subheading}
                                            key={level}
                                    
                                        >
                                            {level}
                                        </h4>
                                        {
                                            Object.entries(value).map(([key, val], index) => {
                                                return <p className={classes.act} key={index}>{key}: <span className={classes.span}>{val}</span> </p>
                                            })
                                        }

                                    </div>
                        })
                    }
                    
                </Typography>
            </AccordionDetails>
        </Accordion>
        </div>
    )
}
