import React,{useContext} from 'react';
import './heading.css'
import Logo from '../../assets/logo.png'
import {Link} from 'react-router-dom'
import { Button } from '@material-ui/core';
import { UserContext } from '../../contexts/userContext';
import LongMenu from '../LongMenu/LongMenu';


export default function Heading() {

    const {user, setUser} = useContext(UserContext);
    return (
        <div className='heading'>
            <Link to='/'><img className='heading-logo' src={Logo} alt='cyf-logo' /></Link>

        {
            user.length > 0 
            ?
            <ul>
                <li>Hello, {user} </li>
                <LongMenu userName={'user'}/>
            </ul>
            :
            <ul>
                <Link to='/login'>Login</Link>
                <Button 
                href='/#/sign-up' 
                variant='contained' 
                color='primary' 
                size='small' 
                style={{ backgroundColor: '#D12F2F', color: 'white' }} >
                    Register
                </Button>   
            </ul>
        }
            
        </div>  
    )
}
