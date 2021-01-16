import React from 'react';
import './history.css';

export default function History() {
    return (
        <div className='history'>
           <div className='history-box'>
                <div className='history-square square-green'></div>
                 High
            </div>
            <div className='history-box'>
                <div className='history-square square-yellow'></div>
                 Medium
            </div>
           
            <div className='history-box'>
                <div className='history-square square-red'></div>
                 Low
            </div>
            <div className='history-box'>
                <div className='history-square'></div>
                Inactive
            </div>
        </div>
    )
}
