import React, { useEffect, useState } from "react";
// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/line
import { ResponsiveLine } from '@nivo/line'
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const data = [
    
    {
      "id": "Posts",
      "data": [
        {
          "x": "1Nov",
          "y": 0
        },
        {
          "x": "7Nov",
          "y": 5
        },
        {
          "x": "14Nov",
          "y": 12
        },
        {
          "x": "21Nov",
          "y": 7
        },
        {
          "x": "28Nov",
          "y": 15
        }
      ]
    },
    {
      "id": "Reactions",
      "data": [
        {
          "x": "1Nov",
          "y": 11
        },
        {
          "x": "7Nov",
          "y": 6
        },
        {
          "x": "14Nov",
          "y": 15
        },
        {
          "x": "21Nov",
          "y": 3
        },
        {
          "x": "28Nov",
          "y": 31
        }
      ]
    },
    {
      "id": "Files",
      "data": [
        {
          "x": "1Nov",
          "y": 1
        },
        {
          "x": "7Nov",
          "y": 0
        },
        {
          "x": "14Nov",
          "y": 3
        },
        {
          "x": "21Nov",
          "y": 10
        },
        {
          "x": "28Nov",
          "y": 3
        }
      ]
    },
    {
      "id": "Attachements",
      "data": [
        {
          "x": "1Nov",
          "y": 3
        },
        {
          "x": "7Nov",
          "y": 7
        },
        {
          "x": "14Nov",
          "y": 5
        },
        {
          "x": "21Nov",
          "y": 3
        },
        {
          "x": "28Nov",
          "y": 6
        },
        
      ]
    }
    
  ]
const   MyResponsiveLine = ({  /* see data tab */ }) => (
  <div style={{height: '500px', width: 'auto'}}>
    <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Date',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Count',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        colors={{scheme: 'set1'}}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
    </div>
)

export default MyResponsiveLine;