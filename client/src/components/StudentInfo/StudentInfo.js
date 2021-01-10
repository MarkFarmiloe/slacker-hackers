import React from 'react'
import {useHistory} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    accordionSummary: {
        background: '#3F0F3F',
        color: 'white'
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '50%',
      flexShrink: 0,
      alignSelf: 'center',
    }
  }));


export default function StudentInfo() {

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div style={{marginRight: '50px', width: '100%'}}>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon style={{fill: "white"}}/>}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    className={classes.accordionSummary}
                >
                    <Typography className={classes.heading}>Student Info</Typography>
                </AccordionSummary>

                <AccordionDetails>

                    <List component="nav" className={classes.root} aria-label="mailbox folders">
                        <ListItem button>
                            <ListItemText primary="Email: student@cyf.co.uk" />
                        </ListItem>
                        <Divider />
                        <ListItem button divider>
                            <ListItemText primary="Location: Birmingham" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Class: WestMidlands Class 1" />
                        </ListItem>
                        
                    </List>
                        
                    
                </AccordionDetails>
            </Accordion>
        </div>
    )
}
