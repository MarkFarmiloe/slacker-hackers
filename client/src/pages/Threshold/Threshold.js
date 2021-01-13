import React, {useState, useEffect} from 'react'
import './Threshold.css'
import { makeStyles } from '@material-ui/core/styles';
import ThresholdForm from '../../components/ThresholdForm/ThresholdForm';
import CircularProgress from "@material-ui/core/CircularProgress";

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

  const [data, setData] = useState([]);
  const [fetched, setFetched] = useState(false);
  
  // function getDataFromServer(data){
  //   setData(data)
  //   console.log('from page',data)
  // }

  useEffect( () => {
    fetch("http://localhost:3100/api/threshold")
    .then(res => res.json())
    .then(data=> {
      setData(data)
      setFetched(true);
    })
    .catch(err => alert(err));
  }, [])

  // const findCorrespondingObj = (level) => {
  //   const found = data.find(element => element.level == level)
  //   return found;
  // }
  const thresholdLow = data.find(element => element.level == 'low');
  const thresholdLMedium = data.find(element => element.level == 'medium');
  const thresholdHigh = data.find(element => element.level == 'high');

  return fetched ? (
    <div  className={classes.container}>
        <h1 className={classes.heading}>Configure the thresholds</h1>
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


