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
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '50%',
      flexShrink: 0,
      alignSelf: 'center',
      
    },
    subheading: {
        width: '100px',
        padding: '10px',
      },
    subheadingGreen: {
      background: '#ABE098',
    },
    subheadingYellow: {
      background: '#FFFFB7'
    },
    subheadingRed: {
      background: '#F1959B'
    },

    details: {
        display: 'flex', 
        margin: '5px 0'
    },
    act: {
        margin: '0 10px',
        padding: '10px'
    },
    span: {
        fontWeight: '600',
        
    }
  }));

let threshold1 = {
    thresholdLevel: 'High',
    thresholdValues: {
        posts: 1,
        reacts: 2, 
        files: 3,
        attachements: 4
    }
   
}
let threshold2 = {
    thresholdLevel: 'Medium',
    thresholdValues: {
        posts: 1,
        reacts: 2, 
        files: 32,
        attachements: 4
    }
   
}
let threshold3 = {
    thresholdLevel: 'Low',
    thresholdValues: {
        posts: 1,
        reacts: 2, 
        files: 3,
        attachements: 4
    }
   
}

let thresholds = [threshold1, threshold2, threshold3] 

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
                        thresholds.map((threshold, index) => {
                            return (
                                <div className={`${classes.details} ${threshold.thresholdLevel =='High' ? classes.subheadingGreen : (threshold.thresholdLevel == 'Medium' ? classes.subheadingYellow : classes.subheadingRed)}`}>
                                    
                                    <h4 
                                        className={classes.subheading}
                                        key={index}
                                
                                    >
                                        {threshold.thresholdLevel}
                                    </h4>
                                    {
                                        Object.entries(threshold.thresholdValues).map(([key, value], index) => {
                                            return <p className={classes.act} key={index}>{key}: <span className={classes.span}>{value}</span> </p>
                                        })
                                    }

                                </div>
                            )
                        })

                       
                    }
                    
                </Typography>
            </AccordionDetails>
        </Accordion>
        </div>
    )
}
