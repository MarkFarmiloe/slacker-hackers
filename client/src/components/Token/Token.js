import React, {useState, useEffect} from 'react'
import TextField from '@material-ui/core/TextField';
import { Alert, AlertTitle } from '@material-ui/lab';
import Button from '@material-ui/core/Button';

export default function Token() {

    const [value, setValue] = useState('');
    const [editable, setEditable]= useState(false);

    useEffect(() => {
        fetch('https://slacker-hackers.herokuapp.com/api/token')
        .then(res => res.json())
        .then(data => setValue(data[0].token))
        .catch(err => alert(err))
    }, [])
        
console.log(value)
    const handleClickEdit = e => {
        setEditable(true);
    }
    const handleClickSave = e => {
        setEditable(false);

        let objectToBeSend= { token: value}

        let requestOptions = {
            method: 'POST', 
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(objectToBeSend),
        }

        fetch('https://slacker-hackers.herokuapp.com/api/token', requestOptions)
        .then(res => res.json())
        .then(data => setValue(data[0].token))
        .catch(err => alert(err))
        
    }
    const handleChange = e => {
        setValue(e.target.value);
    }



    return (
        <div style={{width: 'max-content', display: 'flex', alignItems: 'center', background:'white', padding: '20px 50px', boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'}}>
            <Alert severity="success">
                {
                    editable ?
                <TextField
                    id="outlined-number"
                    label="New Token"
                    type="text"
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    
                /> 
                :
                <div>
                    <AlertTitle>Token</AlertTitle>
                    <p>This is the current token — <strong>{value}</strong></p>
                </div>
                }
                
                
            </Alert>
{
    editable
    ? 
    <Button onClick={handleClickSave} style={{margin: '0 30px'}} variant="contained">Save</Button>
    :
    <Button onClick={handleClickEdit} style={{margin: '0 30px'}} variant="contained">Edit</Button>
}
            
            
        </div>
    )
}
