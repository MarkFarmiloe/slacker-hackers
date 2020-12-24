import React from 'react';
import './heading.css'
import Logo from '../../assets/logo.png'
import {Link} from 'react-router-dom'
import { Button } from '@material-ui/core';

export default function Heading() {
    return (
        <div className='heading'>
            <Link to='/'><img className='heading-logo' src={Logo} alt='cyf-logo' /></Link>


            <ul>
                <Link to='/login'>Login</Link>
                <Button 
                href='/#/sign-up' 
                variant='contained' 
                color='primary' 
                size='small' 
                style={{ backgroundColor: '#D12F2F', color: 'white' }} >
                    Sign Up
                </Button>
                {/* <Link to='/sign-up'></Link> */}
                
            </ul>
        </div>  
    )
}
