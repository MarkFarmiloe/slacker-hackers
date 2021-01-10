import React from 'react';
// install (please make sure versions match peerDependencies)

// yarn add @nivo/core @nivo/bar
import { ResponsiveBar } from '@nivo/bar'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
let data = [
        {
          "action": "POSTS",
          "Done": 3,
          "Left To Do": 15,
        },
        {
          "action": "REACTS",
          "Done": 10,
          "Left To Do": 25,
          
        },
        {
          "action": "FILES",
          "Done": 5,
          "Left To Do": 7,

        },
        {
          "action": "ATTACHMETS",
          "Done": 1,
          "Left To Do": 5,
        }
]

const colors = { 'Done': '#4DAF4A', 'Left To Do': '#E41A1C' }
const getColor = bar => colors[bar.id];

const BarChart = () => (
    <div style={{height: '500px', width: 'auto'}}>
    <ResponsiveBar
        data={data}
        keys={[ 'Done', 'Left To Do' ]}
        indexBy="action"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={getColor}
        borderColor="#FF0000"
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '-',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'number',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
    />
    </div>
)

export default BarChart;

