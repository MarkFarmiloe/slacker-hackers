
import React, {useEffect, useState} from 'react'
import './studentProfile.css'
import StudentInfo from '../../components/StudentInfo/StudentInfo'
import BarChart from '../../components/BarChart/BarChart';
import PieChart from '../../components/PieChart/PieChart';
import LineChart from '../../components/LineChart/LineChart';
import CircularProgress from "@material-ui/core/CircularProgress";
import {useHistory} from 'react-router-dom';
import ThresholdBanner from '../../components/ThresholdBanner/ThresholdBanner';



export default function StudenProfile() {
  const history = useHistory();
  
  const [studentData, setStudentData] = useState({});
 
  let  urlPath = history.location.pathname;
  let  slackIdFromUrl = urlPath.replace('/student-profile/', '');
 
  useEffect( () => {
    fetch(`https://slacker-hackers.herokuapp.com/api/student-profile/${slackIdFromUrl}`)
    .then(res => res.json())
    .then(data=> setStudentData(data))
  }, [])

  
    
  return (Object.entries(studentData).length > 0 ?(
      <div className='studentProfile-page'>
        <h2 className='studentProfile-header'>{studentData.report.name}</h2>
        <div className='studentProfile-info'>
            <StudentInfo name={'Student Info'} classs={studentData.report["classname"]} />
            <ThresholdBanner data={studentData.report['thresholds']}/>
        </div >

        <div className='studentProfile-charts'>
          <div className='studentProfile-chart'>
               <h2 className='studentProfile-heading'>Weekly goal</h2>
               <BarChart data={studentData.report["Weekly Stats"].week} />
          </div>
          <div className='studentProfile-chart'>
               <h2 className='studentProfile-heading'>Total stats</h2>
               <PieChart data={studentData.report["Total Stats"].totals} />
          </div>
        </div>

        <div  className='studentProfile-chart-line'>
               <h2 className='studentProfile-heading'>Monthly stats</h2>
               <LineChart data={studentData.report["Last 4 Weeks"]} />
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
    )
}
