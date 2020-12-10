import React from 'react';
import './heading.css'
import Logo from '../../assets/logo.png'

export default function Heading() {
    return (
        <div className='heading'>
            <img className='heading-logo' src={Logo} alt='cyf-logo' />
        </div>  
    )
}
