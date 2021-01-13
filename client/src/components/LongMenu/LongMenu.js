import React, {useContext} from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { UserContext } from '../../contexts/userContext';
import { useHistory } from 'react-router-dom';


const ITEM_HEIGHT = 48;

export default function LongMenu() {

  const {user, setUser} = useContext(UserContext);
  const history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    
  };

  const handleClickOption = () => {
    setUser('');
    localStorage.clear();
  }
 function handleClickLeaderBoard(){
   
 }
  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {
          <div>
          
            
            <MenuItem key={0} onClick={() => {
              history.push('/settings') 
              handleClose(); 
              }
          }>
              Settings
            </MenuItem>
           
            <MenuItem key={1} onClick={handleClickOption}>
              Logout
            </MenuItem>
          </div>
        }
      </Menu>
    </div>
  );
}