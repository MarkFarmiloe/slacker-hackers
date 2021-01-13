import React,{ useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import PostAddSharpIcon from '@material-ui/icons/PostAddSharp';
import FileCopySharpIcon from '@material-ui/icons/FileCopySharp';
import AttachFileSharpIcon from '@material-ui/icons/AttachFileSharp';
import Button from '@material-ui/core/Button';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import Input from '@material-ui/core/Input';
import SaveIcon from '@material-ui/icons/Save';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';




export default function ThresholdForm({level, color, postsWeight, reactsWeight, filesWeight, attachmentsWeight}) {
    const useStyles = makeStyles((theme) => ({
        root: {
          width: '100%',
          minWidth: 260,
          maxWidth: 360,
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${color}`,
          fontSize: '32px',
          outline: 'none'
        },
        thresholdCard: {
              margin: '20px',
        },
        button: {
          margin: '0 auto',
          fontWeight: '300'
        },
        inputNumber: {
            width: '20px',
        }
      }));

    const classes = useStyles();
    

    const [posts, setPosts]=useState(postsWeight);
    const [reacts, setReacts]=useState(reactsWeight);
    const [files, setFiles]=useState(filesWeight);
    const [attachments, setAttachments]=useState(attachmentsWeight);
    const [editable, setEditable]=useState(false);

    const handleEdit = e => {
        setEditable(true)
    }
    const handleSave = e => { 
        e.preventDefault();
        setEditable(false)
        let thresholdLevel = level;
        let objectToBeSend = {
            thresholdLevel: thresholdLevel.toLowerCase(),
            thresholdValues: {
                posts: Number(posts),
                reacts: Number(reacts), 
                files: Number(files),
                attachments: Number(attachments)
            }
           
        }

        const requestOptions = {
            method: 'POST', 
            headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(objectToBeSend),
          } 
          
         
         
        fetch("https://slacker-hackers.herokuapp.com/api/threshold", requestOptions)
        .then(res => res.json())
        .catch(err => alert(err));
            
          
        
    }
    const handleChangePosts = e => {
        setPosts(e.target.value)
    }
    const handleChangeReacts = e => {
        setReacts(e.target.value)
    }
    const handleChangeFiles = e => {
        setFiles(e.target.value)
    }
    const handleChangeAttachments = e => {
        setAttachments(e.target.value)
    }

    return (
        <div className={classes.thresholdCard}> 
            <List subheader={<ListSubheader style={{backgroundColor: color, fontSize: '16px', fontWeight: '600'}}>{level} </ListSubheader>} className={classes.root}>
            <hr style={{margin: '0'}}/>   
            <ListItem>
                <ListItemIcon>
                    <PostAddSharpIcon />
                </ListItemIcon>
                <ListItemText id="switch-list-label-wifi" primary="Posts"/>
                <ListItemSecondaryAction>
                  {
                    editable
                    ?
                    <Input
                        className={classes.inputNumber}
                        value={posts}
                        onChange={handleChangePosts}
                        inputProps={{ maxLength: 2 }}
                    />
                    :
                    <h6 className={classes.button}>{posts}</h6>
                  }      
                </ListItemSecondaryAction>
            </ListItem>
            <hr style={{margin: '5px'}}/>  
            <ListItem>
                <ListItemIcon>
                <ThumbUpIcon />
                </ListItemIcon>
                <ListItemText id="switch-list-label-bluetooth" primary="Reacts" />
                <ListItemSecondaryAction>
                {
                    editable
                    ?
                    <Input
                        className={classes.inputNumber}
                        value={reacts}
                        onChange={handleChangeReacts}
                        inputProps={{ maxLength: 2 }}
                    />
                    :
                    <h6 className={classes.button}>{reacts}</h6>
                  }  
                </ListItemSecondaryAction>
            </ListItem>
            <hr style={{margin: '5px'}}/>  
            <ListItem>
                <ListItemIcon>
                <FileCopySharpIcon />
                </ListItemIcon>
                <ListItemText id="switch-list-label-bluetooth" primary="Files" />
                <ListItemSecondaryAction>
                {
                    editable
                    ?
                    <Input
                        className={classes.inputNumber}
                        value={files}
                        onChange={handleChangeFiles}
                        inputProps={{ maxLength: 2 }}
                    />
                    :
                    <h6 className={classes.button}>{files}</h6>
                  }  
                </ListItemSecondaryAction>
            </ListItem>
            <hr style={{margin: '5px'}}/>  
            <ListItem>
                <ListItemIcon>
                <AttachFileSharpIcon />
                </ListItemIcon>
                <ListItemText id="switch-list-label-bluetooth" primary="Attachments" />
                <ListItemSecondaryAction>
                {
                    editable
                    ?
                    <Input
                        className={classes.inputNumber}
                        value={attachments}
                        onChange={handleChangeAttachments}
                        inputProps={{ maxLength: 2 }}
                    />
                    :
                    <h6 className={classes.button}>{attachments}</h6>
                  }  
                </ListItemSecondaryAction>
            </ListItem>
            <hr style={{margin: '5px'}}/>  
            <ListItem>
            {
                editable
                ?
                <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                startIcon={<SaveIcon />}
                onClick={handleSave}
            >
                Save
            </Button>
            :
            <Button
                variant="contained"
                color="default"
                size="large"
                className={classes.button}
                startIcon={<EditSharpIcon />}
                onClick={handleEdit}
            >
                Edit
            </Button>

            }
            </ListItem>
            

            </List>
        </div>
    )
}
