import React from 'react'
import './accessdenied.css';
import { Alert, AlertTitle } from '@material-ui/lab';
import {Link} from 'react-router-dom';

export default function AccessDenied() {

    
    return (
        <div className='accessDenied-page'>

            <Alert severity="error">
                <AlertTitle >Access Denied</AlertTitle>
                Your account doesn't have access to this page --<strong> Go to <Link to='/'>HomePage</Link></strong>
            </Alert>
        </div>
    )
}
