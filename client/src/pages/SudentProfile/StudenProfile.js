import { Container,Typography, Box } from '@material-ui/core'
import React from 'react'
import './studentProfile.css'
import { ResponsivePie } from '@nivo/pie';
import StudentInfo from '../../components/StudentInfo/StudentInfo'
import ThresholdBanner from '../../components/ThresholdBanner/ThresholdBanner';
import BarChart from '../../components/BarChart/BarChart';
import PieChart from '../../components/PieChart/PieChart';
import LineChart from '../../components/LineChart/LineChart';


export default function StudenProfile() {
let slackId=window.location.href.toString().substring(40,window.location.href.toString().length);
    return (
      <div className='studentProfile-page'>
        <div className='studentProfile-info'>
            <StudentInfo slackId={slackId} />
            {/* <ThresholdBanner /> */}
        </div >

        <div className='studentProfile-charts'>
          <div className='studentProfile-chart'>
               <h2 className='studentProfile-heading'>Weekly stats</h2>
               <BarChart />
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
}
