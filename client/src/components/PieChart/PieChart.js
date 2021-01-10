import React from "react";
import { ResponsivePie } from '@nivo/pie'

  const data =[
    {
      "id": "reacts",
      "label": "reacts",
      "value": 312,
    },
    {
      "id": "posts",
      "label": "posts",
      "value": 321,
    },
    {
      "id": "files",
      "label": "files",
      "value": 221,
    },
    {
      "id": "attachments",
      "label": "attachments",
      "value": 123,
    }
    
  ]

export function PieChart(){
    return(
        <div style={{height: '500px', width: 'auto'}}>
            
            <ResponsivePie
                data={data}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                colors={{ scheme: 'set1' }}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
                radialLabelsSkipAngle={10}
                radialLabelsTextColor="#333333"
                radialLabelsLinkColor={{ from: 'color' }}
                sliceLabelsSkipAngle={10}
                sliceLabelsTextColor="#333333"
                legends={[
                    {
                        anchor: 'bottom',
                        direction: 'row',
                        justify: false,
                        translateX: 0,
                        translateY: 56,
                        itemsSpacing: 0,
                        itemWidth: 100,
                        itemHeight: 18,
                        itemTextColor: '#999',
                        itemDirection: 'left-to-right',
                        itemOpacity: 1,
                        symbolSize: 18,
                        symbolShape: 'circle',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: '#000'
                                }
                            }
                        ]
                    }
                ]}
                    
            />
        </div>
    )
}
export default PieChart;