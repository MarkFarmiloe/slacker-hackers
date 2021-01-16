import React from 'react'
import './homepage.css';
import BgImage from './123.png'
import { Button } from '@material-ui/core';

export default function Homepage() {
    return (
        <div className='homepage'>
            <img className='homepage-img' src={BgImage} />
            <div className='homepage-box'>
                <h1>Slack Dashboard</h1>
                <ul className='homepage-list'>
                    <li className='homepage-list-item'>Track level of communication in Slack</li>
                    <li className='homepage-list-item'>Set weekly goals</li>
                    <li className='homepage-list-item'>Check individual student stats</li>
                    <li className='homepage-list-item'>Get on the podium at the end of the week</li>
                </ul>
                <div className='homepage-buttons' style={{margin: '30px 0'}}>
                    <Button 
                    href='/#/login' 
                    variant='outlined' 
                    color='secondary' 
                    size='large' 
                    style={{ marginRight: '20px' }}
                    >
                        Login
                    </Button> 
                    <Button 
                    href='/#/sign-up' 
                    variant='contained' 
                    color='primary' 
                    size='large' 
                    style={{ backgroundColor: '#D12F2F', color: 'white' }} >
                        Register
                    </Button> 
                </div>
            </div>
        </div>
    )
}
