import React,{useState,useContext} from 'react';
import './heading.css'
import Logo from '../../assets/logo.png'
import {Link} from 'react-router-dom'
import { Button } from '@material-ui/core';
import { UserContext, UserRoleContext, UserSlackIdContext } from '../../contexts/userContext';
import LongMenu from '../LongMenu/LongMenu';
import {useHistory} from 'react-router-dom';


export default function Heading() {
    const history = useHistory();
    const location = history.location.pathname;


    const {user, setUser} = useContext(UserContext);
    const {userRole, setUserRole} = useContext(UserRoleContext);
    const {userSlackId, setUserSlackId} = useContext(UserSlackIdContext);

    console.log('haha', userRole)
    console.log('hahaSlack', userRole)
    return (
        <div className='heading'>
            <Link to='/dashboard'><img className='heading-logo' src={Logo} alt='cyf-logo' /></Link>

        {
            user && userRole == 'admin'
            ?
            <ul>
                <li><Link to='/dashboard'>Home</Link></li>
                <li><Link to='/leaderboard'>Leaderboard</Link></li>
                <li><Link to='/threshold'>Edit Thresholds</Link></li>
                <li style={{textAlign: 'center', margin: '0 20px'}}>Hi,<br/> <span style={{fontWeight: '600'}}>{user} </span></li>
                <LongMenu userName={'user'}/>
            </ul>
            :
                user && userRole == 'mentor' 
                ?
                <ul>
                    <li><Link to='/dashboard'>Home</Link></li>
                    <li><Link to='/leaderboard'>Leaderboard</Link></li>
                    <li style={{textAlign: 'center', margin: '0 20px'}}>Hi,<br/> <span style={{fontWeight: '600'}}>{user} </span></li>
                    <LongMenu userName={'user'}/>
                </ul>
                :
                    user && userRole == 'student'
                    ?
                    <ul>
                        <li><Link to={`/student-profile/${userSlackId}`}>Home</Link></li>
                        <li><Link to='/leaderboard'>Leaderboard</Link></li>
                        <li style={{textAlign: 'center', margin: '0 20px'}}>Hi,<br/> <span style={{fontWeight: '600'}}>{user} </span></li>
                        <LongMenu userName={'user'}/>
                    </ul>
                    :
                    <div>caca</div>
        }
            
        </div>  
    )
}