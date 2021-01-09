import React from 'react'
import './thresholdBanner.css';

let threshold1 = {
    thresholdLevel: 'Good',
    thresholdValues: {
        posts: 1,
        reacts: 2, 
        files: 3,
        attachements: 4
    }
   
}
let threshold2 = {
    thresholdLevel: 'Average',
    thresholdValues: {
        posts: 1,
        reacts: 2, 
        files: 32,
        attachements: 4
    }
   
}
let threshold3 = {
    thresholdLevel: 'Poor',
    thresholdValues: {
        posts: 1,
        reacts: 2, 
        files: 3,
        attachements: 4
    }
   
}

let thresholds = [threshold1, threshold2, threshold3] 

export default function ThresholdBanner() {
    return (
        <div className='thresholdBanner'>

            <h2 className='bannerHeading'>Threshold values</h2>

            <div className='bannersContainer'>
                {
                    thresholds.map((threshold, index) => {
                        return (<div className='banner'>
                            <h4  key={index}>{threshold.thresholdLevel}</h4>

                            {
                                Object.entries(threshold.thresholdValues).map(([key, value], index) => {
                                    return <p key={index}>{key}: {value} </p>
                                })
                            }
                            
                            
                        </div>)
                    })
                }
                
                
            </div>
        </div>
    )
}
