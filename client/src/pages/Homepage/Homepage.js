import React from 'react'
import './homepage.css';
import BgImage from './123.png'
import { Button } from '@material-ui/core';

export default function Homepage() {
    return (
        <div className='homepage'>
            <img className='homepage-img' src={BgImage} />
            <div className='homepage-box'>
                <h1>Slacker Hackers App</h1>
                <ul className='homepage-list'>
                    <li className='homepage-list-item'>Lorem Ipsum is simply dummy</li>
                    <li className='homepage-list-item'>text of the printing</li>
                    <li className='homepage-list-item'>and typesetting industry.</li>
                    <li className='homepage-list-item'>lorem Ipsum is </li>
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
