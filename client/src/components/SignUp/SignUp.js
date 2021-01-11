import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel'; 
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';

                

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const history = useHistory();
  const classes = useStyles();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [slackId, setSlackId] = useState('');
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  //for radion btns
  const [role, setRole] = React.useState('');
  const [helperRadio, setHelperRadio] = React.useState(false);

  const handleFirstName = (e) => {
    e.preventDefault();
    setFirstName(e.target.value);
  }
  const handleLastName = (e) => {
    e.preventDefault();
    setLastName(e.target.value);
  }
  const handleEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  }
  const handleSlackId = (e) => {
    e.preventDefault();
    setSlackId(e.target.value);
  }
  const handleRadioChange = (event) => {
    if(event.target.value == 'student'){
      setHelperRadio(false)
      setToken('');
    }
    if(event.target.value == 'mentor'){
      setHelperRadio(true)
    }
    setRole(event.target.value);
  };
  const handleToken = (e) => {
    e.preventDefault();
    setToken(e.target.value);
  }
  const handlePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    let signUpCredentials = {}
    if(role == 'student'){
      signUpCredentials = {
        name: `${firstName} ${lastName}`,
        email: email,
        role: role,
        slackId: slackId,
        password: password
      }
    }else{
      signUpCredentials = {
        name: `${firstName} ${lastName}`,
        email: email,
        role: role,
        token: token,
        slackId: slackId,
        password: password
      }
    }

    

    let requestOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
        },
      body: JSON.stringify(signUpCredentials)
    }

    fetch('https://slacker-hackers.herokuapp.com/auth/signup', requestOptions)
    .then(res => {
      if(res.status === 200){
        setAlertMessage('success')
        history.push('/login'); //send user to login page
      }else if(res.status >= 400 && res.status < 499){
        setAlertMessage('error')
      }
      res.json()
    })
    .then(data => {
      // console.log('status', data)
    })
    .catch(err => {
      alert(err);
    });

    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  }

  

  
  

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                onChange={handleFirstName}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={handleLastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleEmail}
              />
            </Grid>
            <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="slackId"
                  label="Slack Id"
                  name="slackId"
                  autoComplete="slackId"
                  onChange={handleSlackId}
              />
              </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">I'm a:</FormLabel>
                <RadioGroup aria-label="quiz" name="quiz" value={role} onChange={handleRadioChange} style={{display: 'flex', flexDirection: 'row'}}>
                  <FormControlLabel value="student" control={<Radio />} label="Student" />
                  <FormControlLabel value="mentor" control={<Radio />} label="Mentor" />
                </RadioGroup>
              </FormControl>


            </Grid>
            {
              helperRadio 
              ?
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="token"
                  label="Private Token"
                  name="token"
                  autoComplete="Token"
                  onChange={handleToken}
              />
              </Grid>
              :
              ''
            }
            

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handlePassword}
              />
            </Grid>
          </Grid>
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>

          
            {
              alertMessage === 'success' 
              ?
                <Alert variant="filled" severity="success">Successfully registered</Alert>
              :
              alertMessage === 'error'
              ?
                <Alert variant="filled" severity="error">Server error</Alert>
              :
              ''
            
            }
          
          
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/#/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
      
    </Container>
  );
}