
import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import history from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://slacker-hackers.herokuapp.com/">
      Slacker Hackers
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
    root:{
        fontSize: 16
    },
   
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        fontSize: 20
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function LogIn() {

    const classes = useStyles();

    //email, password and checkbox states
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [check, setCheck] = useState(false)

    const handleEmail = (e) => { // onChange email handler
        setEmail(e.target.value)
    }
    const handlePassword = (e) => { // onChange password handler
        setPassword(e.target.value)
    }
    const handleCheckbox = (e) => { // onChange checkbox handler
        setCheck(!check)
    }
    const handleSubmit = (e) => { // onClick submit handler
        e.preventDefault();
        

        let userCredentials = {  // generate the object to be sent to the backend
            email: email,
            password: password
        }
        
        const requestOptions = {  
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userCredentials),
        }
    
        fetch("https://slacker-hackers.herokuapp.com/auth/login", requestOptions) 
        .then((res) => res.json())
        .then((res) => {
           console.log('res=', res)
           alert(`Hi, ${res.user}`)
        // if (res.success === true) {
        //     alert('Login successfully')
        // } else {
        //     const error = new Error(res.error);
        //     throw error;
        // }
        })
        .catch((err) => {
        alert(err);
        });

        setEmail('');
        setPassword('');
    }

    
    return (
        <Container component="main" maxWidth="xs" className={classes.login}>
        <CssBaseline />
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>

            <Typography component="h1" variant="h5">
                Login
            </Typography>

            <form className={classes.form}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    type='email'
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={handleEmail}
                />

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={handlePassword}
                />

                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" onChange={handleCheckbox} value={check}/>}
                    label="Remember me"
                />

                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleSubmit}
                >
                    Sign In
                </Button>

                <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href='/#/sign-up' variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>

            </form>
        </div>
        <Box mt={8}>
            <Copyright />
        </Box>
    </Container>
        
    )
}
