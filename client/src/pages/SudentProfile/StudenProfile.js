import { Container,Typography, Box } from '@material-ui/core'
import React, {useEffect, useState} from 'react'
import './studentProfile.css'
import { ResponsivePie } from '@nivo/pie';
import StudentInfo from '../../components/StudentInfo/StudentInfo'
import ThresholdBanner from '../../components/ThresholdBanner/ThresholdBanner';
import BarChart from '../../components/BarChart/BarChart';
import PieChart from '../../components/PieChart/PieChart';
import LineChart from '../../components/LineChart/LineChart';





export default function StudenProfile() {

  
  const [studentData, setStudentData] = useState({});

  useEffect( () => {
    fetch('https://slacker-hackers.herokuapp.com/api/student-profile/UQWK7NNLR')
    .then(res => res.json())
    .then(data=> setStudentData(data))
  }, [])

  let name=window.location.toString().substring(40,window.location.toString().length).split("%20").join(" ")
     
    
  return (Object.entries(studentData).length > 0 ?(
      <div className='studentProfile-page'>
        <div className='studentProfile-info'>
            <StudentInfo name={name}/>
            {/* <ThresholdBanner /> */}
        </div >

        <div className='studentProfile-charts'>
          <div className='studentProfile-chart'>
               <h2 className='studentProfile-heading'>Weekly stats</h2>
               <BarChart data={studentData.report["Weekly Stats"].week} />
          </div>
          <div className='studentProfile-chart'>
               <h2 className='studentProfile-heading'>Total stats</h2>
               <PieChart />
          </div>
        </div>

        <div  className='studentProfile-chart-line'>
               <h2 className='studentProfile-heading'>Monthly stats</h2>
               <LineChart />
          </div>
      </div>
    )
    :
    <div>Wait</div>)
}
