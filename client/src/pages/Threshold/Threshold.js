import React, {useState, useEffect} from 'react'
import './Threshold.css'
import { makeStyles } from '@material-ui/core/styles';
import ThresholdForm from '../../components/ThresholdForm/ThresholdForm';
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
    
    container:{
      padding: '20px 5%',
    
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
    },
    box:{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: '50px 20px',
        background: 'white',
        boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
    }
  }));

export default function Threshold() {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [fetched, setFetched] = useState(false);
  

  useEffect( () => {
    fetch("https://slacker-hackers.herokuapp.com/api/threshold")
    .then(res => res.json())
    .then(data=> {
      setData(data)
      setFetched(true);
    })
    .catch(err => alert(err));
  }, [])


  const thresholdLow = data.find(element => element.level == 'low');
  const thresholdLMedium = data.find(element => element.level == 'medium');
  const thresholdHigh = data.find(element => element.level == 'high');

  return fetched ? (
    <div  className={classes.container}>
        <h2 className={classes.heading}>Edit thresholds - <span className={classes.subheading}>set different thresholds for students</span></h2>
        <div className={classes.box} >
            <ThresholdForm level={'High'} color={'#ABE098'}  postsWeight={thresholdHigh.postsWeight}  reactsWeight={thresholdHigh.reactsWeight}  filesWeight={thresholdHigh.filesWeight}  attachmentsWeight={thresholdHigh.attachmentsWeight}/>
            <ThresholdForm level={'Medium'} color={'#FFFFB7'}   postsWeight={thresholdLMedium.postsWeight}  reactsWeight={thresholdLMedium.reactsWeight}  filesWeight={thresholdLMedium.filesWeight}  attachmentsWeight={thresholdLMedium.attachmentsWeight}/>
            <ThresholdForm level={'Low'} color={'#F1959B'}  postsWeight={thresholdLow.postsWeight}  reactsWeight={thresholdLow.reactsWeight}  filesWeight={thresholdLow.filesWeight}  attachmentsWeight={thresholdLow.attachmentsWeight}/>
        </div>
    </div>
  )
  :
  <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "100px auto",
      }}
    >
      <CircularProgress />
    </div>
}


